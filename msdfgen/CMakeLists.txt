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
FetchContent_MakeAvailable(freetype)

# Explicitly set Freetype variables
set(FREETYPE_INCLUDE_DIRS ${freetype_SOURCE_DIR}/include)
set(FREETYPE_LIBRARY ${freetype_BINARY_DIR}/libfreetype.a)

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
#target_link_libraries(wasm_app PRIVATE msdfgen-core ${FREETYPE_LIBRARY})
target_link_libraries(wasm_app PRIVATE msdfgen-full freetype)

# Include directories
#target_include_directories(wasm_app PRIVATE ${FREETYPE_INCLUDE_DIRS})

set(CMAKE_EXECUTABLE_SUFFIX ".js")

set_target_properties(wasm_app PROPERTIES RUNTIME_OUTPUT_DIRECTORY ../../lib/)
set_target_properties(wasm_app PROPERTIES LINK_FLAGS "--closure 1 -flto -sEXPORTED_FUNCTIONS=\"_malloc\",\"_free\" -sWASM=1 -sALLOW_MEMORY_GROWTH=1 --bind -sMODULARIZE --extern-post-js ../post.js")

