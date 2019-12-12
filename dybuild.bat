emcc -o build\index.js main.cpp --proxy-to-worker --profiling -lnodefs.js -s ASSERTIONS=1 -s EXPORTED_FUNCTIONS=['__ZNSt3__26chrono12steady_clock3nowEv','_srand','_rand'] -Oz -std=c++14 -s MAIN_MODULE=1 --pre-js preload.js -s ALLOW_MEMORY_GROWTH=1 -s INCLUDE_FULL_LIBRARY=1 -s EXPORT_ALL=1 && emcc side.cpp -Oz -o build\side.js -s SIDE_MODULE=2 -s FORCE_FILESYSTEM=1 -s WASM=1  -s DISABLE_EXCEPTION_CATCHING=0 -s ALLOW_MEMORY_GROWTH=1 -std=c++14
REM --source-map-base http://localhost:8080/ -g3 -s ASSERTIONS=1 --use-preload-plugins  --proxy-to-worker

