#include <emscripten/bind.h>
#include <emscripten/console.h>
#include <emscripten/val.h>

#include <cassert>
#include <limits>
#include <memory>

#include "msdfgen.h"
#include "msdfgen-ext.h"

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
                contour.edges.push_back(
                    EdgeHolder(new LinearSegment(point, newPoint)));
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

void generateOurMSDF(
    uintptr_t ptr,
    const std::vector<double> &crds,
    const std::vector<int> &cmds,
    int width,
    int height,
    double range,
    double scale,
    double translate_x,
    double translate_y,
    double edgeColoringAngleThreshold
) {
    float* pixels = reinterpret_cast<float*>(ptr);

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

class MyFont {
    public:
        MyFont(const emscripten::val& arrayBuffer) {
            FreetypeHandle *ft = initializeFreetype();
            // Get the size of the ArrayBuffer
            size_t byteLength = arrayBuffer["byteLength"].as<size_t>();

            // Create a Uint8Array view of the ArrayBuffer
            emscripten::val uint8Array = emscripten::val::global("Uint8Array").new_(arrayBuffer);

            // Allocate memory for the font data
            byte* fontData = new byte[byteLength];

            // Copy data from Uint8Array to our allocated memory
            emscripten::val memoryView = emscripten::val::module_property("HEAPU8").call<emscripten::val>("subarray",
                reinterpret_cast<uintptr_t>(fontData),
                reinterpret_cast<uintptr_t>(fontData) + byteLength);
            memoryView.call<void>("set", uint8Array);

            font = loadFontData(ft, fontData, byteLength);

            // TODO: destroyFont(font);
            // TODO: delete[] fontData;
        }
        FontHandle *font;

        ~MyFont() {
            deinitializeFreetype(ft);
        }

        void renderGlyph(unsigned glyph, float* pixels, int fontSize = 42) {
            Shape shape;

            if (loadGlyph(shape, font, glyph, FONT_SCALING_EM_NORMALIZED)) {
                msdfgen::Shape::Bounds bounds = shape.getBounds();
                int distanceRange = 4;
                double edgeColoringAngleThreshold = 3;
                int pad = distanceRange >> 1;
                int width = round(bounds.r * fontSize- bounds.l * fontSize) + pad + pad;
                int height = round(bounds.t * fontSize - bounds.b * fontSize) + pad + pad;
                int translate_x = round(-bounds.l * fontSize) + pad;
                int translate_y = round(-bounds.b * fontSize) + pad;

                FontMetrics fontMetrics;
                getFontMetrics(fontMetrics, font);

                double scale = fontSize / fontMetrics.emSize;
                double baseline = fontMetrics.ascenderY * scale;
                BitmapRef<float, 3> outputBmpRef(pixels, width, height);
                Projection projection(Vector2(scale), Vector2(translate_x, translate_y));
                Range r(distanceRange);
                DistanceMapping distanceMapping(r);
                SDFTransformation transformation(projection, distanceMapping);

                shape.normalize();
                edgeColoringSimple(shape, edgeColoringAngleThreshold);
                msdfgen::generateMSDF(outputBmpRef, shape, transformation);
            }
        }

    private:
        byte* fontData;
        FreetypeHandle *ft;
};

void parseFont(
    const emscripten::val& arrayBuffer,
    uintptr_t ptr,
    int width,
    int height,
    double range,
    double scale,
    double translate_x,
    double translate_y,
    double edgeColoringAngleThreshold
) {
    float* pixels = reinterpret_cast<float*>(ptr);
    MyFont myFont(arrayBuffer);
    myFont.renderGlyph('A', pixels);
}

EMSCRIPTEN_BINDINGS(my_class_example) {
    register_vector<float>("VectorFloat");
    register_vector<double>("VectorDouble");
    register_vector<int>("VectorInt");

    value_object<BitmapRef<float, 3>>("BitmapRef")
        .field("width", &BitmapRef<float, 3>::width);

    function("generateMSDF", &generateOurMSDF);
    function("parseFont", &parseFont);
}