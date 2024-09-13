
var Module = (() => {
  var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  if (typeof __filename != 'undefined') _scriptName ||= __filename;
  return (
function(moduleArg = {}) {
  var moduleRtn;

var l = moduleArg, aa, ba, ca = new Promise((a, b) => {
  aa = a;
  ba = b;
});
["_malloc", "_free", "_memory", "___indirect_function_table", "onRuntimeInitialized"].forEach(a => {
  Object.getOwnPropertyDescriptor(ca, a) || Object.defineProperty(ca, a, {get:() => p("You are getting " + a + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"), set:() => p("You are setting " + a + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),});
});
var da = "object" == typeof window, ea = "function" == typeof importScripts, fa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, ha = !da && !fa && !ea;
if (l.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}
var ia = Object.assign({}, l), ja = "./this.program", q = "", ka, la;
if (fa) {
  if ("undefined" == typeof process || !process.release || "node" !== process.release.name) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  var ma = process.versions.node, na = ma.split(".").slice(0, 3);
  na = 10000 * na[0] + 100 * na[1] + 1 * na[2].split("-")[0];
  if (160000 > na) {
    throw Error("This emscripten-generated code requires node v16.0.0 (detected v" + ma + ")");
  }
  var fs = require("fs"), oa = require("path");
  q = __dirname + "/";
  la = a => {
    a = pa(a) ? new URL(a) : oa.normalize(a);
    a = fs.readFileSync(a);
    r(a.buffer);
    return a;
  };
  ka = a => {
    a = pa(a) ? new URL(a) : oa.normalize(a);
    return new Promise((b, c) => {
      fs.readFile(a, void 0, (d, e) => {
        d ? c(d) : b(e.buffer);
      });
    });
  };
  !l.thisProgram && 1 < process.argv.length && (ja = process.argv[1].replace(/\\/g, "/"));
  process.argv.slice(2);
} else if (ha) {
  if ("object" == typeof process && "function" === typeof require || "object" == typeof window || "function" == typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
} else if (da || ea) {
  ea ? q = self.location.href : "undefined" != typeof document && document.currentScript && (q = document.currentScript.src);
  _scriptName && (q = _scriptName);
  q.startsWith("blob:") ? q = "" : q = q.substr(0, q.replace(/[?#].*/, "").lastIndexOf("/") + 1);
  if ("object" != typeof window && "function" != typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  ea && (la = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
  ka = a => pa(a) ? new Promise((b, c) => {
    var d = new XMLHttpRequest();
    d.open("GET", a, !0);
    d.responseType = "arraybuffer";
    d.onload = () => {
      (200 == d.status || 0 == d.status && d.response) && c(d.response);
      b(d.status);
    };
    d.onerror = b;
    d.send(null);
  }) : fetch(a, {credentials:"same-origin"}).then(b => b.ok ? b.arrayBuffer() : Promise.reject(Error(b.status + " : " + b.url)));
} else {
  throw Error("environment detection error");
}
var qa = l.print || console.log.bind(console), t = l.printErr || console.error.bind(console);
Object.assign(l, ia);
ia = null;
Object.getOwnPropertyDescriptor(l, "fetchSettings") && p("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
u("arguments", "arguments_");
l.thisProgram && (ja = l.thisProgram);
u("thisProgram", "thisProgram");
u("quit", "quit_");
r("undefined" == typeof l.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
r("undefined" == typeof l.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
r("undefined" == typeof l.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
r("undefined" == typeof l.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
r("undefined" == typeof l.read, "Module.read option was removed");
r("undefined" == typeof l.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
r("undefined" == typeof l.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
r("undefined" == typeof l.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
r("undefined" == typeof l.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
u("asm", "wasmExports");
u("readAsync", "readAsync");
u("readBinary", "readBinary");
u("setWindowTitle", "setWindowTitle");
r(!ha, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var ra;
l.wasmBinary && (ra = l.wasmBinary);
u("wasmBinary", "wasmBinary");
"object" != typeof WebAssembly && t("no native wasm support detected");
var sa, ta = !1;
function r(a, b) {
  a || p("Assertion failed" + (b ? ": " + b : ""));
}
var w, y, ua, va, C, F, wa, xa;
function ya() {
  var a = sa.buffer;
  l.HEAP8 = w = new Int8Array(a);
  l.HEAP16 = ua = new Int16Array(a);
  l.HEAPU8 = y = new Uint8Array(a);
  l.HEAPU16 = va = new Uint16Array(a);
  l.HEAP32 = C = new Int32Array(a);
  l.HEAPU32 = F = new Uint32Array(a);
  l.HEAPF32 = wa = new Float32Array(a);
  l.HEAPF64 = xa = new Float64Array(a);
}
r(!l.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
r("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
r(!l.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
r(!l.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
function za() {
  var a = Aa();
  r(0 == (a & 3));
  0 == a && (a += 4);
  F[a >> 2] = 34821223;
  F[a + 4 >> 2] = 2310721022;
  F[0] = 1668509029;
}
function Ba() {
  if (!ta) {
    var a = Aa();
    0 == a && (a += 4);
    var b = F[a >> 2], c = F[a + 4 >> 2];
    34821223 == b && 2310721022 == c || p(`Stack overflow! Stack cookie has been overwritten at ${Ca(a)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${Ca(c)} ${Ca(b)}`);
    1668509029 != F[0] && p("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var Da = new Int16Array(1), Ea = new Int8Array(Da.buffer);
Da[0] = 25459;
if (115 !== Ea[0] || 99 !== Ea[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
var Ga = [], Ha = [], Ia = [], Ja = !1;
function Ka() {
  var a = l.preRun.shift();
  Ga.unshift(a);
}
r(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
r(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
r(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
r(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var G = 0, H = null, La = null, Ma = {};
function Na() {
  G++;
  l.monitorRunDependencies?.(G);
  r(!Ma["wasm-instantiate"]);
  Ma["wasm-instantiate"] = 1;
  null === H && "undefined" != typeof setInterval && (H = setInterval(() => {
    if (ta) {
      clearInterval(H), H = null;
    } else {
      var a = !1, b;
      for (b in Ma) {
        a || (a = !0, t("still waiting on run dependencies:")), t(`dependency: ${b}`);
      }
      a && t("(end of list)");
    }
  }, 10000));
}
function p(a) {
  l.onAbort?.(a);
  a = "Aborted(" + a + ")";
  t(a);
  ta = !0;
  a = new WebAssembly.RuntimeError(a);
  ba(a);
  throw a;
}
var Oa = a => a.startsWith("data:application/octet-stream;base64,"), pa = a => a.startsWith("file://");
function Pa(a, b) {
  return (...c) => {
    r(Ja, `native function \`${a}\` called before runtime initialization`);
    var d = I[a];
    r(d, `exported native function \`${a}\` not found`);
    r(c.length <= b, `native function \`${a}\` called with ${c.length} args but expects ${b}`);
    return d(...c);
  };
}
var Qa;
function Ra(a) {
  if (a == Qa && ra) {
    return new Uint8Array(ra);
  }
  if (la) {
    return la(a);
  }
  throw "both async and sync fetching of the wasm failed";
}
function Sa(a) {
  return ra ? Promise.resolve().then(() => Ra(a)) : ka(a).then(b => new Uint8Array(b), () => Ra(a));
}
function Ta(a, b, c) {
  return Sa(a).then(d => WebAssembly.instantiate(d, b)).then(c, d => {
    t(`failed to asynchronously prepare wasm: ${d}`);
    pa(Qa) && t(`warning: Loading from a file URI (${Qa}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    p(d);
  });
}
function Ua(a, b) {
  var c = Qa;
  return ra || "function" != typeof WebAssembly.instantiateStreaming || Oa(c) || pa(c) || fa || "function" != typeof fetch ? Ta(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
    t(`wasm streaming compile failed: ${e}`);
    t("falling back to ArrayBuffer instantiation");
    return Ta(c, a, b);
  }));
}
var J, K;
function u(a, b) {
  Object.getOwnPropertyDescriptor(l, a) || Object.defineProperty(l, a, {configurable:!0, get() {
    p(`\`Module.${a}\` has been replaced by \`${b}\`` + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function Va(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
function Wa(a, b) {
  "undefined" != typeof globalThis && Object.defineProperty(globalThis, a, {configurable:!0, get() {
    L(`\`${a}\` is not longer defined by emscripten. ${b}`);
  }});
}
Wa("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
Wa("asm", "Please use wasmExports instead");
function Xa(a) {
  Object.getOwnPropertyDescriptor(l, a) || Object.defineProperty(l, a, {configurable:!0, get() {
    var b = `'${a}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    Va(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    p(b);
  }});
}
var Ya = a => {
  for (; 0 < a.length;) {
    a.shift()(l);
  }
}, Ca = a => {
  r("number" === typeof a);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, L = a => {
  L.ga || (L.ga = {});
  L.ga[a] || (L.ga[a] = 1, fa && (a = "warning: " + a), t(a));
}, Za = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, $a = (a, b, c) => {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.buffer && Za) {
    return Za.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | f << 6 | g : (240 != (e & 248) && L("Invalid UTF-8 leading byte " + Ca(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}, ab = (a, b) => {
  r("number" == typeof a, `UTF8ToString expects a number (got ${typeof a})`);
  return a ? $a(y, a, b) : "";
};
class bb {
  constructor(a) {
    this.l = a - 24;
  }
}
var cb = 0;
function db() {
  r(void 0 != eb);
  var a = C[+eb >> 2];
  eb += 4;
  return a;
}
var fb = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, gb = a => {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = fb(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, hb = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.substr(0, b.length - 1);
  return a + b;
}, ib = a => {
  if ("/" === a) {
    return "/";
  }
  a = gb(a);
  a = a.replace(/\/$/, "");
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
}, jb = () => {
  if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
    return c => crypto.getRandomValues(c);
  }
  if (fa) {
    try {
      var a = require("crypto");
      if (a.randomFillSync) {
        return c => a.randomFillSync(c);
      }
      var b = a.randomBytes;
      return c => (c.set(b(c.byteLength)), c);
    } catch (c) {
    }
  }
  p("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
}, kb = a => (kb = jb())(a), lb = (...a) => {
  for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
    c = 0 <= d ? a[d] : "/";
    if ("string" != typeof c) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!c) {
      return "";
    }
    b = c + "/" + b;
    c = "/" === c.charAt(0);
  }
  b = fb(b.split("/").filter(e => !!e), !c).join("/");
  return (c ? "/" : "") + b || ".";
}, mb = [], nb = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, ob = (a, b, c, d) => {
  r("string" === typeof a, `stringToUTF8Array expects a string (got ${typeof a})`);
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var g = a.charCodeAt(f);
    if (55296 <= g && 57343 >= g) {
      var h = a.charCodeAt(++f);
      g = 65536 + ((g & 1023) << 10) | h & 1023;
    }
    if (127 >= g) {
      if (c >= d) {
        break;
      }
      b[c++] = g;
    } else {
      if (2047 >= g) {
        if (c + 1 >= d) {
          break;
        }
        b[c++] = 192 | g >> 6;
      } else {
        if (65535 >= g) {
          if (c + 2 >= d) {
            break;
          }
          b[c++] = 224 | g >> 12;
        } else {
          if (c + 3 >= d) {
            break;
          }
          1114111 < g && L("Invalid Unicode code point " + Ca(g) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
          b[c++] = 240 | g >> 18;
          b[c++] = 128 | g >> 12 & 63;
        }
        b[c++] = 128 | g >> 6 & 63;
      }
      b[c++] = 128 | g & 63;
    }
  }
  b[c] = 0;
  return c - e;
}, pb = [];
function qb(a, b) {
  pb[a] = {input:[], output:[], O:b};
  rb(a, sb);
}
var sb = {open(a) {
  var b = pb[a.node.rdev];
  if (!b) {
    throw new N(43);
  }
  a.tty = b;
  a.seekable = !1;
}, close(a) {
  a.tty.O.fsync(a.tty);
}, fsync(a) {
  a.tty.O.fsync(a.tty);
}, read(a, b, c, d) {
  if (!a.tty || !a.tty.O.na) {
    throw new N(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.tty.O.na(a.tty);
    } catch (h) {
      throw new N(29);
    }
    if (void 0 === g && 0 === e) {
      throw new N(6);
    }
    if (null === g || void 0 === g) {
      break;
    }
    e++;
    b[c + f] = g;
  }
  e && (a.node.timestamp = Date.now());
  return e;
}, write(a, b, c, d) {
  if (!a.tty || !a.tty.O.da) {
    throw new N(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.tty.O.da(a.tty, b[c + e]);
    }
  } catch (f) {
    throw new N(29);
  }
  d && (a.node.timestamp = Date.now());
  return e;
},}, tb = {na() {
  a: {
    if (!mb.length) {
      var a = null;
      if (fa) {
        var b = Buffer.alloc(256), c = 0, d = process.stdin.fd;
        try {
          c = fs.readSync(d, b, 0, 256);
        } catch (e) {
          if (e.toString().includes("EOF")) {
            c = 0;
          } else {
            throw e;
          }
        }
        0 < c && (a = b.slice(0, c).toString("utf-8"));
      } else {
        "undefined" != typeof window && "function" == typeof window.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
      }
      if (!a) {
        a = null;
        break a;
      }
      b = Array(nb(a) + 1);
      a = ob(a, b, 0, b.length);
      b.length = a;
      mb = b;
    }
    a = mb.shift();
  }
  return a;
}, da(a, b) {
  null === b || 10 === b ? (qa($a(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  a.output && 0 < a.output.length && (qa($a(a.output, 0)), a.output = []);
}, Ta() {
  return {Oa:25856, Qa:5, Na:191, Pa:35387, Ma:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]};
}, Ua() {
  return 0;
}, Va() {
  return [24, 80];
},}, ub = {da(a, b) {
  null === b || 10 === b ? (t($a(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  a.output && 0 < a.output.length && (t($a(a.output, 0)), a.output = []);
},};
function vb(a, b) {
  var c = a.j ? a.j.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.j, a.j = new Uint8Array(b), 0 < a.s && a.j.set(c.subarray(0, a.s), 0));
}
var O = {F:null, J() {
  return O.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new N(63);
  }
  O.F || (O.F = {dir:{node:{D:O.h.D, H:O.h.H, lookup:O.h.lookup, W:O.h.W, rename:O.h.rename, unlink:O.h.unlink, rmdir:O.h.rmdir, readdir:O.h.readdir, symlink:O.h.symlink}, stream:{L:O.i.L}}, file:{node:{D:O.h.D, H:O.h.H}, stream:{L:O.i.L, read:O.i.read, write:O.i.write, ia:O.i.ia, X:O.i.X, Z:O.i.Z}}, link:{node:{D:O.h.D, H:O.h.H, readlink:O.h.readlink}, stream:{}}, ja:{node:{D:O.h.D, H:O.h.H}, stream:wb}});
  c = xb(a, b, c, d);
  16384 === (c.mode & 61440) ? (c.h = O.F.dir.node, c.i = O.F.dir.stream, c.j = {}) : 32768 === (c.mode & 61440) ? (c.h = O.F.file.node, c.i = O.F.file.stream, c.s = 0, c.j = null) : 40960 === (c.mode & 61440) ? (c.h = O.F.link.node, c.i = O.F.link.stream) : 8192 === (c.mode & 61440) && (c.h = O.F.ja.node, c.i = O.F.ja.stream);
  c.timestamp = Date.now();
  a && (a.j[b] = c, a.timestamp = c.timestamp);
  return c;
}, Sa(a) {
  return a.j ? a.j.subarray ? a.j.subarray(0, a.s) : new Uint8Array(a.j) : new Uint8Array(0);
}, h:{D(a) {
  var b = {};
  b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
  b.ino = a.id;
  b.mode = a.mode;
  b.nlink = 1;
  b.uid = 0;
  b.gid = 0;
  b.rdev = a.rdev;
  16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.s : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.atime = new Date(a.timestamp);
  b.mtime = new Date(a.timestamp);
  b.ctime = new Date(a.timestamp);
  b.sa = 4096;
  b.blocks = Math.ceil(b.size / b.sa);
  return b;
}, H(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  if (void 0 !== b.size && (b = b.size, a.s != b)) {
    if (0 == b) {
      a.j = null, a.s = 0;
    } else {
      var c = a.j;
      a.j = new Uint8Array(b);
      c && a.j.set(c.subarray(0, Math.min(b, a.s)));
      a.s = b;
    }
  }
}, lookup() {
  throw yb[44];
}, W(a, b, c, d) {
  return O.createNode(a, b, c, d);
}, rename(a, b, c) {
  if (16384 === (a.mode & 61440)) {
    try {
      var d = zb(b, c);
    } catch (f) {
    }
    if (d) {
      for (var e in d.j) {
        throw new N(55);
      }
    }
  }
  delete a.parent.j[a.name];
  a.parent.timestamp = Date.now();
  a.name = c;
  b.j[c] = a;
  b.timestamp = a.parent.timestamp;
}, unlink(a, b) {
  delete a.j[b];
  a.timestamp = Date.now();
}, rmdir(a, b) {
  var c = zb(a, b), d;
  for (d in c.j) {
    throw new N(55);
  }
  delete a.j[b];
  a.timestamp = Date.now();
}, readdir(a) {
  var b = [".", ".."], c;
  for (c of Object.keys(a.j)) {
    b.push(c);
  }
  return b;
}, symlink(a, b, c) {
  a = O.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new N(28);
  }
  return a.link;
},}, i:{read(a, b, c, d, e) {
  var f = a.node.j;
  if (e >= a.node.s) {
    return 0;
  }
  a = Math.min(a.node.s - e, d);
  r(0 <= a);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write(a, b, c, d, e, f) {
  r(!(b instanceof ArrayBuffer));
  b.buffer === w.buffer && (f = !1);
  if (!d) {
    return 0;
  }
  a = a.node;
  a.timestamp = Date.now();
  if (b.subarray && (!a.j || a.j.subarray)) {
    if (f) {
      return r(0 === e, "canOwn must imply no weird position inside the file"), a.j = b.subarray(c, c + d), a.s = d;
    }
    if (0 === a.s && 0 === e) {
      return a.j = b.slice(c, c + d), a.s = d;
    }
    if (e + d <= a.s) {
      return a.j.set(b.subarray(c, c + d), e), d;
    }
  }
  vb(a, e + d);
  if (a.j.subarray && b.subarray) {
    a.j.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.j[e + f] = b[c + f];
    }
  }
  a.s = Math.max(a.s, e + d);
  return d;
}, L(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.s);
  if (0 > b) {
    throw new N(28);
  }
  return b;
}, ia(a, b, c) {
  vb(a.node, b + c);
  a.node.s = Math.max(a.node.s, b + c);
}, X(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new N(43);
  }
  a = a.node.j;
  if (e & 2 || a.buffer !== w.buffer) {
    if (0 < c || c + b < a.length) {
      a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
    }
    c = !0;
    r(65536, "alignment argument is required");
    b = 65536 * Math.ceil(b / 65536);
    (e = Ab(65536, b)) ? (y.fill(0, e, e + b), b = e) : b = 0;
    if (!b) {
      throw new N(48);
    }
    w.set(a, b);
  } else {
    c = !1, b = a.byteOffset;
  }
  return {l:b, ra:c};
}, Z(a, b, c, d) {
  O.i.write(a, b, 0, d, c, !1);
  return 0;
},},}, Bb = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, Db = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, 
EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, 
ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135,}, Eb = null, Fb = {}, Gb = [], Hb = 1, Ib = null, Jb = !0, N = class extends Error {
  constructor(a) {
    super(Ja ? ab(Kb(a)) : "");
    this.name = "ErrnoError";
    this.I = a;
    for (var b in Db) {
      if (Db[b] === a) {
        this.code = b;
        break;
      }
    }
  }
}, yb = {}, Lb = class {
  constructor() {
    this.T = {};
    this.node = null;
  }
  get flags() {
    return this.T.flags;
  }
  set flags(a) {
    this.T.flags = a;
  }
  get position() {
    return this.T.position;
  }
  set position(a) {
    this.T.position = a;
  }
}, Mb = class {
  constructor(a, b, c, d) {
    a ||= this;
    this.parent = a;
    this.J = a.J;
    this.Y = null;
    this.id = Hb++;
    this.name = b;
    this.mode = c;
    this.h = {};
    this.i = {};
    this.rdev = d;
  }
  get read() {
    return 365 === (this.mode & 365);
  }
  set read(a) {
    a ? this.mode |= 365 : this.mode &= -366;
  }
  get write() {
    return 146 === (this.mode & 146);
  }
  set write(a) {
    a ? this.mode |= 146 : this.mode &= -147;
  }
};
function P(a, b = {}) {
  a = lb(a);
  if (!a) {
    return {path:"", node:null};
  }
  b = Object.assign({ma:!0, fa:0}, b);
  if (8 < b.fa) {
    throw new N(32);
  }
  a = a.split("/").filter(g => !!g);
  for (var c = Eb, d = "/", e = 0; e < a.length; e++) {
    var f = e === a.length - 1;
    if (f && b.parent) {
      break;
    }
    c = zb(c, a[e]);
    d = gb(d + "/" + a[e]);
    c.Y && (!f || f && b.ma) && (c = c.Y.root);
    if (!f || b.$) {
      for (f = 0; 40960 === (c.mode & 61440);) {
        if (c = Nb(d), d = lb(hb(d), c), c = P(d, {fa:b.fa + 1}).node, 40 < f++) {
          throw new N(32);
        }
      }
    }
  }
  return {path:d, node:c};
}
function Ob(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.J.pa, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function Pb(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % Ib.length;
}
function zb(a, b) {
  var c = 16384 === (a.mode & 61440) ? (c = Qb(a, "x")) ? c : a.h.lookup ? 0 : 2 : 54;
  if (c) {
    throw new N(c);
  }
  for (c = Ib[Pb(a.id, b)]; c; c = c.Da) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.h.lookup(a, b);
}
function xb(a, b, c, d) {
  r("object" == typeof a);
  a = new Mb(a, b, c, d);
  b = Pb(a.parent.id, a.name);
  a.Da = Ib[b];
  return Ib[b] = a;
}
function Rb(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function Qb(a, b) {
  if (Jb) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}
function Sb(a, b) {
  try {
    return zb(a, b), 20;
  } catch (c) {
  }
  return Qb(a, "wx");
}
function Q(a) {
  a = Gb[a];
  if (!a) {
    throw new N(8);
  }
  return a;
}
function Tb(a, b = -1) {
  r(-1 <= b);
  a = Object.assign(new Lb(), a);
  if (-1 == b) {
    a: {
      for (b = 0; 4096 >= b; b++) {
        if (!Gb[b]) {
          break a;
        }
      }
      throw new N(33);
    }
  }
  a.fd = b;
  return Gb[b] = a;
}
function Ub(a, b = -1) {
  a = Tb(a, b);
  a.i?.Ra?.(a);
  return a;
}
var wb = {open(a) {
  a.i = Fb[a.node.rdev].i;
  a.i.open?.(a);
}, L() {
  throw new N(70);
},};
function rb(a, b) {
  Fb[a] = {i:b};
}
function Vb(a, b) {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && Eb) {
    throw new N(10);
  }
  if (!c && !d) {
    var e = P(b, {ma:!1});
    b = e.path;
    e = e.node;
    if (e.Y) {
      throw new N(10);
    }
    if (16384 !== (e.mode & 61440)) {
      throw new N(54);
    }
  }
  b = {type:a, Ya:{}, pa:b, Ca:[]};
  a = a.J(b);
  a.J = b;
  b.root = a;
  c ? Eb = a : e && (e.Y = b, e.J && e.J.Ca.push(b));
}
function Wb(a, b, c) {
  var d = P(a, {parent:!0}).node;
  a = ib(a);
  if (!a || "." === a || ".." === a) {
    throw new N(28);
  }
  var e = Sb(d, a);
  if (e) {
    throw new N(e);
  }
  if (!d.h.W) {
    throw new N(63);
  }
  return d.h.W(d, a, b, c);
}
function R(a) {
  return Wb(a, 16895, 0);
}
function Xb(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  Wb(a, b | 8192, c);
}
function Yb(a, b) {
  if (!lb(a)) {
    throw new N(44);
  }
  var c = P(b, {parent:!0}).node;
  if (!c) {
    throw new N(44);
  }
  b = ib(b);
  var d = Sb(c, b);
  if (d) {
    throw new N(d);
  }
  if (!c.h.symlink) {
    throw new N(63);
  }
  c.h.symlink(c, b, a);
}
function Nb(a) {
  a = P(a).node;
  if (!a) {
    throw new N(44);
  }
  if (!a.h.readlink) {
    throw new N(28);
  }
  return lb(Ob(a.parent), a.h.readlink(a));
}
function Zb(a, b, c) {
  if ("" === a) {
    throw new N(44);
  }
  if ("string" == typeof b) {
    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090,}[b];
    if ("undefined" == typeof d) {
      throw Error(`Unknown file open mode: ${b}`);
    }
    b = d;
  }
  c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    var e = a;
  } else {
    a = gb(a);
    try {
      e = P(a, {$:!(b & 131072)}).node;
    } catch (f) {
    }
  }
  d = !1;
  if (b & 64) {
    if (e) {
      if (b & 128) {
        throw new N(20);
      }
    } else {
      e = Wb(a, c, 0), d = !0;
    }
  }
  if (!e) {
    throw new N(44);
  }
  8192 === (e.mode & 61440) && (b &= -513);
  if (b & 65536 && 16384 !== (e.mode & 61440)) {
    throw new N(54);
  }
  if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Rb(b) || b & 512) ? 31 : Qb(e, Rb(b)) : 44)) {
    throw new N(c);
  }
  if (b & 512 && !d) {
    c = e;
    c = "string" == typeof c ? P(c, {$:!0}).node : c;
    if (!c.h.H) {
      throw new N(63);
    }
    if (16384 === (c.mode & 61440)) {
      throw new N(31);
    }
    if (32768 !== (c.mode & 61440)) {
      throw new N(28);
    }
    if (d = Qb(c, "w")) {
      throw new N(d);
    }
    c.h.H(c, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  e = Tb({node:e, path:Ob(e), flags:b, seekable:!0, position:0, i:e.i, La:[], error:!1});
  e.i.open && e.i.open(e);
  !l.logReadFiles || b & 1 || ($b ||= {}, a in $b || ($b[a] = 1));
  return e;
}
function ac(a, b, c) {
  if (null === a.fd) {
    throw new N(8);
  }
  if (!a.seekable || !a.i.L) {
    throw new N(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new N(28);
  }
  a.position = a.i.L(a, b, c);
  a.La = [];
}
var bc;
function cc(a, b, c) {
  a = gb("/dev/" + a);
  var d = Bb(!!b, !!c);
  dc ||= 64;
  var e = dc++ << 8 | 0;
  rb(e, {open(f) {
    f.seekable = !1;
  }, close() {
    c?.buffer?.length && c(10);
  }, read(f, g, h, m) {
    for (var k = 0, n = 0; n < m; n++) {
      try {
        var v = b();
      } catch (x) {
        throw new N(29);
      }
      if (void 0 === v && 0 === k) {
        throw new N(6);
      }
      if (null === v || void 0 === v) {
        break;
      }
      k++;
      g[h + n] = v;
    }
    k && (f.node.timestamp = Date.now());
    return k;
  }, write(f, g, h, m) {
    for (var k = 0; k < m; k++) {
      try {
        c(g[h + k]);
      } catch (n) {
        throw new N(29);
      }
    }
    m && (f.node.timestamp = Date.now());
    return k;
  }});
  Xb(a, d, e);
}
var dc, S = {}, $b, eb = void 0, ec = {}, fc = a => {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
};
function gc(a) {
  return this.fromWireType(F[a >> 2]);
}
var hc = {}, ic = {}, jc = {}, kc, lc = (a, b, c) => {
  function d(h) {
    h = c(h);
    if (h.length !== a.length) {
      throw new kc("Mismatched type converter count");
    }
    for (var m = 0; m < a.length; ++m) {
      T(a[m], h[m]);
    }
  }
  a.forEach(function(h) {
    jc[h] = b;
  });
  var e = Array(b.length), f = [], g = 0;
  b.forEach((h, m) => {
    ic.hasOwnProperty(h) ? e[m] = ic[h] : (f.push(h), hc.hasOwnProperty(h) || (hc[h] = []), hc[h].push(() => {
      e[m] = ic[h];
      ++g;
      g === f.length && d(e);
    }));
  });
  0 === f.length && d(e);
}, mc, U = a => {
  for (var b = ""; y[a];) {
    b += mc[y[a++]];
  }
  return b;
}, V, nc = a => {
  throw new V(a);
};
function oc(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new V(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (ic.hasOwnProperty(a)) {
    if (c.Ba) {
      return;
    }
    throw new V(`Cannot register type '${d}' twice`);
  }
  ic[a] = b;
  delete jc[a];
  hc.hasOwnProperty(a) && (b = hc[a], delete hc[a], b.forEach(e => e()));
}
function T(a, b, c = {}) {
  if (!("argPackAdvance" in b)) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  return oc(a, b, c);
}
var pc = a => {
  throw new V(a.g.o.m.name + " instance already deleted");
}, qc = !1, rc = () => {
}, sc = (a, b, c) => {
  if (b === c) {
    return a;
  }
  if (void 0 === c.A) {
    return null;
  }
  a = sc(a, b, c.A);
  return null === a ? null : c.ua(a);
}, tc = {}, uc = [], vc = () => {
  for (; uc.length;) {
    var a = uc.pop();
    a.g.M = !1;
    a["delete"]();
  }
}, wc, xc = {}, yc = (a, b) => {
  if (void 0 === b) {
    throw new V("ptr should not be undefined");
  }
  for (; a.A;) {
    b = a.R(b), a = a.A;
  }
  return xc[b];
}, Ac = (a, b) => {
  if (!b.o || !b.l) {
    throw new kc("makeClassHandle requires ptr and ptrType");
  }
  if (!!b.B !== !!b.u) {
    throw new kc("Both smartPtrType and smartPtr must be specified");
  }
  b.count = {value:1};
  return zc(Object.create(a, {g:{value:b, writable:!0,},}));
};
function Bc(a) {
  function b() {
    return this.V ? Ac(this.m.N, {o:this.Ea, l:c, B:this, u:a,}) : Ac(this.m.N, {o:this, l:a,});
  }
  var c = this.xa(a);
  if (!c) {
    return this.ka(a), null;
  }
  var d = yc(this.m, c);
  if (void 0 !== d) {
    if (0 === d.g.count.value) {
      return d.g.l = c, d.g.u = a, d.clone();
    }
    d = d.clone();
    this.ka(a);
    return d;
  }
  d = this.m.wa(c);
  d = tc[d];
  if (!d) {
    return b.call(this);
  }
  d = this.U ? d.ta : d.pointerType;
  var e = sc(c, this.m, d.m);
  return null === e ? b.call(this) : this.V ? Ac(d.m.N, {o:d, l:e, B:this, u:a,}) : Ac(d.m.N, {o:d, l:e,});
}
var zc = a => {
  if ("undefined" === typeof FinalizationRegistry) {
    return zc = b => b, a;
  }
  qc = new FinalizationRegistry(b => {
    console.warn(b.oa.stack.replace(/^Error: /, ""));
    b = b.g;
    --b.count.value;
    0 === b.count.value && (b.u ? b.B.G(b.u) : b.o.m.G(b.l));
  });
  zc = b => {
    var c = b.g;
    if (c.u) {
      var d = {g:c};
      d.oa = Error(`Embind found a leaked C++ instance ${c.o.m.name} <${Ca(c.l)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\nMake sure to invoke .delete() manually once you're done with the instance instead.\nOriginally allocated");
      "captureStackTrace" in Error && Error.captureStackTrace(d.oa, Bc);
      qc.register(b, d, b);
    }
    return b;
  };
  rc = b => {
    qc.unregister(b);
  };
  return zc(a);
};
function Cc() {
}
var Dc = (a, b) => Object.defineProperty(b, "name", {value:a}), Ec = (a, b, c) => {
  if (void 0 === a[b].v) {
    var d = a[b];
    a[b] = function(...e) {
      if (!a[b].v.hasOwnProperty(e.length)) {
        throw new V(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].v})!`);
      }
      return a[b].v[e.length].apply(this, e);
    };
    a[b].v = [];
    a[b].v[d.S] = d;
  }
}, Fc = (a, b, c) => {
  if (l.hasOwnProperty(a)) {
    if (void 0 === c || void 0 !== l[a].v && void 0 !== l[a].v[c]) {
      throw new V(`Cannot register public name '${a}' twice`);
    }
    Ec(l, a, a);
    if (l.hasOwnProperty(c)) {
      throw new V(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
    }
    l[a].v[c] = b;
  } else {
    l[a] = b, void 0 !== c && (l[a].Xa = c);
  }
}, Gc = a => {
  if (void 0 === a) {
    return "_unknown";
  }
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? `_${a}` : a;
};
function Hc(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.constructor = b;
  this.N = c;
  this.G = d;
  this.A = e;
  this.wa = f;
  this.R = g;
  this.ua = h;
  this.Fa = [];
}
var Ic = (a, b, c) => {
  for (; b !== c;) {
    if (!b.R) {
      throw new V(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
    }
    a = b.R(a);
    b = b.A;
  }
  return a;
};
function Jc(a, b) {
  if (null === b) {
    if (this.ba) {
      throw new V(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new V(`Cannot pass "${Lc(b)}" as a ${this.name}`);
  }
  if (!b.g.l) {
    throw new V(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  return Ic(b.g.l, b.g.o.m, this.m);
}
function Mc(a, b) {
  if (null === b) {
    if (this.ba) {
      throw new V(`null is not a valid ${this.name}`);
    }
    if (this.V) {
      var c = this.ea();
      null !== a && a.push(this.G, c);
      return c;
    }
    return 0;
  }
  if (!b || !b.g) {
    throw new V(`Cannot pass "${Lc(b)}" as a ${this.name}`);
  }
  if (!b.g.l) {
    throw new V(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.U && b.g.o.U) {
    throw new V(`Cannot convert argument of type ${b.g.B ? b.g.B.name : b.g.o.name} to parameter type ${this.name}`);
  }
  c = Ic(b.g.l, b.g.o.m, this.m);
  if (this.V) {
    if (void 0 === b.g.u) {
      throw new V("Passing raw pointer to smart pointer is illegal");
    }
    switch(this.Ka) {
      case 0:
        if (b.g.B === this) {
          c = b.g.u;
        } else {
          throw new V(`Cannot convert argument of type ${b.g.B ? b.g.B.name : b.g.o.name} to parameter type ${this.name}`);
        }
        break;
      case 1:
        c = b.g.u;
        break;
      case 2:
        if (b.g.B === this) {
          c = b.g.u;
        } else {
          var d = b.clone();
          c = this.Ga(c, Nc(() => d["delete"]()));
          null !== a && a.push(this.G, c);
        }
        break;
      default:
        throw new V("Unsupporting sharing policy");
    }
  }
  return c;
}
function Oc(a, b) {
  if (null === b) {
    if (this.ba) {
      throw new V(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new V(`Cannot pass "${Lc(b)}" as a ${this.name}`);
  }
  if (!b.g.l) {
    throw new V(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (b.g.o.U) {
    throw new V(`Cannot convert argument of type ${b.g.o.name} to parameter type ${this.name}`);
  }
  return Ic(b.g.l, b.g.o.m, this.m);
}
function Pc(a, b, c, d, e, f, g, h, m, k, n) {
  this.name = a;
  this.m = b;
  this.ba = c;
  this.U = d;
  this.V = e;
  this.Ea = f;
  this.Ka = g;
  this.qa = h;
  this.ea = m;
  this.Ga = k;
  this.G = n;
  e || void 0 !== b.A ? this.toWireType = Mc : (this.toWireType = d ? Jc : Oc, this.C = null);
}
var Qc = (a, b, c) => {
  if (!l.hasOwnProperty(a)) {
    throw new kc("Replacing nonexistent public symbol");
  }
  void 0 !== l[a].v && void 0 !== c ? l[a].v[c] = b : (l[a] = b, l[a].S = c);
}, Rc = [], Sc, W = a => {
  var b = Rc[a];
  b || (a >= Rc.length && (Rc.length = a + 1), Rc[a] = b = Sc.get(a));
  r(Sc.get(a) == b, "JavaScript-side Wasm function table mirror is out of date!");
  return b;
}, Tc = (a, b, c = []) => {
  if (a.includes("j")) {
    return a = a.replace(/p/g, "i"), r("dynCall_" + a in l, `bad function pointer type - dynCall function not found for sig '${a}'`), c?.length ? r(c.length === a.substring(1).replace(/j/g, "--").length) : r(1 == a.length), (0,l["dynCall_" + a])(b, ...c);
  }
  r(W(b), `missing table entry in dynCall: ${b}`);
  return W(b)(...c);
}, Uc = (a, b) => {
  r(a.includes("j") || a.includes("p"), "getDynCaller should only be called with i64 sigs");
  return (...c) => Tc(a, b, c);
}, X = (a, b) => {
  a = U(a);
  var c = a.includes("j") ? Uc(a, b) : W(b);
  if ("function" != typeof c) {
    throw new V(`unknown function pointer with signature ${a}: ${b}`);
  }
  return c;
}, Vc, Xc = a => {
  a = Wc(a);
  var b = U(a);
  Y(a);
  return b;
}, Yc = (a, b) => {
  function c(f) {
    e[f] || ic[f] || (jc[f] ? jc[f].forEach(c) : (d.push(f), e[f] = !0));
  }
  var d = [], e = {};
  b.forEach(c);
  throw new Vc(`${a}: ` + d.map(Xc).join([", "]));
}, Zc = (a, b) => {
  for (var c = [], d = 0; d < a; d++) {
    c.push(F[b + 4 * d >> 2]);
  }
  return c;
};
function $c(a) {
  for (var b = 1; b < a.length; ++b) {
    if (null !== a[b] && void 0 === a[b].C) {
      return !0;
    }
  }
  return !1;
}
function ad(a) {
  var b = Function;
  if (!(b instanceof Function)) {
    throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
  }
  var c = Dc(b.name || "unknownFunctionName", function() {
  });
  c.prototype = b.prototype;
  c = new c();
  a = b.apply(c, a);
  return a instanceof Object ? a : c;
}
function bd(a, b, c, d, e, f) {
  var g = b.length;
  if (2 > g) {
    throw new V("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  r(!f, "Async bindings are only supported with JSPI.");
  var h = null !== b[1] && null !== c, m = $c(b);
  c = "void" !== b[0].name;
  d = [a, nc, d, e, fc, b[0], b[1]];
  for (e = 0; e < g - 2; ++e) {
    d.push(b[e + 2]);
  }
  if (!m) {
    for (e = h ? 1 : 2; e < b.length; ++e) {
      null !== b[e].C && d.push(b[e].C);
    }
  }
  m = $c(b);
  e = b.length;
  var k = "", n = "";
  for (g = 0; g < e - 2; ++g) {
    k += (0 !== g ? ", " : "") + "arg" + g, n += (0 !== g ? ", " : "") + "arg" + g + "Wired";
  }
  k = `
        return function (${k}) {
        if (arguments.length !== ${e - 2}) {
          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${e - 2}');
        }`;
  m && (k += "var destructors = [];\n");
  var v = m ? "destructors" : "null", x = "humanName throwBindingError invoker fn runDestructors retType classParam".split(" ");
  h && (k += "var thisWired = classParam['toWireType'](" + v + ", this);\n");
  for (g = 0; g < e - 2; ++g) {
    k += "var arg" + g + "Wired = argType" + g + "['toWireType'](" + v + ", arg" + g + ");\n", x.push("argType" + g);
  }
  h && (n = "thisWired" + (0 < n.length ? ", " : "") + n);
  k += (c || f ? "var rv = " : "") + "invoker(fn" + (0 < n.length ? ", " : "") + n + ");\n";
  if (m) {
    k += "runDestructors(destructors);\n";
  } else {
    for (g = h ? 1 : 2; g < b.length; ++g) {
      f = 1 === g ? "thisWired" : "arg" + (g - 2) + "Wired", null !== b[g].C && (k += `${f}_dtor(${f});\n`, x.push(`${f}_dtor`));
    }
  }
  c && (k += "var ret = retType['fromWireType'](rv);\nreturn ret;\n");
  k = `if (arguments.length !== ${x.length}){ throw new Error(humanName + "Expected ${x.length} closure arguments " + arguments.length + " given."); }\n${k + "}\n"}`;
  let [B, z] = [x, k];
  B.push(z);
  b = ad(B)(...d);
  return Dc(a, b);
}
var cd = a => {
  a = a.trim();
  const b = a.indexOf("(");
  return -1 !== b ? (r(")" == a[a.length - 1], "Parentheses for argument names should match."), a.substr(0, b)) : a;
}, dd = [], Z = [], ed = a => {
  9 < a && 0 === --Z[a + 1] && (r(void 0 !== Z[a], "Decref for unallocated handle."), Z[a] = void 0, dd.push(a));
}, Nc = a => {
  switch(a) {
    case void 0:
      return 2;
    case null:
      return 4;
    case !0:
      return 6;
    case !1:
      return 8;
    default:
      const b = dd.pop() || Z.length;
      Z[b] = a;
      Z[b + 1] = 1;
      return b;
  }
}, fd = {name:"emscripten::val", fromWireType:a => {
  if (!a) {
    throw new V("Cannot use deleted val. handle = " + a);
  }
  r(2 === a || void 0 !== Z[a] && 0 === a % 2, `invalid handle: ${a}`);
  var b = Z[a];
  ed(a);
  return b;
}, toWireType:(a, b) => Nc(b), argPackAdvance:8, readValueFromPointer:gc, C:null,}, Lc = a => {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}, gd = (a, b) => {
  switch(b) {
    case 4:
      return function(c) {
        return this.fromWireType(wa[c >> 2]);
      };
    case 8:
      return function(c) {
        return this.fromWireType(xa[c >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${b}): ${a}`);
  }
}, hd = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => w[d] : d => y[d];
    case 2:
      return c ? d => ua[d >> 1] : d => va[d >> 1];
    case 4:
      return c ? d => C[d >> 2] : d => F[d >> 2];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
}, jd = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, kd = (a, b) => {
  r(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  var c = a >> 1;
  for (var d = c + b / 2; !(c >= d) && va[c];) {
    ++c;
  }
  c <<= 1;
  if (32 < c - a && jd) {
    return jd.decode(y.subarray(a, c));
  }
  c = "";
  for (d = 0; !(d >= b / 2); ++d) {
    var e = ua[a + 2 * d >> 1];
    if (0 == e) {
      break;
    }
    c += String.fromCharCode(e);
  }
  return c;
}, ld = (a, b, c) => {
  r(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  r("number" == typeof c, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (2 > c) {
    return 0;
  }
  c -= 2;
  var d = b;
  c = c < 2 * a.length ? c / 2 : a.length;
  for (var e = 0; e < c; ++e) {
    ua[b >> 1] = a.charCodeAt(e), b += 2;
  }
  ua[b >> 1] = 0;
  return b - d;
}, md = a => 2 * a.length, nd = (a, b) => {
  r(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  for (var c = 0, d = ""; !(c >= b / 4);) {
    var e = C[a + 4 * c >> 2];
    if (0 == e) {
      break;
    }
    ++c;
    65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
  }
  return d;
}, od = (a, b, c) => {
  r(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  r("number" == typeof c, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var f = a.charCodeAt(e);
    if (55296 <= f && 57343 >= f) {
      var g = a.charCodeAt(++e);
      f = 65536 + ((f & 1023) << 10) | g & 1023;
    }
    C[b >> 2] = f;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  C[b >> 2] = 0;
  return b - d;
}, pd = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && ++c;
    b += 4;
  }
  return b;
}, qd = (a, b) => {
  r(a == a >>> 0 || a == (a | 0));
  r(b === (b | 0));
  return b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN;
}, rd = {}, td = () => {
  if (!sd) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:ja || "./this.program"}, b;
    for (b in rd) {
      void 0 === rd[b] ? delete a[b] : a[b] = rd[b];
    }
    var c = [];
    for (b in a) {
      c.push(`${b}=${a[b]}`);
    }
    sd = c;
  }
  return sd;
}, sd;
[44].forEach(a => {
  yb[a] = new N(a);
  yb[a].stack = "<generic error, no stack>";
});
Ib = Array(4096);
Vb(O, "/");
R("/tmp");
R("/home");
R("/home/web_user");
(function() {
  R("/dev");
  rb(259, {read:() => 0, write:(d, e, f, g) => g,});
  Xb("/dev/null", 259);
  qb(1280, tb);
  qb(1536, ub);
  Xb("/dev/tty", 1280);
  Xb("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (b = kb(a).byteLength);
    return a[--b];
  };
  cc("random", c);
  cc("urandom", c);
  R("/dev/shm");
  R("/dev/shm/tmp");
})();
(function() {
  R("/proc");
  var a = R("/proc/self");
  R("/proc/self/fd");
  Vb({J() {
    var b = xb(a, "fd", 16895, 73);
    b.h = {lookup(c, d) {
      var e = Q(+d);
      c = {parent:null, J:{pa:"fake"}, h:{readlink:() => e.path},};
      return c.parent = c;
    }};
    return b;
  }}, "/proc/self/fd");
})();
kc = l.InternalError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
};
for (var ud = Array(256), vd = 0; 256 > vd; ++vd) {
  ud[vd] = String.fromCharCode(vd);
}
mc = ud;
V = l.BindingError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
};
Object.assign(Cc.prototype, {isAliasOf:function(a) {
  if (!(this instanceof Cc && a instanceof Cc)) {
    return !1;
  }
  var b = this.g.o.m, c = this.g.l;
  a.g = a.g;
  var d = a.g.o.m;
  for (a = a.g.l; b.A;) {
    c = b.R(c), b = b.A;
  }
  for (; d.A;) {
    a = d.R(a), d = d.A;
  }
  return b === d && c === a;
}, clone:function() {
  this.g.l || pc(this);
  if (this.g.P) {
    return this.g.count.value += 1, this;
  }
  var a = zc, b = Object, c = b.create, d = Object.getPrototypeOf(this), e = this.g;
  a = a(c.call(b, d, {g:{value:{count:e.count, M:e.M, P:e.P, l:e.l, o:e.o, u:e.u, B:e.B,},}}));
  a.g.count.value += 1;
  a.g.M = !1;
  return a;
}, ["delete"]() {
  this.g.l || pc(this);
  if (this.g.M && !this.g.P) {
    throw new V("Object already scheduled for deletion");
  }
  rc(this);
  var a = this.g;
  --a.count.value;
  0 === a.count.value && (a.u ? a.B.G(a.u) : a.o.m.G(a.l));
  this.g.P || (this.g.u = void 0, this.g.l = void 0);
}, isDeleted:function() {
  return !this.g.l;
}, deleteLater:function() {
  this.g.l || pc(this);
  if (this.g.M && !this.g.P) {
    throw new V("Object already scheduled for deletion");
  }
  uc.push(this);
  1 === uc.length && wc && wc(vc);
  this.g.M = !0;
  return this;
},});
l.getInheritedInstanceCount = () => Object.keys(xc).length;
l.getLiveInheritedInstances = () => {
  var a = [], b;
  for (b in xc) {
    xc.hasOwnProperty(b) && a.push(xc[b]);
  }
  return a;
};
l.flushPendingDeletes = vc;
l.setDelayFunction = a => {
  wc = a;
  uc.length && wc && wc(vc);
};
Object.assign(Pc.prototype, {xa(a) {
  this.qa && (a = this.qa(a));
  return a;
}, ka(a) {
  this.G?.(a);
}, argPackAdvance:8, readValueFromPointer:gc, fromWireType:Bc,});
Vc = l.UnboundTypeError = ((a, b) => {
  var c = Dc(b, function(d) {
    this.name = b;
    this.message = d;
    d = Error(d).stack;
    void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
  });
  c.prototype = Object.create(a.prototype);
  c.prototype.constructor = c;
  c.prototype.toString = function() {
    return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
  };
  return c;
})(Error, "UnboundTypeError");
Z.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1,);
r(10 === Z.length);
l.count_emval_handles = () => Z.length / 2 - 5 - dd.length;
var Cd = {__assert_fail:(a, b, c, d) => {
  p(`Assertion failed: ${ab(a)}, at: ` + [b ? ab(b) : "unknown filename", c, d ? ab(d) : "unknown function"]);
}, __cxa_throw:(a, b, c) => {
  a = new bb(a);
  F[a.l + 16 >> 2] = 0;
  F[a.l + 4 >> 2] = b;
  F[a.l + 8 >> 2] = c;
  cb++;
  r(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, __syscall_fcntl64:function(a, b, c) {
  eb = c;
  try {
    var d = Q(a);
    switch(b) {
      case 0:
        var e = db();
        if (0 > e) {
          break;
        }
        for (; Gb[e];) {
          e++;
        }
        return Ub(d, e).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = db(), d.flags |= e, 0;
      case 12:
        return e = db(), ua[e + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch (f) {
    if ("undefined" == typeof S || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.I;
  }
}, __syscall_fstat64:function(a, b) {
  try {
    var c = Q(a), d = P(c.path, {$:!0}).node;
    if (!d) {
      throw new N(44);
    }
    if (!d.h.D) {
      throw new N(63);
    }
    var e = d.h.D(d);
    C[b >> 2] = e.dev;
    C[b + 4 >> 2] = e.mode;
    F[b + 8 >> 2] = e.nlink;
    C[b + 12 >> 2] = e.uid;
    C[b + 16 >> 2] = e.gid;
    C[b + 20 >> 2] = e.rdev;
    K = [e.size >>> 0, (J = e.size, 1.0 <= +Math.abs(J) ? 0.0 < J ? +Math.floor(J / 4294967296.0) >>> 0 : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 24 >> 2] = K[0];
    C[b + 28 >> 2] = K[1];
    C[b + 32 >> 2] = 4096;
    C[b + 36 >> 2] = e.blocks;
    var f = e.atime.getTime(), g = e.mtime.getTime(), h = e.ctime.getTime();
    K = [Math.floor(f / 1000) >>> 0, (J = Math.floor(f / 1000), 1.0 <= +Math.abs(J) ? 0.0 < J ? +Math.floor(J / 4294967296.0) >>> 0 : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 40 >> 2] = K[0];
    C[b + 44 >> 2] = K[1];
    F[b + 48 >> 2] = f % 1000 * 1000;
    K = [Math.floor(g / 1000) >>> 0, (J = Math.floor(g / 1000), 1.0 <= +Math.abs(J) ? 0.0 < J ? +Math.floor(J / 4294967296.0) >>> 0 : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 56 >> 2] = K[0];
    C[b + 60 >> 2] = K[1];
    F[b + 64 >> 2] = g % 1000 * 1000;
    K = [Math.floor(h / 1000) >>> 0, (J = Math.floor(h / 1000), 1.0 <= +Math.abs(J) ? 0.0 < J ? +Math.floor(J / 4294967296.0) >>> 0 : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 72 >> 2] = K[0];
    C[b + 76 >> 2] = K[1];
    F[b + 80 >> 2] = h % 1000 * 1000;
    K = [e.ino >>> 0, (J = e.ino, 1.0 <= +Math.abs(J) ? 0.0 < J ? +Math.floor(J / 4294967296.0) >>> 0 : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 88 >> 2] = K[0];
    C[b + 92 >> 2] = K[1];
    return 0;
  } catch (m) {
    if ("undefined" == typeof S || "ErrnoError" !== m.name) {
      throw m;
    }
    return -m.I;
  }
}, __syscall_openat:function(a, b, c, d) {
  eb = d;
  try {
    b = ab(b);
    var e = b;
    if ("/" === e.charAt(0)) {
      b = e;
    } else {
      var f = -100 === a ? "/" : Q(a).path;
      if (0 == e.length) {
        throw new N(44);
      }
      b = gb(f + "/" + e);
    }
    var g = d ? db() : 0;
    return Zb(b, c, g).fd;
  } catch (h) {
    if ("undefined" == typeof S || "ErrnoError" !== h.name) {
      throw h;
    }
    return -h.I;
  }
}, _abort_js:() => {
  p("native code called abort()");
}, _embind_finalize_value_object:a => {
  var b = ec[a];
  delete ec[a];
  var c = b.ea, d = b.G, e = b.la, f = e.map(g => g.Aa).concat(e.map(g => g.Ia));
  lc([a], f, g => {
    var h = {};
    e.forEach((m, k) => {
      var n = g[k], v = m.ya, x = m.za, B = g[k + e.length], z = m.Ha, D = m.Ja;
      h[m.va] = {read:E => n.fromWireType(v(x, E)), write:(E, M) => {
        var A = [];
        z(D, E, B.toWireType(A, M));
        fc(A);
      }};
    });
    return [{name:b.name, fromWireType:m => {
      var k = {}, n;
      for (n in h) {
        k[n] = h[n].read(m);
      }
      d(m);
      return k;
    }, toWireType:(m, k) => {
      for (var n in h) {
        if (!(n in k)) {
          throw new TypeError(`Missing field: "${n}"`);
        }
      }
      var v = c();
      for (n in h) {
        h[n].write(v, k[n]);
      }
      null !== m && m.push(d, v);
      return v;
    }, argPackAdvance:8, readValueFromPointer:gc, C:d,}];
  });
}, _embind_register_bigint:() => {
}, _embind_register_bool:(a, b, c, d) => {
  b = U(b);
  T(a, {name:b, fromWireType:function(e) {
    return !!e;
  }, toWireType:function(e, f) {
    return f ? c : d;
  }, argPackAdvance:8, readValueFromPointer:function(e) {
    return this.fromWireType(y[e]);
  }, C:null,});
}, _embind_register_class:(a, b, c, d, e, f, g, h, m, k, n, v, x) => {
  n = U(n);
  f = X(e, f);
  h &&= X(g, h);
  k &&= X(m, k);
  x = X(v, x);
  var B = Gc(n);
  Fc(B, function() {
    Yc(`Cannot construct ${n} due to unbound types`, [d]);
  });
  lc([a, b, c], d ? [d] : [], z => {
    z = z[0];
    if (d) {
      var D = z.m;
      var E = D.N;
    } else {
      E = Cc.prototype;
    }
    z = Dc(n, function(...Cb) {
      if (Object.getPrototypeOf(this) !== M) {
        throw new V("Use 'new' to construct " + n);
      }
      if (void 0 === A.K) {
        throw new V(n + " has no accessible constructor");
      }
      var Kc = A.K[Cb.length];
      if (void 0 === Kc) {
        throw new V(`Tried to invoke ctor of ${n} with invalid number of parameters (${Cb.length}) - expected (${Object.keys(A.K).toString()}) parameters instead!`);
      }
      return Kc.apply(this, Cb);
    });
    var M = Object.create(E, {constructor:{value:z},});
    z.prototype = M;
    var A = new Hc(n, z, M, x, D, f, h, k);
    if (A.A) {
      var Fa;
      (Fa = A.A).ha ?? (Fa.ha = []);
      A.A.ha.push(A);
    }
    D = new Pc(n, A, !0, !1, !1);
    Fa = new Pc(n + "*", A, !1, !1, !1);
    E = new Pc(n + " const*", A, !1, !0, !1);
    tc[a] = {pointerType:Fa, ta:E};
    Qc(B, z);
    return [D, Fa, E];
  });
}, _embind_register_class_constructor:(a, b, c, d, e, f) => {
  r(0 < b);
  var g = Zc(b, c);
  e = X(d, e);
  lc([], [a], h => {
    h = h[0];
    var m = `constructor ${h.name}`;
    void 0 === h.m.K && (h.m.K = []);
    if (void 0 !== h.m.K[b - 1]) {
      throw new V(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${h.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    h.m.K[b - 1] = () => {
      Yc(`Cannot construct ${h.name} due to unbound types`, g);
    };
    lc([], g, k => {
      k.splice(1, 0, null);
      h.m.K[b - 1] = bd(m, k, null, e, f);
      return [];
    });
    return [];
  });
}, _embind_register_class_function:(a, b, c, d, e, f, g, h, m) => {
  var k = Zc(c, d);
  b = U(b);
  b = cd(b);
  f = X(e, f);
  lc([], [a], n => {
    function v() {
      Yc(`Cannot call ${x} due to unbound types`, k);
    }
    n = n[0];
    var x = `${n.name}.${b}`;
    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
    h && n.m.Fa.push(b);
    var B = n.m.N, z = B[b];
    void 0 === z || void 0 === z.v && z.className !== n.name && z.S === c - 2 ? (v.S = c - 2, v.className = n.name, B[b] = v) : (Ec(B, b, x), B[b].v[c - 2] = v);
    lc([], k, D => {
      D = bd(x, D, n, f, g, m);
      void 0 === B[b].v ? (D.S = c - 2, B[b] = D) : B[b].v[c - 2] = D;
      return [];
    });
    return [];
  });
}, _embind_register_emval:a => T(a, fd), _embind_register_float:(a, b, c) => {
  b = U(b);
  T(a, {name:b, fromWireType:d => d, toWireType:(d, e) => {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${Lc(e)} to ${this.name}`);
    }
    return e;
  }, argPackAdvance:8, readValueFromPointer:gd(b, c), C:null,});
}, _embind_register_function:(a, b, c, d, e, f, g) => {
  var h = Zc(b, c);
  a = U(a);
  a = cd(a);
  e = X(d, e);
  Fc(a, function() {
    Yc(`Cannot call ${a} due to unbound types`, h);
  }, b - 1);
  lc([], h, m => {
    m = [m[0], null].concat(m.slice(1));
    Qc(a, bd(a, m, null, e, f, g), b - 1);
    return [];
  });
}, _embind_register_integer:(a, b, c, d, e) => {
  b = U(b);
  -1 === e && (e = 4294967295);
  var f = k => k;
  if (0 === d) {
    var g = 32 - 8 * c;
    f = k => k << g >>> g;
  }
  var h = (k, n) => {
    if ("number" != typeof k && "boolean" != typeof k) {
      throw new TypeError(`Cannot convert "${Lc(k)}" to ${n}`);
    }
    if (k < d || k > e) {
      throw new TypeError(`Passing a number "${Lc(k)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
    }
  };
  var m = b.includes("unsigned") ? function(k, n) {
    h(n, this.name);
    return n >>> 0;
  } : function(k, n) {
    h(n, this.name);
    return n;
  };
  T(a, {name:b, fromWireType:f, toWireType:m, argPackAdvance:8, readValueFromPointer:hd(b, c, 0 !== d), C:null,});
}, _embind_register_memory_view:(a, b, c) => {
  function d(f) {
    return new e(w.buffer, F[f + 4 >> 2], F[f >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,][b];
  c = U(c);
  T(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d,}, {Ba:!0,});
}, _embind_register_optional:a => {
  T(a, fd);
}, _embind_register_std_string:(a, b) => {
  b = U(b);
  var c = "std::string" === b;
  T(a, {name:b, fromWireType:function(d) {
    var e = F[d >> 2], f = d + 4;
    if (c) {
      for (var g = f, h = 0; h <= e; ++h) {
        var m = f + h;
        if (h == e || 0 == y[m]) {
          g = ab(g, m - g);
          if (void 0 === k) {
            var k = g;
          } else {
            k += String.fromCharCode(0), k += g;
          }
          g = m + 1;
        }
      }
    } else {
      k = Array(e);
      for (h = 0; h < e; ++h) {
        k[h] = String.fromCharCode(y[f + h]);
      }
      k = k.join("");
    }
    Y(d);
    return k;
  }, toWireType:function(d, e) {
    e instanceof ArrayBuffer && (e = new Uint8Array(e));
    var f = "string" == typeof e;
    if (!(f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array)) {
      throw new V("Cannot pass non-string to std::string");
    }
    var g = c && f ? nb(e) : e.length;
    var h = wd(4 + g + 1), m = h + 4;
    F[h >> 2] = g;
    if (c && f) {
      g += 1, r("number" == typeof g, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), ob(e, y, m, g);
    } else {
      if (f) {
        for (f = 0; f < g; ++f) {
          var k = e.charCodeAt(f);
          if (255 < k) {
            throw Y(m), new V("String has UTF-16 code units that do not fit in 8 bits");
          }
          y[m + f] = k;
        }
      } else {
        for (f = 0; f < g; ++f) {
          y[m + f] = e[f];
        }
      }
    }
    null !== d && d.push(Y, h);
    return h;
  }, argPackAdvance:8, readValueFromPointer:gc, C(d) {
    Y(d);
  },});
}, _embind_register_std_wstring:(a, b, c) => {
  c = U(c);
  if (2 === b) {
    var d = kd;
    var e = ld;
    var f = md;
    var g = h => va[h >> 1];
  } else {
    4 === b && (d = nd, e = od, f = pd, g = h => F[h >> 2]);
  }
  T(a, {name:c, fromWireType:h => {
    for (var m = F[h >> 2], k, n = h + 4, v = 0; v <= m; ++v) {
      var x = h + 4 + v * b;
      if (v == m || 0 == g(x)) {
        n = d(n, x - n), void 0 === k ? k = n : (k += String.fromCharCode(0), k += n), n = x + b;
      }
    }
    Y(h);
    return k;
  }, toWireType:(h, m) => {
    if ("string" != typeof m) {
      throw new V(`Cannot pass non-string to C++ string type ${c}`);
    }
    var k = f(m), n = wd(4 + k + b);
    F[n >> 2] = k / b;
    e(m, n + 4, k + b);
    null !== h && h.push(Y, n);
    return n;
  }, argPackAdvance:8, readValueFromPointer:gc, C(h) {
    Y(h);
  }});
}, _embind_register_value_object:(a, b, c, d, e, f) => {
  ec[a] = {name:U(b), ea:X(c, d), G:X(e, f), la:[],};
}, _embind_register_value_object_field:(a, b, c, d, e, f, g, h, m, k) => {
  ec[a].la.push({va:U(b), Aa:c, ya:X(d, e), za:f, Ia:g, Ha:X(h, m), Ja:k,});
}, _embind_register_void:(a, b) => {
  b = U(b);
  T(a, {Wa:!0, name:b, argPackAdvance:0, fromWireType:() => {
  }, toWireType:() => {
  },});
}, _emscripten_memcpy_js:(a, b, c) => y.copyWithin(a, b, b + c), _emscripten_throw_longjmp:() => {
  throw Infinity;
}, _emval_decref:ed, _emval_take_value:(a, b) => {
  var c = ic[a];
  if (void 0 === c) {
    throw a = `${"_emval_take_value"} has unknown type ${Xc(a)}`, new V(a);
  }
  a = c;
  a = a.readValueFromPointer(b);
  return Nc(a);
}, _mmap_js:function(a, b, c, d, e, f, g, h) {
  e = qd(e, f);
  try {
    if (isNaN(e)) {
      return 61;
    }
    var m = Q(d);
    if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (m.flags & 2097155)) {
      throw new N(2);
    }
    if (1 === (m.flags & 2097155)) {
      throw new N(2);
    }
    if (!m.i.X) {
      throw new N(43);
    }
    var k = m.i.X(m, a, e, b, c);
    var n = k.l;
    C[g >> 2] = k.ra;
    F[h >> 2] = n;
    return 0;
  } catch (v) {
    if ("undefined" == typeof S || "ErrnoError" !== v.name) {
      throw v;
    }
    return -v.I;
  }
}, _munmap_js:function(a, b, c, d, e, f, g) {
  f = qd(f, g);
  try {
    var h = Q(e);
    if (c & 2) {
      if (32768 !== (h.node.mode & 61440)) {
        throw new N(43);
      }
      if (!(d & 2)) {
        var m = y.slice(a, a + b);
        r(0 <= f);
        h.i.Z && h.i.Z(h, m, f, b, d);
      }
    }
  } catch (k) {
    if ("undefined" == typeof S || "ErrnoError" !== k.name) {
      throw k;
    }
    return -k.I;
  }
}, emscripten_resize_heap:a => {
  var b = y.length;
  a >>>= 0;
  r(a > b);
  if (2147483648 < a) {
    return t(`Cannot enlarge memory, requested ${a} bytes, but the limit is ${2147483648} bytes!`), !1;
  }
  for (var c = 1; 4 >= c; c *= 2) {
    var d = b * (1 + 0.2 / c);
    d = Math.min(d, a + 100663296);
    var e = Math;
    d = Math.max(a, d);
    e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536);
    a: {
      d = e;
      var f = sa.buffer, g = (d - f.byteLength + 65535) / 65536;
      try {
        sa.grow(g);
        ya();
        var h = 1;
        break a;
      } catch (m) {
        t(`growMemory: Attempted to grow heap from ${f.byteLength} bytes to ${d} bytes, but got error: ${m}`);
      }
      h = void 0;
    }
    if (h) {
      return !0;
    }
  }
  t(`Failed to grow the heap from ${b} bytes to ${e} bytes, not enough memory!`);
  return !1;
}, environ_get:(a, b) => {
  var c = 0;
  td().forEach((d, e) => {
    var f = b + c;
    e = F[a + 4 * e >> 2] = f;
    for (f = 0; f < d.length; ++f) {
      r(d.charCodeAt(f) === (d.charCodeAt(f) & 255)), w[e++] = d.charCodeAt(f);
    }
    w[e] = 0;
    c += d.length + 1;
  });
  return 0;
}, environ_sizes_get:(a, b) => {
  var c = td();
  F[a >> 2] = c.length;
  var d = 0;
  c.forEach(e => d += e.length + 1);
  F[b >> 2] = d;
  return 0;
}, fd_close:function(a) {
  try {
    var b = Q(a);
    if (null === b.fd) {
      throw new N(8);
    }
    b.aa && (b.aa = null);
    try {
      b.i.close && b.i.close(b);
    } catch (c) {
      throw c;
    } finally {
      Gb[b.fd] = null;
    }
    b.fd = null;
    return 0;
  } catch (c) {
    if ("undefined" == typeof S || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.I;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = Q(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var h = F[a >> 2], m = F[a + 4 >> 2];
        a += 8;
        var k = e, n = h, v = m, x = f, B = w;
        r(0 <= n);
        if (0 > v || 0 > x) {
          throw new N(28);
        }
        if (null === k.fd) {
          throw new N(8);
        }
        if (1 === (k.flags & 2097155)) {
          throw new N(8);
        }
        if (16384 === (k.node.mode & 61440)) {
          throw new N(31);
        }
        if (!k.i.read) {
          throw new N(28);
        }
        var z = "undefined" != typeof x;
        if (!z) {
          x = k.position;
        } else if (!k.seekable) {
          throw new N(70);
        }
        var D = k.i.read(k, B, n, v, x);
        z || (k.position += D);
        var E = D;
        if (0 > E) {
          var M = -1;
          break a;
        }
        b += E;
        if (E < m) {
          break;
        }
        "undefined" != typeof f && (f += E);
      }
      M = b;
    }
    F[d >> 2] = M;
    return 0;
  } catch (A) {
    if ("undefined" == typeof S || "ErrnoError" !== A.name) {
      throw A;
    }
    return A.I;
  }
}, fd_seek:function(a, b, c, d, e) {
  b = qd(b, c);
  try {
    if (isNaN(b)) {
      return 61;
    }
    var f = Q(a);
    ac(f, b, d);
    K = [f.position >>> 0, (J = f.position, 1.0 <= +Math.abs(J) ? 0.0 < J ? +Math.floor(J / 4294967296.0) >>> 0 : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[e >> 2] = K[0];
    C[e + 4 >> 2] = K[1];
    f.aa && 0 === b && 0 === d && (f.aa = null);
    return 0;
  } catch (g) {
    if ("undefined" == typeof S || "ErrnoError" !== g.name) {
      throw g;
    }
    return g.I;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = Q(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var h = F[a >> 2], m = F[a + 4 >> 2];
        a += 8;
        var k = e, n = h, v = m, x = f, B = w;
        r(0 <= n);
        if (0 > v || 0 > x) {
          throw new N(28);
        }
        if (null === k.fd) {
          throw new N(8);
        }
        if (0 === (k.flags & 2097155)) {
          throw new N(8);
        }
        if (16384 === (k.node.mode & 61440)) {
          throw new N(31);
        }
        if (!k.i.write) {
          throw new N(28);
        }
        k.seekable && k.flags & 1024 && ac(k, 0, 2);
        var z = "undefined" != typeof x;
        if (!z) {
          x = k.position;
        } else if (!k.seekable) {
          throw new N(70);
        }
        var D = k.i.write(k, B, n, v, x, void 0);
        z || (k.position += D);
        var E = D;
        if (0 > E) {
          var M = -1;
          break a;
        }
        b += E;
        "undefined" != typeof f && (f += E);
      }
      M = b;
    }
    F[d >> 2] = M;
    return 0;
  } catch (A) {
    if ("undefined" == typeof S || "ErrnoError" !== A.name) {
      throw A;
    }
    return A.I;
  }
}, invoke_iii:xd, invoke_iiii:yd, invoke_iiiii:zd, invoke_v:Ad, invoke_viiii:Bd}, I = function() {
  function a(d) {
    I = d.exports;
    sa = I.memory;
    r(sa, "memory not found in wasm exports");
    ya();
    Sc = I.__indirect_function_table;
    r(Sc, "table not found in wasm exports");
    Ha.unshift(I.__wasm_call_ctors);
    G--;
    l.monitorRunDependencies?.(G);
    r(Ma["wasm-instantiate"]);
    delete Ma["wasm-instantiate"];
    0 == G && (null !== H && (clearInterval(H), H = null), La && (d = La, La = null, d()));
    return I;
  }
  var b = {env:Cd, wasi_snapshot_preview1:Cd,};
  Na();
  var c = l;
  if (l.instantiateWasm) {
    try {
      return l.instantiateWasm(b, a);
    } catch (d) {
      t(`Module.instantiateWasm callback failed with error: ${d}`), ba(d);
    }
  }
  Qa ||= Oa("wasm_app.wasm") ? "wasm_app.wasm" : l.locateFile ? l.locateFile("wasm_app.wasm", q) : q + "wasm_app.wasm";
  Ua(b, function(d) {
    r(l === c, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    c = null;
    a(d.instance);
  }).catch(ba);
  return {};
}(), Wc = Pa("__getTypeName", 1), wd = l._malloc = Pa("malloc", 1), Y = l._free = Pa("free", 1), Ab = Pa("emscripten_builtin_memalign", 2), Kb = Pa("strerror", 1), Dd = Pa("setThrew", 2), Ed = () => (Ed = I.emscripten_stack_init)(), Aa = () => (Aa = I.emscripten_stack_get_end)(), Fd = a => (Fd = I._emscripten_stack_restore)(a), Gd = () => (Gd = I.emscripten_stack_get_current)();
l.dynCall_jiji = Pa("dynCall_jiji", 5);
function Bd(a, b, c, d, e) {
  var f = Gd();
  try {
    W(a)(b, c, d, e);
  } catch (g) {
    Fd(f);
    if (g !== g + 0) {
      throw g;
    }
    Dd(1, 0);
  }
}
function xd(a, b, c) {
  var d = Gd();
  try {
    return W(a)(b, c);
  } catch (e) {
    Fd(d);
    if (e !== e + 0) {
      throw e;
    }
    Dd(1, 0);
  }
}
function zd(a, b, c, d, e) {
  var f = Gd();
  try {
    return W(a)(b, c, d, e);
  } catch (g) {
    Fd(f);
    if (g !== g + 0) {
      throw g;
    }
    Dd(1, 0);
  }
}
function Ad(a) {
  var b = Gd();
  try {
    W(a)();
  } catch (c) {
    Fd(b);
    if (c !== c + 0) {
      throw c;
    }
    Dd(1, 0);
  }
}
function yd(a, b, c, d) {
  var e = Gd();
  try {
    return W(a)(b, c, d);
  } catch (f) {
    Fd(e);
    if (f !== f + 0) {
      throw f;
    }
    Dd(1, 0);
  }
}
"writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertU32PairToI53 stackAlloc getTempRet0 setTempRet0 exitJS isLeapYear ydayFromDate arraySum addDays inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr emscriptenLog readEmAsmArgs jstoi_q listenOnce autoResumeAudioContext handleException keepRuntimeAlive runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asmjsMangle HandleAllocator getNativeTypeSize STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS getCFunc ccall cwrap uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction reallyNegative unSign strLen reSign formatString intArrayToString AsciiToString stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory registerKeyEventCallback maybeCStringToJsString findEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace getCallstack convertPCtoSourceLocation checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags createDyncallWrapper safeSetTimeout setImmediateWrapped clearImmediateWrapped polyfillSetImmediate getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter setMainLoop getSocketFromFD getSocketAddress FS_unlink FS_mkdirTree _setNetworkCallback heapObjectForWebGLType toTypedArrayIndex webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory setErrNo demangle stackTrace getFunctionArgsName createJsInvokerSignature registerInheritedInstance unregisterInheritedInstance enumReadValueFromPointer validateThis getStringOrSymbol emval_get_global emval_returnValue emval_lookupTypes emval_addMethodCaller".split(" ").forEach(function(a) {
  "undefined" == typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get() {
    var b = `\`${a}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, c = a;
    c.startsWith("_") || (c = "$" + a);
    b += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${c}')`;
    Va(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    L(b);
  }});
  Xa(a);
});
"run addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency out err callMain abort wasmMemory wasmExports writeStackCookie checkStackCookie convertI32PairToI53Checked stackSave stackRestore ptrToString zeroMemory getHeapMax growMemory ENV MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE ERRNO_CODES strError DNS Protocols Sockets initRandomFill randomFill timers warnOnce readEmAsmArgsArray jstoi_s getExecutableName dynCallLegacy getDynCaller dynCall asyncLoad alignMemory mmapAlloc wasmTable noExitRuntime freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString stringToAscii UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 JSEvents specialHTMLTargets findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle UNWIND_CACHE ExitStatus getEnvStrings doReadv doWritev promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser getPreloadedImageData__data wget SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_createPath FS_createDevice FS_readFile FS FS_createDataFile FS_createLazyFile MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers GL AL GLUT EGL GLEW IDBStore SDL SDL_gfx allocateUTF8 allocateUTF8OnStack print printErr InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved embind_charCodes embind_init_charCodes readLatin1String getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack createJsInvoker UnboundTypeError PureVirtualError GenericWireTypeSize EmValType init_embind throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol extendError createNamedFunction embindRepr registeredInstances getBasestPointer getInheritedInstance getInheritedInstanceCount getLiveInheritedInstances registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer readPointer runDestructors newFunc craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle finalizationRegistry detachFinalizer_deps detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted deletionQueue flushPendingDeletes delayFunction setDelayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer char_0 char_9 makeLegalFunctionName emval_freelist emval_handles emval_symbols init_emval count_emval_handles Emval emval_methodCallers reflectConstruct".split(" ").forEach(Xa);
var Hd;
La = function Id() {
  Hd || Jd();
  Hd || (La = Id);
};
function Jd() {
  function a() {
    if (!Hd && (Hd = !0, l.calledRun = !0, !ta)) {
      r(!Ja);
      Ja = !0;
      Ba();
      if (!l.noFSInit && !bc) {
        r(!bc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        bc = !0;
        l.stdin = l.stdin;
        l.stdout = l.stdout;
        l.stderr = l.stderr;
        l.stdin ? cc("stdin", l.stdin) : Yb("/dev/tty", "/dev/stdin");
        l.stdout ? cc("stdout", null, l.stdout) : Yb("/dev/tty", "/dev/stdout");
        l.stderr ? cc("stderr", null, l.stderr) : Yb("/dev/tty1", "/dev/stderr");
        var b = Zb("/dev/stdin", 0), c = Zb("/dev/stdout", 1), d = Zb("/dev/stderr", 1);
        r(0 === b.fd, `invalid handle for stdin (${b.fd})`);
        r(1 === c.fd, `invalid handle for stdout (${c.fd})`);
        r(2 === d.fd, `invalid handle for stderr (${d.fd})`);
      }
      Jb = !1;
      Ya(Ha);
      aa(l);
      l.onRuntimeInitialized?.();
      r(!l._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      Ba();
      if (l.postRun) {
        for ("function" == typeof l.postRun && (l.postRun = [l.postRun]); l.postRun.length;) {
          b = l.postRun.shift(), Ia.unshift(b);
        }
      }
      Ya(Ia);
    }
  }
  if (!(0 < G)) {
    Ed();
    za();
    if (l.preRun) {
      for ("function" == typeof l.preRun && (l.preRun = [l.preRun]); l.preRun.length;) {
        Ka();
      }
    }
    Ya(Ga);
    0 < G || (l.setStatus ? (l.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        l.setStatus("");
      }, 1);
      a();
    }, 1)) : a(), Ba());
  }
}
if (l.preInit) {
  for ("function" == typeof l.preInit && (l.preInit = [l.preInit]); 0 < l.preInit.length;) {
    l.preInit.pop()();
  }
}
Jd();
moduleRtn = ca;
for (const a of Object.keys(l)) {
  a in moduleArg || Object.defineProperty(moduleArg, a, {configurable:!0, get() {
    p(`Access to module property ('${a}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
  }});
}
;


  return moduleRtn;
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Module;
else if (typeof define === 'function' && define['amd'])
  define([], () => Module);
export default Module;