#include <stdio.h>
#include <string>
#include "emscripten.h"
#include <dlfcn.h>
#include <chrono>
#include <iostream>

extern int64_t sidey(int64_t input);

using namespace std;
using namespace std::chrono;

EMSCRIPTEN_KEEPALIVE
int main(int argc, char* argv[]) {
  long long ret=0;
  int loopCount = 1000000;
  std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();
  for (int i=0; i<loopCount; ++i) {
    ret += sidey(argc);
  }
  std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();
  std::cout << "Dylink Call" << " = " << std::chrono::duration_cast<std::chrono::milliseconds>(end-begin).count() << 
  "ms" << std::endl;

  return ret;
}