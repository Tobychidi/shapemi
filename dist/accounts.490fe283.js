// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1SREm":[function(require,module,exports) {
var HMR_HOST = null;var HMR_PORT = 1234;var HMR_SECURE = false;var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";module.bundle.HMR_BUNDLE_ID = "83c69b303bfa3c77243c0c5a490fe283";/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */

var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function(fn) {
      this._acceptCallbacks.push(fn || function() {});
    },
    dispose: function(fn) {
      this._disposeCallbacks.push(fn);
    },
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets;

function getHostname() {
  return (
    HMR_HOST ||
    (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost')
  );
}

function getPort() {
  return HMR_PORT || location.port;
}

// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol =
    HMR_SECURE ||
    (location.protocol == 'https:' &&
      !/localhost|127.0.0.1|0.0.0.0/.test(hostname))
      ? 'wss'
      : 'ws';
  var ws = new WebSocket(
    protocol + '://' + hostname + (port ? ':' + port : '') + '/',
  );
  ws.onmessage = function(event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};

    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();

      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);

      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept =
          asset.type === 'css' ||
          (asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset));
        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();

        assets.forEach(function(asset) {
          hmrApply(module.bundle.root, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe
          ? ansiDiagnostic.codeframe
          : ansiDiagnostic.stack;

        console.error(
          '🚨 [parcel]: ' +
            ansiDiagnostic.message +
            '\n' +
            stack +
            '\n\n' +
            ansiDiagnostic.hints.join('\n'),
        );
      }

      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function(e) {
    console.error(e.message);
  };
  ws.onclose = function(e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  let errorHTML =
    '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;

    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';

  overlay.innerHTML = errorHTML;

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function() {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute(
    'href',
    link.getAttribute('href').split('?')[0] + '?' + Date.now(),
  );
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function() {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer =
        hostname === 'localhost'
          ? new RegExp(
              '^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort(),
            ).test(href)
          : href.indexOf(hostname + ':' + getPort());
      var absolute =
        /^https?:\/\//i.test(href) &&
        href.indexOf(window.location.origin) !== 0 &&
        !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (asset.type === 'css') {
    reloadCSS();
    return;
  }

  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!asset.depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }

    return hmrAcceptCheck(bundle.parent, asset);
  }

  let id = asset.id;
  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;

  var cached = bundle.cache[id];

  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(module.bundle.root, id).some(function(v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function(cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function(cb) {
      var assetsToAlsoAccept = cb(function() {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"4Ekgk":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _routerjs = require("routerjs");
const router = _routerjs.createRouter().get('#login', (req, context) => {
  alert('this is');
}).get('#signup', (req, context) => {
  alert('Signup');
}).run();
exports.default = router;

},{"routerjs":"3ectn","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3ectn":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/';

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
  // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER;
  var whitelist = (options && options.whitelist) || undefined;
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue
    }

    var prev = '';
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;
      var c = path[k];
      var matches = whitelist ? whitelist.indexOf(c) > -1 : true;

      if (matches) {
        prev = c;
        path = path.slice(0, k);
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var pattern = capture || group;
    var delimiter = prev || defaultDelimiter;

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: pattern
        ? escapeGroup(pattern)
        : '[^' + escapeString(delimiter === defaultDelimiter ? delimiter : (delimiter + defaultDelimiter)) + ']+?'
    });
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
    }
  }

  return function (data, options) {
    var path = '';
    var encode = (options && options.encode) || encodeURIComponent;
    var validate = options ? options.validate !== false : true;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue
      }

      var value = data ? data[token.name] : undefined;
      var segment;

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token);

          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token);

        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment;
        continue
      }

      if (token.optional) continue

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      });
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {};

  var strict = options.strict;
  var start = options.start !== false;
  var end = options.end !== false;
  var delimiter = options.delimiter || DEFAULT_DELIMITER;
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
  var route = start ? '^' : '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'
        : token.pattern;

      if (keys) keys.push(token);

      if (token.optional) {
        if (!token.prefix) {
          route += '(' + capture + ')?';
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?';
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')';
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + escapeString(delimiter) + ')?';

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === 'string'
      ? endToken[endToken.length - 1] === delimiter
      : endToken === undefined;

    if (!strict) route += '(?:' + escapeString(delimiter) + '(?=' + endsWith + '))?';
    if (!isEndDelimited) route += '(?=' + escapeString(delimiter) + '|' + endsWith + ')';
  }

  return new RegExp(route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

var defaultOptions = {
    bindClick: true,
};
var hasDifferentOrigin = function (href) {
    var url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
};
var BrowserHistoryEngine = function (opt) {
    if (opt === void 0) { opt = {}; }
    return function () {
        var engine;
        var options = __assign(__assign({}, defaultOptions), opt);
        var handlers = [];
        var exitHandlers = [];
        var previousPath = null;
        var executeHandlers = function (path) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, handlers.reduce(function (acc, h) {
                            return acc.then(function () { return h(path); });
                        }, Promise.resolve())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        var executeExitHandlers = function (path) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exitHandlers.reduce(function (acc, h) {
                            return acc.then(function () { return h(path); });
                        }, Promise.resolve())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        var clickHandler = function (e) {
            var target = e.target;
            while (target && target.nodeName.toUpperCase() !== 'A') {
                target = target.parentNode;
            }
            if (target && target.nodeName.toUpperCase() === 'A') {
                if (target.hasAttribute('data-routerjs-ignore') ||
                    target.hasAttribute('download') ||
                    target.hasAttribute('target') ||
                    target.getAttribute('rel') === 'external') {
                    return;
                }
                var href = target.getAttribute('href');
                if (href &&
                    (hasDifferentOrigin(href) ||
                        href.indexOf('mailto:') === 0 ||
                        href.indexOf('tel:') === 0)) {
                    return;
                }
                e.preventDefault();
                engine.navigate(target.pathname);
            }
        };
        var popStateHandler = function (_ev) { return __awaiter(void 0, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = window.location.pathname;
                        if (!(previousPath !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, executeExitHandlers(previousPath)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        previousPath = path;
                        return [4 /*yield*/, executeHandlers(path)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        engine = {
            setup: function () {
                window.addEventListener('popstate', popStateHandler);
                if (options.bindClick) {
                    window.addEventListener('click', clickHandler);
                }
            },
            teardown: function () {
                window.removeEventListener('popstate', popStateHandler);
                window.removeEventListener('click', clickHandler);
            },
            addRouteChangeHandler: function (handler) {
                handlers.push(handler);
            },
            addRouteExitHandler: function (handler) {
                exitHandlers.push(handler);
            },
            navigate: function (path) { return __awaiter(void 0, void 0, void 0, function () {
                var currentPath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentPath = "" + window.location.pathname + window.location.search;
                            if (!(currentPath !== path)) return [3 /*break*/, 4];
                            if (!(previousPath !== null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, executeExitHandlers(previousPath)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            previousPath = path;
                            window.history.pushState({}, '', path);
                            return [4 /*yield*/, executeHandlers(path)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); },
            back: function () {
                window.history.back();
            },
            forward: function () {
                window.history.forward();
            },
            go: function (n) {
                window.history.go(n);
            },
            setLocation: function (path) {
                if (window.location.pathname !== path) {
                    window.history.pushState({}, '', path);
                }
            },
            run: function (path) {
                var currentPath = "" + window.location.pathname + window.location.search;
                var url = path || currentPath;
                if (currentPath !== url) {
                    window.history.pushState({}, '', url);
                }
                executeHandlers(url);
            },
        };
        return engine;
    };
};

// -------------------------- Implementation
var LEADING_BACKSLASHES_MATCH = /\/*$/;
var createContext = function (path) {
    var context = {
        path: path,
        set: function (key, value) {
            context[key] = value;
        },
    };
    return context;
};
var createRequest = function (_a) {
    var path = _a.path, params = _a.params, splats = _a.splats;
    var _b = path.split('?'), _ = _b[0], queryString = _b[1];
    var query = (queryString || '').split('&').reduce(function (acc, q) {
        var _a;
        var _b = q.split('='), k = _b[0], v = _b[1];
        if (!k)
            return acc;
        return __assign(__assign({}, acc), (_a = {}, _a[decodeURIComponent(k)] = decodeURIComponent(v), _a));
    }, {});
    var isStopped = false;
    var req = {
        get: function (key, def) {
            // eslint-disable-next-line no-nested-ternary
            return req.params && req.params[key] !== undefined
                ? req.params[key]
                : req.query && key in req.query // eslint-disable-line no-nested-ternary
                    ? req.query[key]
                    : def !== undefined
                        ? def
                        : undefined;
        },
        path: path,
        params: params,
        splats: splats,
        query: query,
        stop: function () {
            isStopped = true;
        },
        isStopped: function () { return isStopped; },
    };
    return req;
};
var createExecuteRoutes = function (context) {
    var executeRoutes = function (matchedRoutes, always, path) { return __awaiter(void 0, void 0, void 0, function () {
        var route, params, splats, pathWithoutQuery, match, j, k, req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(matchedRoutes.length > 0)) return [3 /*break*/, 2];
                    route = matchedRoutes[0];
                    params = {};
                    splats = [];
                    pathWithoutQuery = path.split('?')[0];
                    match = pathWithoutQuery.match(route.path);
                    /* istanbul ignore else */
                    if (match) {
                        j = 0;
                        for (j = 0; j < route.paramNames.length; j++) {
                            params[route.paramNames[j].name] = match[j + 1];
                        }
                        /* If any other match put them in request splat */
                        /* istanbul ignore else */
                        if (j < match.length) {
                            for (k = j; k < match.length; k++) {
                                splats.push(match[k]);
                            }
                        }
                    }
                    req = createRequest({
                        path: path,
                        params: params,
                        splats: splats,
                    });
                    return [4 /*yield*/, route.callback(req, context)];
                case 1:
                    _a.sent();
                    if (!req.isStopped() && matchedRoutes.length > 1) {
                        return [2 /*return*/, executeRoutes(matchedRoutes.slice(1), always, path)];
                    }
                    _a.label = 2;
                case 2:
                    if (!(always.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, always[0](context)];
                case 3:
                    _a.sent();
                    if (always.length > 1) {
                        return [2 /*return*/, executeRoutes([], always.slice(1), path)];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, Promise.resolve()];
            }
        });
    }); };
    return executeRoutes;
};
var defaultOptions$1 = {
    ignoreCase: false,
    basePath: '/',
    engine: BrowserHistoryEngine(),
};
var createRouter = function (opt) {
    var handlers = {
        routes: [],
        exits: [],
    };
    var always = [];
    var errors = new Map();
    var options = __assign(__assign({}, defaultOptions$1), opt);
    var engine = options.engine();
    var cleanBasePath = options.basePath.replace(LEADING_BACKSLASHES_MATCH, '');
    var basePathRegExp = new RegExp("^" + cleanBasePath);
    /* eslint-disable no-console */
    errors.set(500, [
        function (e, context) {
            /* istanbul ignore else */
            if (console && console.error) {
                console.error("500 - path: \"" + context.path + "\"");
                console.error(e);
            }
        },
    ]);
    errors.set(404, [
        function (e, context) {
            /* istanbul ignore else */
            if (console && console.warn) {
                console.warn("404 - path: \"" + context.path + "\"");
                console.warn(e);
            }
        },
    ]);
    /* eslint-enable no-console */
    var errorThrowerFactory = function (context) { return function (error) {
        var _a = error.statusCode, statusCode = _a === void 0 ? 500 : _a;
        var callbacks = errors.get(statusCode);
        var alwaysCallbacks = errors.get('*');
        /* istanbul ignore else */
        if (callbacks || alwaysCallbacks) {
            if (callbacks && callbacks.length > 0) {
                callbacks.forEach(function (callback) {
                    callback(error, context);
                });
            }
            if (alwaysCallbacks && alwaysCallbacks.length > 0) {
                alwaysCallbacks.forEach(function (callback) {
                    callback(error, context);
                });
            }
        }
        else {
            throw error;
        }
    }; };
    var onNavigation = function (collectionName) { return function (path) { return __awaiter(void 0, void 0, void 0, function () {
        var routes, matchedIndexes, cleanPath, urlToTest, i, len, route, context, e, executeRoutes, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routes = handlers[collectionName];
                    matchedIndexes = [];
                    cleanPath = path.replace(basePathRegExp, '');
                    cleanPath = cleanPath === '' ? '/' : cleanPath;
                    urlToTest = path.split('?')[0];
                    urlToTest = urlToTest.replace(basePathRegExp, '');
                    urlToTest = urlToTest === '' ? '/' : urlToTest;
                    for (i = 0, len = routes.length; i < len; i++) {
                        route = routes[i];
                        if (route.path.test(urlToTest)) {
                            matchedIndexes.push(i);
                        }
                    }
                    context = createContext(cleanPath);
                    if (!(collectionName === 'routes' && matchedIndexes.length === 0)) return [3 /*break*/, 1];
                    e = new Error("Path \"" + cleanPath + "\" not matched");
                    e.statusCode = 404;
                    errorThrowerFactory(context)(e);
                    return [3 /*break*/, 4];
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    executeRoutes = createExecuteRoutes(context);
                    return [4 /*yield*/, executeRoutes(matchedIndexes.map(function (i) { return routes[i]; }), always, cleanPath)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    errorThrowerFactory(context)(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }; };
    engine.setup();
    engine.addRouteChangeHandler(onNavigation('routes'));
    engine.addRouteExitHandler(onNavigation('exits'));
    var addRouteToCollection = function (collectionName) { return function (path, callback) {
        if (!callback) {
            throw new Error("Missing callback for path \"" + path + "\"");
        }
        var routes = handlers[collectionName];
        var paramNames = [];
        var finalPath = pathToRegexp_1(path, paramNames, {
            sensitive: !options.ignoreCase,
            strict: false,
        });
        routes.push({
            url: path,
            path: finalPath,
            paramNames: paramNames,
            callback: callback,
        });
    }; };
    var router = {
        get: function (path, callback) {
            addRouteToCollection('routes')(path, callback);
            return router;
        },
        exit: function (path, callback) {
            addRouteToCollection('exits')(path, callback);
            return router;
        },
        always: function (callback) {
            if (!callback) {
                throw new Error('A callback is mandatory when defining an "always" callback!');
            }
            always.push(callback);
            return router;
        },
        error: function (errorCode, callback) {
            errors.set(errorCode, __spreadArrays((errors.get(errorCode) || []), [callback]));
            return router;
        },
        run: function (path) {
            engine.run(path);
            return router;
        },
        teardown: function () {
            engine.teardown();
            return router;
        },
        navigate: engine.navigate,
        go: engine.go,
        back: engine.back,
        forward: engine.forward,
        setLocation: engine.setLocation,
        buildUrl: function (path) { return "" + cleanBasePath + path; },
        getOptions: function () { return (__assign(__assign({}, options), { basePath: cleanBasePath, engine: undefined })); },
        _getOptions: function () {
            // eslint-disable-next-line no-console
            console.warn('@deprecated _getOptions is deprecated, use getOptions instead');
            return router.getOptions();
        },
        // @ts-ignore
        _showRoutes: function () {
            // eslint-disable-next-line no-console
            console.log(handlers);
        },
    };
    return router;
};

/**
 * Borrowed from [redux project](https://github.com/reduxjs/redux)
 *
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    if (funcs.length === 0) {
        return function (arg) { return arg; };
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce(function (a, b) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return a(b.apply(void 0, args));
    }; });
}
var noop = function () { };
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return compose.apply(void 0, fns)(noop);
};

exports.BrowserHistoryEngine = BrowserHistoryEngine;
exports.compose = compose;
exports.createRouter = createRouter;
exports.pipe = pipe;

},{}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}]},["1SREm","4Ekgk"], "4Ekgk", "parcelRequire5b1f")

//# sourceMappingURL=accounts.490fe283.js.map
