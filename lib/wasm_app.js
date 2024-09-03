
var Module = (() => {
  var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  if (typeof __filename != 'undefined') _scriptName ||= __filename;
  return (
function(moduleArg = {}) {
  var moduleRtn;

var h = moduleArg, aa, ba, ca = new Promise((a, b) => {
  aa = a;
  ba = b;
});
["_malloc", "_free", "_memory", "___indirect_function_table", "onRuntimeInitialized"].forEach(a => {
  Object.getOwnPropertyDescriptor(ca, a) || Object.defineProperty(ca, a, {get:() => p("You are getting " + a + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"), set:() => p("You are setting " + a + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),});
});
var da = "object" == typeof window, ea = "function" == typeof importScripts, fa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, ha = !da && !fa && !ea;
if (h.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}
var ia = Object.assign({}, h), q = "", la, ma;
if (fa) {
  if ("undefined" == typeof process || !process.release || "node" !== process.release.name) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  var na = process.versions.node, t = na.split(".").slice(0, 3);
  t = 10000 * t[0] + 100 * t[1] + 1 * t[2].split("-")[0];
  if (160000 > t) {
    throw Error("This emscripten-generated code requires node v16.0.0 (detected v" + na + ")");
  }
  var fs = require("fs"), oa = require("path");
  q = __dirname + "/";
  ma = a => {
    a = w(a) ? new URL(a) : oa.normalize(a);
    a = fs.readFileSync(a);
    x(a.buffer);
    return a;
  };
  la = a => {
    a = w(a) ? new URL(a) : oa.normalize(a);
    return new Promise((b, c) => {
      fs.readFile(a, void 0, (d, e) => {
        d ? c(d) : b(e.buffer);
      });
    });
  };
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
  ea && (ma = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
  la = a => w(a) ? new Promise((b, c) => {
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
var pa = h.print || console.log.bind(console), z = h.printErr || console.error.bind(console);
Object.assign(h, ia);
ia = null;
Object.getOwnPropertyDescriptor(h, "fetchSettings") && p("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
A("arguments", "arguments_");
A("thisProgram", "thisProgram");
A("quit", "quit_");
x("undefined" == typeof h.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
x("undefined" == typeof h.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
x("undefined" == typeof h.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
x("undefined" == typeof h.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
x("undefined" == typeof h.read, "Module.read option was removed");
x("undefined" == typeof h.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
x("undefined" == typeof h.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
x("undefined" == typeof h.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
x("undefined" == typeof h.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
A("asm", "wasmExports");
A("readAsync", "readAsync");
A("readBinary", "readBinary");
A("setWindowTitle", "setWindowTitle");
x(!ha, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var D;
h.wasmBinary && (D = h.wasmBinary);
A("wasmBinary", "wasmBinary");
"object" != typeof WebAssembly && z("no native wasm support detected");
var E, qa = !1;
function x(a, b) {
  a || p("Assertion failed" + (b ? ": " + b : ""));
}
var ra, F, G, sa, I, J, ta, ua;
function va() {
  var a = E.buffer;
  h.HEAP8 = ra = new Int8Array(a);
  h.HEAP16 = G = new Int16Array(a);
  h.HEAPU8 = F = new Uint8Array(a);
  h.HEAPU16 = sa = new Uint16Array(a);
  h.HEAP32 = I = new Int32Array(a);
  h.HEAPU32 = J = new Uint32Array(a);
  h.HEAPF32 = ta = new Float32Array(a);
  h.HEAPF64 = ua = new Float64Array(a);
}
x(!h.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
x("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
x(!h.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
x(!h.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
function wa() {
  var a = xa();
  x(0 == (a & 3));
  0 == a && (a += 4);
  J[a >> 2] = 34821223;
  J[a + 4 >> 2] = 2310721022;
  J[0] = 1668509029;
}
function ya() {
  if (!qa) {
    var a = xa();
    0 == a && (a += 4);
    var b = J[a >> 2], c = J[a + 4 >> 2];
    34821223 == b && 2310721022 == c || p(`Stack overflow! Stack cookie has been overwritten at ${K(a)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${K(c)} ${K(b)}`);
    1668509029 != J[0] && p("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var za = new Int16Array(1), Aa = new Int8Array(za.buffer);
za[0] = 25459;
if (115 !== Aa[0] || 99 !== Aa[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
var Ba = [], Ca = [], Da = [], Ea = !1;
function Fa() {
  var a = h.preRun.shift();
  Ba.unshift(a);
}
x(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
x(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
x(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
x(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var L = 0, M = null, N = null, Ga = {};
function Ha() {
  L++;
  h.monitorRunDependencies?.(L);
  x(!Ga["wasm-instantiate"]);
  Ga["wasm-instantiate"] = 1;
  null === M && "undefined" != typeof setInterval && (M = setInterval(() => {
    if (qa) {
      clearInterval(M), M = null;
    } else {
      var a = !1, b;
      for (b in Ga) {
        a || (a = !0, z("still waiting on run dependencies:")), z(`dependency: ${b}`);
      }
      a && z("(end of list)");
    }
  }, 10000));
}
function p(a) {
  h.onAbort?.(a);
  a = "Aborted(" + a + ")";
  z(a);
  qa = !0;
  a = new WebAssembly.RuntimeError(a);
  ba(a);
  throw a;
}
function Ia() {
  p("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM");
}
h.FS_createDataFile = function() {
  Ia();
};
h.FS_createPreloadedFile = function() {
  Ia();
};
var Ja = a => a.startsWith("data:application/octet-stream;base64,"), w = a => a.startsWith("file://");
function Ka(a, b) {
  return (...c) => {
    x(Ea, `native function \`${a}\` called before runtime initialization`);
    var d = O[a];
    x(d, `exported native function \`${a}\` not found`);
    x(c.length <= b, `native function \`${a}\` called with ${c.length} args but expects ${b}`);
    return d(...c);
  };
}
var La;
function Ma(a) {
  if (a == La && D) {
    return new Uint8Array(D);
  }
  if (ma) {
    return ma(a);
  }
  throw "both async and sync fetching of the wasm failed";
}
function Na(a) {
  return D ? Promise.resolve().then(() => Ma(a)) : la(a).then(b => new Uint8Array(b), () => Ma(a));
}
function Oa(a, b, c) {
  return Na(a).then(d => WebAssembly.instantiate(d, b)).then(c, d => {
    z(`failed to asynchronously prepare wasm: ${d}`);
    w(La) && z(`warning: Loading from a file URI (${La}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    p(d);
  });
}
function Pa(a, b) {
  var c = La;
  return D || "function" != typeof WebAssembly.instantiateStreaming || Ja(c) || w(c) || fa || "function" != typeof fetch ? Oa(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
    z(`wasm streaming compile failed: ${e}`);
    z("falling back to ArrayBuffer instantiation");
    return Oa(c, a, b);
  }));
}
function A(a, b) {
  Object.getOwnPropertyDescriptor(h, a) || Object.defineProperty(h, a, {configurable:!0, get() {
    p(`\`Module.${a}\` has been replaced by \`${b}\`` + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function Qa(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
function Ra(a, b) {
  "undefined" != typeof globalThis && Object.defineProperty(globalThis, a, {configurable:!0, get() {
    P(`\`${a}\` is not longer defined by emscripten. ${b}`);
  }});
}
Ra("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
Ra("asm", "Please use wasmExports instead");
function Sa(a) {
  Object.getOwnPropertyDescriptor(h, a) || Object.defineProperty(h, a, {configurable:!0, get() {
    var b = `'${a}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    Qa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    p(b);
  }});
}
var Ta = a => {
  for (; 0 < a.length;) {
    a.shift()(h);
  }
}, K = a => {
  x("number" === typeof a);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, P = a => {
  P.L || (P.L = {});
  P.L[a] || (P.L[a] = 1, fa && (a = "warning: " + a), z(a));
}, Va = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, Wa = (a, b, c) => {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.buffer && Va) {
    return Va.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var g = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | g);
      } else {
        var l = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | g << 6 | l : (240 != (e & 248) && P("Invalid UTF-8 leading byte " + K(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | g << 12 | l << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}, Xa = (a, b) => {
  x("number" == typeof a, `UTF8ToString expects a number (got ${typeof a})`);
  return a ? Wa(F, a, b) : "";
};
class Ya {
  constructor(a) {
    this.i = a - 24;
  }
}
var Za = 0, $a = {}, ab = a => {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
};
function bb(a) {
  return this.fromWireType(J[a >> 2]);
}
var Q = {}, R = {}, cb = {}, db, T = (a, b, c) => {
  function d(f) {
    f = c(f);
    if (f.length !== a.length) {
      throw new db("Mismatched type converter count");
    }
    for (var n = 0; n < a.length; ++n) {
      S(a[n], f[n]);
    }
  }
  a.forEach(function(f) {
    cb[f] = b;
  });
  var e = Array(b.length), g = [], l = 0;
  b.forEach((f, n) => {
    R.hasOwnProperty(f) ? e[n] = R[f] : (g.push(f), Q.hasOwnProperty(f) || (Q[f] = []), Q[f].push(() => {
      e[n] = R[f];
      ++l;
      l === g.length && d(e);
    }));
  });
  0 === g.length && d(e);
}, eb, U = a => {
  for (var b = ""; F[a];) {
    b += eb[F[a++]];
  }
  return b;
}, V, fb = a => {
  throw new V(a);
};
function gb(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new V(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (R.hasOwnProperty(a)) {
    if (c.$) {
      return;
    }
    throw new V(`Cannot register type '${d}' twice`);
  }
  R[a] = b;
  delete cb[a];
  Q.hasOwnProperty(a) && (b = Q[a], delete Q[a], b.forEach(e => e()));
}
function S(a, b, c = {}) {
  if (!("argPackAdvance" in b)) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  return gb(a, b, c);
}
var hb = a => {
  throw new V(a.g.j.h.name + " instance already deleted");
}, ib = !1, jb = () => {
}, kb = (a, b, c) => {
  if (b === c) {
    return a;
  }
  if (void 0 === c.o) {
    return null;
  }
  a = kb(a, b, c.o);
  return null === a ? null : c.T(a);
}, lb = {}, mb = [], nb = () => {
  for (; mb.length;) {
    var a = mb.pop();
    a.g.B = !1;
    a["delete"]();
  }
}, ob, pb = {}, qb = (a, b) => {
  if (void 0 === b) {
    throw new V("ptr should not be undefined");
  }
  for (; a.o;) {
    b = a.F(b), a = a.o;
  }
  return pb[b];
}, sb = (a, b) => {
  if (!b.j || !b.i) {
    throw new db("makeClassHandle requires ptr and ptrType");
  }
  if (!!b.s !== !!b.l) {
    throw new db("Both smartPtrType and smartPtr must be specified");
  }
  b.count = {value:1};
  return rb(Object.create(a, {g:{value:b, writable:!0,},}));
};
function tb(a) {
  function b() {
    return this.I ? sb(this.h.C, {j:this.aa, i:c, s:this, l:a,}) : sb(this.h.C, {j:this, i:a,});
  }
  var c = this.W(a);
  if (!c) {
    return this.N(a), null;
  }
  var d = qb(this.h, c);
  if (void 0 !== d) {
    if (0 === d.g.count.value) {
      return d.g.i = c, d.g.l = a, d.clone();
    }
    d = d.clone();
    this.N(a);
    return d;
  }
  d = this.h.V(c);
  d = lb[d];
  if (!d) {
    return b.call(this);
  }
  d = this.H ? d.S : d.pointerType;
  var e = kb(c, this.h, d.h);
  return null === e ? b.call(this) : this.I ? sb(d.h.C, {j:d, i:e, s:this, l:a,}) : sb(d.h.C, {j:d, i:e,});
}
var rb = a => {
  if ("undefined" === typeof FinalizationRegistry) {
    return rb = b => b, a;
  }
  ib = new FinalizationRegistry(b => {
    console.warn(b.P.stack.replace(/^Error: /, ""));
    b = b.g;
    --b.count.value;
    0 === b.count.value && (b.l ? b.s.v(b.l) : b.j.h.v(b.i));
  });
  rb = b => {
    var c = b.g;
    if (c.l) {
      var d = {g:c};
      d.P = Error(`Embind found a leaked C++ instance ${c.j.h.name} <${K(c.i)}>.\n` + "We'll free it automatically in this case, but this functionality is not reliable across various environments.\nMake sure to invoke .delete() manually once you're done with the instance instead.\nOriginally allocated");
      "captureStackTrace" in Error && Error.captureStackTrace(d.P, tb);
      ib.register(b, d, b);
    }
    return b;
  };
  jb = b => {
    ib.unregister(b);
  };
  return rb(a);
};
function ub() {
}
var vb = (a, b) => Object.defineProperty(b, "name", {value:a}), wb = (a, b, c) => {
  if (void 0 === a[b].m) {
    var d = a[b];
    a[b] = function(...e) {
      if (!a[b].m.hasOwnProperty(e.length)) {
        throw new V(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].m})!`);
      }
      return a[b].m[e.length].apply(this, e);
    };
    a[b].m = [];
    a[b].m[d.G] = d;
  }
}, xb = (a, b, c) => {
  if (h.hasOwnProperty(a)) {
    if (void 0 === c || void 0 !== h[a].m && void 0 !== h[a].m[c]) {
      throw new V(`Cannot register public name '${a}' twice`);
    }
    wb(h, a, a);
    if (h.hasOwnProperty(c)) {
      throw new V(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
    }
    h[a].m[c] = b;
  } else {
    h[a] = b, void 0 !== c && (h[a].ja = c);
  }
}, yb = a => {
  if (void 0 === a) {
    return "_unknown";
  }
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? `_${a}` : a;
};
function zb(a, b, c, d, e, g, l, f) {
  this.name = a;
  this.constructor = b;
  this.C = c;
  this.v = d;
  this.o = e;
  this.V = g;
  this.F = l;
  this.T = f;
  this.ba = [];
}
var Ab = (a, b, c) => {
  for (; b !== c;) {
    if (!b.F) {
      throw new V(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
    }
    a = b.F(a);
    b = b.o;
  }
  return a;
};
function Bb(a, b) {
  if (null === b) {
    if (this.J) {
      throw new V(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new V(`Cannot pass "${W(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new V(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  return Ab(b.g.i, b.g.j.h, this.h);
}
function Cb(a, b) {
  if (null === b) {
    if (this.J) {
      throw new V(`null is not a valid ${this.name}`);
    }
    if (this.I) {
      var c = this.K();
      null !== a && a.push(this.v, c);
      return c;
    }
    return 0;
  }
  if (!b || !b.g) {
    throw new V(`Cannot pass "${W(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new V(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (!this.H && b.g.j.H) {
    throw new V(`Cannot convert argument of type ${b.g.s ? b.g.s.name : b.g.j.name} to parameter type ${this.name}`);
  }
  c = Ab(b.g.i, b.g.j.h, this.h);
  if (this.I) {
    if (void 0 === b.g.l) {
      throw new V("Passing raw pointer to smart pointer is illegal");
    }
    switch(this.ha) {
      case 0:
        if (b.g.s === this) {
          c = b.g.l;
        } else {
          throw new V(`Cannot convert argument of type ${b.g.s ? b.g.s.name : b.g.j.name} to parameter type ${this.name}`);
        }
        break;
      case 1:
        c = b.g.l;
        break;
      case 2:
        if (b.g.s === this) {
          c = b.g.l;
        } else {
          var d = b.clone();
          c = this.da(c, Db(() => d["delete"]()));
          null !== a && a.push(this.v, c);
        }
        break;
      default:
        throw new V("Unsupporting sharing policy");
    }
  }
  return c;
}
function Eb(a, b) {
  if (null === b) {
    if (this.J) {
      throw new V(`null is not a valid ${this.name}`);
    }
    return 0;
  }
  if (!b.g) {
    throw new V(`Cannot pass "${W(b)}" as a ${this.name}`);
  }
  if (!b.g.i) {
    throw new V(`Cannot pass deleted object as a pointer of type ${this.name}`);
  }
  if (b.g.j.H) {
    throw new V(`Cannot convert argument of type ${b.g.j.name} to parameter type ${this.name}`);
  }
  return Ab(b.g.i, b.g.j.h, this.h);
}
function Fb(a, b, c, d, e, g, l, f, n, m, k) {
  this.name = a;
  this.h = b;
  this.J = c;
  this.H = d;
  this.I = e;
  this.aa = g;
  this.ha = l;
  this.R = f;
  this.K = n;
  this.da = m;
  this.v = k;
  e || void 0 !== b.o ? this.toWireType = Cb : (this.toWireType = d ? Bb : Eb, this.u = null);
}
var Gb = (a, b, c) => {
  if (!h.hasOwnProperty(a)) {
    throw new db("Replacing nonexistent public symbol");
  }
  void 0 !== h[a].m && void 0 !== c ? h[a].m[c] = b : (h[a] = b, h[a].G = c);
}, Hb = [], Jb, Kb = a => {
  var b = Hb[a];
  b || (a >= Hb.length && (Hb.length = a + 1), Hb[a] = b = Jb.get(a));
  x(Jb.get(a) == b, "JavaScript-side Wasm function table mirror is out of date!");
  return b;
}, Lb = (a, b, c = []) => {
  if (a.includes("j")) {
    return a = a.replace(/p/g, "i"), x("dynCall_" + a in h, `bad function pointer type - dynCall function not found for sig '${a}'`), c?.length ? x(c.length === a.substring(1).replace(/j/g, "--").length) : x(1 == a.length), (0,h["dynCall_" + a])(b, ...c);
  }
  x(Kb(b), `missing table entry in dynCall: ${b}`);
  return Kb(b)(...c);
}, Mb = (a, b) => {
  x(a.includes("j") || a.includes("p"), "getDynCaller should only be called with i64 sigs");
  return (...c) => Lb(a, b, c);
}, X = (a, b) => {
  a = U(a);
  var c = a.includes("j") ? Mb(a, b) : Kb(b);
  if ("function" != typeof c) {
    throw new V(`unknown function pointer with signature ${a}: ${b}`);
  }
  return c;
}, Nb, Pb = a => {
  a = Ob(a);
  var b = U(a);
  Y(a);
  return b;
}, Qb = (a, b) => {
  function c(g) {
    e[g] || R[g] || (cb[g] ? cb[g].forEach(c) : (d.push(g), e[g] = !0));
  }
  var d = [], e = {};
  b.forEach(c);
  throw new Nb(`${a}: ` + d.map(Pb).join([", "]));
}, Rb = (a, b) => {
  for (var c = [], d = 0; d < a; d++) {
    c.push(J[b + 4 * d >> 2]);
  }
  return c;
};
function Sb(a) {
  for (var b = 1; b < a.length; ++b) {
    if (null !== a[b] && void 0 === a[b].u) {
      return !0;
    }
  }
  return !1;
}
function Tb(a) {
  var b = Function;
  if (!(b instanceof Function)) {
    throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
  }
  var c = vb(b.name || "unknownFunctionName", function() {
  });
  c.prototype = b.prototype;
  c = new c();
  a = b.apply(c, a);
  return a instanceof Object ? a : c;
}
function Ub(a, b, c, d, e, g) {
  var l = b.length;
  if (2 > l) {
    throw new V("argTypes array size mismatch! Must at least get return value and 'this' types!");
  }
  x(!g, "Async bindings are only supported with JSPI.");
  var f = null !== b[1] && null !== c, n = Sb(b);
  c = "void" !== b[0].name;
  d = [a, fb, d, e, ab, b[0], b[1]];
  for (e = 0; e < l - 2; ++e) {
    d.push(b[e + 2]);
  }
  if (!n) {
    for (e = f ? 1 : 2; e < b.length; ++e) {
      null !== b[e].u && d.push(b[e].u);
    }
  }
  n = Sb(b);
  e = b.length;
  var m = "", k = "";
  for (l = 0; l < e - 2; ++l) {
    m += (0 !== l ? ", " : "") + "arg" + l, k += (0 !== l ? ", " : "") + "arg" + l + "Wired";
  }
  m = `
        return function (${m}) {
        if (arguments.length !== ${e - 2}) {
          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${e - 2}');
        }`;
  n && (m += "var destructors = [];\n");
  var r = n ? "destructors" : "null", u = "humanName throwBindingError invoker fn runDestructors retType classParam".split(" ");
  f && (m += "var thisWired = classParam['toWireType'](" + r + ", this);\n");
  for (l = 0; l < e - 2; ++l) {
    m += "var arg" + l + "Wired = argType" + l + "['toWireType'](" + r + ", arg" + l + ");\n", u.push("argType" + l);
  }
  f && (k = "thisWired" + (0 < k.length ? ", " : "") + k);
  m += (c || g ? "var rv = " : "") + "invoker(fn" + (0 < k.length ? ", " : "") + k + ");\n";
  if (n) {
    m += "runDestructors(destructors);\n";
  } else {
    for (l = f ? 1 : 2; l < b.length; ++l) {
      g = 1 === l ? "thisWired" : "arg" + (l - 2) + "Wired", null !== b[l].u && (m += `${g}_dtor(${g});\n`, u.push(`${g}_dtor`));
    }
  }
  c && (m += "var ret = retType['fromWireType'](rv);\nreturn ret;\n");
  m = `if (arguments.length !== ${u.length}){ throw new Error(humanName + "Expected ${u.length} closure arguments " + arguments.length + " given."); }\n${m + "}\n"}`;
  let [y, v] = [u, m];
  y.push(v);
  b = Tb(y)(...d);
  return vb(a, b);
}
var Vb = a => {
  a = a.trim();
  const b = a.indexOf("(");
  return -1 !== b ? (x(")" == a[a.length - 1], "Parentheses for argument names should match."), a.substr(0, b)) : a;
}, Wb = [], Z = [], Xb = a => {
  9 < a && 0 === --Z[a + 1] && (x(void 0 !== Z[a], "Decref for unallocated handle."), Z[a] = void 0, Wb.push(a));
}, Db = a => {
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
      const b = Wb.pop() || Z.length;
      Z[b] = a;
      Z[b + 1] = 1;
      return b;
  }
}, Yb = {name:"emscripten::val", fromWireType:a => {
  if (!a) {
    throw new V("Cannot use deleted val. handle = " + a);
  }
  x(2 === a || void 0 !== Z[a] && 0 === a % 2, `invalid handle: ${a}`);
  var b = Z[a];
  Xb(a);
  return b;
}, toWireType:(a, b) => Db(b), argPackAdvance:8, readValueFromPointer:bb, u:null,}, W = a => {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}, Zb = (a, b) => {
  switch(b) {
    case 4:
      return function(c) {
        return this.fromWireType(ta[c >> 2]);
      };
    case 8:
      return function(c) {
        return this.fromWireType(ua[c >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${b}): ${a}`);
  }
}, $b = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => ra[d] : d => F[d];
    case 2:
      return c ? d => G[d >> 1] : d => sa[d >> 1];
    case 4:
      return c ? d => I[d >> 2] : d => J[d >> 2];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
}, ac = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, bc = (a, b) => {
  x(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  var c = a >> 1;
  for (var d = c + b / 2; !(c >= d) && sa[c];) {
    ++c;
  }
  c <<= 1;
  if (32 < c - a && ac) {
    return ac.decode(F.subarray(a, c));
  }
  c = "";
  for (d = 0; !(d >= b / 2); ++d) {
    var e = G[a + 2 * d >> 1];
    if (0 == e) {
      break;
    }
    c += String.fromCharCode(e);
  }
  return c;
}, cc = (a, b, c) => {
  x(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  x("number" == typeof c, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (2 > c) {
    return 0;
  }
  c -= 2;
  var d = b;
  c = c < 2 * a.length ? c / 2 : a.length;
  for (var e = 0; e < c; ++e) {
    G[b >> 1] = a.charCodeAt(e), b += 2;
  }
  G[b >> 1] = 0;
  return b - d;
}, dc = a => 2 * a.length, ec = (a, b) => {
  x(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  for (var c = 0, d = ""; !(c >= b / 4);) {
    var e = I[a + 4 * c >> 2];
    if (0 == e) {
      break;
    }
    ++c;
    65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
  }
  return d;
}, fc = (a, b, c) => {
  x(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  x("number" == typeof c, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var g = a.charCodeAt(e);
    if (55296 <= g && 57343 >= g) {
      var l = a.charCodeAt(++e);
      g = 65536 + ((g & 1023) << 10) | l & 1023;
    }
    I[b >> 2] = g;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  I[b >> 2] = 0;
  return b - d;
}, gc = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && ++c;
    b += 4;
  }
  return b;
}, hc = [null, [], []];
db = h.InternalError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
};
for (var ic = Array(256), jc = 0; 256 > jc; ++jc) {
  ic[jc] = String.fromCharCode(jc);
}
eb = ic;
V = h.BindingError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
};
Object.assign(ub.prototype, {isAliasOf:function(a) {
  if (!(this instanceof ub && a instanceof ub)) {
    return !1;
  }
  var b = this.g.j.h, c = this.g.i;
  a.g = a.g;
  var d = a.g.j.h;
  for (a = a.g.i; b.o;) {
    c = b.F(c), b = b.o;
  }
  for (; d.o;) {
    a = d.F(a), d = d.o;
  }
  return b === d && c === a;
}, clone:function() {
  this.g.i || hb(this);
  if (this.g.D) {
    return this.g.count.value += 1, this;
  }
  var a = rb, b = Object, c = b.create, d = Object.getPrototypeOf(this), e = this.g;
  a = a(c.call(b, d, {g:{value:{count:e.count, B:e.B, D:e.D, i:e.i, j:e.j, l:e.l, s:e.s,},}}));
  a.g.count.value += 1;
  a.g.B = !1;
  return a;
}, ["delete"]() {
  this.g.i || hb(this);
  if (this.g.B && !this.g.D) {
    throw new V("Object already scheduled for deletion");
  }
  jb(this);
  var a = this.g;
  --a.count.value;
  0 === a.count.value && (a.l ? a.s.v(a.l) : a.j.h.v(a.i));
  this.g.D || (this.g.l = void 0, this.g.i = void 0);
}, isDeleted:function() {
  return !this.g.i;
}, deleteLater:function() {
  this.g.i || hb(this);
  if (this.g.B && !this.g.D) {
    throw new V("Object already scheduled for deletion");
  }
  mb.push(this);
  1 === mb.length && ob && ob(nb);
  this.g.B = !0;
  return this;
},});
h.getInheritedInstanceCount = () => Object.keys(pb).length;
h.getLiveInheritedInstances = () => {
  var a = [], b;
  for (b in pb) {
    pb.hasOwnProperty(b) && a.push(pb[b]);
  }
  return a;
};
h.flushPendingDeletes = nb;
h.setDelayFunction = a => {
  ob = a;
  mb.length && ob && ob(nb);
};
Object.assign(Fb.prototype, {W(a) {
  this.R && (a = this.R(a));
  return a;
}, N(a) {
  this.v?.(a);
}, argPackAdvance:8, readValueFromPointer:bb, fromWireType:tb,});
Nb = h.UnboundTypeError = ((a, b) => {
  var c = vb(b, function(d) {
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
x(10 === Z.length);
h.count_emval_handles = () => Z.length / 2 - 5 - Wb.length;
var lc = {__assert_fail:(a, b, c, d) => {
  p(`Assertion failed: ${Xa(a)}, at: ` + [b ? Xa(b) : "unknown filename", c, d ? Xa(d) : "unknown function"]);
}, __cxa_throw:(a, b, c) => {
  a = new Ya(a);
  J[a.i + 16 >> 2] = 0;
  J[a.i + 4 >> 2] = b;
  J[a.i + 8 >> 2] = c;
  Za++;
  x(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, _abort_js:() => {
  p("native code called abort()");
}, _embind_finalize_value_object:a => {
  var b = $a[a];
  delete $a[a];
  var c = b.K, d = b.v, e = b.O, g = e.map(l => l.Z).concat(e.map(l => l.fa));
  T([a], g, l => {
    var f = {};
    e.forEach((n, m) => {
      var k = l[m], r = n.X, u = n.Y, y = l[m + e.length], v = n.ea, C = n.ga;
      f[n.U] = {read:H => k.fromWireType(r(u, H)), write:(H, ja) => {
        var B = [];
        v(C, H, y.toWireType(B, ja));
        ab(B);
      }};
    });
    return [{name:b.name, fromWireType:n => {
      var m = {}, k;
      for (k in f) {
        m[k] = f[k].read(n);
      }
      d(n);
      return m;
    }, toWireType:(n, m) => {
      for (var k in f) {
        if (!(k in m)) {
          throw new TypeError(`Missing field: "${k}"`);
        }
      }
      var r = c();
      for (k in f) {
        f[k].write(r, m[k]);
      }
      null !== n && n.push(d, r);
      return r;
    }, argPackAdvance:8, readValueFromPointer:bb, u:d,}];
  });
}, _embind_register_bigint:() => {
}, _embind_register_bool:(a, b, c, d) => {
  b = U(b);
  S(a, {name:b, fromWireType:function(e) {
    return !!e;
  }, toWireType:function(e, g) {
    return g ? c : d;
  }, argPackAdvance:8, readValueFromPointer:function(e) {
    return this.fromWireType(F[e]);
  }, u:null,});
}, _embind_register_class:(a, b, c, d, e, g, l, f, n, m, k, r, u) => {
  k = U(k);
  g = X(e, g);
  f &&= X(l, f);
  m &&= X(n, m);
  u = X(r, u);
  var y = yb(k);
  xb(y, function() {
    Qb(`Cannot construct ${k} due to unbound types`, [d]);
  });
  T([a, b, c], d ? [d] : [], v => {
    v = v[0];
    if (d) {
      var C = v.h;
      var H = C.C;
    } else {
      H = ub.prototype;
    }
    v = vb(k, function(...Ua) {
      if (Object.getPrototypeOf(this) !== ja) {
        throw new V("Use 'new' to construct " + k);
      }
      if (void 0 === B.A) {
        throw new V(k + " has no accessible constructor");
      }
      var Ib = B.A[Ua.length];
      if (void 0 === Ib) {
        throw new V(`Tried to invoke ctor of ${k} with invalid number of parameters (${Ua.length}) - expected (${Object.keys(B.A).toString()}) parameters instead!`);
      }
      return Ib.apply(this, Ua);
    });
    var ja = Object.create(H, {constructor:{value:v},});
    v.prototype = ja;
    var B = new zb(k, v, ja, u, C, g, f, m);
    if (B.o) {
      var ka;
      (ka = B.o).M ?? (ka.M = []);
      B.o.M.push(B);
    }
    C = new Fb(k, B, !0, !1, !1);
    ka = new Fb(k + "*", B, !1, !1, !1);
    H = new Fb(k + " const*", B, !1, !0, !1);
    lb[a] = {pointerType:ka, S:H};
    Gb(y, v);
    return [C, ka, H];
  });
}, _embind_register_class_constructor:(a, b, c, d, e, g) => {
  x(0 < b);
  var l = Rb(b, c);
  e = X(d, e);
  T([], [a], f => {
    f = f[0];
    var n = `constructor ${f.name}`;
    void 0 === f.h.A && (f.h.A = []);
    if (void 0 !== f.h.A[b - 1]) {
      throw new V(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${f.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
    }
    f.h.A[b - 1] = () => {
      Qb(`Cannot construct ${f.name} due to unbound types`, l);
    };
    T([], l, m => {
      m.splice(1, 0, null);
      f.h.A[b - 1] = Ub(n, m, null, e, g);
      return [];
    });
    return [];
  });
}, _embind_register_class_function:(a, b, c, d, e, g, l, f, n) => {
  var m = Rb(c, d);
  b = U(b);
  b = Vb(b);
  g = X(e, g);
  T([], [a], k => {
    function r() {
      Qb(`Cannot call ${u} due to unbound types`, m);
    }
    k = k[0];
    var u = `${k.name}.${b}`;
    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
    f && k.h.ba.push(b);
    var y = k.h.C, v = y[b];
    void 0 === v || void 0 === v.m && v.className !== k.name && v.G === c - 2 ? (r.G = c - 2, r.className = k.name, y[b] = r) : (wb(y, b, u), y[b].m[c - 2] = r);
    T([], m, C => {
      C = Ub(u, C, k, g, l, n);
      void 0 === y[b].m ? (C.G = c - 2, y[b] = C) : y[b].m[c - 2] = C;
      return [];
    });
    return [];
  });
}, _embind_register_emval:a => S(a, Yb), _embind_register_float:(a, b, c) => {
  b = U(b);
  S(a, {name:b, fromWireType:d => d, toWireType:(d, e) => {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${W(e)} to ${this.name}`);
    }
    return e;
  }, argPackAdvance:8, readValueFromPointer:Zb(b, c), u:null,});
}, _embind_register_function:(a, b, c, d, e, g, l) => {
  var f = Rb(b, c);
  a = U(a);
  a = Vb(a);
  e = X(d, e);
  xb(a, function() {
    Qb(`Cannot call ${a} due to unbound types`, f);
  }, b - 1);
  T([], f, n => {
    n = [n[0], null].concat(n.slice(1));
    Gb(a, Ub(a, n, null, e, g, l), b - 1);
    return [];
  });
}, _embind_register_integer:(a, b, c, d, e) => {
  b = U(b);
  -1 === e && (e = 4294967295);
  var g = m => m;
  if (0 === d) {
    var l = 32 - 8 * c;
    g = m => m << l >>> l;
  }
  var f = (m, k) => {
    if ("number" != typeof m && "boolean" != typeof m) {
      throw new TypeError(`Cannot convert "${W(m)}" to ${k}`);
    }
    if (m < d || m > e) {
      throw new TypeError(`Passing a number "${W(m)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
    }
  };
  var n = b.includes("unsigned") ? function(m, k) {
    f(k, this.name);
    return k >>> 0;
  } : function(m, k) {
    f(k, this.name);
    return k;
  };
  S(a, {name:b, fromWireType:g, toWireType:n, argPackAdvance:8, readValueFromPointer:$b(b, c, 0 !== d), u:null,});
}, _embind_register_memory_view:(a, b, c) => {
  function d(g) {
    return new e(ra.buffer, J[g + 4 >> 2], J[g >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,][b];
  c = U(c);
  S(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d,}, {$:!0,});
}, _embind_register_optional:a => {
  S(a, Yb);
}, _embind_register_std_string:(a, b) => {
  b = U(b);
  var c = "std::string" === b;
  S(a, {name:b, fromWireType:function(d) {
    var e = J[d >> 2], g = d + 4;
    if (c) {
      for (var l = g, f = 0; f <= e; ++f) {
        var n = g + f;
        if (f == e || 0 == F[n]) {
          l = Xa(l, n - l);
          if (void 0 === m) {
            var m = l;
          } else {
            m += String.fromCharCode(0), m += l;
          }
          l = n + 1;
        }
      }
    } else {
      m = Array(e);
      for (f = 0; f < e; ++f) {
        m[f] = String.fromCharCode(F[g + f]);
      }
      m = m.join("");
    }
    Y(d);
    return m;
  }, toWireType:function(d, e) {
    e instanceof ArrayBuffer && (e = new Uint8Array(e));
    var g = "string" == typeof e;
    if (!(g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array)) {
      throw new V("Cannot pass non-string to std::string");
    }
    var l;
    if (c && g) {
      for (var f = l = 0; f < e.length; ++f) {
        var n = e.charCodeAt(f);
        127 >= n ? l++ : 2047 >= n ? l += 2 : 55296 <= n && 57343 >= n ? (l += 4, ++f) : l += 3;
      }
    } else {
      l = e.length;
    }
    n = l;
    l = kc(4 + n + 1);
    f = l + 4;
    J[l >> 2] = n;
    if (c && g) {
      if (n += 1, x("number" == typeof n, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), g = f, f = F, x("string" === typeof e, `stringToUTF8Array expects a string (got ${typeof e})`), 0 < n) {
        n = g + n - 1;
        for (var m = 0; m < e.length; ++m) {
          var k = e.charCodeAt(m);
          if (55296 <= k && 57343 >= k) {
            var r = e.charCodeAt(++m);
            k = 65536 + ((k & 1023) << 10) | r & 1023;
          }
          if (127 >= k) {
            if (g >= n) {
              break;
            }
            f[g++] = k;
          } else {
            if (2047 >= k) {
              if (g + 1 >= n) {
                break;
              }
              f[g++] = 192 | k >> 6;
            } else {
              if (65535 >= k) {
                if (g + 2 >= n) {
                  break;
                }
                f[g++] = 224 | k >> 12;
              } else {
                if (g + 3 >= n) {
                  break;
                }
                1114111 < k && P("Invalid Unicode code point " + K(k) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
                f[g++] = 240 | k >> 18;
                f[g++] = 128 | k >> 12 & 63;
              }
              f[g++] = 128 | k >> 6 & 63;
            }
            f[g++] = 128 | k & 63;
          }
        }
        f[g] = 0;
      }
    } else {
      if (g) {
        for (g = 0; g < n; ++g) {
          m = e.charCodeAt(g);
          if (255 < m) {
            throw Y(f), new V("String has UTF-16 code units that do not fit in 8 bits");
          }
          F[f + g] = m;
        }
      } else {
        for (g = 0; g < n; ++g) {
          F[f + g] = e[g];
        }
      }
    }
    null !== d && d.push(Y, l);
    return l;
  }, argPackAdvance:8, readValueFromPointer:bb, u(d) {
    Y(d);
  },});
}, _embind_register_std_wstring:(a, b, c) => {
  c = U(c);
  if (2 === b) {
    var d = bc;
    var e = cc;
    var g = dc;
    var l = f => sa[f >> 1];
  } else {
    4 === b && (d = ec, e = fc, g = gc, l = f => J[f >> 2]);
  }
  S(a, {name:c, fromWireType:f => {
    for (var n = J[f >> 2], m, k = f + 4, r = 0; r <= n; ++r) {
      var u = f + 4 + r * b;
      if (r == n || 0 == l(u)) {
        k = d(k, u - k), void 0 === m ? m = k : (m += String.fromCharCode(0), m += k), k = u + b;
      }
    }
    Y(f);
    return m;
  }, toWireType:(f, n) => {
    if ("string" != typeof n) {
      throw new V(`Cannot pass non-string to C++ string type ${c}`);
    }
    var m = g(n), k = kc(4 + m + b);
    J[k >> 2] = m / b;
    e(n, k + 4, m + b);
    null !== f && f.push(Y, k);
    return k;
  }, argPackAdvance:8, readValueFromPointer:bb, u(f) {
    Y(f);
  }});
}, _embind_register_value_object:(a, b, c, d, e, g) => {
  $a[a] = {name:U(b), K:X(c, d), v:X(e, g), O:[],};
}, _embind_register_value_object_field:(a, b, c, d, e, g, l, f, n, m) => {
  $a[a].O.push({U:U(b), Z:c, X:X(d, e), Y:g, fa:l, ea:X(f, n), ga:m,});
}, _embind_register_void:(a, b) => {
  b = U(b);
  S(a, {ia:!0, name:b, argPackAdvance:0, fromWireType:() => {
  }, toWireType:() => {
  },});
}, _emscripten_memcpy_js:(a, b, c) => F.copyWithin(a, b, b + c), _emval_decref:Xb, _emval_take_value:(a, b) => {
  var c = R[a];
  if (void 0 === c) {
    throw a = `${"_emval_take_value"} has unknown type ${Pb(a)}`, new V(a);
  }
  a = c;
  a = a.readValueFromPointer(b);
  return Db(a);
}, emscripten_resize_heap:a => {
  var b = F.length;
  a >>>= 0;
  x(a > b);
  if (2147483648 < a) {
    return z(`Cannot enlarge memory, requested ${a} bytes, but the limit is ${2147483648} bytes!`), !1;
  }
  for (var c = 1; 4 >= c; c *= 2) {
    var d = b * (1 + 0.2 / c);
    d = Math.min(d, a + 100663296);
    var e = Math;
    d = Math.max(a, d);
    e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536);
    a: {
      d = e;
      var g = E.buffer, l = (d - g.byteLength + 65535) / 65536;
      try {
        E.grow(l);
        va();
        var f = 1;
        break a;
      } catch (n) {
        z(`growMemory: Attempted to grow heap from ${g.byteLength} bytes to ${d} bytes, but got error: ${n}`);
      }
      f = void 0;
    }
    if (f) {
      return !0;
    }
  }
  z(`Failed to grow the heap from ${b} bytes to ${e} bytes, not enough memory!`);
  return !1;
}, fd_close:() => {
  p("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM");
}, fd_seek:function(a, b, c) {
  x(b == b >>> 0 || b == (b | 0));
  x(c === (c | 0));
  return 70;
}, fd_write:(a, b, c, d) => {
  for (var e = 0, g = 0; g < c; g++) {
    var l = J[b >> 2], f = J[b + 4 >> 2];
    b += 8;
    for (var n = 0; n < f; n++) {
      var m = a, k = F[l + n], r = hc[m];
      x(r);
      0 === k || 10 === k ? ((1 === m ? pa : z)(Wa(r, 0)), r.length = 0) : r.push(k);
    }
    e += f;
  }
  J[d >> 2] = e;
  return 0;
}}, O = function() {
  function a(d) {
    O = d.exports;
    E = O.memory;
    x(E, "memory not found in wasm exports");
    va();
    Jb = O.__indirect_function_table;
    x(Jb, "table not found in wasm exports");
    Ca.unshift(O.__wasm_call_ctors);
    L--;
    h.monitorRunDependencies?.(L);
    x(Ga["wasm-instantiate"]);
    delete Ga["wasm-instantiate"];
    0 == L && (null !== M && (clearInterval(M), M = null), N && (d = N, N = null, d()));
    return O;
  }
  var b = {env:lc, wasi_snapshot_preview1:lc,};
  Ha();
  var c = h;
  if (h.instantiateWasm) {
    try {
      return h.instantiateWasm(b, a);
    } catch (d) {
      z(`Module.instantiateWasm callback failed with error: ${d}`), ba(d);
    }
  }
  La ||= Ja("wasm_app.wasm") ? "wasm_app.wasm" : h.locateFile ? h.locateFile("wasm_app.wasm", q) : q + "wasm_app.wasm";
  Pa(b, function(d) {
    x(h === c, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    c = null;
    a(d.instance);
  }).catch(ba);
  return {};
}(), Ob = Ka("__getTypeName", 1), kc = h._malloc = Ka("malloc", 1), Y = h._free = Ka("free", 1), mc = () => (mc = O.emscripten_stack_init)(), xa = () => (xa = O.emscripten_stack_get_end)();
h.dynCall_jiji = Ka("dynCall_jiji", 5);
"writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertU32PairToI53 stackAlloc getTempRet0 setTempRet0 zeroMemory exitJS isLeapYear ydayFromDate arraySum addDays strError inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr initRandomFill randomFill emscriptenLog readEmAsmArgs jstoi_q getExecutableName listenOnce autoResumeAudioContext handleException keepRuntimeAlive runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asmjsMangle asyncLoad alignMemory mmapAlloc HandleAllocator getNativeTypeSize STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS getCFunc ccall cwrap uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction reallyNegative unSign strLen reSign formatString intArrayFromString intArrayToString AsciiToString stringToAscii stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory registerKeyEventCallback maybeCStringToJsString findEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace getCallstack convertPCtoSourceLocation getEnvStrings checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags createDyncallWrapper safeSetTimeout setImmediateWrapped clearImmediateWrapped polyfillSetImmediate getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter setMainLoop getSocketFromFD getSocketAddress FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar FS_unlink FS_createDataFile FS_mkdirTree _setNetworkCallback heapObjectForWebGLType toTypedArrayIndex webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory setErrNo demangle stackTrace getFunctionArgsName createJsInvokerSignature registerInheritedInstance unregisterInheritedInstance enumReadValueFromPointer validateThis getStringOrSymbol emval_get_global emval_returnValue emval_lookupTypes emval_addMethodCaller".split(" ").forEach(function(a) {
  "undefined" == typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get() {
    var b = `\`${a}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, c = a;
    c.startsWith("_") || (c = "$" + a);
    b += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${c}')`;
    Qa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    P(b);
  }});
  Sa(a);
});
"run addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency out err callMain abort wasmMemory wasmExports writeStackCookie checkStackCookie convertI32PairToI53Checked stackSave stackRestore ptrToString getHeapMax growMemory ENV MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE ERRNO_CODES DNS Protocols Sockets timers warnOnce readEmAsmArgsArray jstoi_s dynCallLegacy getDynCaller dynCall wasmTable noExitRuntime freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 JSEvents specialHTMLTargets findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle UNWIND_CACHE ExitStatus flush_NO_FILESYSTEM promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser getPreloadedImageData__data wget SYSCALLS preloadPlugins FS_stdin_getChar_buffer FS_createPath FS_createDevice FS_readFile FS FS_createLazyFile MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers GL AL GLUT EGL GLEW IDBStore SDL SDL_gfx allocateUTF8 allocateUTF8OnStack print printErr InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved embind_charCodes embind_init_charCodes readLatin1String getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack createJsInvoker UnboundTypeError PureVirtualError GenericWireTypeSize EmValType init_embind throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol extendError createNamedFunction embindRepr registeredInstances getBasestPointer getInheritedInstance getInheritedInstanceCount getLiveInheritedInstances registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer readPointer runDestructors newFunc craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle finalizationRegistry detachFinalizer_deps detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted deletionQueue flushPendingDeletes delayFunction setDelayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer char_0 char_9 makeLegalFunctionName emval_freelist emval_handles emval_symbols init_emval count_emval_handles Emval emval_methodCallers reflectConstruct".split(" ").forEach(Sa);
var nc;
N = function oc() {
  nc || pc();
  nc || (N = oc);
};
function pc() {
  function a() {
    if (!nc && (nc = !0, h.calledRun = !0, !qa)) {
      x(!Ea);
      Ea = !0;
      ya();
      Ta(Ca);
      aa(h);
      h.onRuntimeInitialized?.();
      x(!h._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      ya();
      if (h.postRun) {
        for ("function" == typeof h.postRun && (h.postRun = [h.postRun]); h.postRun.length;) {
          var b = h.postRun.shift();
          Da.unshift(b);
        }
      }
      Ta(Da);
    }
  }
  if (!(0 < L)) {
    mc();
    wa();
    if (h.preRun) {
      for ("function" == typeof h.preRun && (h.preRun = [h.preRun]); h.preRun.length;) {
        Fa();
      }
    }
    Ta(Ba);
    0 < L || (h.setStatus ? (h.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        h.setStatus("");
      }, 1);
      a();
    }, 1)) : a(), ya());
  }
}
if (h.preInit) {
  for ("function" == typeof h.preInit && (h.preInit = [h.preInit]); 0 < h.preInit.length;) {
    h.preInit.pop()();
  }
}
pc();
moduleRtn = ca;
for (const a of Object.keys(h)) {
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