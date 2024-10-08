#include <emscripten/bind.h>
#include <emscripten/console.h>
#include <emscripten/val.h>

#include <cassert>
#include <limits>
#include <memory>

#include "msdfgen-ext.h"
#include "msdfgen.h"

using namespace emscripten;
using namespace msdfgen;

Shape fromPath(const std::vector<double> &crds, const std::vector<int> &cmds) {
  Shape shape;
  int crdsi = 0;
  Contour contour;
  Point2 point;
  Point2 firstPoint;
  bool hasPoint = false;
  bool hasFirstPoint = false;

  for (int i = 0; i < cmds.size(); ++i) {
    char cmd = cmds.at(i);
    switch (cmd) {
      case 'M': {
        point = Point2(crds.at(crdsi), crds.at(crdsi + 1));
        crdsi += 2;
        firstPoint = point;
        hasPoint = true;
        hasFirstPoint = true;
        break;
      }
      case 'L': {
        if (!hasPoint) {
          throw std::runtime_error("No prev point for line");
        }
        Point2 newPoint(crds.at(crdsi), crds.at(crdsi + 1));
        crdsi += 2;
        contour.edges.push_back(EdgeHolder(new LinearSegment(point, newPoint)));
        point = newPoint;
        break;
      }

      case 'Q': {
        throw std::runtime_error("Quadratic segment not implemented");
        break;
      }
      case 'C': {
        if (!hasPoint) {
          throw std::runtime_error("No prev point for cubic");
        }
        Point2 cp1(crds.at(crdsi), crds.at(crdsi + 1));
        Point2 cp2(crds.at(crdsi + 2), crds.at(crdsi + 3));
        Point2 newPoint(crds.at(crdsi + 4), crds.at(crdsi + 5));
        crdsi += 6;
        contour.edges.push_back(
            EdgeHolder(new CubicSegment(point, cp1, cp2, newPoint)));
        point = newPoint;
        break;
      }
      case 'Z': {
        if (!hasPoint || !hasFirstPoint) {
          throw std::runtime_error("No prev point for close");
        }
        contour.edges.push_back(
            EdgeHolder(new LinearSegment(point, firstPoint)));
        shape.contours.push_back(contour);
        contour.edges.clear();
        hasPoint = false;
        hasFirstPoint = false;
        break;
      }
    }
  }

  return shape;
}

void generateOurMSDF(uintptr_t ptr, const std::vector<double> &crds,
                     const std::vector<int> &cmds, int width, int height,
                     double range, double scale, double translate_x,
                     double translate_y, double edgeColoringAngleThreshold) {
  float *pixels = reinterpret_cast<float *>(ptr);

  BitmapRef<float, 3> outputBmpRef(pixels, width, height);
  Projection projection(Vector2(scale), Vector2(translate_x, translate_y));
  Range r(range);
  DistanceMapping distanceMapping(r);
  SDFTransformation transformation(projection, distanceMapping);
  Shape shape = fromPath(crds, cmds);
  shape.normalize();

  edgeColoringSimple(shape, edgeColoringAngleThreshold);

  msdfgen::generateMSDF(outputBmpRef, shape, transformation);
}

struct CharMetrics {
  int xoffset;
  int yoffset;
  double xadvance;
  int width;
  int height;
  int fontSize;
  int translate_x;
  int translate_y;
};

class MyFont {
 public:
  MyFont(int fontPtr, int byteLength)
      : ft(nullptr), font(nullptr), fontData(nullptr) {
    const byte *fontData = reinterpret_cast<const byte *>(fontPtr);

    FreetypeHandle *ft = initializeFreetype();

    font = loadFontData(ft, fontData, byteLength);
  }
  FontHandle *font;

  ~MyFont() {
    // deinitializeFreetype(ft);
    //              destroyFont(font);
    //                      delete[] fontData;
  }

  CharMetrics getCharMetrics(unsigned glyph, int fontSize = 42) {
    Shape shape;
    CharMetrics charMetrics;
    double xadvance;

    if (loadGlyph(shape, font, glyph, FONT_SCALING_EM_NORMALIZED, &xadvance)) {
      shape.inverseYAxis = true;
      shape.normalize();
      msdfgen::Shape::Bounds bounds = shape.getBounds();
      int range = 4;
      double edgeColoringAngleThreshold = 3;
      double pad = range >> 1;
      double width =
          round(fontSize * bounds.r - fontSize * bounds.l) + pad + pad;
      double height =
          round(fontSize * bounds.t - fontSize * bounds.b) + pad + pad;
      double translate_x = -bounds.l * fontSize + pad;
      double translate_y = -bounds.b * fontSize + pad;

      FontMetrics fontMetrics;
      getFontMetrics(fontMetrics, font);

      double scale = fontSize / fontMetrics.emSize;
      double baseline = fontMetrics.ascenderY * scale;

      // TODO: round
      charMetrics.xoffset = -translate_x;
      charMetrics.yoffset = round(bounds.b) + pad + baseline;
      charMetrics.xadvance = xadvance * scale;
      charMetrics.width = width;
      charMetrics.height = height;

      charMetrics.fontSize = fontSize;
      charMetrics.translate_x = translate_x;
      charMetrics.translate_y = translate_y;

      glyphCache[glyph] = shape;
      charMetricsCache[glyph] = charMetrics;
    }
    return charMetrics;
  }

  CharMetrics renderGlyph(unsigned glyph, int resultPtr) {
    float *pixels = reinterpret_cast<float *>(resultPtr);
    Shape shape = glyphCache[glyph];
    CharMetrics charMetrics = charMetricsCache[glyph];

    double edgeColoringAngleThreshold = 3;
    BitmapRef<float, 3> outputBmpRef(pixels, charMetrics.width, charMetrics.height);
    edgeColoringSimple(shape, edgeColoringAngleThreshold);
    SDFTransformation t(
        Projection(charMetrics.fontSize,
                   Vector2(charMetrics.translate_x / charMetrics.fontSize,
                           charMetrics.translate_y / charMetrics.fontSize)),
        Range(1 / 40));

    msdfgen::generateMSDF(outputBmpRef, shape, t);
    return charMetrics;
  }

 private:
  byte *fontData;
  FreetypeHandle *ft;
  std::map<unsigned, Shape> glyphCache;
  std::map<unsigned, CharMetrics> charMetricsCache;
};

EMSCRIPTEN_BINDINGS(my_class_example) {
  register_vector<float>("VectorFloat");
  register_vector<double>("VectorDouble");
  register_vector<int>("VectorInt");

  value_object<BitmapRef<float, 3>>("BitmapRef")
      .field("width", &BitmapRef<float, 3>::width);

  value_object<CharMetrics>("CharMetrics")
      .field("xoffset", &CharMetrics::xoffset)
      .field("yoffset", &CharMetrics::yoffset)
      .field("xadvance", &CharMetrics::xadvance)
      .field("width", &CharMetrics::width)
      .field("height", &CharMetrics::height);

  function("generateMSDF", &generateOurMSDF);

  class_<MyFont>("MyFont")
      .constructor<int, int>(allow_raw_pointers())
      .function("getCharMetrics", &MyFont::getCharMetrics)
      .function("renderGlyph", &MyFont::renderGlyph, allow_raw_pointers());
}