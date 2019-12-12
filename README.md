# dylink_benchmark

This benchmark stress tests the dynamic linking feature in Emscripten by making 1000000 intermodule calls that require legalization. The 2 folders build/original and build/importstoindirects contain the output from the latest version of Emscripten vs that of the imports to indirects PR.

The results are as follows:

| Chrome 78  |  |
| ------------- | ------------- |
| Original  | 227ms  |
| PR  | 17ms  |

| Firefox 71  |  |
| ------------- | ------------- |
| Original  | 43ms  |
| PR  | 6ms  |


To run the 2 samples, just go to the respective folder and start a http server at port 8080. After that, run http://localhost:8080/index.html in your browser.
