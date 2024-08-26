cmake_minimum_required(VERSION 3.10)
project(WasmProject)

# Specify C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(MSDFGEN_BUILD_STANDALONE OFF)
set(MSDFGEN_USE_OPENMP OFF)
set(MSDFGEN_USE_CPP11 ON)
set(MSDFGEN_USE_SKIA OFF)
set(MSDFGEN_INSTALL OFF)
set(BUILD_SHARED_LIBS OFF)
set(MSDFGEN_DISABLE_SVG ON)
set(MSDFGEN_DISABLE_PNG ON)

include(FetchContent)

# Fetch and build Freetype
FetchContent_Declare(
  freetype
  GIT_REPOSITORY https://github.com/freetype/freetype.git
)
FetchContent_GetProperties(freetype)
if(NOT freetype_POPULATED)
  FetchContent_Populate(freetype)
  # Disable some features we don't need to speed up build and reduce size
  set(CMAKE_DISABLE_FIND_PACKAGE_ZLIB TRUE)
  set(CMAKE_DISABLE_FIND_PACKAGE_BZip2 TRUE)
  set(CMAKE_DISABLE_FIND_PACKAGE_PNG TRUE)
  set(CMAKE_DISABLE_FIND_PACKAGE_HarfBuzz TRUE)
  set(CMAKE_DISABLE_FIND_PACKAGE_BrotliDec TRUE)
  add_subdirectory(${freetype_SOURCE_DIR} ${freetype_BINARY_DIR})
endif()

# Explicitly set Freetype variables
set(FREETYPE_INCLUDE_DIRS ${freetype_SOURCE_DIR}/include)
set(FREETYPE_LIBRARY freetype)

# Fetch and build msdfgen

FetchContent_Declare(
  msdfgen
  GIT_REPOSITORY https://github.com/Chlumsky/msdfgen.git
)

set(msdfgen_MSDFGEN_DISABLE_SVG ON CACHE INTERNAL "")
set(msdfgen_MSDFGEN_DISABLE_PNG ON CACHE INTERNAL "")
FetchContent_MakeAvailable(msdfgen)

# Add the executable
add_executable(wasm_app wasm.cpp)

# Link libraries to your executable
target_link_libraries(wasm_app PRIVATE msdfgen-core ${FREETYPE_LIBRARY})

# Include directories
target_include_directories(wasm_app PRIVATE ${FREETYPE_INCLUDE_DIRS})

# Emscripten-specific settings (if needed)
if(EMSCRIPTEN)
  set(CMAKE_EXECUTABLE_SUFFIX ".js")
  set_target_properties(wasm_app PROPERTIES LINK_FLAGS "-s WASM=1 -s ALLOW_MEMORY_GROWTH=1 --bind")
endif()
