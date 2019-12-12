//FS.createPreloadedFile('/', 'liblib.so', "http://localhost:8080/side.wasm", true, true);
// var Module = {
//     dynamicLibraries: ['side.wasm'],
//   };

  // Module["readBinary"] = function readBinary(filename) {
  //   var ret = Module["read"](filename, true);
  //   if (!ret.buffer) {
  //    ret = new Uint8Array(ret);
  //   }
  //   assert(ret.buffer);
  //   return ret;
  //  };

var postTestMessage = function(message)  {
      console.log('msg:' + message);
  }

  // Module.onRuntimeInitialized = () => {
  //   Module._start();
  // }

  Module["mmh"] = function() {
    FS.mkdir('/output'); 
    if (ENVIRONMENT_IS_NODE) {
      FS.mount(NODEFS, {
        root: 'build/'
      }, '/output');
      var sideExists = FS.analyzePath("/output/side.wasm").exists;
        console.log("mmh sideExists:" + sideExists);
        var start = Date.now();
        loadDynamicLibrary("/output/side.wasm", {global: true, nodelete: true, fs:FS});
        console.log("loadDynamicLibrary:" + (Date.now() - start));
    } else if (ENVIRONMENT_IS_SHELL) {
      FS.mount(MEMFS, {
        root: 'build/'
      }, '/output');
      console.log("shell loadDynamicLibrary+");
      loadDynamicLibrary("/output/side.wasm", {global: true, nodelete: true, fs:FS});
    } else {
      //Module["addRunDependency"]("side_wasm");
      FS.createPreloadedFile('/output', 'side.wasm', "http://localhost:8080/side.wasm", true, true, () => {
        var sideExists = FS.analyzePath("/output/side.wasm").exists;
        console.log("mmh sideExists:" + sideExists);
        var start = Date.now();
        loadDynamicLibrary("/output/side.wasm", {global: true, nodelete: true, fs:FS});
        console.log("loadDynamicLibrary:" + (Date.now() - start));
        //Module["removeRunDependency"]("side_wasm");
      });
    }
  }

Module['preRun'] = function() {
  Module["mmh"]();
}