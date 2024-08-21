cd msdfgen/src
mkdir build
cd build
emcmake cmake .. -DFREETYPE_LIBRARY=../../freetype/builds/wasm/libfreetype.a -DFREETYPE_INCLUDE_DIRS=../../freetype/include -DMSDFGEN_DISABLE_SVG=ON -DMSDFGEN_DISABLE_PNG=ON -DMSDFGEN_USE_SKIA=OFF
make