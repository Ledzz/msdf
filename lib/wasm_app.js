
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
var v, y, ua, va, C, F, wa, xa;
function ya() {
  var a = sa.buffer;
  l.HEAP8 = v = new Int8Array(a);
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
var Fa = [], Ga = [], Ha = [], Ja = !1;
function Ka() {
  var a = l.preRun.shift();
  Fa.unshift(a);
}
r(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
r(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
r(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
r(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var G = 0, La = null, Ma = null, Na = {};
function Oa() {
  G++;
  l.monitorRunDependencies?.(G);
  r(!Na["wasm-instantiate"]);
  Na["wasm-instantiate"] = 1;
  null === La && "undefined" != typeof setInterval && (La = setInterval(() => {
    if (ta) {
      clearInterval(La), La = null;
    } else {
      var a = !1, b;
      for (b in Na) {
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
var Pa = a => a.startsWith("data:application/octet-stream;base64,"), pa = a => a.startsWith("file://");
function Qa(a, b) {
  return (...c) => {
    r(Ja, `native function \`${a}\` called before runtime initialization`);
    var d = H[a];
    r(d, `exported native function \`${a}\` not found`);
    r(c.length <= b, `native function \`${a}\` called with ${c.length} args but expects ${b}`);
    return d(...c);
  };
}
var Ra;
function Sa(a) {
  if (a == Ra && ra) {
    return new Uint8Array(ra);
  }
  if (la) {
    return la(a);
  }
  throw "both async and sync fetching of the wasm failed";
}
function Ta(a) {
  return ra ? Promise.resolve().then(() => Sa(a)) : ka(a).then(b => new Uint8Array(b), () => Sa(a));
}
function Ua(a, b, c) {
  return Ta(a).then(d => WebAssembly.instantiate(d, b)).then(c, d => {
    t(`failed to asynchronously prepare wasm: ${d}`);
    pa(Ra) && t(`warning: Loading from a file URI (${Ra}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    p(d);
  });
}
function Va(a, b) {
  var c = Ra;
  return ra || "function" != typeof WebAssembly.instantiateStreaming || Pa(c) || pa(c) || fa || "function" != typeof fetch ? Ua(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
    t(`wasm streaming compile failed: ${e}`);
    t("falling back to ArrayBuffer instantiation");
    return Ua(c, a, b);
  }));
}
var I, J;
function u(a, b) {
  Object.getOwnPropertyDescriptor(l, a) || Object.defineProperty(l, a, {configurable:!0, get() {
    p(`\`Module.${a}\` has been replaced by \`${b}\`` + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function Wa(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
function Xa(a, b) {
  "undefined" != typeof globalThis && Object.defineProperty(globalThis, a, {configurable:!0, get() {
    K(`\`${a}\` is not longer defined by emscripten. ${b}`);
  }});
}
Xa("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
Xa("asm", "Please use wasmExports instead");
function Ya(a) {
  Object.getOwnPropertyDescriptor(l, a) || Object.defineProperty(l, a, {configurable:!0, get() {
    var b = `'${a}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    Wa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    p(b);
  }});
}
var Za = a => {
  for (; 0 < a.length;) {
    a.shift()(l);
  }
}, Ca = a => {
  r("number" === typeof a);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, K = a => {
  K.ga || (K.ga = {});
  K.ga[a] || (K.ga[a] = 1, fa && (a = "warning: " + a), t(a));
}, $a = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, ab = (a, b, c) => {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.buffer && $a) {
    return $a.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | f << 6 | g : (240 != (e & 248) && K("Invalid UTF-8 leading byte " + Ca(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}, bb = (a, b) => {
  r("number" == typeof a, `UTF8ToString expects a number (got ${typeof a})`);
  return a ? ab(y, a, b) : "";
};
class cb {
  constructor(a) {
    this.l = a - 24;
  }
}
var db = 0;
function eb() {
  r(void 0 != fb);
  var a = C[+fb >> 2];
  fb += 4;
  return a;
}
var gb = (a, b) => {
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
}, hb = a => {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = gb(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, ib = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.substr(0, b.length - 1);
  return a + b;
}, jb = a => {
  if ("/" === a) {
    return "/";
  }
  a = hb(a);
  a = a.replace(/\/$/, "");
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
}, kb = () => {
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
}, lb = a => (lb = kb())(a), mb = (...a) => {
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
  b = gb(b.split("/").filter(e => !!e), !c).join("/");
  return (c ? "/" : "") + b || ".";
}, nb = [], ob = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, pb = (a, b, c, d) => {
  r("string" === typeof a, `stringToUTF8Array expects a string (got ${typeof a})`);
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var g = a.charCodeAt(f);
    if (55296 <= g && 57343 >= g) {
      var k = a.charCodeAt(++f);
      g = 65536 + ((g & 1023) << 10) | k & 1023;
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
          1114111 < g && K("Invalid Unicode code point " + Ca(g) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
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
}, qb = [];
function rb(a, b) {
  qb[a] = {input:[], output:[], O:b};
  sb(a, tb);
}
var tb = {open(a) {
  var b = qb[a.node.rdev];
  if (!b) {
    throw new L(43);
  }
  a.tty = b;
  a.seekable = !1;
}, close(a) {
  a.tty.O.fsync(a.tty);
}, fsync(a) {
  a.tty.O.fsync(a.tty);
}, read(a, b, c, d) {
  if (!a.tty || !a.tty.O.na) {
    throw new L(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.tty.O.na(a.tty);
    } catch (k) {
      throw new L(29);
    }
    if (void 0 === g && 0 === e) {
      throw new L(6);
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
    throw new L(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.tty.O.da(a.tty, b[c + e]);
    }
  } catch (f) {
    throw new L(29);
  }
  d && (a.node.timestamp = Date.now());
  return e;
},}, ub = {na() {
  a: {
    if (!nb.length) {
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
      b = Array(ob(a) + 1);
      a = pb(a, b, 0, b.length);
      b.length = a;
      nb = b;
    }
    a = nb.shift();
  }
  return a;
}, da(a, b) {
  null === b || 10 === b ? (qa(ab(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  a.output && 0 < a.output.length && (qa(ab(a.output, 0)), a.output = []);
}, Ua() {
  return {Pa:25856, Ra:5, Oa:191, Qa:35387, Na:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]};
}, Va() {
  return 0;
}, Wa() {
  return [24, 80];
},}, vb = {da(a, b) {
  null === b || 10 === b ? (t(ab(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  a.output && 0 < a.output.length && (t(ab(a.output, 0)), a.output = []);
},};
function wb(a, b) {
  var c = a.j ? a.j.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.j, a.j = new Uint8Array(b), 0 < a.s && a.j.set(c.subarray(0, a.s), 0));
}
var N = {F:null, J() {
  return N.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new L(63);
  }
  N.F || (N.F = {dir:{node:{D:N.h.D, H:N.h.H, lookup:N.h.lookup, W:N.h.W, rename:N.h.rename, unlink:N.h.unlink, rmdir:N.h.rmdir, readdir:N.h.readdir, symlink:N.h.symlink}, stream:{L:N.i.L}}, file:{node:{D:N.h.D, H:N.h.H}, stream:{L:N.i.L, read:N.i.read, write:N.i.write, ia:N.i.ia, X:N.i.X, Z:N.i.Z}}, link:{node:{D:N.h.D, H:N.h.H, readlink:N.h.readlink}, stream:{}}, ja:{node:{D:N.h.D, H:N.h.H}, stream:xb}});
  c = yb(a, b, c, d);
  16384 === (c.mode & 61440) ? (c.h = N.F.dir.node, c.i = N.F.dir.stream, c.j = {}) : 32768 === (c.mode & 61440) ? (c.h = N.F.file.node, c.i = N.F.file.stream, c.s = 0, c.j = null) : 40960 === (c.mode & 61440) ? (c.h = N.F.link.node, c.i = N.F.link.stream) : 8192 === (c.mode & 61440) && (c.h = N.F.ja.node, c.i = N.F.ja.stream);
  c.timestamp = Date.now();
  a && (a.j[b] = c, a.timestamp = c.timestamp);
  return c;
}, Ta(a) {
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
  throw zb[44];
}, W(a, b, c, d) {
  return N.createNode(a, b, c, d);
}, rename(a, b, c) {
  if (16384 === (a.mode & 61440)) {
    try {
      var d = Ab(b, c);
    } catch (f) {
    }
    if (d) {
      for (var e in d.j) {
        throw new L(55);
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
  var c = Ab(a, b), d;
  for (d in c.j) {
    throw new L(55);
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
  a = N.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new L(28);
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
  b.buffer === v.buffer && (f = !1);
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
  wb(a, e + d);
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
    throw new L(28);
  }
  return b;
}, ia(a, b, c) {
  wb(a.node, b + c);
  a.node.s = Math.max(a.node.s, b + c);
}, X(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new L(43);
  }
  a = a.node.j;
  if (e & 2 || a.buffer !== v.buffer) {
    if (0 < c || c + b < a.length) {
      a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
    }
    c = !0;
    r(65536, "alignment argument is required");
    b = 65536 * Math.ceil(b / 65536);
    (e = Bb(65536, b)) ? (y.fill(0, e, e + b), b = e) : b = 0;
    if (!b) {
      throw new L(48);
    }
    v.set(a, b);
  } else {
    c = !1, b = a.byteOffset;
  }
  return {l:b, ra:c};
}, Z(a, b, c, d) {
  N.i.write(a, b, 0, d, c, !1);
  return 0;
},},}, Cb = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, Db = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, 
EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, 
ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135,}, Eb = null, Fb = {}, Gb = [], Hb = 1, Jb = null, Kb = !0, L = class extends Error {
  constructor(a) {
    super(Ja ? bb(Lb(a)) : "");
    this.name = "ErrnoError";
    this.I = a;
    for (var b in Db) {
      if (Db[b] === a) {
        this.code = b;
        break;
      }
    }
  }
}, zb = {}, Mb = class {
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
}, Nb = class {
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
function O(a, b = {}) {
  a = mb(a);
  if (!a) {
    return {path:"", node:null};
  }
  b = Object.assign({ma:!0, fa:0}, b);
  if (8 < b.fa) {
    throw new L(32);
  }
  a = a.split("/").filter(g => !!g);
  for (var c = Eb, d = "/", e = 0; e < a.length; e++) {
    var f = e === a.length - 1;
    if (f && b.parent) {
      break;
    }
    c = Ab(c, a[e]);
    d = hb(d + "/" + a[e]);
    c.Y && (!f || f && b.ma) && (c = c.Y.root);
    if (!f || b.$) {
      for (f = 0; 40960 === (c.mode & 61440);) {
        if (c = Ob(d), d = mb(ib(d), c), c = O(d, {fa:b.fa + 1}).node, 40 < f++) {
          throw new L(32);
        }
      }
    }
  }
  return {path:d, node:c};
}
function Pb(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.J.pa, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function Qb(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % Jb.length;
}
function Ab(a, b) {
  var c = 16384 === (a.mode & 61440) ? (c = Rb(a, "x")) ? c : a.h.lookup ? 0 : 2 : 54;
  if (c) {
    throw new L(c);
  }
  for (c = Jb[Qb(a.id, b)]; c; c = c.Ea) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.h.lookup(a, b);
}
function yb(a, b, c, d) {
  r("object" == typeof a);
  a = new Nb(a, b, c, d);
  b = Qb(a.parent.id, a.name);
  a.Ea = Jb[b];
  return Jb[b] = a;
}
function Sb(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function Rb(a, b) {
  if (Kb) {
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
function Tb(a, b) {
  try {
    return Ab(a, b), 20;
  } catch (c) {
  }
  return Rb(a, "wx");
}
function P(a) {
  a = Gb[a];
  if (!a) {
    throw new L(8);
  }
  return a;
}
function Ub(a, b = -1) {
  r(-1 <= b);
  a = Object.assign(new Mb(), a);
  if (-1 == b) {
    a: {
      for (b = 0; 4096 >= b; b++) {
        if (!Gb[b]) {
          break a;
        }
      }
      throw new L(33);
    }
  }
  a.fd = b;
  return Gb[b] = a;
}
function Vb(a, b = -1) {
  a = Ub(a, b);
  a.i?.Sa?.(a);
  return a;
}
var xb = {open(a) {
  a.i = Fb[a.node.rdev].i;
  a.i.open?.(a);
}, L() {
  throw new L(70);
},};
function sb(a, b) {
  Fb[a] = {i:b};
}
function Wb(a, b) {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && Eb) {
    throw new L(10);
  }
  if (!c && !d) {
    var e = O(b, {ma:!1});
    b = e.path;
    e = e.node;
    if (e.Y) {
      throw new L(10);
    }
    if (16384 !== (e.mode & 61440)) {
      throw new L(54);
    }
  }
  b = {type:a, Ya:{}, pa:b, Da:[]};
  a = a.J(b);
  a.J = b;
  b.root = a;
  c ? Eb = a : e && (e.Y = b, e.J && e.J.Da.push(b));
}
function Xb(a, b, c) {
  var d = O(a, {parent:!0}).node;
  a = jb(a);
  if (!a || "." === a || ".." === a) {
    throw new L(28);
  }
  var e = Tb(d, a);
  if (e) {
    throw new L(e);
  }
  if (!d.h.W) {
    throw new L(63);
  }
  return d.h.W(d, a, b, c);
}
function Q(a) {
  return Xb(a, 16895, 0);
}
function Yb(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  Xb(a, b | 8192, c);
}
function Zb(a, b) {
  if (!mb(a)) {
    throw new L(44);
  }
  var c = O(b, {parent:!0}).node;
  if (!c) {
    throw new L(44);
  }
  b = jb(b);
  var d = Tb(c, b);
  if (d) {
    throw new L(d);
  }
  if (!c.h.symlink) {
    throw new L(63);
  }
  c.h.symlink(c, b, a);
}
function Ob(a) {
  a = O(a).node;
  if (!a) {
    throw new L(44);
  }
  if (!a.h.readlink) {
    throw new L(28);
  }
  return mb(Pb(a.parent), a.h.readlink(a));
}
function $b(a, b, c) {
  if ("" === a) {
    throw new L(44);
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
    a = hb(a);
    try {
      e = O(a, {$:!(b & 131072)}).node;
    } catch (f) {
    }
  }
  d = !1;
  if (b & 64) {
    if (e) {
      if (b & 128) {
        throw new L(20);
      }
    } else {
      e = Xb(a, c, 0), d = !0;
    }
  }
  if (!e) {
    throw new L(44);
  }
  8192 === (e.mode & 61440) && (b &= -513);
  if (b & 65536 && 16384 !== (e.mode & 61440)) {
    throw new L(54);
  }
  if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Sb(b) || b & 512) ? 31 : Rb(e, Sb(b)) : 44)) {
    throw new L(c);
  }
  if (b & 512 && !d) {
    c = e;
    c = "string" == typeof c ? O(c, {$:!0}).node : c;
    if (!c.h.H) {
      throw new L(63);
    }
    if (16384 === (c.mode & 61440)) {
      throw new L(31);
    }
    if (32768 !== (c.mode & 61440)) {
      throw new L(28);
    }
    if (d = Rb(c, "w")) {
      throw new L(d);
    }
    c.h.H(c, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  e = Ub({node:e, path:Pb(e), flags:b, seekable:!0, position:0, i:e.i, Ma:[], error:!1});
  e.i.open && e.i.open(e);
  !l.logReadFiles || b & 1 || (ac ||= {}, a in ac || (ac[a] = 1));
  return e;
}
function bc(a, b, c) {
  if (null === a.fd) {
    throw new L(8);
  }
  if (!a.seekable || !a.i.L) {
    throw new L(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new L(28);
  }
  a.position = a.i.L(a, b, c);
  a.Ma = [];
}
var cc;
function dc(a, b, c) {
  a = hb("/dev/" + a);
  var d = Cb(!!b, !!c);
  ec ||= 64;
  var e = ec++ << 8 | 0;
  sb(e, {open(f) {
    f.seekable = !1;
  }, close() {
    c?.buffer?.length && c(10);
  }, read(f, g, k, m) {
    for (var h = 0, n = 0; n < m; n++) {
      try {
        var w = b();
      } catch (x) {
        throw new L(29);
      }
      if (void 0 === w && 0 === h) {
        throw new L(6);
      }
      if (null === w || void 0 === w) {
        break;
      }
      h++;
      g[k + n] = w;
    }
    h && (f.node.timestamp = Date.now());
    return h;
  }, write(f, g, k, m) {
    for (var h = 0; h < m; h++) {
      try {
        c(g[k + h]);
      } catch (n) {
        throw new L(29);
      }
    }
    m && (f.node.timestamp = Date.now());
    return h;
  }});
  Yb(a, d, e);
}
var ec, R = {}, ac, fb = void 0, fc = {}, gc = a => {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
};
function hc(a) {
  return this.fromWireType(F[a >> 2]);
}
var ic = {}, jc = {}, kc = {}, lc, mc = (a, b, c) => {
  function d(k) {
    k = c(k);
    if (k.length !== a.length) {
      throw new lc("Mismatched type converter count");
    }
    for (var m = 0; m < a.length; ++m) {
      S(a[m], k[m]);
    }
  }
  a.forEach(function(k) {
    kc[k] = b;
  });
  var e = Array(b.length), f = [], g = 0;
  b.forEach((k, m) => {
    jc.hasOwnProperty(k) ? e[m] = jc[k] : (f.push(k), ic.hasOwnProperty(k) || (ic[k] = []), ic[k].push(() => {
      e[m] = jc[k];
      ++g;
      g === f.length && d(e);
    }));
  });
  0 === f.length && d(e);
}, nc, T = a => {
  for (var b = ""; y[a];) {
    b += nc[y[a++]];
  }
  return b;
}, U, oc = a => {
  throw new U(a);
};
function pc(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new U(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (jc.hasOwnProperty(a)) {
    if (c.Ba) {
      return;
    }
    throw new U(`Cannot register type '${d}' twice`);
  }
  jc[a] = b;
  delete kc[a];
  ic.hasOwnProperty(a) && (b = ic[a], delete ic[a], b.forEach(e => e()));
}
function S(a, b, c = {}) {
  if (!("argPackAdvance" in b)) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  return pc(a, b, c);
}
var qc = a => {
  throw new U(a.g.o.m.name + " instance already deleted");
}, rc = !1, sc = () => {
}, tc = (a, b, c) => {
  if (b === c) {
    return a;
  }
  if (void 0 === c.A) {
    return null;
  }
  a = tc(a, b, c.A);
  return null === a ? null : c.ua(a);
}, uc = {}, vc = [], wc = () => {
  for (; vc.length;) {
    var a = vc.pop();
    a.g.M = !1;
    a["delete"]();
  }
}, xc, yc = {}, zc = (a, b) => {
  if (void 0 === b) {
    throw new U("ptr should not be undefined");
  }
  for (; a.A;) {
    b = a.R(b), a = a.A;
  }
  return yc[b];
}, Bc = (a, b) => {
  if (!b.o || !b.l) {
    throw new lc("makeClassHandle requires ptr and ptrType");
  }
  if (!!b.B !== !!b.u) {
    throw new lc("Both smartPtrType and smartPtr must be specified");
  }
  b.count = {value:1};
  return Ac(Object.create(a, {g:{value:b, writable:!0,},}));
};
function Cc(a) {
  function b() {
    return this.V ? Bc(this.m.N, {o:this.Fa, l:c, B:this, u:a,}) : Bc(this.m.N, {o:this, l:a,});
  }
  var c = this.xa(a);
  if (!c) {
    return this.ka(a), null;
  }
  var d = zc(this.m, c);
  if (void 0 !== d) {
    if (0 === d.g.count.value) {
      return d.g.l = c, d.g.u = a, d.clone();
    }
    d = d.clone();
    this.ka(a);
    return d;
  }
  d = this.m.wa(c);
  d = uc[d];
  if (!d) {
    return b.call(this);
  }
  d = this.U ? d.ta : d.pointerType;
  var e = tc(c, this.m, d.m);
  return null === e ? b.call(this) : this.V ? Bc(d.m.N, {o:d, l:e, B:this, u:a,}) : Bc(d.m.N, {o:d, l:e,});
}
var Ac = a => {
  if ("undefined" === typeof FinalizationRegistry) {
    return Ac = b => b, a;
  }
  rc = new FinalizationRegistry(b => {
    console.warn(b.oa.stack.replace(/^Error: /, ""));
    b = b.g;
    --b.count.value;
    0 === b.count.value && (b.u ? b.B.G(b.u) : b.o.m.G(b.l));
  });
  Ac = b => {
    var c = b.g;
    if (c.u) {
      var d = {g:c};
      d.oa = Error(`Embind found a leaked C++ instance ${c.o.m.name} <${Ca(c.l)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\nMake sure to invoke .delete() manually once you're done with the instance instead.\nOriginally allocated");
      "captureStackTrace" in Error && Error.captureStackTrace(d.oa, Cc);
      rc.register(b, d, b);
    }
    return b;
  };
  sc = b => {
    rc.unregister(b);
  };
  return Ac(a);
};
function Dc() {
}
var Ec = (a, b) => Object.defineProperty(b, "name", {value:a}), Fc = (a, b, c) => {
  if (void 0 === a[b].v) {
    var d = a[b];
    a[b] = function(...e) {
      if (!a[b].v.hasOwnProperty(e.length)) {
        throw new U(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].v})!`);
      }
      return a[b].v[e.length].apply(this, e);
    };
    a[b].v = [];
    a[b].v[d.S] = d;
  }
}, Gc = (a, b, c) => {
  if (l.hasOwnProperty(a)) {
    if (void 0 === c || void 0 !== l[a].v && void 0 !== l[a].v[c]) {
      throw new U(`Cannot register public name '${a}' twice`);
    }
    Fc(l, a, a);
    if (l.hasOwnProperty(c)) {
      throw new U(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
    }
    l[a].v[c] = b;
  } else {
    l[a] = b, void 0 !== c && (l[a].Xa = c);
  }
}, Hc = a => {
  if (void 0 === a) {
    return "_unknown";
  }
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? `_${a}` : a;
};
function Ic(a, b, c, d, e, f, g, k) {
  this.name = a;
  this.constructor = b;
  this.N = c;
  this.G = d;
  this.A = e;
  this.wa = f;
  this.R = g;
  this.ua = k;
  this.Ga = [];
}
var Jc = (a, b, c) => {
  for (; b !== c;) {
    if (!b.R) {
      throw new U(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
    }
    a = b.R(a);
    b = b.A;
  }
  return a;
};
function Kc(a, b) {
  if (null === b) {
    if (this.ba) {
      throw new U(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new U(`Cannot pass "${Lc(b)}" as a ${this.name}`);
  }
  if (!b.g.l) {
    throw new U(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  return Jc(b.g.l, b.g.o.m, this.m);
}
function Mc(a, b) {
  if (null === b) {
    if (this.ba) {
      throw new U(`null is not a valid ${this.name}`);
    }
    if (this.V) {
      var c = this.ea();
      null !== a && a.push(this.G, c);
      return c;
    }
    return 0;
  }
  if (!b || !b.g) {
    throw new U(`Cannot pass "${Lc(b)}" as a ${this.name}`);
  }
  if (!b.g.l) {
    throw new U(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.U && b.g.o.U) {
    throw new U(`Cannot convert argument of type ${b.g.B ? b.g.B.name : b.g.o.name} to parameter type ${this.name}`);
  }
  c = Jc(b.g.l, b.g.o.m, this.m);
  if (this.V) {
    if (void 0 === b.g.u) {
      throw new U("Passing raw pointer to smart pointer is illegal");
    }
    switch(this.La) {
      case 0:
        if (b.g.B === this) {
          c = b.g.u;
        } else {
          throw new U(`Cannot convert argument of type ${b.g.B ? b.g.B.name : b.g.o.name} to parameter type ${this.name}`);
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
          c = this.Ha(c, V(() => d["delete"]()));
          null !== a && a.push(this.G, c);
        }
        break;
      default:
        throw new U("Unsupporting sharing policy");
    }
  }
  return c;
}
function Nc(a, b) {
  if (null === b) {
    if (this.ba) {
      throw new U(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new U(`Cannot pass "${Lc(b)}" as a ${this.name}`);
  }
  if (!b.g.l) {
    throw new U(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (b.g.o.U) {
    throw new U(`Cannot convert argument of type ${b.g.o.name} to parameter type ${this.name}`);
  }
  return Jc(b.g.l, b.g.o.m, this.m);
}
function Oc(a, b, c, d, e, f, g, k, m, h, n) {
  this.name = a;
  this.m = b;
  this.ba = c;
  this.U = d;
  this.V = e;
  this.Fa = f;
  this.La = g;
  this.qa = k;
  this.ea = m;
  this.Ha = h;
  this.G = n;
  e || void 0 !== b.A ? this.toWireType = Mc : (this.toWireType = d ? Kc : Nc, this.C = null);
}
var Pc = (a, b, c) => {
  if (!l.hasOwnProperty(a)) {
    throw new lc("Replacing nonexistent public symbol");
  }
  void 0 !== l[a].v && void 0 !== c ? l[a].v[c] = b : (l[a] = b, l[a].S = c);
}, Qc = [], Sc, W = a => {
  var b = Qc[a];
  b || (a >= Qc.length && (Qc.length = a + 1), Qc[a] = b = Sc.get(a));
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
  a = T(a);
  var c = a.includes("j") ? Uc(a, b) : W(b);
  if ("function" != typeof c) {
    throw new U(`unknown function pointer with signature ${a}: ${b}`);
  }
  return c;
}, Vc, Xc = a => {
  a = Wc(a);
  var b = T(a);
  Y(a);
  return b;
}, Yc = (a, b) => {
  function c(f) {
    e[f] || jc[f] || (kc[f] ? kc[f].forEach(c) : (d.push(f), e[f] = !0));
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
  var c = Ec(b.name || "unknownFunctionName", function() {
  });
  c.prototype = b.prototype;
  c = new c();
  a = b.apply(c, a);
  return a instanceof Object ? a : c;
}
function bd(a, b, c, d, e, f) {
  var g = b.length;
  if (2 > g) {
    throw new U("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  r(!f, "Async bindings are only supported with JSPI.");
  var k = null !== b[1] && null !== c, m = $c(b);
  c = "void" !== b[0].name;
  d = [a, oc, d, e, gc, b[0], b[1]];
  for (e = 0; e < g - 2; ++e) {
    d.push(b[e + 2]);
  }
  if (!m) {
    for (e = k ? 1 : 2; e < b.length; ++e) {
      null !== b[e].C && d.push(b[e].C);
    }
  }
  m = $c(b);
  e = b.length;
  var h = "", n = "";
  for (g = 0; g < e - 2; ++g) {
    h += (0 !== g ? ", " : "") + "arg" + g, n += (0 !== g ? ", " : "") + "arg" + g + "Wired";
  }
  h = `
        return function (${h}) {
        if (arguments.length !== ${e - 2}) {
          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${e - 2}');
        }`;
  m && (h += "var destructors = [];\n");
  var w = m ? "destructors" : "null", x = "humanName throwBindingError invoker fn runDestructors retType classParam".split(" ");
  k && (h += "var thisWired = classParam['toWireType'](" + w + ", this);\n");
  for (g = 0; g < e - 2; ++g) {
    h += "var arg" + g + "Wired = argType" + g + "['toWireType'](" + w + ", arg" + g + ");\n", x.push("argType" + g);
  }
  k && (n = "thisWired" + (0 < n.length ? ", " : "") + n);
  h += (c || f ? "var rv = " : "") + "invoker(fn" + (0 < n.length ? ", " : "") + n + ");\n";
  if (m) {
    h += "runDestructors(destructors);\n";
  } else {
    for (g = k ? 1 : 2; g < b.length; ++g) {
      f = 1 === g ? "thisWired" : "arg" + (g - 2) + "Wired", null !== b[g].C && (h += `${f}_dtor(${f});\n`, x.push(`${f}_dtor`));
    }
  }
  c && (h += "var ret = retType['fromWireType'](rv);\nreturn ret;\n");
  h = `if (arguments.length !== ${x.length}){ throw new Error(humanName + "Expected ${x.length} closure arguments " + arguments.length + " given."); }\n${h + "}\n"}`;
  let [B, z] = [x, h];
  B.push(z);
  b = ad(B)(...d);
  return Ec(a, b);
}
var cd = a => {
  a = a.trim();
  const b = a.indexOf("(");
  return -1 !== b ? (r(")" == a[a.length - 1], "Parentheses for argument names should match."), a.substr(0, b)) : a;
}, dd = [], Z = [], ed = a => {
  9 < a && 0 === --Z[a + 1] && (r(void 0 !== Z[a], "Decref for unallocated handle."), Z[a] = void 0, dd.push(a));
}, fd = a => {
  if (!a) {
    throw new U("Cannot use deleted val. handle = " + a);
  }
  r(2 === a || void 0 !== Z[a] && 0 === a % 2, `invalid handle: ${a}`);
  return Z[a];
}, V = a => {
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
}, gd = {name:"emscripten::val", fromWireType:a => {
  var b = fd(a);
  ed(a);
  return b;
}, toWireType:(a, b) => V(b), argPackAdvance:8, readValueFromPointer:hc, C:null,}, Lc = a => {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}, hd = (a, b) => {
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
}, jd = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => v[d] : d => y[d];
    case 2:
      return c ? d => ua[d >> 1] : d => va[d >> 1];
    case 4:
      return c ? d => C[d >> 2] : d => F[d >> 2];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
}, kd = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, ld = (a, b) => {
  r(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  var c = a >> 1;
  for (var d = c + b / 2; !(c >= d) && va[c];) {
    ++c;
  }
  c <<= 1;
  if (32 < c - a && kd) {
    return kd.decode(y.subarray(a, c));
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
}, md = (a, b, c) => {
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
}, nd = a => 2 * a.length, od = (a, b) => {
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
}, pd = (a, b, c) => {
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
}, qd = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && ++c;
    b += 4;
  }
  return b;
}, rd = (a, b) => {
  var c = jc[a];
  if (void 0 === c) {
    throw a = `${b} has unknown type ${Xc(a)}`, new U(a);
  }
  return c;
}, sd = (a, b, c) => {
  var d = [];
  a = a.toWireType(d, c);
  d.length && (F[b >> 2] = V(d));
  return a;
}, td = [], ud = {}, vd = a => {
  var b = ud[a];
  return void 0 === b ? T(a) : b;
}, wd = () => "object" == typeof globalThis ? globalThis : Function("return this")(), xd = a => {
  var b = td.length;
  td.push(a);
  return b;
}, yd = (a, b) => {
  for (var c = Array(a), d = 0; d < a; ++d) {
    c[d] = rd(F[b + 4 * d >> 2], "parameter " + d);
  }
  return c;
}, zd = (a, b) => {
  r(a == a >>> 0 || a == (a | 0));
  r(b === (b | 0));
  return b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN;
}, Ad = {}, Cd = () => {
  if (!Bd) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:ja || "./this.program"}, b;
    for (b in Ad) {
      void 0 === Ad[b] ? delete a[b] : a[b] = Ad[b];
    }
    var c = [];
    for (b in a) {
      c.push(`${b}=${a[b]}`);
    }
    Bd = c;
  }
  return Bd;
}, Bd;
[44].forEach(a => {
  zb[a] = new L(a);
  zb[a].stack = "<generic error, no stack>";
});
Jb = Array(4096);
Wb(N, "/");
Q("/tmp");
Q("/home");
Q("/home/web_user");
(function() {
  Q("/dev");
  sb(259, {read:() => 0, write:(d, e, f, g) => g,});
  Yb("/dev/null", 259);
  rb(1280, ub);
  rb(1536, vb);
  Yb("/dev/tty", 1280);
  Yb("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (b = lb(a).byteLength);
    return a[--b];
  };
  dc("random", c);
  dc("urandom", c);
  Q("/dev/shm");
  Q("/dev/shm/tmp");
})();
(function() {
  Q("/proc");
  var a = Q("/proc/self");
  Q("/proc/self/fd");
  Wb({J() {
    var b = yb(a, "fd", 16895, 73);
    b.h = {lookup(c, d) {
      var e = P(+d);
      c = {parent:null, J:{pa:"fake"}, h:{readlink:() => e.path},};
      return c.parent = c;
    }};
    return b;
  }}, "/proc/self/fd");
})();
lc = l.InternalError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
};
for (var Dd = Array(256), Ed = 0; 256 > Ed; ++Ed) {
  Dd[Ed] = String.fromCharCode(Ed);
}
nc = Dd;
U = l.BindingError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
};
Object.assign(Dc.prototype, {isAliasOf:function(a) {
  if (!(this instanceof Dc && a instanceof Dc)) {
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
  this.g.l || qc(this);
  if (this.g.P) {
    return this.g.count.value += 1, this;
  }
  var a = Ac, b = Object, c = b.create, d = Object.getPrototypeOf(this), e = this.g;
  a = a(c.call(b, d, {g:{value:{count:e.count, M:e.M, P:e.P, l:e.l, o:e.o, u:e.u, B:e.B,},}}));
  a.g.count.value += 1;
  a.g.M = !1;
  return a;
}, ["delete"]() {
  this.g.l || qc(this);
  if (this.g.M && !this.g.P) {
    throw new U("Object already scheduled for deletion");
  }
  sc(this);
  var a = this.g;
  --a.count.value;
  0 === a.count.value && (a.u ? a.B.G(a.u) : a.o.m.G(a.l));
  this.g.P || (this.g.u = void 0, this.g.l = void 0);
}, isDeleted:function() {
  return !this.g.l;
}, deleteLater:function() {
  this.g.l || qc(this);
  if (this.g.M && !this.g.P) {
    throw new U("Object already scheduled for deletion");
  }
  vc.push(this);
  1 === vc.length && xc && xc(wc);
  this.g.M = !0;
  return this;
},});
l.getInheritedInstanceCount = () => Object.keys(yc).length;
l.getLiveInheritedInstances = () => {
  var a = [], b;
  for (b in yc) {
    yc.hasOwnProperty(b) && a.push(yc[b]);
  }
  return a;
};
l.flushPendingDeletes = wc;
l.setDelayFunction = a => {
  xc = a;
  vc.length && xc && xc(wc);
};
Object.assign(Oc.prototype, {xa(a) {
  this.qa && (a = this.qa(a));
  return a;
}, ka(a) {
  this.G?.(a);
}, argPackAdvance:8, readValueFromPointer:hc, fromWireType:Cc,});
Vc = l.UnboundTypeError = ((a, b) => {
  var c = Ec(b, function(d) {
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
var Ld = {__assert_fail:(a, b, c, d) => {
  p(`Assertion failed: ${bb(a)}, at: ` + [b ? bb(b) : "unknown filename", c, d ? bb(d) : "unknown function"]);
}, __cxa_throw:(a, b, c) => {
  a = new cb(a);
  F[a.l + 16 >> 2] = 0;
  F[a.l + 4 >> 2] = b;
  F[a.l + 8 >> 2] = c;
  db++;
  r(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, __syscall_fcntl64:function(a, b, c) {
  fb = c;
  try {
    var d = P(a);
    switch(b) {
      case 0:
        var e = eb();
        if (0 > e) {
          break;
        }
        for (; Gb[e];) {
          e++;
        }
        return Vb(d, e).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = eb(), d.flags |= e, 0;
      case 12:
        return e = eb(), ua[e + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch (f) {
    if ("undefined" == typeof R || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.I;
  }
}, __syscall_fstat64:function(a, b) {
  try {
    var c = P(a), d = O(c.path, {$:!0}).node;
    if (!d) {
      throw new L(44);
    }
    if (!d.h.D) {
      throw new L(63);
    }
    var e = d.h.D(d);
    C[b >> 2] = e.dev;
    C[b + 4 >> 2] = e.mode;
    F[b + 8 >> 2] = e.nlink;
    C[b + 12 >> 2] = e.uid;
    C[b + 16 >> 2] = e.gid;
    C[b + 20 >> 2] = e.rdev;
    J = [e.size >>> 0, (I = e.size, 1.0 <= +Math.abs(I) ? 0.0 < I ? +Math.floor(I / 4294967296.0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 24 >> 2] = J[0];
    C[b + 28 >> 2] = J[1];
    C[b + 32 >> 2] = 4096;
    C[b + 36 >> 2] = e.blocks;
    var f = e.atime.getTime(), g = e.mtime.getTime(), k = e.ctime.getTime();
    J = [Math.floor(f / 1000) >>> 0, (I = Math.floor(f / 1000), 1.0 <= +Math.abs(I) ? 0.0 < I ? +Math.floor(I / 4294967296.0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 40 >> 2] = J[0];
    C[b + 44 >> 2] = J[1];
    F[b + 48 >> 2] = f % 1000 * 1000;
    J = [Math.floor(g / 1000) >>> 0, (I = Math.floor(g / 1000), 1.0 <= +Math.abs(I) ? 0.0 < I ? +Math.floor(I / 4294967296.0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 56 >> 2] = J[0];
    C[b + 60 >> 2] = J[1];
    F[b + 64 >> 2] = g % 1000 * 1000;
    J = [Math.floor(k / 1000) >>> 0, (I = Math.floor(k / 1000), 1.0 <= +Math.abs(I) ? 0.0 < I ? +Math.floor(I / 4294967296.0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 72 >> 2] = J[0];
    C[b + 76 >> 2] = J[1];
    F[b + 80 >> 2] = k % 1000 * 1000;
    J = [e.ino >>> 0, (I = e.ino, 1.0 <= +Math.abs(I) ? 0.0 < I ? +Math.floor(I / 4294967296.0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[b + 88 >> 2] = J[0];
    C[b + 92 >> 2] = J[1];
    return 0;
  } catch (m) {
    if ("undefined" == typeof R || "ErrnoError" !== m.name) {
      throw m;
    }
    return -m.I;
  }
}, __syscall_openat:function(a, b, c, d) {
  fb = d;
  try {
    b = bb(b);
    var e = b;
    if ("/" === e.charAt(0)) {
      b = e;
    } else {
      var f = -100 === a ? "/" : P(a).path;
      if (0 == e.length) {
        throw new L(44);
      }
      b = hb(f + "/" + e);
    }
    var g = d ? eb() : 0;
    return $b(b, c, g).fd;
  } catch (k) {
    if ("undefined" == typeof R || "ErrnoError" !== k.name) {
      throw k;
    }
    return -k.I;
  }
}, _abort_js:() => {
  p("native code called abort()");
}, _embind_finalize_value_object:a => {
  var b = fc[a];
  delete fc[a];
  var c = b.ea, d = b.G, e = b.la, f = e.map(g => g.Aa).concat(e.map(g => g.Ja));
  mc([a], f, g => {
    var k = {};
    e.forEach((m, h) => {
      var n = g[h], w = m.ya, x = m.za, B = g[h + e.length], z = m.Ia, D = m.Ka;
      k[m.va] = {read:E => n.fromWireType(w(x, E)), write:(E, M) => {
        var A = [];
        z(D, E, B.toWireType(A, M));
        gc(A);
      }};
    });
    return [{name:b.name, fromWireType:m => {
      var h = {}, n;
      for (n in k) {
        h[n] = k[n].read(m);
      }
      d(m);
      return h;
    }, toWireType:(m, h) => {
      for (var n in k) {
        if (!(n in h)) {
          throw new TypeError(`Missing field: "${n}"`);
        }
      }
      var w = c();
      for (n in k) {
        k[n].write(w, h[n]);
      }
      null !== m && m.push(d, w);
      return w;
    }, argPackAdvance:8, readValueFromPointer:hc, C:d,}];
  });
}, _embind_register_bigint:() => {
}, _embind_register_bool:(a, b, c, d) => {
  b = T(b);
  S(a, {name:b, fromWireType:function(e) {
    return !!e;
  }, toWireType:function(e, f) {
    return f ? c : d;
  }, argPackAdvance:8, readValueFromPointer:function(e) {
    return this.fromWireType(y[e]);
  }, C:null,});
}, _embind_register_class:(a, b, c, d, e, f, g, k, m, h, n, w, x) => {
  n = T(n);
  f = X(e, f);
  k &&= X(g, k);
  h &&= X(m, h);
  x = X(w, x);
  var B = Hc(n);
  Gc(B, function() {
    Yc(`Cannot construct ${n} due to unbound types`, [d]);
  });
  mc([a, b, c], d ? [d] : [], z => {
    z = z[0];
    if (d) {
      var D = z.m;
      var E = D.N;
    } else {
      E = Dc.prototype;
    }
    z = Ec(n, function(...Ib) {
      if (Object.getPrototypeOf(this) !== M) {
        throw new U("Use 'new' to construct " + n);
      }
      if (void 0 === A.K) {
        throw new U(n + " has no accessible constructor");
      }
      var Rc = A.K[Ib.length];
      if (void 0 === Rc) {
        throw new U(`Tried to invoke ctor of ${n} with invalid number of parameters (${Ib.length}) - expected (${Object.keys(A.K).toString()}) parameters instead!`);
      }
      return Rc.apply(this, Ib);
    });
    var M = Object.create(E, {constructor:{value:z},});
    z.prototype = M;
    var A = new Ic(n, z, M, x, D, f, k, h);
    if (A.A) {
      var Ia;
      (Ia = A.A).ha ?? (Ia.ha = []);
      A.A.ha.push(A);
    }
    D = new Oc(n, A, !0, !1, !1);
    Ia = new Oc(n + "*", A, !1, !1, !1);
    E = new Oc(n + " const*", A, !1, !0, !1);
    uc[a] = {pointerType:Ia, ta:E};
    Pc(B, z);
    return [D, Ia, E];
  });
}, _embind_register_class_constructor:(a, b, c, d, e, f) => {
  r(0 < b);
  var g = Zc(b, c);
  e = X(d, e);
  mc([], [a], k => {
    k = k[0];
    var m = `constructor ${k.name}`;
    void 0 === k.m.K && (k.m.K = []);
    if (void 0 !== k.m.K[b - 1]) {
      throw new U(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${k.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    k.m.K[b - 1] = () => {
      Yc(`Cannot construct ${k.name} due to unbound types`, g);
    };
    mc([], g, h => {
      h.splice(1, 0, null);
      k.m.K[b - 1] = bd(m, h, null, e, f);
      return [];
    });
    return [];
  });
}, _embind_register_class_function:(a, b, c, d, e, f, g, k, m) => {
  var h = Zc(c, d);
  b = T(b);
  b = cd(b);
  f = X(e, f);
  mc([], [a], n => {
    function w() {
      Yc(`Cannot call ${x} due to unbound types`, h);
    }
    n = n[0];
    var x = `${n.name}.${b}`;
    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
    k && n.m.Ga.push(b);
    var B = n.m.N, z = B[b];
    void 0 === z || void 0 === z.v && z.className !== n.name && z.S === c - 2 ? (w.S = c - 2, w.className = n.name, B[b] = w) : (Fc(B, b, x), B[b].v[c - 2] = w);
    mc([], h, D => {
      D = bd(x, D, n, f, g, m);
      void 0 === B[b].v ? (D.S = c - 2, B[b] = D) : B[b].v[c - 2] = D;
      return [];
    });
    return [];
  });
}, _embind_register_emval:a => S(a, gd), _embind_register_float:(a, b, c) => {
  b = T(b);
  S(a, {name:b, fromWireType:d => d, toWireType:(d, e) => {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${Lc(e)} to ${this.name}`);
    }
    return e;
  }, argPackAdvance:8, readValueFromPointer:hd(b, c), C:null,});
}, _embind_register_function:(a, b, c, d, e, f, g) => {
  var k = Zc(b, c);
  a = T(a);
  a = cd(a);
  e = X(d, e);
  Gc(a, function() {
    Yc(`Cannot call ${a} due to unbound types`, k);
  }, b - 1);
  mc([], k, m => {
    m = [m[0], null].concat(m.slice(1));
    Pc(a, bd(a, m, null, e, f, g), b - 1);
    return [];
  });
}, _embind_register_integer:(a, b, c, d, e) => {
  b = T(b);
  -1 === e && (e = 4294967295);
  var f = h => h;
  if (0 === d) {
    var g = 32 - 8 * c;
    f = h => h << g >>> g;
  }
  var k = (h, n) => {
    if ("number" != typeof h && "boolean" != typeof h) {
      throw new TypeError(`Cannot convert "${Lc(h)}" to ${n}`);
    }
    if (h < d || h > e) {
      throw new TypeError(`Passing a number "${Lc(h)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
    }
  };
  var m = b.includes("unsigned") ? function(h, n) {
    k(n, this.name);
    return n >>> 0;
  } : function(h, n) {
    k(n, this.name);
    return n;
  };
  S(a, {name:b, fromWireType:f, toWireType:m, argPackAdvance:8, readValueFromPointer:jd(b, c, 0 !== d), C:null,});
}, _embind_register_memory_view:(a, b, c) => {
  function d(f) {
    return new e(v.buffer, F[f + 4 >> 2], F[f >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,][b];
  c = T(c);
  S(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d,}, {Ba:!0,});
}, _embind_register_optional:a => {
  S(a, gd);
}, _embind_register_std_string:(a, b) => {
  b = T(b);
  var c = "std::string" === b;
  S(a, {name:b, fromWireType:function(d) {
    var e = F[d >> 2], f = d + 4;
    if (c) {
      for (var g = f, k = 0; k <= e; ++k) {
        var m = f + k;
        if (k == e || 0 == y[m]) {
          g = bb(g, m - g);
          if (void 0 === h) {
            var h = g;
          } else {
            h += String.fromCharCode(0), h += g;
          }
          g = m + 1;
        }
      }
    } else {
      h = Array(e);
      for (k = 0; k < e; ++k) {
        h[k] = String.fromCharCode(y[f + k]);
      }
      h = h.join("");
    }
    Y(d);
    return h;
  }, toWireType:function(d, e) {
    e instanceof ArrayBuffer && (e = new Uint8Array(e));
    var f = "string" == typeof e;
    if (!(f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array)) {
      throw new U("Cannot pass non-string to std::string");
    }
    var g = c && f ? ob(e) : e.length;
    var k = Fd(4 + g + 1), m = k + 4;
    F[k >> 2] = g;
    if (c && f) {
      g += 1, r("number" == typeof g, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), pb(e, y, m, g);
    } else {
      if (f) {
        for (f = 0; f < g; ++f) {
          var h = e.charCodeAt(f);
          if (255 < h) {
            throw Y(m), new U("String has UTF-16 code units that do not fit in 8 bits");
          }
          y[m + f] = h;
        }
      } else {
        for (f = 0; f < g; ++f) {
          y[m + f] = e[f];
        }
      }
    }
    null !== d && d.push(Y, k);
    return k;
  }, argPackAdvance:8, readValueFromPointer:hc, C(d) {
    Y(d);
  },});
}, _embind_register_std_wstring:(a, b, c) => {
  c = T(c);
  if (2 === b) {
    var d = ld;
    var e = md;
    var f = nd;
    var g = k => va[k >> 1];
  } else {
    4 === b && (d = od, e = pd, f = qd, g = k => F[k >> 2]);
  }
  S(a, {name:c, fromWireType:k => {
    for (var m = F[k >> 2], h, n = k + 4, w = 0; w <= m; ++w) {
      var x = k + 4 + w * b;
      if (w == m || 0 == g(x)) {
        n = d(n, x - n), void 0 === h ? h = n : (h += String.fromCharCode(0), h += n), n = x + b;
      }
    }
    Y(k);
    return h;
  }, toWireType:(k, m) => {
    if ("string" != typeof m) {
      throw new U(`Cannot pass non-string to C++ string type ${c}`);
    }
    var h = f(m), n = Fd(4 + h + b);
    F[n >> 2] = h / b;
    e(m, n + 4, h + b);
    null !== k && k.push(Y, n);
    return n;
  }, argPackAdvance:8, readValueFromPointer:hc, C(k) {
    Y(k);
  }});
}, _embind_register_value_object:(a, b, c, d, e, f) => {
  fc[a] = {name:T(b), ea:X(c, d), G:X(e, f), la:[],};
}, _embind_register_value_object_field:(a, b, c, d, e, f, g, k, m, h) => {
  fc[a].la.push({va:T(b), Aa:c, ya:X(d, e), za:f, Ja:g, Ia:X(k, m), Ka:h,});
}, _embind_register_void:(a, b) => {
  b = T(b);
  S(a, {Ca:!0, name:b, argPackAdvance:0, fromWireType:() => {
  }, toWireType:() => {
  },});
}, _emscripten_memcpy_js:(a, b, c) => y.copyWithin(a, b, b + c), _emscripten_throw_longjmp:() => {
  throw Infinity;
}, _emval_as:(a, b, c) => {
  a = fd(a);
  b = rd(b, "emval::as");
  return sd(b, c, a);
}, _emval_call:(a, b, c, d) => {
  a = td[a];
  b = fd(b);
  return a(null, b, c, d);
}, _emval_call_method:(a, b, c, d, e) => {
  a = td[a];
  b = fd(b);
  c = vd(c);
  return a(b, b[c], d, e);
}, _emval_decref:ed, _emval_get_global:a => {
  if (0 === a) {
    return V(wd());
  }
  a = vd(a);
  return V(wd()[a]);
}, _emval_get_method_caller:(a, b, c) => {
  b = yd(a, b);
  var d = b.shift();
  a--;
  var e = "return function (obj, func, destructorsRef, args) {\n", f = 0, g = [];
  0 === c && g.push("obj");
  for (var k = ["retType"], m = [d], h = 0; h < a; ++h) {
    g.push("arg" + h), k.push("argType" + h), m.push(b[h]), e += `  var arg${h} = argType${h}.readValueFromPointer(args${f ? "+" + f : ""});\n`, f += b[h].argPackAdvance;
  }
  e += `  var rv = ${1 === c ? "new func" : "func.call"}(${g.join(", ")});\n`;
  d.Ca || (k.push("emval_returnValue"), m.push(sd), e += "  return emval_returnValue(retType, destructorsRef, rv);\n");
  k.push(e + "};\n");
  a = ad(k)(...m);
  c = `methodCaller<(${b.map(n => n.name).join(", ")}) => ${d.name}>`;
  return xd(Ec(c, a));
}, _emval_get_module_property:a => {
  a = vd(a);
  return V(l[a]);
}, _emval_get_property:(a, b) => {
  a = fd(a);
  b = fd(b);
  return V(a[b]);
}, _emval_incref:a => {
  9 < a && (Z[a + 1] += 1);
}, _emval_new_cstring:a => V(vd(a)), _emval_run_destructors:a => {
  var b = fd(a);
  gc(b);
  ed(a);
}, _emval_take_value:(a, b) => {
  a = rd(a, "_emval_take_value");
  a = a.readValueFromPointer(b);
  return V(a);
}, _mmap_js:function(a, b, c, d, e, f, g, k) {
  e = zd(e, f);
  try {
    if (isNaN(e)) {
      return 61;
    }
    var m = P(d);
    if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (m.flags & 2097155)) {
      throw new L(2);
    }
    if (1 === (m.flags & 2097155)) {
      throw new L(2);
    }
    if (!m.i.X) {
      throw new L(43);
    }
    var h = m.i.X(m, a, e, b, c);
    var n = h.l;
    C[g >> 2] = h.ra;
    F[k >> 2] = n;
    return 0;
  } catch (w) {
    if ("undefined" == typeof R || "ErrnoError" !== w.name) {
      throw w;
    }
    return -w.I;
  }
}, _munmap_js:function(a, b, c, d, e, f, g) {
  f = zd(f, g);
  try {
    var k = P(e);
    if (c & 2) {
      if (32768 !== (k.node.mode & 61440)) {
        throw new L(43);
      }
      if (!(d & 2)) {
        var m = y.slice(a, a + b);
        r(0 <= f);
        k.i.Z && k.i.Z(k, m, f, b, d);
      }
    }
  } catch (h) {
    if ("undefined" == typeof R || "ErrnoError" !== h.name) {
      throw h;
    }
    return -h.I;
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
        var k = 1;
        break a;
      } catch (m) {
        t(`growMemory: Attempted to grow heap from ${f.byteLength} bytes to ${d} bytes, but got error: ${m}`);
      }
      k = void 0;
    }
    if (k) {
      return !0;
    }
  }
  t(`Failed to grow the heap from ${b} bytes to ${e} bytes, not enough memory!`);
  return !1;
}, environ_get:(a, b) => {
  var c = 0;
  Cd().forEach((d, e) => {
    var f = b + c;
    e = F[a + 4 * e >> 2] = f;
    for (f = 0; f < d.length; ++f) {
      r(d.charCodeAt(f) === (d.charCodeAt(f) & 255)), v[e++] = d.charCodeAt(f);
    }
    v[e] = 0;
    c += d.length + 1;
  });
  return 0;
}, environ_sizes_get:(a, b) => {
  var c = Cd();
  F[a >> 2] = c.length;
  var d = 0;
  c.forEach(e => d += e.length + 1);
  F[b >> 2] = d;
  return 0;
}, fd_close:function(a) {
  try {
    var b = P(a);
    if (null === b.fd) {
      throw new L(8);
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
    if ("undefined" == typeof R || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.I;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = P(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var k = F[a >> 2], m = F[a + 4 >> 2];
        a += 8;
        var h = e, n = k, w = m, x = f, B = v;
        r(0 <= n);
        if (0 > w || 0 > x) {
          throw new L(28);
        }
        if (null === h.fd) {
          throw new L(8);
        }
        if (1 === (h.flags & 2097155)) {
          throw new L(8);
        }
        if (16384 === (h.node.mode & 61440)) {
          throw new L(31);
        }
        if (!h.i.read) {
          throw new L(28);
        }
        var z = "undefined" != typeof x;
        if (!z) {
          x = h.position;
        } else if (!h.seekable) {
          throw new L(70);
        }
        var D = h.i.read(h, B, n, w, x);
        z || (h.position += D);
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
    if ("undefined" == typeof R || "ErrnoError" !== A.name) {
      throw A;
    }
    return A.I;
  }
}, fd_seek:function(a, b, c, d, e) {
  b = zd(b, c);
  try {
    if (isNaN(b)) {
      return 61;
    }
    var f = P(a);
    bc(f, b, d);
    J = [f.position >>> 0, (I = f.position, 1.0 <= +Math.abs(I) ? 0.0 < I ? +Math.floor(I / 4294967296.0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296.0) >>> 0 : 0)];
    C[e >> 2] = J[0];
    C[e + 4 >> 2] = J[1];
    f.aa && 0 === b && 0 === d && (f.aa = null);
    return 0;
  } catch (g) {
    if ("undefined" == typeof R || "ErrnoError" !== g.name) {
      throw g;
    }
    return g.I;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = P(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var k = F[a >> 2], m = F[a + 4 >> 2];
        a += 8;
        var h = e, n = k, w = m, x = f, B = v;
        r(0 <= n);
        if (0 > w || 0 > x) {
          throw new L(28);
        }
        if (null === h.fd) {
          throw new L(8);
        }
        if (0 === (h.flags & 2097155)) {
          throw new L(8);
        }
        if (16384 === (h.node.mode & 61440)) {
          throw new L(31);
        }
        if (!h.i.write) {
          throw new L(28);
        }
        h.seekable && h.flags & 1024 && bc(h, 0, 2);
        var z = "undefined" != typeof x;
        if (!z) {
          x = h.position;
        } else if (!h.seekable) {
          throw new L(70);
        }
        var D = h.i.write(h, B, n, w, x, void 0);
        z || (h.position += D);
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
    if ("undefined" == typeof R || "ErrnoError" !== A.name) {
      throw A;
    }
    return A.I;
  }
}, invoke_iii:Gd, invoke_iiii:Hd, invoke_iiiii:Id, invoke_v:Jd, invoke_viiii:Kd}, H = function() {
  function a(d) {
    H = d.exports;
    sa = H.memory;
    r(sa, "memory not found in wasm exports");
    ya();
    Sc = H.__indirect_function_table;
    r(Sc, "table not found in wasm exports");
    Ga.unshift(H.__wasm_call_ctors);
    G--;
    l.monitorRunDependencies?.(G);
    r(Na["wasm-instantiate"]);
    delete Na["wasm-instantiate"];
    0 == G && (null !== La && (clearInterval(La), La = null), Ma && (d = Ma, Ma = null, d()));
    return H;
  }
  var b = {env:Ld, wasi_snapshot_preview1:Ld,};
  Oa();
  var c = l;
  if (l.instantiateWasm) {
    try {
      return l.instantiateWasm(b, a);
    } catch (d) {
      t(`Module.instantiateWasm callback failed with error: ${d}`), ba(d);
    }
  }
  Ra ||= Pa("wasm_app.wasm") ? "wasm_app.wasm" : l.locateFile ? l.locateFile("wasm_app.wasm", q) : q + "wasm_app.wasm";
  Va(b, function(d) {
    r(l === c, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    c = null;
    a(d.instance);
  }).catch(ba);
  return {};
}(), Wc = Qa("__getTypeName", 1), Fd = l._malloc = Qa("malloc", 1), Y = l._free = Qa("free", 1), Bb = Qa("emscripten_builtin_memalign", 2), Lb = Qa("strerror", 1), Md = Qa("setThrew", 2), Nd = () => (Nd = H.emscripten_stack_init)(), Aa = () => (Aa = H.emscripten_stack_get_end)(), Od = a => (Od = H._emscripten_stack_restore)(a), Pd = () => (Pd = H.emscripten_stack_get_current)();
l.dynCall_jiji = Qa("dynCall_jiji", 5);
function Kd(a, b, c, d, e) {
  var f = Pd();
  try {
    W(a)(b, c, d, e);
  } catch (g) {
    Od(f);
    if (g !== g + 0) {
      throw g;
    }
    Md(1, 0);
  }
}
function Gd(a, b, c) {
  var d = Pd();
  try {
    return W(a)(b, c);
  } catch (e) {
    Od(d);
    if (e !== e + 0) {
      throw e;
    }
    Md(1, 0);
  }
}
function Id(a, b, c, d, e) {
  var f = Pd();
  try {
    return W(a)(b, c, d, e);
  } catch (g) {
    Od(f);
    if (g !== g + 0) {
      throw g;
    }
    Md(1, 0);
  }
}
function Jd(a) {
  var b = Pd();
  try {
    W(a)();
  } catch (c) {
    Od(b);
    if (c !== c + 0) {
      throw c;
    }
    Md(1, 0);
  }
}
function Hd(a, b, c, d) {
  var e = Pd();
  try {
    return W(a)(b, c, d);
  } catch (f) {
    Od(e);
    if (f !== f + 0) {
      throw f;
    }
    Md(1, 0);
  }
}
"writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertU32PairToI53 stackAlloc getTempRet0 setTempRet0 exitJS isLeapYear ydayFromDate arraySum addDays inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr emscriptenLog readEmAsmArgs jstoi_q listenOnce autoResumeAudioContext handleException keepRuntimeAlive runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asmjsMangle HandleAllocator getNativeTypeSize STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS getCFunc ccall cwrap uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction reallyNegative unSign strLen reSign formatString intArrayToString AsciiToString stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory registerKeyEventCallback maybeCStringToJsString findEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace getCallstack convertPCtoSourceLocation checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags createDyncallWrapper safeSetTimeout setImmediateWrapped clearImmediateWrapped polyfillSetImmediate getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter setMainLoop getSocketFromFD getSocketAddress FS_unlink FS_mkdirTree _setNetworkCallback heapObjectForWebGLType toTypedArrayIndex webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory setErrNo demangle stackTrace getFunctionArgsName createJsInvokerSignature registerInheritedInstance unregisterInheritedInstance enumReadValueFromPointer validateThis".split(" ").forEach(function(a) {
  "undefined" == typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get() {
    var b = `\`${a}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, c = a;
    c.startsWith("_") || (c = "$" + a);
    b += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${c}')`;
    Wa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    K(b);
  }});
  Ya(a);
});
"run addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency out err callMain abort wasmMemory wasmExports writeStackCookie checkStackCookie convertI32PairToI53Checked stackSave stackRestore ptrToString zeroMemory getHeapMax growMemory ENV MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE ERRNO_CODES strError DNS Protocols Sockets initRandomFill randomFill timers warnOnce readEmAsmArgsArray jstoi_s getExecutableName dynCallLegacy getDynCaller dynCall asyncLoad alignMemory mmapAlloc wasmTable noExitRuntime freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString stringToAscii UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 JSEvents specialHTMLTargets findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle UNWIND_CACHE ExitStatus getEnvStrings doReadv doWritev promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser getPreloadedImageData__data wget SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_createPath FS_createDevice FS_readFile FS FS_createDataFile FS_createLazyFile MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers GL AL GLUT EGL GLEW IDBStore SDL SDL_gfx allocateUTF8 allocateUTF8OnStack print printErr InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved embind_charCodes embind_init_charCodes readLatin1String getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack createJsInvoker UnboundTypeError PureVirtualError GenericWireTypeSize EmValType init_embind throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol extendError createNamedFunction embindRepr registeredInstances getBasestPointer getInheritedInstance getInheritedInstanceCount getLiveInheritedInstances registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer readPointer runDestructors newFunc craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle finalizationRegistry detachFinalizer_deps detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted deletionQueue flushPendingDeletes delayFunction setDelayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer char_0 char_9 makeLegalFunctionName emval_freelist emval_handles emval_symbols init_emval count_emval_handles getStringOrSymbol Emval emval_get_global emval_returnValue emval_lookupTypes emval_methodCallers emval_addMethodCaller reflectConstruct".split(" ").forEach(Ya);
var Qd;
Ma = function Rd() {
  Qd || Sd();
  Qd || (Ma = Rd);
};
function Sd() {
  function a() {
    if (!Qd && (Qd = !0, l.calledRun = !0, !ta)) {
      r(!Ja);
      Ja = !0;
      Ba();
      if (!l.noFSInit && !cc) {
        r(!cc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        cc = !0;
        l.stdin = l.stdin;
        l.stdout = l.stdout;
        l.stderr = l.stderr;
        l.stdin ? dc("stdin", l.stdin) : Zb("/dev/tty", "/dev/stdin");
        l.stdout ? dc("stdout", null, l.stdout) : Zb("/dev/tty", "/dev/stdout");
        l.stderr ? dc("stderr", null, l.stderr) : Zb("/dev/tty1", "/dev/stderr");
        var b = $b("/dev/stdin", 0), c = $b("/dev/stdout", 1), d = $b("/dev/stderr", 1);
        r(0 === b.fd, `invalid handle for stdin (${b.fd})`);
        r(1 === c.fd, `invalid handle for stdout (${c.fd})`);
        r(2 === d.fd, `invalid handle for stderr (${d.fd})`);
      }
      Kb = !1;
      Za(Ga);
      aa(l);
      l.onRuntimeInitialized?.();
      r(!l._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      Ba();
      if (l.postRun) {
        for ("function" == typeof l.postRun && (l.postRun = [l.postRun]); l.postRun.length;) {
          b = l.postRun.shift(), Ha.unshift(b);
        }
      }
      Za(Ha);
    }
  }
  if (!(0 < G)) {
    Nd();
    za();
    if (l.preRun) {
      for ("function" == typeof l.preRun && (l.preRun = [l.preRun]); l.preRun.length;) {
        Ka();
      }
    }
    Za(Fa);
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
Sd();
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