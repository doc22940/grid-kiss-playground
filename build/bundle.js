/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 79);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = warnOnce;
var printed = {};

function warnOnce(message) {
    if (printed[message]) return;
    printed[message] = true;

    if (typeof console !== 'undefined' && console.warn) console.warn(message);
}
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}();

function identity(s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
      return false;
    }

  if (s.charCodeAt(length - 1) !== 95 /* '_' */ || s.charCodeAt(length - 2) !== 95 /* '_' */ || s.charCodeAt(length - 3) !== 111 /* 'o' */ || s.charCodeAt(length - 4) !== 116 /* 't' */ || s.charCodeAt(length - 5) !== 111 /* 'o' */ || s.charCodeAt(length - 6) !== 114 /* 'r' */ || s.charCodeAt(length - 7) !== 112 /* 'p' */ || s.charCodeAt(length - 8) !== 95 /* '_' */ || s.charCodeAt(length - 9) !== 95 /* '_' */) {
      return false;
    }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
        return false;
      }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () {
	function sliceIterator(arr, i) {
		var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
			for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
				_arr.push(_s.value);if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;_e = err;
		} finally {
			try {
				if (!_n && _i["return"]) _i["return"]();
			} finally {
				if (_d) throw _e;
			}
		}return _arr;
	}return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError("Invalid attempt to destructure non-iterable instance");
		}
	};
}();

var REGEX_LENGTH = /^(\d+(?:\.\d+)?)([a-z]{1,4})$/,
    REGEX_PERCENT = /^(\d+(?:\.\d+)?)%\s*(free|grid|view)?$/,
    REGEX_DIMENSION = /(\d+(?:\.\d+)?)%?\s*([a-z]{1,4})/,
    REGEX_CALC = /^calc\((.*)\)$/;

function parseDimension(str, direction) {

	str = str.trim();

	// when no value is specified, row and column sizes are set as `auto`
	if (str.length === 0) return null;

	if (str === "auto") return "1fr";

	// non-negative number representing a fraction of the free space in the grid container
	if (!isNaN(str)) return parseFloat(str) + "fr";

	if (REGEX_LENGTH.test(str)) return str;

	// calc() expression
	if (REGEX_CALC.test(str)) return str;

	if (REGEX_PERCENT.test(str)) {
		var _str$match = str.match(REGEX_PERCENT),
		    _str$match2 = _slicedToArray(_str$match, 3),
		    percentage = _str$match2[1],
		    referential = _str$match2[2];

		switch (referential) {
			case "free":
				return percentage + "fr";
			case "view":
				return "" + percentage + (direction === "vertical" ? "vh" : "vw");
			case "grid":
			default:
				return percentage + "%";
		}
	}

	// `> *length*` or `< *length*`: a minimum or maximum value
	if (str.startsWith("<")) return "minmax(auto, " + parseDimension(str.substring(1), direction) + ")";

	if (str.startsWith(">")) return "minmax(" + parseDimension(str.substring(1), direction) + ", auto)";

	// a range between a minimum and a maximum or `minmax(min, max)`

	var _str$split = str.split("-"),
	    _str$split2 = _slicedToArray(_str$split, 2),
	    min = _str$split2[0],
	    max = _str$split2[1];

	if ([min, max].every(function (dim) {
		return REGEX_DIMENSION.test(dim);
	})) {
		return "minmax(" + parseDimension(min, direction) + ", " + parseDimension(max, direction) + ")";
	}

	// a keyword representing the largest maximal content contribution of the grid items occupying the grid track
	if (str === "max" || str === "max-content") return "max-content";

	// a keyword representing the largest minimal content contribution of the grid items occupying the grid track
	if (str === "min" || str === "min-content") return "min-content";

	// a keyword representing the formula min(max-content, max(auto, *length*)),
	// which is calculated similar to auto (i.e. minmax(auto, max-content)),
	// except that the track size is clamped at argument *length* if it is greater than the auto minimum.

	if (str.startsWith("fit")) return str.replace(/fit (.*)$/, "fit-content($1)");

	return null;
}

function isFillingRemainingSpace(dim) {
	return dim.endsWith("fr");
}

module.exports = { parseDimension: parseDimension, isFillingRemainingSpace: isFillingRemainingSpace };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _container = __webpack_require__(9);

var _container2 = _interopRequireDefault(_container);

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Represents an at-rule.
 *
 * If it’s followed in the CSS by a {} block, this node will have
 * a nodes property representing its children.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('@charset "UTF-8"; @media print {}');
 *
 * const charset = root.first;
 * charset.type  //=> 'atrule'
 * charset.nodes //=> undefined
 *
 * const media = root.last;
 * media.nodes   //=> []
 */
var AtRule = function (_Container) {
    _inherits(AtRule, _Container);

    function AtRule(defaults) {
        _classCallCheck(this, AtRule);

        var _this = _possibleConstructorReturn(this, _Container.call(this, defaults));

        _this.type = 'atrule';
        return _this;
    }

    AtRule.prototype.append = function append() {
        var _Container$prototype$;

        if (!this.nodes) this.nodes = [];

        for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
            children[_key] = arguments[_key];
        }

        return (_Container$prototype$ = _Container.prototype.append).call.apply(_Container$prototype$, [this].concat(children));
    };

    AtRule.prototype.prepend = function prepend() {
        var _Container$prototype$2;

        if (!this.nodes) this.nodes = [];

        for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            children[_key2] = arguments[_key2];
        }

        return (_Container$prototype$2 = _Container.prototype.prepend).call.apply(_Container$prototype$2, [this].concat(children));
    };

    _createClass(AtRule, [{
        key: 'afterName',
        get: function get() {
            (0, _warnOnce2.default)('AtRule#afterName was deprecated. Use AtRule#raws.afterName');
            return this.raws.afterName;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('AtRule#afterName was deprecated. Use AtRule#raws.afterName');
            this.raws.afterName = val;
        }
    }, {
        key: '_params',
        get: function get() {
            (0, _warnOnce2.default)('AtRule#_params was deprecated. Use AtRule#raws.params');
            return this.raws.params;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('AtRule#_params was deprecated. Use AtRule#raws.params');
            this.raws.params = val;
        }

        /**
         * @memberof AtRule#
         * @member {string} name - the at-rule’s name immediately follows the `@`
         *
         * @example
         * const root  = postcss.parse('@media print {}');
         * media.name //=> 'media'
         * const media = root.first;
         */

        /**
         * @memberof AtRule#
         * @member {string} params - the at-rule’s parameters, the values
         *                           that follow the at-rule’s name but precede
         *                           any {} block
         *
         * @example
         * const root  = postcss.parse('@media print, screen {}');
         * const media = root.first;
         * media.params //=> 'print, screen'
         */

        /**
         * @memberof AtRule#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `after`: the space symbols after the last child of the node
         *   to the end of the node.
         * * `between`: the symbols between the property and value
         *   for declarations, selector and `{` for rules, or last parameter
         *   and `{` for at-rules.
         * * `semicolon`: contains true if the last child has
         *   an (optional) semicolon.
         * * `afterName`: the space between the at-rule name and its parameters.
         *
         * PostCSS cleans at-rule parameters from comments and extra spaces,
         * but it stores origin content in raws properties.
         * As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('  @media\nprint {\n}')
         * root.first.first.raws //=> { before: '  ',
         *                       //     between: ' ',
         *                       //     afterName: '\n',
         *                       //     after: '\n' }
         */

    }]);

    return AtRule;
}(_container2.default);

exports.default = AtRule;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _container = __webpack_require__(9);

var _container2 = _interopRequireDefault(_container);

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

var _list = __webpack_require__(22);

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Represents a CSS rule: a selector followed by a declaration block.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{}');
 * const rule = root.first;
 * rule.type       //=> 'rule'
 * rule.toString() //=> 'a{}'
 */
var Rule = function (_Container) {
    _inherits(Rule, _Container);

    function Rule(defaults) {
        _classCallCheck(this, Rule);

        var _this = _possibleConstructorReturn(this, _Container.call(this, defaults));

        _this.type = 'rule';
        if (!_this.nodes) _this.nodes = [];
        return _this;
    }

    /**
     * An array containing the rule’s individual selectors.
     * Groups of selectors are split at commas.
     *
     * @type {string[]}
     *
     * @example
     * const root = postcss.parse('a, b { }');
     * const rule = root.first;
     *
     * rule.selector  //=> 'a, b'
     * rule.selectors //=> ['a', 'b']
     *
     * rule.selectors = ['a', 'strong'];
     * rule.selector //=> 'a, strong'
     */

    _createClass(Rule, [{
        key: 'selectors',
        get: function get() {
            return _list2.default.comma(this.selector);
        },
        set: function set(values) {
            var match = this.selector ? this.selector.match(/,\s*/) : null;
            var sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen');
            this.selector = values.join(sep);
        }
    }, {
        key: '_selector',
        get: function get() {
            (0, _warnOnce2.default)('Rule#_selector is deprecated. Use Rule#raws.selector');
            return this.raws.selector;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Rule#_selector is deprecated. Use Rule#raws.selector');
            this.raws.selector = val;
        }

        /**
         * @memberof Rule#
         * @member {string} selector - the rule’s full selector represented
         *                             as a string
         *
         * @example
         * const root = postcss.parse('a, b { }');
         * const rule = root.first;
         * rule.selector //=> 'a, b'
         */

        /**
         * @memberof Rule#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `after`: the space symbols after the last child of the node
         *   to the end of the node.
         * * `between`: the symbols between the property and value
         *   for declarations, selector and `{` for rules, or last parameter
         *   and `{` for at-rules.
         * * `semicolon`: contains true if the last child has
         *   an (optional) semicolon.
         *
         * PostCSS cleans selectors from comments and extra spaces,
         * but it stores origin content in raws properties.
         * As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('a {\n  color:black\n}')
         * root.first.first.raws //=> { before: '', between: ' ', after: '\n' }
         */

    }]);

    return Rule;
}(_container2.default);

exports.default = Rule;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _declaration = __webpack_require__(10);

var _declaration2 = _interopRequireDefault(_declaration);

var _processor = __webpack_require__(23);

var _processor2 = _interopRequireDefault(_processor);

var _stringify = __webpack_require__(14);

var _stringify2 = _interopRequireDefault(_stringify);

var _comment = __webpack_require__(8);

var _comment2 = _interopRequireDefault(_comment);

var _atRule = __webpack_require__(3);

var _atRule2 = _interopRequireDefault(_atRule);

var _vendor = __webpack_require__(62);

var _vendor2 = _interopRequireDefault(_vendor);

var _parse = __webpack_require__(12);

var _parse2 = _interopRequireDefault(_parse);

var _list = __webpack_require__(22);

var _list2 = _interopRequireDefault(_list);

var _rule = __webpack_require__(4);

var _rule2 = _interopRequireDefault(_rule);

var _root = __webpack_require__(13);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Create a new {@link Processor} instance that will apply `plugins`
 * as CSS processors.
 *
 * @param {Array.<Plugin|pluginFunction>|Processor} plugins - PostCSS
 *        plugins. See {@link Processor#use} for plugin format.
 *
 * @return {Processor} Processor to process multiple CSS
 *
 * @example
 * import postcss from 'postcss';
 *
 * postcss(plugins).process(css, { from, to }).then(result => {
 *   console.log(result.css);
 * });
 *
 * @namespace postcss
 */
function postcss() {
  for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }
  return new _processor2.default(plugins);
}

/**
 * Creates a PostCSS plugin with a standard API.
 *
 * The newly-wrapped function will provide both the name and PostCSS
 * version of the plugin.
 *
 * ```js
 *  const processor = postcss([replace]);
 *  processor.plugins[0].postcssPlugin  //=> 'postcss-replace'
 *  processor.plugins[0].postcssVersion //=> '5.1.0'
 * ```
 *
 * The plugin function receives 2 arguments: {@link Root}
 * and {@link Result} instance. The function should mutate the provided
 * `Root` node. Alternatively, you can create a new `Root` node
 * and override the `result.root` property.
 *
 * ```js
 * const cleaner = postcss.plugin('postcss-cleaner', () => {
 *   return (root, result) => {
 *     result.root = postcss.root();
 *   };
 * });
 * ```
 *
 * As a convenience, plugins also expose a `process` method so that you can use
 * them as standalone tools.
 *
 * ```js
 * cleaner.process(css, options);
 * // This is equivalent to:
 * postcss([ cleaner(options) ]).process(css);
 * ```
 *
 * Asynchronous plugins should return a `Promise` instance.
 *
 * ```js
 * postcss.plugin('postcss-import', () => {
 *   return (root, result) => {
 *     return new Promise( (resolve, reject) => {
 *       fs.readFile('base.css', (base) => {
 *         root.prepend(base);
 *         resolve();
 *       });
 *     });
 *   };
 * });
 * ```
 *
 * Add warnings using the {@link Node#warn} method.
 * Send data to other plugins using the {@link Result#messages} array.
 *
 * ```js
 * postcss.plugin('postcss-caniuse-test', () => {
 *   return (root, result) => {
 *     css.walkDecls(decl => {
 *       if ( !caniuse.support(decl.prop) ) {
 *         decl.warn(result, 'Some browsers do not support ' + decl.prop);
 *       }
 *     });
 *   };
 * });
 * ```
 *
 * @param {string} name          - PostCSS plugin name. Same as in `name`
 *                                 property in `package.json`. It will be saved
 *                                 in `plugin.postcssPlugin` property.
 * @param {function} initializer - will receive plugin options
 *                                 and should return {@link pluginFunction}
 *
 * @return {Plugin} PostCSS plugin
 */
postcss.plugin = function plugin(name, initializer) {
  var creator = function creator() {
    var transformer = initializer.apply(undefined, arguments);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new _processor2.default().version;
    return transformer;
  };

  var cache = void 0;
  Object.defineProperty(creator, 'postcss', {
    get: function get() {
      if (!cache) cache = creator();
      return cache;
    }
  });

  creator.process = function (root, opts) {
    return postcss([creator(opts)]).process(root, opts);
  };

  return creator;
};

/**
 * Default function to convert a node tree into a CSS string.
 *
 * @param {Node} node       - start node for stringifing. Usually {@link Root}.
 * @param {builder} builder - function to concatenate CSS from node’s parts
 *                            or generate string and source map
 *
 * @return {void}
 *
 * @function
 */
postcss.stringify = _stringify2.default;

/**
 * Parses source css and returns a new {@link Root} node,
 * which contains the source CSS nodes.
 *
 * @param {string|toString} css   - string with input CSS or any object
 *                                  with toString() method, like a Buffer
 * @param {processOptions} [opts] - options with only `from` and `map` keys
 *
 * @return {Root} PostCSS AST
 *
 * @example
 * // Simple CSS concatenation with source map support
 * const root1 = postcss.parse(css1, { from: file1 });
 * const root2 = postcss.parse(css2, { from: file2 });
 * root1.append(root2).toResult().css;
 *
 * @function
 */
postcss.parse = _parse2.default;

/**
 * @member {vendor} - Contains the {@link vendor} module.
 *
 * @example
 * postcss.vendor.unprefixed('-moz-tab') //=> ['tab']
 */
postcss.vendor = _vendor2.default;

/**
 * @member {list} - Contains the {@link list} module.
 *
 * @example
 * postcss.list.space('5px calc(10% + 5px)') //=> ['5px', 'calc(10% + 5px)']
 */
postcss.list = _list2.default;

/**
 * Creates a new {@link Comment} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Comment} new Comment node
 *
 * @example
 * postcss.comment({ text: 'test' })
 */
postcss.comment = function (defaults) {
  return new _comment2.default(defaults);
};

/**
 * Creates a new {@link AtRule} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {AtRule} new AtRule node
 *
 * @example
 * postcss.atRule({ name: 'charset' }).toString() //=> "@charset"
 */
postcss.atRule = function (defaults) {
  return new _atRule2.default(defaults);
};

/**
 * Creates a new {@link Declaration} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Declaration} new Declaration node
 *
 * @example
 * postcss.decl({ prop: 'color', value: 'red' }).toString() //=> "color: red"
 */
postcss.decl = function (defaults) {
  return new _declaration2.default(defaults);
};

/**
 * Creates a new {@link Rule} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {AtRule} new Rule node
 *
 * @example
 * postcss.rule({ selector: 'a' }).toString() //=> "a {\n}"
 */
postcss.rule = function (defaults) {
  return new _rule2.default(defaults);
};

/**
 * Creates a new {@link Root} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Root} new Root node
 *
 * @example
 * postcss.root({ after: '\n' }).toString() //=> "\n"
 */
postcss.root = function (defaults) {
  return new _root2.default(defaults);
};

exports.default = postcss;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}return arr2;
	} else {
		return Array.from(arr);
	}
}

exports.range = function (start, end) {
	return [].concat(_toConsumableArray(new Array(end - start).keys())).map(function (i) {
		return i + start;
	});
};

exports.indentMultiline = function (lines, indent) {
	return "\n" + lines.map(function (line) {
		return indent + line;
	}).join("\n");
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

var _node = __webpack_require__(11);

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Represents a comment between declarations or statements (rule and at-rules).
 *
 * Comments inside selectors, at-rule parameters, or declaration values
 * will be stored in the `raws` properties explained above.
 *
 * @extends Node
 */
var Comment = function (_Node) {
    _inherits(Comment, _Node);

    function Comment(defaults) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, _Node.call(this, defaults));

        _this.type = 'comment';
        return _this;
    }

    _createClass(Comment, [{
        key: 'left',
        get: function get() {
            (0, _warnOnce2.default)('Comment#left was deprecated. Use Comment#raws.left');
            return this.raws.left;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Comment#left was deprecated. Use Comment#raws.left');
            this.raws.left = val;
        }
    }, {
        key: 'right',
        get: function get() {
            (0, _warnOnce2.default)('Comment#right was deprecated. Use Comment#raws.right');
            return this.raws.right;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Comment#right was deprecated. Use Comment#raws.right');
            this.raws.right = val;
        }

        /**
         * @memberof Comment#
         * @member {string} text - the comment’s text
         */

        /**
         * @memberof Comment#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node.
         * * `left`: the space symbols between `/*` and the comment’s text.
         * * `right`: the space symbols between the comment’s text.
         */

    }]);

    return Comment;
}(_node2.default);

exports.default = Comment;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _declaration = __webpack_require__(10);

var _declaration2 = _interopRequireDefault(_declaration);

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

var _comment = __webpack_require__(8);

var _comment2 = _interopRequireDefault(_comment);

var _node = __webpack_require__(11);

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function cleanSource(nodes) {
    return nodes.map(function (i) {
        if (i.nodes) i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
    });
}

/**
 * The {@link Root}, {@link AtRule}, and {@link Rule} container nodes
 * inherit some common methods to help work with their children.
 *
 * Note that all containers can store any content. If you write a rule inside
 * a rule, PostCSS will parse it.
 *
 * @extends Node
 * @abstract
 */

var Container = function (_Node) {
    _inherits(Container, _Node);

    function Container() {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, _Node.apply(this, arguments));
    }

    Container.prototype.push = function push(child) {
        child.parent = this;
        this.nodes.push(child);
        return this;
    };

    /**
     * Iterates through the container’s immediate children,
     * calling `callback` for each child.
     *
     * Returning `false` in the callback will break iteration.
     *
     * This method only iterates through the container’s immediate children.
     * If you need to recursively iterate through all the container’s descendant
     * nodes, use {@link Container#walk}.
     *
     * Unlike the for `{}`-cycle or `Array#forEach` this iterator is safe
     * if you are mutating the array of child nodes during iteration.
     * PostCSS will adjust the current index to match the mutations.
     *
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * const root = postcss.parse('a { color: black; z-index: 1 }');
     * const rule = root.first;
     *
     * for ( let decl of rule.nodes ) {
     *     decl.cloneBefore({ prop: '-webkit-' + decl.prop });
     *     // Cycle will be infinite, because cloneBefore moves the current node
     *     // to the next index
     * }
     *
     * rule.each(decl => {
     *     decl.cloneBefore({ prop: '-webkit-' + decl.prop });
     *     // Will be executed only for color and z-index
     * });
     */

    Container.prototype.each = function each(callback) {
        if (!this.lastEach) this.lastEach = 0;
        if (!this.indexes) this.indexes = {};

        this.lastEach += 1;
        var id = this.lastEach;
        this.indexes[id] = 0;

        if (!this.nodes) return undefined;

        var index = void 0,
            result = void 0;
        while (this.indexes[id] < this.nodes.length) {
            index = this.indexes[id];
            result = callback(this.nodes[index], index);
            if (result === false) break;

            this.indexes[id] += 1;
        }

        delete this.indexes[id];

        return result;
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each node.
     *
     * Like container.each(), this method is safe to use
     * if you are mutating arrays during iteration.
     *
     * If you only need to iterate through the container’s immediate children,
     * use {@link Container#each}.
     *
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * root.walk(node => {
     *   // Traverses all descendant nodes.
     * });
     */

    Container.prototype.walk = function walk(callback) {
        return this.each(function (child, i) {
            var result = callback(child, i);
            if (result !== false && child.walk) {
                result = child.walk(callback);
            }
            return result;
        });
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each declaration node.
     *
     * If you pass a filter, iteration will only happen over declarations
     * with matching properties.
     *
     * Like {@link Container#each}, this method is safe
     * to use if you are mutating arrays during iteration.
     *
     * @param {string|RegExp} [prop]   - string or regular expression
     *                                   to filter declarations by property name
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * root.walkDecls(decl => {
     *   checkPropertySupport(decl.prop);
     * });
     *
     * root.walkDecls('border-radius', decl => {
     *   decl.remove();
     * });
     *
     * root.walkDecls(/^background/, decl => {
     *   decl.value = takeFirstColorFromGradient(decl.value);
     * });
     */

    Container.prototype.walkDecls = function walkDecls(prop, callback) {
        if (!callback) {
            callback = prop;
            return this.walk(function (child, i) {
                if (child.type === 'decl') {
                    return callback(child, i);
                }
            });
        } else if (prop instanceof RegExp) {
            return this.walk(function (child, i) {
                if (child.type === 'decl' && prop.test(child.prop)) {
                    return callback(child, i);
                }
            });
        } else {
            return this.walk(function (child, i) {
                if (child.type === 'decl' && child.prop === prop) {
                    return callback(child, i);
                }
            });
        }
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each rule node.
     *
     * If you pass a filter, iteration will only happen over rules
     * with matching selectors.
     *
     * Like {@link Container#each}, this method is safe
     * to use if you are mutating arrays during iteration.
     *
     * @param {string|RegExp} [selector] - string or regular expression
     *                                     to filter rules by selector
     * @param {childIterator} callback   - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * const selectors = [];
     * root.walkRules(rule => {
     *   selectors.push(rule.selector);
     * });
     * console.log(`Your CSS uses ${selectors.length} selectors`);
     */

    Container.prototype.walkRules = function walkRules(selector, callback) {
        if (!callback) {
            callback = selector;

            return this.walk(function (child, i) {
                if (child.type === 'rule') {
                    return callback(child, i);
                }
            });
        } else if (selector instanceof RegExp) {
            return this.walk(function (child, i) {
                if (child.type === 'rule' && selector.test(child.selector)) {
                    return callback(child, i);
                }
            });
        } else {
            return this.walk(function (child, i) {
                if (child.type === 'rule' && child.selector === selector) {
                    return callback(child, i);
                }
            });
        }
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each at-rule node.
     *
     * If you pass a filter, iteration will only happen over at-rules
     * that have matching names.
     *
     * Like {@link Container#each}, this method is safe
     * to use if you are mutating arrays during iteration.
     *
     * @param {string|RegExp} [name]   - string or regular expression
     *                                   to filter at-rules by name
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * root.walkAtRules(rule => {
     *   if ( isOld(rule.name) ) rule.remove();
     * });
     *
     * let first = false;
     * root.walkAtRules('charset', rule => {
     *   if ( !first ) {
     *     first = true;
     *   } else {
     *     rule.remove();
     *   }
     * });
     */

    Container.prototype.walkAtRules = function walkAtRules(name, callback) {
        if (!callback) {
            callback = name;
            return this.walk(function (child, i) {
                if (child.type === 'atrule') {
                    return callback(child, i);
                }
            });
        } else if (name instanceof RegExp) {
            return this.walk(function (child, i) {
                if (child.type === 'atrule' && name.test(child.name)) {
                    return callback(child, i);
                }
            });
        } else {
            return this.walk(function (child, i) {
                if (child.type === 'atrule' && child.name === name) {
                    return callback(child, i);
                }
            });
        }
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each comment node.
     *
     * Like {@link Container#each}, this method is safe
     * to use if you are mutating arrays during iteration.
     *
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * root.walkComments(comment => {
     *   comment.remove();
     * });
     */

    Container.prototype.walkComments = function walkComments(callback) {
        return this.walk(function (child, i) {
            if (child.type === 'comment') {
                return callback(child, i);
            }
        });
    };

    /**
     * Inserts new nodes to the end of the container.
     *
     * @param {...(Node|object|string|Node[])} children - new nodes
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * const decl1 = postcss.decl({ prop: 'color', value: 'black' });
     * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' });
     * rule.append(decl1, decl2);
     *
     * root.append({ name: 'charset', params: '"UTF-8"' });  // at-rule
     * root.append({ selector: 'a' });                       // rule
     * rule.append({ prop: 'color', value: 'black' });       // declaration
     * rule.append({ text: 'Comment' })                      // comment
     *
     * root.append('a {}');
     * root.first.append('color: black; z-index: 1');
     */

    Container.prototype.append = function append() {
        for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
            children[_key] = arguments[_key];
        }

        for (var _iterator = children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var child = _ref;

            var nodes = this.normalize(child, this.last);
            for (var _iterator2 = nodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var node = _ref2;
                this.nodes.push(node);
            }
        }
        return this;
    };

    /**
     * Inserts new nodes to the start of the container.
     *
     * @param {...(Node|object|string|Node[])} children - new nodes
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * const decl1 = postcss.decl({ prop: 'color', value: 'black' });
     * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' });
     * rule.prepend(decl1, decl2);
     *
     * root.append({ name: 'charset', params: '"UTF-8"' });  // at-rule
     * root.append({ selector: 'a' });                       // rule
     * rule.append({ prop: 'color', value: 'black' });       // declaration
     * rule.append({ text: 'Comment' })                      // comment
     *
     * root.append('a {}');
     * root.first.append('color: black; z-index: 1');
     */

    Container.prototype.prepend = function prepend() {
        for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            children[_key2] = arguments[_key2];
        }

        children = children.reverse();
        for (var _iterator3 = children, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var child = _ref3;

            var nodes = this.normalize(child, this.first, 'prepend').reverse();
            for (var _iterator4 = nodes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                var _ref4;

                if (_isArray4) {
                    if (_i4 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i4++];
                } else {
                    _i4 = _iterator4.next();
                    if (_i4.done) break;
                    _ref4 = _i4.value;
                }

                var node = _ref4;
                this.nodes.unshift(node);
            }for (var id in this.indexes) {
                this.indexes[id] = this.indexes[id] + nodes.length;
            }
        }
        return this;
    };

    Container.prototype.cleanRaws = function cleanRaws(keepBetween) {
        _Node.prototype.cleanRaws.call(this, keepBetween);
        if (this.nodes) {
            for (var _iterator5 = this.nodes, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i5++];
                } else {
                    _i5 = _iterator5.next();
                    if (_i5.done) break;
                    _ref5 = _i5.value;
                }

                var node = _ref5;
                node.cleanRaws(keepBetween);
            }
        }
    };

    /**
     * Insert new node before old node within the container.
     *
     * @param {Node|number} exist             - child or child’s index.
     * @param {Node|object|string|Node[]} add - new node
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * rule.insertBefore(decl, decl.clone({ prop: '-webkit-' + decl.prop }));
     */

    Container.prototype.insertBefore = function insertBefore(exist, add) {
        exist = this.index(exist);

        var type = exist === 0 ? 'prepend' : false;
        var nodes = this.normalize(add, this.nodes[exist], type).reverse();
        for (var _iterator6 = nodes, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray6) {
                if (_i6 >= _iterator6.length) break;
                _ref6 = _iterator6[_i6++];
            } else {
                _i6 = _iterator6.next();
                if (_i6.done) break;
                _ref6 = _i6.value;
            }

            var node = _ref6;
            this.nodes.splice(exist, 0, node);
        }var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (exist <= index) {
                this.indexes[id] = index + nodes.length;
            }
        }

        return this;
    };

    /**
     * Insert new node after old node within the container.
     *
     * @param {Node|number} exist             - child or child’s index
     * @param {Node|object|string|Node[]} add - new node
     *
     * @return {Node} this node for methods chain
     */

    Container.prototype.insertAfter = function insertAfter(exist, add) {
        exist = this.index(exist);

        var nodes = this.normalize(add, this.nodes[exist]).reverse();
        for (var _iterator7 = nodes, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
            var _ref7;

            if (_isArray7) {
                if (_i7 >= _iterator7.length) break;
                _ref7 = _iterator7[_i7++];
            } else {
                _i7 = _iterator7.next();
                if (_i7.done) break;
                _ref7 = _i7.value;
            }

            var node = _ref7;
            this.nodes.splice(exist + 1, 0, node);
        }var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (exist < index) {
                this.indexes[id] = index + nodes.length;
            }
        }

        return this;
    };

    Container.prototype.remove = function remove(child) {
        if (typeof child !== 'undefined') {
            (0, _warnOnce2.default)('Container#remove is deprecated. ' + 'Use Container#removeChild');
            this.removeChild(child);
        } else {
            _Node.prototype.remove.call(this);
        }
        return this;
    };

    /**
     * Removes node from the container and cleans the parent properties
     * from the node and its children.
     *
     * @param {Node|number} child - child or child’s index
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * rule.nodes.length  //=> 5
     * rule.removeChild(decl);
     * rule.nodes.length  //=> 4
     * decl.parent        //=> undefined
     */

    Container.prototype.removeChild = function removeChild(child) {
        child = this.index(child);
        this.nodes[child].parent = undefined;
        this.nodes.splice(child, 1);

        var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (index >= child) {
                this.indexes[id] = index - 1;
            }
        }

        return this;
    };

    /**
     * Removes all children from the container
     * and cleans their parent properties.
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * rule.removeAll();
     * rule.nodes.length //=> 0
     */

    Container.prototype.removeAll = function removeAll() {
        for (var _iterator8 = this.nodes, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
            var _ref8;

            if (_isArray8) {
                if (_i8 >= _iterator8.length) break;
                _ref8 = _iterator8[_i8++];
            } else {
                _i8 = _iterator8.next();
                if (_i8.done) break;
                _ref8 = _i8.value;
            }

            var node = _ref8;
            node.parent = undefined;
        }this.nodes = [];
        return this;
    };

    /**
     * Passes all declaration values within the container that match pattern
     * through callback, replacing those values with the returned result
     * of callback.
     *
     * This method is useful if you are using a custom unit or function
     * and need to iterate through all values.
     *
     * @param {string|RegExp} pattern      - replace pattern
     * @param {object} opts                - options to speed up the search
     * @param {string|string[]} opts.props - an array of property names
     * @param {string} opts.fast           - string that’s used
     *                                       to narrow down values and speed up
                                             the regexp search
     * @param {function|string} callback   - string to replace pattern
     *                                       or callback that returns a new
     *                                       value.
     *                                       The callback will receive
     *                                       the same arguments as those
     *                                       passed to a function parameter
     *                                       of `String#replace`.
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * root.replaceValues(/\d+rem/, { fast: 'rem' }, string => {
     *   return 15 * parseInt(string) + 'px';
     * });
     */

    Container.prototype.replaceValues = function replaceValues(pattern, opts, callback) {
        if (!callback) {
            callback = opts;
            opts = {};
        }

        this.walkDecls(function (decl) {
            if (opts.props && opts.props.indexOf(decl.prop) === -1) return;
            if (opts.fast && decl.value.indexOf(opts.fast) === -1) return;

            decl.value = decl.value.replace(pattern, callback);
        });

        return this;
    };

    /**
     * Returns `true` if callback returns `true`
     * for all of the container’s children.
     *
     * @param {childCondition} condition - iterator returns true or false.
     *
     * @return {boolean} is every child pass condition
     *
     * @example
     * const noPrefixes = rule.every(i => i.prop[0] !== '-');
     */

    Container.prototype.every = function every(condition) {
        return this.nodes.every(condition);
    };

    /**
     * Returns `true` if callback returns `true` for (at least) one
     * of the container’s children.
     *
     * @param {childCondition} condition - iterator returns true or false.
     *
     * @return {boolean} is some child pass condition
     *
     * @example
     * const hasPrefix = rule.some(i => i.prop[0] === '-');
     */

    Container.prototype.some = function some(condition) {
        return this.nodes.some(condition);
    };

    /**
     * Returns a `child`’s index within the {@link Container#nodes} array.
     *
     * @param {Node} child - child of the current container.
     *
     * @return {number} child index
     *
     * @example
     * rule.index( rule.nodes[2] ) //=> 2
     */

    Container.prototype.index = function index(child) {
        if (typeof child === 'number') {
            return child;
        } else {
            return this.nodes.indexOf(child);
        }
    };

    /**
     * The container’s first child.
     *
     * @type {Node}
     *
     * @example
     * rule.first == rules.nodes[0];
     */

    Container.prototype.normalize = function normalize(nodes, sample) {
        var _this2 = this;

        if (typeof nodes === 'string') {
            var parse = __webpack_require__(12);
            nodes = cleanSource(parse(nodes).nodes);
        } else if (!Array.isArray(nodes)) {
            if (nodes.type === 'root') {
                nodes = nodes.nodes;
            } else if (nodes.type) {
                nodes = [nodes];
            } else if (nodes.prop) {
                if (typeof nodes.value === 'undefined') {
                    throw new Error('Value field is missed in node creation');
                } else if (typeof nodes.value !== 'string') {
                    nodes.value = String(nodes.value);
                }
                nodes = [new _declaration2.default(nodes)];
            } else if (nodes.selector) {
                var Rule = __webpack_require__(4);
                nodes = [new Rule(nodes)];
            } else if (nodes.name) {
                var AtRule = __webpack_require__(3);
                nodes = [new AtRule(nodes)];
            } else if (nodes.text) {
                nodes = [new _comment2.default(nodes)];
            } else {
                throw new Error('Unknown node type in node creation');
            }
        }

        var processed = nodes.map(function (i) {
            if (typeof i.raws === 'undefined') i = _this2.rebuild(i);

            if (i.parent) i = i.clone();
            if (typeof i.raws.before === 'undefined') {
                if (sample && typeof sample.raws.before !== 'undefined') {
                    i.raws.before = sample.raws.before.replace(/[^\s]/g, '');
                }
            }
            i.parent = _this2;
            return i;
        });

        return processed;
    };

    Container.prototype.rebuild = function rebuild(node, parent) {
        var _this3 = this;

        var fix = void 0;
        if (node.type === 'root') {
            var Root = __webpack_require__(13);
            fix = new Root();
        } else if (node.type === 'atrule') {
            var AtRule = __webpack_require__(3);
            fix = new AtRule();
        } else if (node.type === 'rule') {
            var Rule = __webpack_require__(4);
            fix = new Rule();
        } else if (node.type === 'decl') {
            fix = new _declaration2.default();
        } else if (node.type === 'comment') {
            fix = new _comment2.default();
        }

        for (var i in node) {
            if (i === 'nodes') {
                fix.nodes = node.nodes.map(function (j) {
                    return _this3.rebuild(j, fix);
                });
            } else if (i === 'parent' && parent) {
                fix.parent = parent;
            } else if (node.hasOwnProperty(i)) {
                fix[i] = node[i];
            }
        }

        return fix;
    };

    Container.prototype.eachInside = function eachInside(callback) {
        (0, _warnOnce2.default)('Container#eachInside is deprecated. ' + 'Use Container#walk instead.');
        return this.walk(callback);
    };

    Container.prototype.eachDecl = function eachDecl(prop, callback) {
        (0, _warnOnce2.default)('Container#eachDecl is deprecated. ' + 'Use Container#walkDecls instead.');
        return this.walkDecls(prop, callback);
    };

    Container.prototype.eachRule = function eachRule(selector, callback) {
        (0, _warnOnce2.default)('Container#eachRule is deprecated. ' + 'Use Container#walkRules instead.');
        return this.walkRules(selector, callback);
    };

    Container.prototype.eachAtRule = function eachAtRule(name, callback) {
        (0, _warnOnce2.default)('Container#eachAtRule is deprecated. ' + 'Use Container#walkAtRules instead.');
        return this.walkAtRules(name, callback);
    };

    Container.prototype.eachComment = function eachComment(callback) {
        (0, _warnOnce2.default)('Container#eachComment is deprecated. ' + 'Use Container#walkComments instead.');
        return this.walkComments(callback);
    };

    _createClass(Container, [{
        key: 'first',
        get: function get() {
            if (!this.nodes) return undefined;
            return this.nodes[0];
        }

        /**
         * The container’s last child.
         *
         * @type {Node}
         *
         * @example
         * rule.last == rule.nodes[rule.nodes.length - 1];
         */

    }, {
        key: 'last',
        get: function get() {
            if (!this.nodes) return undefined;
            return this.nodes[this.nodes.length - 1];
        }
    }, {
        key: 'semicolon',
        get: function get() {
            (0, _warnOnce2.default)('Node#semicolon is deprecated. Use Node#raws.semicolon');
            return this.raws.semicolon;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#semicolon is deprecated. Use Node#raws.semicolon');
            this.raws.semicolon = val;
        }
    }, {
        key: 'after',
        get: function get() {
            (0, _warnOnce2.default)('Node#after is deprecated. Use Node#raws.after');
            return this.raws.after;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#after is deprecated. Use Node#raws.after');
            this.raws.after = val;
        }

        /**
         * @memberof Container#
         * @member {Node[]} nodes - an array containing the container’s children
         *
         * @example
         * const root = postcss.parse('a { color: black }');
         * root.nodes.length           //=> 1
         * root.nodes[0].selector      //=> 'a'
         * root.nodes[0].nodes[0].prop //=> 'color'
         */

    }]);

    return Container;
}(_node2.default);

exports.default = Container;

/**
 * @callback childCondition
 * @param {Node} node    - container child
 * @param {number} index - child index
 * @param {Node[]} nodes - all container children
 * @return {boolean}
 */

/**
 * @callback childIterator
 * @param {Node} node    - container child
 * @param {number} index - child index
 * @return {false|undefined} returning `false` will break iteration
 */

module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

var _node = __webpack_require__(11);

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Represents a CSS declaration.
 *
 * @extends Node
 *
 * @example
 * const root = postcss.parse('a { color: black }');
 * const decl = root.first.first;
 * decl.type       //=> 'decl'
 * decl.toString() //=> ' color: black'
 */
var Declaration = function (_Node) {
    _inherits(Declaration, _Node);

    function Declaration(defaults) {
        _classCallCheck(this, Declaration);

        var _this = _possibleConstructorReturn(this, _Node.call(this, defaults));

        _this.type = 'decl';
        return _this;
    }

    _createClass(Declaration, [{
        key: '_value',
        get: function get() {
            (0, _warnOnce2.default)('Node#_value was deprecated. Use Node#raws.value');
            return this.raws.value;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#_value was deprecated. Use Node#raws.value');
            this.raws.value = val;
        }
    }, {
        key: '_important',
        get: function get() {
            (0, _warnOnce2.default)('Node#_important was deprecated. Use Node#raws.important');
            return this.raws.important;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#_important was deprecated. Use Node#raws.important');
            this.raws.important = val;
        }

        /**
         * @memberof Declaration#
         * @member {string} prop - the declaration’s property name
         *
         * @example
         * const root = postcss.parse('a { color: black }');
         * const decl = root.first.first;
         * decl.prop //=> 'color'
         */

        /**
         * @memberof Declaration#
         * @member {string} value - the declaration’s value
         *
         * @example
         * const root = postcss.parse('a { color: black }');
         * const decl = root.first.first;
         * decl.value //=> 'black'
         */

        /**
         * @memberof Declaration#
         * @member {boolean} important - `true` if the declaration
         *                               has an !important annotation.
         *
         * @example
         * const root = postcss.parse('a { color: black !important; color: red }');
         * root.first.first.important //=> true
         * root.first.last.important  //=> undefined
         */

        /**
         * @memberof Declaration#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `between`: the symbols between the property and value
         *   for declarations.
         * * `important`: the content of the important statement,
         *   if it is not just `!important`.
         *
         * PostCSS cleans declaration from comments and extra spaces,
         * but it stores origin content in raws properties.
         * As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('a {\n  color:black\n}')
         * root.first.first.raws //=> { before: '\n  ', between: ':' }
         */

    }]);

    return Declaration;
}(_node2.default);

exports.default = Declaration;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _cssSyntaxError = __webpack_require__(19);

var _cssSyntaxError2 = _interopRequireDefault(_cssSyntaxError);

var _stringifier = __webpack_require__(24);

var _stringifier2 = _interopRequireDefault(_stringifier);

var _stringify = __webpack_require__(14);

var _stringify2 = _interopRequireDefault(_stringify);

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var cloneNode = function cloneNode(obj, parent) {
    var cloned = new obj.constructor();

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        var value = obj[i];
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

        if (i === 'parent' && type === 'object') {
            if (parent) cloned[i] = parent;
        } else if (i === 'source') {
            cloned[i] = value;
        } else if (value instanceof Array) {
            cloned[i] = value.map(function (j) {
                return cloneNode(j, cloned);
            });
        } else if (i !== 'before' && i !== 'after' && i !== 'between' && i !== 'semicolon') {
            if (type === 'object' && value !== null) value = cloneNode(value);
            cloned[i] = value;
        }
    }

    return cloned;
};

/**
 * All node classes inherit the following common methods.
 *
 * @abstract
 */

var Node = function () {

    /**
     * @param {object} [defaults] - value for node properties
     */
    function Node() {
        var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Node);

        this.raws = {};
        if ((typeof defaults === 'undefined' ? 'undefined' : _typeof(defaults)) !== 'object' && typeof defaults !== 'undefined') {
            throw new Error('PostCSS nodes constructor accepts object, not ' + JSON.stringify(defaults));
        }
        for (var name in defaults) {
            this[name] = defaults[name];
        }
    }

    /**
     * Returns a CssSyntaxError instance containing the original position
     * of the node in the source, showing line and column numbers and also
     * a small excerpt to facilitate debugging.
     *
     * If present, an input source map will be used to get the original position
     * of the source, even from a previous compilation step
     * (e.g., from Sass compilation).
     *
     * This method produces very useful error messages.
     *
     * @param {string} message     - error description
     * @param {object} [opts]      - options
     * @param {string} opts.plugin - plugin name that created this error.
     *                               PostCSS will set it automatically.
     * @param {string} opts.word   - a word inside a node’s string that should
     *                               be highlighted as the source of the error
     * @param {number} opts.index  - an index inside a node’s string that should
     *                               be highlighted as the source of the error
     *
     * @return {CssSyntaxError} error object to throw it
     *
     * @example
     * if ( !variables[name] ) {
     *   throw decl.error('Unknown variable ' + name, { word: name });
     *   // CssSyntaxError: postcss-vars:a.sass:4:3: Unknown variable $black
     *   //   color: $black
     *   // a
     *   //          ^
     *   //   background: white
     * }
     */

    Node.prototype.error = function error(message) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.source) {
            var pos = this.positionBy(opts);
            return this.source.input.error(message, pos.line, pos.column, opts);
        } else {
            return new _cssSyntaxError2.default(message);
        }
    };

    /**
     * This method is provided as a convenience wrapper for {@link Result#warn}.
     *
     * @param {Result} result      - the {@link Result} instance
     *                               that will receive the warning
     * @param {string} text        - warning message
     * @param {object} [opts]      - options
     * @param {string} opts.plugin - plugin name that created this warning.
     *                               PostCSS will set it automatically.
     * @param {string} opts.word   - a word inside a node’s string that should
     *                               be highlighted as the source of the warning
     * @param {number} opts.index  - an index inside a node’s string that should
     *                               be highlighted as the source of the warning
     *
     * @return {Warning} created warning object
     *
     * @example
     * const plugin = postcss.plugin('postcss-deprecated', () => {
     *   return (root, result) => {
     *     root.walkDecls('bad', decl => {
     *       decl.warn(result, 'Deprecated property bad');
     *     });
     *   };
     * });
     */

    Node.prototype.warn = function warn(result, text, opts) {
        var data = { node: this };
        for (var i in opts) {
            data[i] = opts[i];
        }return result.warn(text, data);
    };

    /**
     * Removes the node from its parent and cleans the parent properties
     * from the node and its children.
     *
     * @example
     * if ( decl.prop.match(/^-webkit-/) ) {
     *   decl.remove();
     * }
     *
     * @return {Node} node to make calls chain
     */

    Node.prototype.remove = function remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.parent = undefined;
        return this;
    };

    /**
     * Returns a CSS string representing the node.
     *
     * @param {stringifier|syntax} [stringifier] - a syntax to use
     *                                             in string generation
     *
     * @return {string} CSS string of this node
     *
     * @example
     * postcss.rule({ selector: 'a' }).toString() //=> "a {}"
     */

    Node.prototype.toString = function toString() {
        var stringifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _stringify2.default;

        if (stringifier.stringify) stringifier = stringifier.stringify;
        var result = '';
        stringifier(this, function (i) {
            result += i;
        });
        return result;
    };

    /**
     * Returns a clone of the node.
     *
     * The resulting cloned node and its (cloned) children will have
     * a clean parent and code style properties.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @example
     * const cloned = decl.clone({ prop: '-moz-' + decl.prop });
     * cloned.raws.before  //=> undefined
     * cloned.parent       //=> undefined
     * cloned.toString()   //=> -moz-transform: scale(0)
     *
     * @return {Node} clone of the node
     */

    Node.prototype.clone = function clone() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = cloneNode(this);
        for (var name in overrides) {
            cloned[name] = overrides[name];
        }
        return cloned;
    };

    /**
     * Shortcut to clone the node and insert the resulting cloned node
     * before the current node.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @example
     * decl.cloneBefore({ prop: '-moz-' + decl.prop });
     *
     * @return {Node} - new node
     */

    Node.prototype.cloneBefore = function cloneBefore() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
    };

    /**
     * Shortcut to clone the node and insert the resulting cloned node
     * after the current node.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @return {Node} - new node
     */

    Node.prototype.cloneAfter = function cloneAfter() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
    };

    /**
     * Inserts node(s) before the current node and removes the current node.
     *
     * @param {...Node} nodes - node(s) to replace current one
     *
     * @example
     * if ( atrule.name == 'mixin' ) {
     *   atrule.replaceWith(mixinRules[atrule.params]);
     * }
     *
     * @return {Node} current node to methods chain
     */

    Node.prototype.replaceWith = function replaceWith() {
        if (this.parent) {
            for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
                nodes[_key] = arguments[_key];
            }

            for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var node = _ref;

                this.parent.insertBefore(this, node);
            }

            this.remove();
        }

        return this;
    };

    /**
     * Removes the node from its current parent and inserts it
     * at the end of `newParent`.
     *
     * This will clean the `before` and `after` code {@link Node#raws} data
     * from the node and replace them with the indentation style of `newParent`.
     * It will also clean the `between` property
     * if `newParent` is in another {@link Root}.
     *
     * @param {Container} newParent - container node where the current node
     *                                will be moved
     *
     * @example
     * atrule.moveTo(atrule.root());
     *
     * @return {Node} current node to methods chain
     */

    Node.prototype.moveTo = function moveTo(newParent) {
        this.cleanRaws(this.root() === newParent.root());
        this.remove();
        newParent.append(this);
        return this;
    };

    /**
     * Removes the node from its current parent and inserts it into
     * a new parent before `otherNode`.
     *
     * This will also clean the node’s code style properties just as it would
     * in {@link Node#moveTo}.
     *
     * @param {Node} otherNode - node that will be before current node
     *
     * @return {Node} current node to methods chain
     */

    Node.prototype.moveBefore = function moveBefore(otherNode) {
        this.cleanRaws(this.root() === otherNode.root());
        this.remove();
        otherNode.parent.insertBefore(otherNode, this);
        return this;
    };

    /**
     * Removes the node from its current parent and inserts it into
     * a new parent after `otherNode`.
     *
     * This will also clean the node’s code style properties just as it would
     * in {@link Node#moveTo}.
     *
     * @param {Node} otherNode - node that will be after current node
     *
     * @return {Node} current node to methods chain
     */

    Node.prototype.moveAfter = function moveAfter(otherNode) {
        this.cleanRaws(this.root() === otherNode.root());
        this.remove();
        otherNode.parent.insertAfter(otherNode, this);
        return this;
    };

    /**
     * Returns the next child of the node’s parent.
     * Returns `undefined` if the current node is the last child.
     *
     * @return {Node|undefined} next node
     *
     * @example
     * if ( comment.text === 'delete next' ) {
     *   const next = comment.next();
     *   if ( next ) {
     *     next.remove();
     *   }
     * }
     */

    Node.prototype.next = function next() {
        var index = this.parent.index(this);
        return this.parent.nodes[index + 1];
    };

    /**
     * Returns the previous child of the node’s parent.
     * Returns `undefined` if the current node is the first child.
     *
     * @return {Node|undefined} previous node
     *
     * @example
     * const annotation = decl.prev();
     * if ( annotation.type == 'comment' ) {
     *  readAnnotation(annotation.text);
     * }
     */

    Node.prototype.prev = function prev() {
        var index = this.parent.index(this);
        return this.parent.nodes[index - 1];
    };

    Node.prototype.toJSON = function toJSON() {
        var fixed = {};

        for (var name in this) {
            if (!this.hasOwnProperty(name)) continue;
            if (name === 'parent') continue;
            var value = this[name];

            if (value instanceof Array) {
                fixed[name] = value.map(function (i) {
                    if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && i.toJSON) {
                        return i.toJSON();
                    } else {
                        return i;
                    }
                });
            } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.toJSON) {
                fixed[name] = value.toJSON();
            } else {
                fixed[name] = value;
            }
        }

        return fixed;
    };

    /**
     * Returns a {@link Node#raws} value. If the node is missing
     * the code style property (because the node was manually built or cloned),
     * PostCSS will try to autodetect the code style property by looking
     * at other nodes in the tree.
     *
     * @param {string} prop          - name of code style property
     * @param {string} [defaultType] - name of default value, it can be missed
     *                                 if the value is the same as prop
     *
     * @example
     * const root = postcss.parse('a { background: white }');
     * root.nodes[0].append({ prop: 'color', value: 'black' });
     * root.nodes[0].nodes[1].raws.before   //=> undefined
     * root.nodes[0].nodes[1].raw('before') //=> ' '
     *
     * @return {string} code style value
     */

    Node.prototype.raw = function raw(prop, defaultType) {
        var str = new _stringifier2.default();
        return str.raw(this, prop, defaultType);
    };

    /**
     * Finds the Root instance of the node’s tree.
     *
     * @example
     * root.nodes[0].nodes[0].root() === root
     *
     * @return {Root} root parent
     */

    Node.prototype.root = function root() {
        var result = this;
        while (result.parent) {
            result = result.parent;
        }return result;
    };

    Node.prototype.cleanRaws = function cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween) delete this.raws.between;
    };

    Node.prototype.positionInside = function positionInside(index) {
        var string = this.toString();
        var column = this.source.start.column;
        var line = this.source.start.line;

        for (var i = 0; i < index; i++) {
            if (string[i] === '\n') {
                column = 1;
                line += 1;
            } else {
                column += 1;
            }
        }

        return { line: line, column: column };
    };

    Node.prototype.positionBy = function positionBy(opts) {
        var pos = this.source.start;
        if (opts.index) {
            pos = this.positionInside(opts.index);
        } else if (opts.word) {
            var index = this.toString().indexOf(opts.word);
            if (index !== -1) pos = this.positionInside(index);
        }
        return pos;
    };

    Node.prototype.removeSelf = function removeSelf() {
        (0, _warnOnce2.default)('Node#removeSelf is deprecated. Use Node#remove.');
        return this.remove();
    };

    Node.prototype.replace = function replace(nodes) {
        (0, _warnOnce2.default)('Node#replace is deprecated. Use Node#replaceWith');
        return this.replaceWith(nodes);
    };

    Node.prototype.style = function style(own, detect) {
        (0, _warnOnce2.default)('Node#style() is deprecated. Use Node#raw()');
        return this.raw(own, detect);
    };

    Node.prototype.cleanStyles = function cleanStyles(keepBetween) {
        (0, _warnOnce2.default)('Node#cleanStyles() is deprecated. Use Node#cleanRaws()');
        return this.cleanRaws(keepBetween);
    };

    _createClass(Node, [{
        key: 'before',
        get: function get() {
            (0, _warnOnce2.default)('Node#before is deprecated. Use Node#raws.before');
            return this.raws.before;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#before is deprecated. Use Node#raws.before');
            this.raws.before = val;
        }
    }, {
        key: 'between',
        get: function get() {
            (0, _warnOnce2.default)('Node#between is deprecated. Use Node#raws.between');
            return this.raws.between;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#between is deprecated. Use Node#raws.between');
            this.raws.between = val;
        }

        /**
         * @memberof Node#
         * @member {string} type - String representing the node’s type.
         *                         Possible values are `root`, `atrule`, `rule`,
         *                         `decl`, or `comment`.
         *
         * @example
         * postcss.decl({ prop: 'color', value: 'black' }).type //=> 'decl'
         */

        /**
         * @memberof Node#
         * @member {Container} parent - the node’s parent node.
         *
         * @example
         * root.nodes[0].parent == root;
         */

        /**
         * @memberof Node#
         * @member {source} source - the input source of the node
         *
         * The property is used in source map generation.
         *
         * If you create a node manually (e.g., with `postcss.decl()`),
         * that node will not have a `source` property and will be absent
         * from the source map. For this reason, the plugin developer should
         * consider cloning nodes to create new ones (in which case the new node’s
         * source will reference the original, cloned node) or setting
         * the `source` property manually.
         *
         * ```js
         * // Bad
         * const prefixed = postcss.decl({
         *   prop: '-moz-' + decl.prop,
         *   value: decl.value
         * });
         *
         * // Good
         * const prefixed = decl.clone({ prop: '-moz-' + decl.prop });
         * ```
         *
         * ```js
         * if ( atrule.name == 'add-link' ) {
         *   const rule = postcss.rule({ selector: 'a', source: atrule.source });
         *   atrule.parent.insertBefore(atrule, rule);
         * }
         * ```
         *
         * @example
         * decl.source.input.from //=> '/home/ai/a.sass'
         * decl.source.start      //=> { line: 10, column: 2 }
         * decl.source.end        //=> { line: 10, column: 12 }
         */

        /**
         * @memberof Node#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `after`: the space symbols after the last child of the node
         *   to the end of the node.
         * * `between`: the symbols between the property and value
         *   for declarations, selector and `{` for rules, or last parameter
         *   and `{` for at-rules.
         * * `semicolon`: contains true if the last child has
         *   an (optional) semicolon.
         * * `afterName`: the space between the at-rule name and its parameters.
         * * `left`: the space symbols between `/*` and the comment’s text.
         * * `right`: the space symbols between the comment’s text
         *   and <code>*&#47;</code>.
         * * `important`: the content of the important statement,
         *   if it is not just `!important`.
         *
         * PostCSS cleans selectors, declaration values and at-rule parameters
         * from comments and extra spaces, but it stores origin content in raws
         * properties. As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('a {\n  color:black\n}')
         * root.first.first.raws //=> { before: '\n  ', between: ':' }
         */

    }]);

    return Node;
}();

exports.default = Node;

/**
 * @typedef {object} position
 * @property {number} line   - source line in file
 * @property {number} column - source column in file
 */

/**
 * @typedef {object} source
 * @property {Input} input    - {@link Input} with input file
 * @property {position} start - The starting position of the node’s source
 * @property {position} end   - The ending position of the node’s source
 */

module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = parse;

var _parser = __webpack_require__(58);

var _parser2 = _interopRequireDefault(_parser);

var _input = __webpack_require__(20);

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function parse(css, opts) {
    if (opts && opts.safe) {
        throw new Error('Option safe was removed. ' + 'Use parser: require("postcss-safe-parser")');
    }

    var input = new _input2.default(css, opts);

    var parser = new _parser2.default(input);
    try {
        parser.tokenize();
        parser.loop();
    } catch (e) {
        if (e.name === 'CssSyntaxError' && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
                e.message += '\nYou tried to parse SCSS with ' + 'the standard CSS parser; ' + 'try again with the postcss-scss parser';
            } else if (/\.less$/i.test(opts.from)) {
                e.message += '\nYou tried to parse Less with ' + 'the standard CSS parser; ' + 'try again with the postcss-less parser';
            }
        }
        throw e;
    }

    return parser.root;
}
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _container = __webpack_require__(9);

var _container2 = _interopRequireDefault(_container);

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Represents a CSS file and contains all its parsed nodes.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{color:black} b{z-index:2}');
 * root.type         //=> 'root'
 * root.nodes.length //=> 2
 */
var Root = function (_Container) {
    _inherits(Root, _Container);

    function Root(defaults) {
        _classCallCheck(this, Root);

        var _this = _possibleConstructorReturn(this, _Container.call(this, defaults));

        _this.type = 'root';
        if (!_this.nodes) _this.nodes = [];
        return _this;
    }

    Root.prototype.removeChild = function removeChild(child) {
        child = this.index(child);

        if (child === 0 && this.nodes.length > 1) {
            this.nodes[1].raws.before = this.nodes[child].raws.before;
        }

        return _Container.prototype.removeChild.call(this, child);
    };

    Root.prototype.normalize = function normalize(child, sample, type) {
        var nodes = _Container.prototype.normalize.call(this, child);

        if (sample) {
            if (type === 'prepend') {
                if (this.nodes.length > 1) {
                    sample.raws.before = this.nodes[1].raws.before;
                } else {
                    delete sample.raws.before;
                }
            } else if (this.first !== sample) {
                for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var node = _ref;

                    node.raws.before = sample.raws.before;
                }
            }
        }

        return nodes;
    };

    /**
     * Returns a {@link Result} instance representing the root’s CSS.
     *
     * @param {processOptions} [opts] - options with only `to` and `map` keys
     *
     * @return {Result} result with current root’s CSS
     *
     * @example
     * const root1 = postcss.parse(css1, { from: 'a.css' });
     * const root2 = postcss.parse(css2, { from: 'b.css' });
     * root1.append(root2);
     * const result = root1.toResult({ to: 'all.css', map: true });
     */

    Root.prototype.toResult = function toResult() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var LazyResult = __webpack_require__(21);
        var Processor = __webpack_require__(23);

        var lazy = new LazyResult(new Processor(), this, opts);
        return lazy.stringify();
    };

    Root.prototype.remove = function remove(child) {
        (0, _warnOnce2.default)('Root#remove is deprecated. Use Root#removeChild');
        this.removeChild(child);
    };

    Root.prototype.prevMap = function prevMap() {
        (0, _warnOnce2.default)('Root#prevMap is deprecated. Use Root#source.input.map');
        return this.source.input.map;
    };

    /**
     * @memberof Root#
     * @member {object} raws - Information to generate byte-to-byte equal
     *                         node string as it was in the origin input.
     *
     * Every parser saves its own properties,
     * but the default CSS parser uses:
     *
     * * `after`: the space symbols after the last child to the end of file.
     * * `semicolon`: is the last child has an (optional) semicolon.
     *
     * @example
     * postcss.parse('a {}\n').raws //=> { after: '\n' }
     * postcss.parse('a {}').raws   //=> { after: '' }
     */

    return Root;
}(_container2.default);

exports.default = Root;
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = stringify;

var _stringifier = __webpack_require__(24);

var _stringifier2 = _interopRequireDefault(_stringifier);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function stringify(node, builder) {
    var str = new _stringifier2.default(builder);
    str.stringify(node);
}
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	return (/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g
	);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [begs.pop(), bi];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [left, right];
    }
  }

  return result;
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var escapeStringRegexp = __webpack_require__(35);
var ansiStyles = __webpack_require__(33);
var stripAnsi = __webpack_require__(72);
var hasAnsi = __webpack_require__(36);
var supportsColor = __webpack_require__(34);
var defineProps = Object.defineProperties;
var isSimpleWindowsTerm = process.platform === 'win32' && !/^xterm/i.test(process.env.TERM);

function Chalk(options) {
	// detect mode if not set manually
	this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
}

// use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\x1B[94m';
}

var styles = function () {
	var ret = {};

	Object.keys(ansiStyles).forEach(function (key) {
		ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

		ret[key] = {
			get: function get() {
				return build.call(this, this._styles.concat(key));
			}
		};
	});

	return ret;
}();

var proto = defineProps(function chalk() {}, styles);

function build(_styles) {
	var builder = function builder() {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder.enabled = this.enabled;
	// __proto__ is used because we must return a function, but there is
	// no way to create a function with a different prototype.
	/* eslint-disable no-proto */
	builder.__proto__ = proto;

	return builder;
}

function applyStyle() {
	// support varags, but simply cast to string in case there's only one arg
	var args = arguments;
	var argsLen = args.length;
	var str = argsLen !== 0 && String(arguments[0]);

	if (argsLen > 1) {
		// don't slice `arguments`, it prevents v8 optimizations
		for (var a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || !str) {
		return str;
	}

	var nestedStyles = this._styles;
	var i = nestedStyles.length;

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	var originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && (nestedStyles.indexOf('gray') !== -1 || nestedStyles.indexOf('grey') !== -1)) {
		ansiStyles.dim.open = '';
	}

	while (i--) {
		var code = ansiStyles[nestedStyles[i]];

		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;
	}

	// Reset the original 'dim' if we changed it to work around the Windows dimmed gray issue.
	ansiStyles.dim.open = originalDim;

	return str;
}

function init() {
	var ret = {};

	Object.keys(styles).forEach(function (name) {
		ret[name] = {
			get: function get() {
				return build.call(this, [name]);
			}
		};
	});

	return ret;
}

defineProps(Chalk.prototype, init());

module.exports = new Chalk();
module.exports.styles = ansiStyles;
module.exports.hasColor = hasAnsi;
module.exports.stripColor = stripAnsi;
module.exports.supportsColor = supportsColor;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _supportsColor = __webpack_require__(73);

var _supportsColor2 = _interopRequireDefault(_supportsColor);

var _chalk = __webpack_require__(18);

var _chalk2 = _interopRequireDefault(_chalk);

var _terminalHighlight = __webpack_require__(61);

var _terminalHighlight2 = _interopRequireDefault(_terminalHighlight);

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * The CSS parser throws this error for broken CSS.
 *
 * Custom parsers can throw this error for broken custom syntax using
 * the {@link Node#error} method.
 *
 * PostCSS will use the input source map to detect the original error location.
 * If you wrote a Sass file, compiled it to CSS and then parsed it with PostCSS,
 * PostCSS will show the original position in the Sass file.
 *
 * If you need the position in the PostCSS input
 * (e.g., to debug the previous compiler), use `error.input.file`.
 *
 * @example
 * // Catching and checking syntax error
 * try {
 *   postcss.parse('a{')
 * } catch (error) {
 *   if ( error.name === 'CssSyntaxError' ) {
 *     error //=> CssSyntaxError
 *   }
 * }
 *
 * @example
 * // Raising error from plugin
 * throw node.error('Unknown variable', { plugin: 'postcss-vars' });
 */
var CssSyntaxError = function () {

    /**
     * @param {string} message  - error message
     * @param {number} [line]   - source line of the error
     * @param {number} [column] - source column of the error
     * @param {string} [source] - source code of the broken file
     * @param {string} [file]   - absolute path to the broken file
     * @param {string} [plugin] - PostCSS plugin name, if error came from plugin
     */
    function CssSyntaxError(message, line, column, source, file, plugin) {
        _classCallCheck(this, CssSyntaxError);

        /**
         * @member {string} - Always equal to `'CssSyntaxError'`. You should
         *                    always check error type
         *                    by `error.name === 'CssSyntaxError'` instead of
         *                    `error instanceof CssSyntaxError`, because
         *                    npm could have several PostCSS versions.
         *
         * @example
         * if ( error.name === 'CssSyntaxError' ) {
         *   error //=> CssSyntaxError
         * }
         */
        this.name = 'CssSyntaxError';
        /**
         * @member {string} - Error message.
         *
         * @example
         * error.message //=> 'Unclosed block'
         */
        this.reason = message;

        if (file) {
            /**
             * @member {string} - Absolute path to the broken file.
             *
             * @example
             * error.file       //=> 'a.sass'
             * error.input.file //=> 'a.css'
             */
            this.file = file;
        }
        if (source) {
            /**
             * @member {string} - Source code of the broken file.
             *
             * @example
             * error.source       //=> 'a { b {} }'
             * error.input.column //=> 'a b { }'
             */
            this.source = source;
        }
        if (plugin) {
            /**
             * @member {string} - Plugin name, if error came from plugin.
             *
             * @example
             * error.plugin //=> 'postcss-vars'
             */
            this.plugin = plugin;
        }
        if (typeof line !== 'undefined' && typeof column !== 'undefined') {
            /**
             * @member {number} - Source line of the error.
             *
             * @example
             * error.line       //=> 2
             * error.input.line //=> 4
             */
            this.line = line;
            /**
             * @member {number} - Source column of the error.
             *
             * @example
             * error.column       //=> 1
             * error.input.column //=> 4
             */
            this.column = column;
        }

        this.setMessage();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CssSyntaxError);
        }
    }

    CssSyntaxError.prototype.setMessage = function setMessage() {
        /**
         * @member {string} - Full error text in the GNU error format
         *                    with plugin, file, line and column.
         *
         * @example
         * error.message //=> 'a.css:1:1: Unclosed block'
         */
        this.message = this.plugin ? this.plugin + ': ' : '';
        this.message += this.file ? this.file : '<css input>';
        if (typeof this.line !== 'undefined') {
            this.message += ':' + this.line + ':' + this.column;
        }
        this.message += ': ' + this.reason;
    };

    /**
     * Returns a few lines of CSS source that caused the error.
     *
     * If the CSS has an input source map without `sourceContent`,
     * this method will return an empty string.
     *
     * @param {boolean} [color] whether arrow will be colored red by terminal
     *                          color codes. By default, PostCSS will detect
     *                          color support by `process.stdout.isTTY`
     *                          and `process.env.NODE_DISABLE_COLORS`.
     *
     * @example
     * error.showSourceCode() //=> "  4 | }
     *                        //      5 | a {
     *                        //    > 6 |   bad
     *                        //        |   ^
     *                        //      7 | }
     *                        //      8 | b {"
     *
     * @return {string} few lines of CSS source that caused the error
     */

    CssSyntaxError.prototype.showSourceCode = function showSourceCode(color) {
        var _this = this;

        if (!this.source) return '';

        var css = this.source;
        if (typeof color === 'undefined') color = _supportsColor2.default;
        if (color) css = (0, _terminalHighlight2.default)(css);

        var lines = css.split(/\r?\n/);
        var start = Math.max(this.line - 3, 0);
        var end = Math.min(this.line + 2, lines.length);

        var maxWidth = String(end).length;
        var colors = new _chalk2.default.constructor({ enabled: true });

        function mark(text) {
            if (color) {
                return colors.red.bold(text);
            } else {
                return text;
            }
        }
        function aside(text) {
            if (color) {
                return colors.gray(text);
            } else {
                return text;
            }
        }

        return lines.slice(start, end).map(function (line, index) {
            var number = start + 1 + index;
            var gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';
            if (number === _this.line) {
                var spacing = aside(gutter.replace(/\d/g, ' ')) + line.slice(0, _this.column - 1).replace(/[^\t]/g, ' ');
                return mark('>') + aside(gutter) + line + '\n ' + spacing + mark('^');
            } else {
                return ' ' + aside(gutter) + line;
            }
        }).join('\n');
    };

    /**
     * Returns error position, message and source code of the broken part.
     *
     * @example
     * error.toString() //=> "CssSyntaxError: app.css:1:1: Unclosed block
     *                  //    > 1 | a {
     *                  //        | ^"
     *
     * @return {string} error position, message and source code
     */

    CssSyntaxError.prototype.toString = function toString() {
        var code = this.showSourceCode();
        if (code) {
            code = '\n\n' + code + '\n';
        }
        return this.name + ': ' + this.message + code;
    };

    _createClass(CssSyntaxError, [{
        key: 'generated',
        get: function get() {
            (0, _warnOnce2.default)('CssSyntaxError#generated is deprecated. Use input instead.');
            return this.input;
        }

        /**
         * @memberof CssSyntaxError#
         * @member {Input} input - Input object with PostCSS internal information
         *                         about input file. If input has source map
         *                         from previous tool, PostCSS will use origin
         *                         (for example, Sass) source. You can use this
         *                         object to get PostCSS input source.
         *
         * @example
         * error.input.file //=> 'a.css'
         * error.file       //=> 'a.sass'
         */

    }]);

    return CssSyntaxError;
}();

exports.default = CssSyntaxError;
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _cssSyntaxError = __webpack_require__(19);

var _cssSyntaxError2 = _interopRequireDefault(_cssSyntaxError);

var _previousMap = __webpack_require__(59);

var _previousMap2 = _interopRequireDefault(_previousMap);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var sequence = 0;

/**
 * Represents the source CSS.
 *
 * @example
 * const root  = postcss.parse(css, { from: file });
 * const input = root.source.input;
 */

var Input = function () {

    /**
     * @param {string} css    - input CSS source
     * @param {object} [opts] - {@link Processor#process} options
     */
    function Input(css) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Input);

        /**
         * @member {string} - input CSS source
         *
         * @example
         * const input = postcss.parse('a{}', { from: file }).input;
         * input.css //=> "a{}";
         */
        this.css = css.toString();

        if (this.css[0] === '\uFEFF' || this.css[0] === '\uFFFE') {
            this.css = this.css.slice(1);
        }

        if (opts.from) {
            if (/^\w+:\/\//.test(opts.from)) {
                /**
                 * @member {string} - The absolute path to the CSS source file
                 *                    defined with the `from` option.
                 *
                 * @example
                 * const root = postcss.parse(css, { from: 'a.css' });
                 * root.source.input.file //=> '/home/ai/a.css'
                 */
                this.file = opts.from;
            } else {
                this.file = _path2.default.resolve(opts.from);
            }
        }

        var map = new _previousMap2.default(this.css, opts);
        if (map.text) {
            /**
             * @member {PreviousMap} - The input source map passed from
             *                         a compilation step before PostCSS
             *                         (for example, from Sass compiler).
             *
             * @example
             * root.source.input.map.consumer().sources //=> ['a.sass']
             */
            this.map = map;
            var file = map.consumer().file;
            if (!this.file && file) this.file = this.mapResolve(file);
        }

        if (!this.file) {
            sequence += 1;
            /**
             * @member {string} - The unique ID of the CSS source. It will be
             *                    created if `from` option is not provided
             *                    (because PostCSS does not know the file path).
             *
             * @example
             * const root = postcss.parse(css);
             * root.source.input.file //=> undefined
             * root.source.input.id   //=> "<input css 1>"
             */
            this.id = '<input css ' + sequence + '>';
        }
        if (this.map) this.map.file = this.from;
    }

    Input.prototype.error = function error(message, line, column) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var result = void 0;
        var origin = this.origin(line, column);
        if (origin) {
            result = new _cssSyntaxError2.default(message, origin.line, origin.column, origin.source, origin.file, opts.plugin);
        } else {
            result = new _cssSyntaxError2.default(message, line, column, this.css, this.file, opts.plugin);
        }

        result.input = { line: line, column: column, source: this.css };
        if (this.file) result.input.file = this.file;

        return result;
    };

    /**
     * Reads the input source map and returns a symbol position
     * in the input source (e.g., in a Sass file that was compiled
     * to CSS before being passed to PostCSS).
     *
     * @param {number} line   - line in input CSS
     * @param {number} column - column in input CSS
     *
     * @return {filePosition} position in input source
     *
     * @example
     * root.source.input.origin(1, 1) //=> { file: 'a.css', line: 3, column: 1 }
     */

    Input.prototype.origin = function origin(line, column) {
        if (!this.map) return false;
        var consumer = this.map.consumer();

        var from = consumer.originalPositionFor({ line: line, column: column });
        if (!from.source) return false;

        var result = {
            file: this.mapResolve(from.source),
            line: from.line,
            column: from.column
        };

        var source = consumer.sourceContentFor(from.source);
        if (source) result.source = source;

        return result;
    };

    Input.prototype.mapResolve = function mapResolve(file) {
        if (/^\w+:\/\//.test(file)) {
            return file;
        } else {
            return _path2.default.resolve(this.map.consumer().sourceRoot || '.', file);
        }
    };

    /**
     * The CSS source identifier. Contains {@link Input#file} if the user
     * set the `from` option, or {@link Input#id} if they did not.
     * @type {string}
     *
     * @example
     * const root = postcss.parse(css, { from: 'a.css' });
     * root.source.input.from //=> "/home/ai/a.css"
     *
     * const root = postcss.parse(css);
     * root.source.input.from //=> "<input css 1>"
     */

    _createClass(Input, [{
        key: 'from',
        get: function get() {
            return this.file || this.id;
        }
    }]);

    return Input;
}();

exports.default = Input;

/**
 * @typedef  {object} filePosition
 * @property {string} file   - path to file
 * @property {number} line   - source line in file
 * @property {number} column - source column in file
 */

module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _mapGenerator = __webpack_require__(57);

var _mapGenerator2 = _interopRequireDefault(_mapGenerator);

var _stringify2 = __webpack_require__(14);

var _stringify3 = _interopRequireDefault(_stringify2);

var _warnOnce = __webpack_require__(0);

var _warnOnce2 = _interopRequireDefault(_warnOnce);

var _result = __webpack_require__(60);

var _result2 = _interopRequireDefault(_result);

var _parse = __webpack_require__(12);

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function isPromise(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.then === 'function';
}

/**
 * A Promise proxy for the result of PostCSS transformations.
 *
 * A `LazyResult` instance is returned by {@link Processor#process}.
 *
 * @example
 * const lazy = postcss([cssnext]).process(css);
 */

var LazyResult = function () {
    function LazyResult(processor, css, opts) {
        _classCallCheck(this, LazyResult);

        this.stringified = false;
        this.processed = false;

        var root = void 0;
        if ((typeof css === 'undefined' ? 'undefined' : _typeof(css)) === 'object' && css.type === 'root') {
            root = css;
        } else if (css instanceof LazyResult || css instanceof _result2.default) {
            root = css.root;
            if (css.map) {
                if (typeof opts.map === 'undefined') opts.map = {};
                if (!opts.map.inline) opts.map.inline = false;
                opts.map.prev = css.map;
            }
        } else {
            var parser = _parse2.default;
            if (opts.syntax) parser = opts.syntax.parse;
            if (opts.parser) parser = opts.parser;
            if (parser.parse) parser = parser.parse;

            try {
                root = parser(css, opts);
            } catch (error) {
                this.error = error;
            }
        }

        this.result = new _result2.default(processor, root, opts);
    }

    /**
     * Returns a {@link Processor} instance, which will be used
     * for CSS transformations.
     * @type {Processor}
     */

    /**
     * Processes input CSS through synchronous plugins
     * and calls {@link Result#warnings()}.
     *
     * @return {Warning[]} warnings from plugins
     */
    LazyResult.prototype.warnings = function warnings() {
        return this.sync().warnings();
    };

    /**
     * Alias for the {@link LazyResult#css} property.
     *
     * @example
     * lazy + '' === lazy.css;
     *
     * @return {string} output CSS
     */

    LazyResult.prototype.toString = function toString() {
        return this.css;
    };

    /**
     * Processes input CSS through synchronous and asynchronous plugins
     * and calls `onFulfilled` with a Result instance. If a plugin throws
     * an error, the `onRejected` callback will be executed.
     *
     * It implements standard Promise API.
     *
     * @param {onFulfilled} onFulfilled - callback will be executed
     *                                    when all plugins will finish work
     * @param {onRejected}  onRejected  - callback will be executed on any error
     *
     * @return {Promise} Promise API to make queue
     *
     * @example
     * postcss([cssnext]).process(css).then(result => {
     *   console.log(result.css);
     * });
     */

    LazyResult.prototype.then = function then(onFulfilled, onRejected) {
        return this.async().then(onFulfilled, onRejected);
    };

    /**
     * Processes input CSS through synchronous and asynchronous plugins
     * and calls onRejected for each error thrown in any plugin.
     *
     * It implements standard Promise API.
     *
     * @param {onRejected} onRejected - callback will be executed on any error
     *
     * @return {Promise} Promise API to make queue
     *
     * @example
     * postcss([cssnext]).process(css).then(result => {
     *   console.log(result.css);
     * }).catch(error => {
     *   console.error(error);
     * });
     */

    LazyResult.prototype.catch = function _catch(onRejected) {
        return this.async().catch(onRejected);
    };

    LazyResult.prototype.handleError = function handleError(error, plugin) {
        try {
            this.error = error;
            if (error.name === 'CssSyntaxError' && !error.plugin) {
                error.plugin = plugin.postcssPlugin;
                error.setMessage();
            } else if (plugin.postcssVersion) {
                var pluginName = plugin.postcssPlugin;
                var pluginVer = plugin.postcssVersion;
                var runtimeVer = this.result.processor.version;
                var a = pluginVer.split('.');
                var b = runtimeVer.split('.');

                if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                    (0, _warnOnce2.default)('Your current PostCSS version ' + 'is ' + runtimeVer + ', but ' + pluginName + ' ' + 'uses ' + pluginVer + '. Perhaps this is ' + 'the source of the error below.');
                }
            }
        } catch (err) {
            if (console && console.error) console.error(err);
        }
    };

    LazyResult.prototype.asyncTick = function asyncTick(resolve, reject) {
        var _this = this;

        if (this.plugin >= this.processor.plugins.length) {
            this.processed = true;
            return resolve();
        }

        try {
            var plugin = this.processor.plugins[this.plugin];
            var promise = this.run(plugin);
            this.plugin += 1;

            if (isPromise(promise)) {
                promise.then(function () {
                    _this.asyncTick(resolve, reject);
                }).catch(function (error) {
                    _this.handleError(error, plugin);
                    _this.processed = true;
                    reject(error);
                });
            } else {
                this.asyncTick(resolve, reject);
            }
        } catch (error) {
            this.processed = true;
            reject(error);
        }
    };

    LazyResult.prototype.async = function async() {
        var _this2 = this;

        if (this.processed) {
            return new Promise(function (resolve, reject) {
                if (_this2.error) {
                    reject(_this2.error);
                } else {
                    resolve(_this2.stringify());
                }
            });
        }
        if (this.processing) {
            return this.processing;
        }

        this.processing = new Promise(function (resolve, reject) {
            if (_this2.error) return reject(_this2.error);
            _this2.plugin = 0;
            _this2.asyncTick(resolve, reject);
        }).then(function () {
            _this2.processed = true;
            return _this2.stringify();
        });

        return this.processing;
    };

    LazyResult.prototype.sync = function sync() {
        if (this.processed) return this.result;
        this.processed = true;

        if (this.processing) {
            throw new Error('Use process(css).then(cb) to work with async plugins');
        }

        if (this.error) throw this.error;

        for (var _iterator = this.result.processor.plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var plugin = _ref;

            var promise = this.run(plugin);
            if (isPromise(promise)) {
                throw new Error('Use process(css).then(cb) to work with async plugins');
            }
        }

        return this.result;
    };

    LazyResult.prototype.run = function run(plugin) {
        this.result.lastPlugin = plugin;

        try {
            return plugin(this.result.root, this.result);
        } catch (error) {
            this.handleError(error, plugin);
            throw error;
        }
    };

    LazyResult.prototype.stringify = function stringify() {
        if (this.stringified) return this.result;
        this.stringified = true;

        this.sync();

        var opts = this.result.opts;
        var str = _stringify3.default;
        if (opts.syntax) str = opts.syntax.stringify;
        if (opts.stringifier) str = opts.stringifier;
        if (str.stringify) str = str.stringify;

        var map = new _mapGenerator2.default(str, this.result.root, this.result.opts);
        var data = map.generate();
        this.result.css = data[0];
        this.result.map = data[1];

        return this.result;
    };

    _createClass(LazyResult, [{
        key: 'processor',
        get: function get() {
            return this.result.processor;
        }

        /**
         * Options from the {@link Processor#process} call.
         * @type {processOptions}
         */

    }, {
        key: 'opts',
        get: function get() {
            return this.result.opts;
        }

        /**
         * Processes input CSS through synchronous plugins, converts `Root`
         * to a CSS string and returns {@link Result#css}.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {string}
         * @see Result#css
         */

    }, {
        key: 'css',
        get: function get() {
            return this.stringify().css;
        }

        /**
         * An alias for the `css` property. Use it with syntaxes
         * that generate non-CSS output.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {string}
         * @see Result#content
         */

    }, {
        key: 'content',
        get: function get() {
            return this.stringify().content;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#map}.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {SourceMapGenerator}
         * @see Result#map
         */

    }, {
        key: 'map',
        get: function get() {
            return this.stringify().map;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#root}.
         *
         * This property will only work with synchronous plugins. If the processor
         * contains any asynchronous plugins it will throw an error.
         *
         * This is why this method is only for debug purpose,
         * you should always use {@link LazyResult#then}.
         *
         * @type {Root}
         * @see Result#root
         */

    }, {
        key: 'root',
        get: function get() {
            return this.sync().root;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#messages}.
         *
         * This property will only work with synchronous plugins. If the processor
         * contains any asynchronous plugins it will throw an error.
         *
         * This is why this method is only for debug purpose,
         * you should always use {@link LazyResult#then}.
         *
         * @type {Message[]}
         * @see Result#messages
         */

    }, {
        key: 'messages',
        get: function get() {
            return this.sync().messages;
        }
    }]);

    return LazyResult;
}();

exports.default = LazyResult;

/**
 * @callback onFulfilled
 * @param {Result} result
 */

/**
 * @callback onRejected
 * @param {Error} error
 */

module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Contains helpers for safely splitting lists of CSS values,
 * preserving parentheses and quotes.
 *
 * @example
 * const list = postcss.list;
 *
 * @namespace list
 */
var list = {
    split: function split(string, separators, last) {
        var array = [];
        var current = '';
        var split = false;

        var func = 0;
        var quote = false;
        var escape = false;

        for (var i = 0; i < string.length; i++) {
            var letter = string[i];

            if (quote) {
                if (escape) {
                    escape = false;
                } else if (letter === '\\') {
                    escape = true;
                } else if (letter === quote) {
                    quote = false;
                }
            } else if (letter === '"' || letter === '\'') {
                quote = letter;
            } else if (letter === '(') {
                func += 1;
            } else if (letter === ')') {
                if (func > 0) func -= 1;
            } else if (func === 0) {
                if (separators.indexOf(letter) !== -1) split = true;
            }

            if (split) {
                if (current !== '') array.push(current.trim());
                current = '';
                split = false;
            } else {
                current += letter;
            }
        }

        if (last || current !== '') array.push(current.trim());
        return array;
    },

    /**
     * Safely splits space-separated values (such as those for `background`,
     * `border-radius`, and other shorthand properties).
     *
     * @param {string} string - space-separated values
     *
     * @return {string[]} split values
     *
     * @example
     * postcss.list.space('1px calc(10% + 1px)') //=> ['1px', 'calc(10% + 1px)']
     */
    space: function space(string) {
        var spaces = [' ', '\n', '\t'];
        return list.split(string, spaces);
    },

    /**
     * Safely splits comma-separated values (such as those for `transition-*`
     * and `background` properties).
     *
     * @param {string} string - comma-separated values
     *
     * @return {string[]} split values
     *
     * @example
     * postcss.list.comma('black, linear-gradient(white, black)')
     * //=> ['black', 'linear-gradient(white, black)']
     */
    comma: function comma(string) {
        var comma = ',';
        return list.split(string, [comma], true);
    }
};

exports.default = list;
module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _lazyResult = __webpack_require__(21);

var _lazyResult2 = _interopRequireDefault(_lazyResult);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Contains plugins to process CSS. Create one `Processor` instance,
 * initialize its plugins, and then use that instance on numerous CSS files.
 *
 * @example
 * const processor = postcss([autoprefixer, precss]);
 * processor.process(css1).then(result => console.log(result.css));
 * processor.process(css2).then(result => console.log(result.css));
 */
var Processor = function () {

  /**
   * @param {Array.<Plugin|pluginFunction>|Processor} plugins - PostCSS
   *        plugins. See {@link Processor#use} for plugin format.
   */
  function Processor() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Processor);

    /**
     * @member {string} - Current PostCSS version.
     *
     * @example
     * if ( result.processor.version.split('.')[0] !== '5' ) {
     *   throw new Error('This plugin works only with PostCSS 5');
     * }
     */
    this.version = '5.2.16';
    /**
     * @member {pluginFunction[]} - Plugins added to this processor.
     *
     * @example
     * const processor = postcss([autoprefixer, precss]);
     * processor.plugins.length //=> 2
     */
    this.plugins = this.normalize(plugins);
  }

  /**
   * Adds a plugin to be used as a CSS processor.
   *
   * PostCSS plugin can be in 4 formats:
   * * A plugin created by {@link postcss.plugin} method.
   * * A function. PostCSS will pass the function a @{link Root}
   *   as the first argument and current {@link Result} instance
   *   as the second.
   * * An object with a `postcss` method. PostCSS will use that method
   *   as described in #2.
   * * Another {@link Processor} instance. PostCSS will copy plugins
   *   from that instance into this one.
   *
   * Plugins can also be added by passing them as arguments when creating
   * a `postcss` instance (see [`postcss(plugins)`]).
   *
   * Asynchronous plugins should return a `Promise` instance.
   *
   * @param {Plugin|pluginFunction|Processor} plugin - PostCSS plugin
   *                                                   or {@link Processor}
   *                                                   with plugins
   *
   * @example
   * const processor = postcss()
   *   .use(autoprefixer)
   *   .use(precss);
   *
   * @return {Processes} current processor to make methods chain
   */

  Processor.prototype.use = function use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]));
    return this;
  };

  /**
   * Parses source CSS and returns a {@link LazyResult} Promise proxy.
   * Because some plugins can be asynchronous it doesn’t make
   * any transformations. Transformations will be applied
   * in the {@link LazyResult} methods.
   *
   * @param {string|toString|Result} css - String with input CSS or
   *                                       any object with a `toString()`
   *                                       method, like a Buffer.
   *                                       Optionally, send a {@link Result}
   *                                       instance and the processor will
   *                                       take the {@link Root} from it.
   * @param {processOptions} [opts]      - options
   *
   * @return {LazyResult} Promise proxy
   *
   * @example
   * processor.process(css, { from: 'a.css', to: 'a.out.css' })
   *   .then(result => {
   *      console.log(result.css);
   *   });
   */

  Processor.prototype.process = function process(css) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new _lazyResult2.default(this, css, opts);
  };

  Processor.prototype.normalize = function normalize(plugins) {
    var normalized = [];
    for (var _iterator = plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var i = _ref;

      if (i.postcss) i = i.postcss;

      if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === 'function') {
        normalized.push(i);
      } else if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && (i.parse || i.stringify)) {
        throw new Error('PostCSS syntaxes cannot be used as plugins. ' + 'Instead, please use one of the ' + 'syntax/parser/stringifier options as ' + 'outlined in your PostCSS ' + 'runner documentation.');
      } else {
        throw new Error(i + ' is not a PostCSS plugin');
      }
    }
    return normalized;
  };

  return Processor;
}();

exports.default = Processor;

/**
 * @callback builder
 * @param {string} part          - part of generated CSS connected to this node
 * @param {Node}   node          - AST node
 * @param {"start"|"end"} [type] - node’s part type
 */

/**
 * @callback parser
 *
 * @param {string|toString} css   - string with input CSS or any object
 *                                  with toString() method, like a Buffer
 * @param {processOptions} [opts] - options with only `from` and `map` keys
 *
 * @return {Root} PostCSS AST
 */

/**
 * @callback stringifier
 *
 * @param {Node} node       - start node for stringifing. Usually {@link Root}.
 * @param {builder} builder - function to concatenate CSS from node’s parts
 *                            or generate string and source map
 *
 * @return {void}
 */

/**
 * @typedef {object} syntax
 * @property {parser} parse          - function to generate AST by string
 * @property {stringifier} stringify - function to generate string by AST
 */

/**
 * @typedef {object} toString
 * @property {function} toString
 */

/**
 * @callback pluginFunction
 * @param {Root} root     - parsed input CSS
 * @param {Result} result - result to set warnings or check other plugins
 */

/**
 * @typedef {object} Plugin
 * @property {function} postcss - PostCSS plugin function
 */

/**
 * @typedef {object} processOptions
 * @property {string} from             - the path of the CSS source file.
 *                                       You should always set `from`,
 *                                       because it is used in source map
 *                                       generation and syntax error messages.
 * @property {string} to               - the path where you’ll put the output
 *                                       CSS file. You should always set `to`
 *                                       to generate correct source maps.
 * @property {parser} parser           - function to generate AST by string
 * @property {stringifier} stringifier - class to generate string by AST
 * @property {syntax} syntax           - object with `parse` and `stringify`
 * @property {object} map              - source map options
 * @property {boolean} map.inline                    - does source map should
 *                                                     be embedded in the output
 *                                                     CSS as a base64-encoded
 *                                                     comment
 * @property {string|object|false|function} map.prev - source map content
 *                                                     from a previous
 *                                                     processing step
 *                                                     (for example, Sass).
 *                                                     PostCSS will try to find
 *                                                     previous map
 *                                                     automatically, so you
 *                                                     could disable it by
 *                                                     `false` value.
 * @property {boolean} map.sourcesContent            - does PostCSS should set
 *                                                     the origin content to map
 * @property {string|false} map.annotation           - does PostCSS should set
 *                                                     annotation comment to map
 * @property {string} map.from                       - override `from` in map’s
 *                                                     `sources`
 */

module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var defaultRaw = {
    colon: ': ',
    indent: '    ',
    beforeDecl: '\n',
    beforeRule: '\n',
    beforeOpen: ' ',
    beforeClose: '\n',
    beforeComment: '\n',
    after: '\n',
    emptyBody: '',
    commentLeft: ' ',
    commentRight: ' '
};

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

var Stringifier = function () {
    function Stringifier(builder) {
        _classCallCheck(this, Stringifier);

        this.builder = builder;
    }

    Stringifier.prototype.stringify = function stringify(node, semicolon) {
        this[node.type](node, semicolon);
    };

    Stringifier.prototype.root = function root(node) {
        this.body(node);
        if (node.raws.after) this.builder(node.raws.after);
    };

    Stringifier.prototype.comment = function comment(node) {
        var left = this.raw(node, 'left', 'commentLeft');
        var right = this.raw(node, 'right', 'commentRight');
        this.builder('/*' + left + node.text + right + '*/', node);
    };

    Stringifier.prototype.decl = function decl(node, semicolon) {
        var between = this.raw(node, 'between', 'colon');
        var string = node.prop + between + this.rawValue(node, 'value');

        if (node.important) {
            string += node.raws.important || ' !important';
        }

        if (semicolon) string += ';';
        this.builder(string, node);
    };

    Stringifier.prototype.rule = function rule(node) {
        this.block(node, this.rawValue(node, 'selector'));
    };

    Stringifier.prototype.atrule = function atrule(node, semicolon) {
        var name = '@' + node.name;
        var params = node.params ? this.rawValue(node, 'params') : '';

        if (typeof node.raws.afterName !== 'undefined') {
            name += node.raws.afterName;
        } else if (params) {
            name += ' ';
        }

        if (node.nodes) {
            this.block(node, name + params);
        } else {
            var end = (node.raws.between || '') + (semicolon ? ';' : '');
            this.builder(name + params + end, node);
        }
    };

    Stringifier.prototype.body = function body(node) {
        var last = node.nodes.length - 1;
        while (last > 0) {
            if (node.nodes[last].type !== 'comment') break;
            last -= 1;
        }

        var semicolon = this.raw(node, 'semicolon');
        for (var i = 0; i < node.nodes.length; i++) {
            var child = node.nodes[i];
            var before = this.raw(child, 'before');
            if (before) this.builder(before);
            this.stringify(child, last !== i || semicolon);
        }
    };

    Stringifier.prototype.block = function block(node, start) {
        var between = this.raw(node, 'between', 'beforeOpen');
        this.builder(start + between + '{', node, 'start');

        var after = void 0;
        if (node.nodes && node.nodes.length) {
            this.body(node);
            after = this.raw(node, 'after');
        } else {
            after = this.raw(node, 'after', 'emptyBody');
        }

        if (after) this.builder(after);
        this.builder('}', node, 'end');
    };

    Stringifier.prototype.raw = function raw(node, own, detect) {
        var value = void 0;
        if (!detect) detect = own;

        // Already had
        if (own) {
            value = node.raws[own];
            if (typeof value !== 'undefined') return value;
        }

        var parent = node.parent;

        // Hack for first rule in CSS
        if (detect === 'before') {
            if (!parent || parent.type === 'root' && parent.first === node) {
                return '';
            }
        }

        // Floating child without parent
        if (!parent) return defaultRaw[detect];

        // Detect style by other nodes
        var root = node.root();
        if (!root.rawCache) root.rawCache = {};
        if (typeof root.rawCache[detect] !== 'undefined') {
            return root.rawCache[detect];
        }

        if (detect === 'before' || detect === 'after') {
            return this.beforeAfter(node, detect);
        } else {
            var method = 'raw' + capitalize(detect);
            if (this[method]) {
                value = this[method](root, node);
            } else {
                root.walk(function (i) {
                    value = i.raws[own];
                    if (typeof value !== 'undefined') return false;
                });
            }
        }

        if (typeof value === 'undefined') value = defaultRaw[detect];

        root.rawCache[detect] = value;
        return value;
    };

    Stringifier.prototype.rawSemicolon = function rawSemicolon(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length && i.last.type === 'decl') {
                value = i.raws.semicolon;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawEmptyBody = function rawEmptyBody(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length === 0) {
                value = i.raws.after;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawIndent = function rawIndent(root) {
        if (root.raws.indent) return root.raws.indent;
        var value = void 0;
        root.walk(function (i) {
            var p = i.parent;
            if (p && p !== root && p.parent && p.parent === root) {
                if (typeof i.raws.before !== 'undefined') {
                    var parts = i.raws.before.split('\n');
                    value = parts[parts.length - 1];
                    value = value.replace(/[^\s]/g, '');
                    return false;
                }
            }
        });
        return value;
    };

    Stringifier.prototype.rawBeforeComment = function rawBeforeComment(root, node) {
        var value = void 0;
        root.walkComments(function (i) {
            if (typeof i.raws.before !== 'undefined') {
                value = i.raws.before;
                if (value.indexOf('\n') !== -1) {
                    value = value.replace(/[^\n]+$/, '');
                }
                return false;
            }
        });
        if (typeof value === 'undefined') {
            value = this.raw(node, null, 'beforeDecl');
        }
        return value;
    };

    Stringifier.prototype.rawBeforeDecl = function rawBeforeDecl(root, node) {
        var value = void 0;
        root.walkDecls(function (i) {
            if (typeof i.raws.before !== 'undefined') {
                value = i.raws.before;
                if (value.indexOf('\n') !== -1) {
                    value = value.replace(/[^\n]+$/, '');
                }
                return false;
            }
        });
        if (typeof value === 'undefined') {
            value = this.raw(node, null, 'beforeRule');
        }
        return value;
    };

    Stringifier.prototype.rawBeforeRule = function rawBeforeRule(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && (i.parent !== root || root.first !== i)) {
                if (typeof i.raws.before !== 'undefined') {
                    value = i.raws.before;
                    if (value.indexOf('\n') !== -1) {
                        value = value.replace(/[^\n]+$/, '');
                    }
                    return false;
                }
            }
        });
        return value;
    };

    Stringifier.prototype.rawBeforeClose = function rawBeforeClose(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length > 0) {
                if (typeof i.raws.after !== 'undefined') {
                    value = i.raws.after;
                    if (value.indexOf('\n') !== -1) {
                        value = value.replace(/[^\n]+$/, '');
                    }
                    return false;
                }
            }
        });
        return value;
    };

    Stringifier.prototype.rawBeforeOpen = function rawBeforeOpen(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.type !== 'decl') {
                value = i.raws.between;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawColon = function rawColon(root) {
        var value = void 0;
        root.walkDecls(function (i) {
            if (typeof i.raws.between !== 'undefined') {
                value = i.raws.between.replace(/[^\s:]/g, '');
                return false;
            }
        });
        return value;
    };

    Stringifier.prototype.beforeAfter = function beforeAfter(node, detect) {
        var value = void 0;
        if (node.type === 'decl') {
            value = this.raw(node, null, 'beforeDecl');
        } else if (node.type === 'comment') {
            value = this.raw(node, null, 'beforeComment');
        } else if (detect === 'before') {
            value = this.raw(node, null, 'beforeRule');
        } else {
            value = this.raw(node, null, 'beforeClose');
        }

        var buf = node.parent;
        var depth = 0;
        while (buf && buf.type !== 'root') {
            depth += 1;
            buf = buf.parent;
        }

        if (value.indexOf('\n') !== -1) {
            var indent = this.raw(node, null, 'indent');
            if (indent.length) {
                for (var step = 0; step < depth; step++) {
                    value += indent;
                }
            }
        }

        return value;
    };

    Stringifier.prototype.rawValue = function rawValue(node, prop) {
        var value = node[prop];
        var raw = node.raws[prop];
        if (raw && raw.value === value) {
            return raw.raw;
        } else {
            return value;
        }
    };

    return Stringifier;
}();

exports.default = Stringifier;
module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = tokenize;
var SINGLE_QUOTE = 39;
var DOUBLE_QUOTE = 34;
var BACKSLASH = 92;
var SLASH = 47;
var NEWLINE = 10;
var SPACE = 32;
var FEED = 12;
var TAB = 9;
var CR = 13;
var OPEN_SQUARE = 91;
var CLOSE_SQUARE = 93;
var OPEN_PARENTHESES = 40;
var CLOSE_PARENTHESES = 41;
var OPEN_CURLY = 123;
var CLOSE_CURLY = 125;
var SEMICOLON = 59;
var ASTERISK = 42;
var COLON = 58;
var AT = 64;

var RE_AT_END = /[ \n\t\r\f\{\(\)'"\\;/\[\]#]/g;
var RE_WORD_END = /[ \n\t\r\f\(\)\{\}:;@!'"\\\]\[#]|\/(?=\*)/g;
var RE_BAD_BRACKET = /.[\\\/\("'\n]/;

function tokenize(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var tokens = [];
    var css = input.css.valueOf();

    var ignore = options.ignoreErrors;

    var code = void 0,
        next = void 0,
        quote = void 0,
        lines = void 0,
        last = void 0,
        content = void 0,
        escape = void 0,
        nextLine = void 0,
        nextOffset = void 0,
        escaped = void 0,
        escapePos = void 0,
        prev = void 0,
        n = void 0;

    var length = css.length;
    var offset = -1;
    var line = 1;
    var pos = 0;

    function unclosed(what) {
        throw input.error('Unclosed ' + what, line, pos - offset);
    }

    while (pos < length) {
        code = css.charCodeAt(pos);

        if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
            offset = pos;
            line += 1;
        }

        switch (code) {
            case NEWLINE:
            case SPACE:
            case TAB:
            case CR:
            case FEED:
                next = pos;
                do {
                    next += 1;
                    code = css.charCodeAt(next);
                    if (code === NEWLINE) {
                        offset = next;
                        line += 1;
                    }
                } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);

                tokens.push(['space', css.slice(pos, next)]);
                pos = next - 1;
                break;

            case OPEN_SQUARE:
                tokens.push(['[', '[', line, pos - offset]);
                break;

            case CLOSE_SQUARE:
                tokens.push([']', ']', line, pos - offset]);
                break;

            case OPEN_CURLY:
                tokens.push(['{', '{', line, pos - offset]);
                break;

            case CLOSE_CURLY:
                tokens.push(['}', '}', line, pos - offset]);
                break;

            case COLON:
                tokens.push([':', ':', line, pos - offset]);
                break;

            case SEMICOLON:
                tokens.push([';', ';', line, pos - offset]);
                break;

            case OPEN_PARENTHESES:
                prev = tokens.length ? tokens[tokens.length - 1][1] : '';
                n = css.charCodeAt(pos + 1);
                if (prev === 'url' && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
                    next = pos;
                    do {
                        escaped = false;
                        next = css.indexOf(')', next + 1);
                        if (next === -1) {
                            if (ignore) {
                                next = pos;
                                break;
                            } else {
                                unclosed('bracket');
                            }
                        }
                        escapePos = next;
                        while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                            escapePos -= 1;
                            escaped = !escaped;
                        }
                    } while (escaped);

                    tokens.push(['brackets', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                    pos = next;
                } else {
                    next = css.indexOf(')', pos + 1);
                    content = css.slice(pos, next + 1);

                    if (next === -1 || RE_BAD_BRACKET.test(content)) {
                        tokens.push(['(', '(', line, pos - offset]);
                    } else {
                        tokens.push(['brackets', content, line, pos - offset, line, next - offset]);
                        pos = next;
                    }
                }

                break;

            case CLOSE_PARENTHESES:
                tokens.push([')', ')', line, pos - offset]);
                break;

            case SINGLE_QUOTE:
            case DOUBLE_QUOTE:
                quote = code === SINGLE_QUOTE ? '\'' : '"';
                next = pos;
                do {
                    escaped = false;
                    next = css.indexOf(quote, next + 1);
                    if (next === -1) {
                        if (ignore) {
                            next = pos + 1;
                            break;
                        } else {
                            unclosed('string');
                        }
                    }
                    escapePos = next;
                    while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                        escapePos -= 1;
                        escaped = !escaped;
                    }
                } while (escaped);

                content = css.slice(pos, next + 1);
                lines = content.split('\n');
                last = lines.length - 1;

                if (last > 0) {
                    nextLine = line + last;
                    nextOffset = next - lines[last].length;
                } else {
                    nextLine = line;
                    nextOffset = offset;
                }

                tokens.push(['string', css.slice(pos, next + 1), line, pos - offset, nextLine, next - nextOffset]);

                offset = nextOffset;
                line = nextLine;
                pos = next;
                break;

            case AT:
                RE_AT_END.lastIndex = pos + 1;
                RE_AT_END.test(css);
                if (RE_AT_END.lastIndex === 0) {
                    next = css.length - 1;
                } else {
                    next = RE_AT_END.lastIndex - 2;
                }
                tokens.push(['at-word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                pos = next;
                break;

            case BACKSLASH:
                next = pos;
                escape = true;
                while (css.charCodeAt(next + 1) === BACKSLASH) {
                    next += 1;
                    escape = !escape;
                }
                code = css.charCodeAt(next + 1);
                if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
                    next += 1;
                }
                tokens.push(['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                pos = next;
                break;

            default:
                if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
                    next = css.indexOf('*/', pos + 2) + 1;
                    if (next === 0) {
                        if (ignore) {
                            next = css.length;
                        } else {
                            unclosed('comment');
                        }
                    }

                    content = css.slice(pos, next + 1);
                    lines = content.split('\n');
                    last = lines.length - 1;

                    if (last > 0) {
                        nextLine = line + last;
                        nextOffset = next - lines[last].length;
                    } else {
                        nextLine = line;
                        nextOffset = offset;
                    }

                    tokens.push(['comment', content, line, pos - offset, nextLine, next - nextOffset]);

                    offset = nextOffset;
                    line = nextLine;
                    pos = next;
                } else {
                    RE_WORD_END.lastIndex = pos + 1;
                    RE_WORD_END.test(css);
                    if (RE_WORD_END.lastIndex === 0) {
                        next = css.length - 1;
                    } else {
                        next = RE_WORD_END.lastIndex - 2;
                    }

                    tokens.push(['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                    pos = next;
                }

                break;
        }

        pos++;
    }

    return tokens;
}
module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(1);
var has = Object.prototype.hasOwnProperty;

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = util.toSetString(aStr);
  var isDuplicate = has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    this._set[sStr] = idx;
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  var sStr = util.toSetString(aStr);
  return has.call(this._set, sStr);
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  var sStr = util.toSetString(aStr);
  if (has.call(this._set, sStr)) {
    return this._set[sStr];
  }
  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(66);

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative ? -shifted : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(27);
var util = __webpack_require__(1);
var ArraySet = __webpack_require__(26).ArraySet;
var MappingList = __webpack_require__(68).MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
  var sourceRoot = aSourceMapConsumer.sourceRoot;
  var generator = new SourceMapGenerator({
    file: aSourceMapConsumer.file,
    sourceRoot: sourceRoot
  });
  aSourceMapConsumer.eachMapping(function (mapping) {
    var newMapping = {
      generated: {
        line: mapping.generatedLine,
        column: mapping.generatedColumn
      }
    };

    if (mapping.source != null) {
      newMapping.source = mapping.source;
      if (sourceRoot != null) {
        newMapping.source = util.relative(sourceRoot, newMapping.source);
      }

      newMapping.original = {
        line: mapping.originalLine,
        column: mapping.originalColumn
      };

      if (mapping.name != null) {
        newMapping.name = mapping.name;
      }
    }

    generator.addMapping(newMapping);
  });
  aSourceMapConsumer.sources.forEach(function (sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    if (content != null) {
      generator.setSourceContent(sourceFile, content);
    }
  });
  return generator;
};

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
  var generated = util.getArg(aArgs, 'generated');
  var original = util.getArg(aArgs, 'original', null);
  var source = util.getArg(aArgs, 'source', null);
  var name = util.getArg(aArgs, 'name', null);

  if (!this._skipValidation) {
    this._validateMapping(generated, original, source, name);
  }

  if (source != null) {
    source = String(source);
    if (!this._sources.has(source)) {
      this._sources.add(source);
    }
  }

  if (name != null) {
    name = String(name);
    if (!this._names.has(name)) {
      this._names.add(name);
    }
  }

  this._mappings.add({
    generatedLine: generated.line,
    generatedColumn: generated.column,
    originalLine: original != null && original.line,
    originalColumn: original != null && original.column,
    source: source,
    name: name
  });
};

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
  var source = aSourceFile;
  if (this._sourceRoot != null) {
    source = util.relative(this._sourceRoot, source);
  }

  if (aSourceContent != null) {
    // Add the source content to the _sourcesContents map.
    // Create a new _sourcesContents map if the property is null.
    if (!this._sourcesContents) {
      this._sourcesContents = Object.create(null);
    }
    this._sourcesContents[util.toSetString(source)] = aSourceContent;
  } else if (this._sourcesContents) {
    // Remove the source file from the _sourcesContents map.
    // If the _sourcesContents map is empty, set the property to null.
    delete this._sourcesContents[util.toSetString(source)];
    if (Object.keys(this._sourcesContents).length === 0) {
      this._sourcesContents = null;
    }
  }
};

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
  var sourceFile = aSourceFile;
  // If aSourceFile is omitted, we will use the file property of the SourceMap
  if (aSourceFile == null) {
    if (aSourceMapConsumer.file == null) {
      throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' + 'or the source map\'s "file" property. Both were omitted.');
    }
    sourceFile = aSourceMapConsumer.file;
  }
  var sourceRoot = this._sourceRoot;
  // Make "sourceFile" relative if an absolute Url is passed.
  if (sourceRoot != null) {
    sourceFile = util.relative(sourceRoot, sourceFile);
  }
  // Applying the SourceMap can add and remove items from the sources and
  // the names array.
  var newSources = new ArraySet();
  var newNames = new ArraySet();

  // Find mappings for the "sourceFile"
  this._mappings.unsortedForEach(function (mapping) {
    if (mapping.source === sourceFile && mapping.originalLine != null) {
      // Check if it can be mapped by the source map, then update the mapping.
      var original = aSourceMapConsumer.originalPositionFor({
        line: mapping.originalLine,
        column: mapping.originalColumn
      });
      if (original.source != null) {
        // Copy mapping
        mapping.source = original.source;
        if (aSourceMapPath != null) {
          mapping.source = util.join(aSourceMapPath, mapping.source);
        }
        if (sourceRoot != null) {
          mapping.source = util.relative(sourceRoot, mapping.source);
        }
        mapping.originalLine = original.line;
        mapping.originalColumn = original.column;
        if (original.name != null) {
          mapping.name = original.name;
        }
      }
    }

    var source = mapping.source;
    if (source != null && !newSources.has(source)) {
      newSources.add(source);
    }

    var name = mapping.name;
    if (name != null && !newNames.has(name)) {
      newNames.add(name);
    }
  }, this);
  this._sources = newSources;
  this._names = newNames;

  // Copy sourcesContents of applied map.
  aSourceMapConsumer.sources.forEach(function (sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    if (content != null) {
      if (aSourceMapPath != null) {
        sourceFile = util.join(aSourceMapPath, sourceFile);
      }
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      this.setSourceContent(sourceFile, content);
    }
  }, this);
};

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
  if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
    // Case 1.
    return;
  } else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
    // Cases 2 and 3.
    return;
  } else {
    throw new Error('Invalid mapping: ' + JSON.stringify({
      generated: aGenerated,
      source: aSource,
      original: aOriginal,
      name: aName
    }));
  }
};

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
  var previousGeneratedColumn = 0;
  var previousGeneratedLine = 1;
  var previousOriginalColumn = 0;
  var previousOriginalLine = 0;
  var previousName = 0;
  var previousSource = 0;
  var result = '';
  var next;
  var mapping;
  var nameIdx;
  var sourceIdx;

  var mappings = this._mappings.toArray();
  for (var i = 0, len = mappings.length; i < len; i++) {
    mapping = mappings[i];
    next = '';

    if (mapping.generatedLine !== previousGeneratedLine) {
      previousGeneratedColumn = 0;
      while (mapping.generatedLine !== previousGeneratedLine) {
        next += ';';
        previousGeneratedLine++;
      }
    } else {
      if (i > 0) {
        if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
          continue;
        }
        next += ',';
      }
    }

    next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
    previousGeneratedColumn = mapping.generatedColumn;

    if (mapping.source != null) {
      sourceIdx = this._sources.indexOf(mapping.source);
      next += base64VLQ.encode(sourceIdx - previousSource);
      previousSource = sourceIdx;

      // lines are stored 0-based in SourceMap spec version 3
      next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
      previousOriginalLine = mapping.originalLine - 1;

      next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
      previousOriginalColumn = mapping.originalColumn;

      if (mapping.name != null) {
        nameIdx = this._names.indexOf(mapping.name);
        next += base64VLQ.encode(nameIdx - previousName);
        previousName = nameIdx;
      }
    }

    result += next;
  }

  return result;
};

SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
  return aSources.map(function (source) {
    if (!this._sourcesContents) {
      return null;
    }
    if (aSourceRoot != null) {
      source = util.relative(aSourceRoot, source);
    }
    var key = util.toSetString(source);
    return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
  }, this);
};

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
  var map = {
    version: this._version,
    sources: this._sources.toArray(),
    names: this._names.toArray(),
    mappings: this._serializeMappings()
  };
  if (this._file != null) {
    map.file = this._file;
  }
  if (this._sourceRoot != null) {
    map.sourceRoot = this._sourceRoot;
  }
  if (this._sourcesContents) {
    map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
  }

  return map;
};

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
  return JSON.stringify(this.toJSON());
};

exports.SourceMapGenerator = SourceMapGenerator;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(28).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(70).SourceMapConsumer;
exports.SourceNode = __webpack_require__(71).SourceNode;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

//TEMP: waiting for https://github.com/dankogai/js-base64/pull/46

/*
 * $Id: base64.js,v 2.15 2014/04/05 12:58:57 dankogai Exp dankogai $
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */

(function (global) {
	'use strict';
	// existing version for noConflict()

	var _Base64 = global.Base64;
	var version = "2.1.9";
	// if node.js, we use Buffer
	var buffer;

	// constants
	var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var b64tab = function (bin) {
		var t = {};
		for (var i = 0, l = bin.length; i < l; i++) {
			t[bin.charAt(i)] = i;
		}return t;
	}(b64chars);
	var fromCharCode = String.fromCharCode;
	// encoder stuff
	var cb_utob = function cb_utob(c) {
		if (c.length < 2) {
			var cc = c.charCodeAt(0);
			return cc < 0x80 ? c : cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) + fromCharCode(0x80 | cc & 0x3f) : fromCharCode(0xe0 | cc >>> 12 & 0x0f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
		} else {
			var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
			return fromCharCode(0xf0 | cc >>> 18 & 0x07) + fromCharCode(0x80 | cc >>> 12 & 0x3f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
		}
	};
	var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	var utob = function utob(u) {
		return u.replace(re_utob, cb_utob);
	};
	var cb_encode = function cb_encode(ccc) {
		var padlen = [0, 2, 1][ccc.length % 3],
		    ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
		    chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];
		return chars.join('');
	};
	var btoa = global.btoa ? function (b) {
		return global.btoa(b);
	} : function (b) {
		return b.replace(/[\s\S]{1,3}/g, cb_encode);
	};
	var _encode = buffer ? function (u) {
		return (u.constructor === buffer.constructor ? u : new buffer(u)).toString('base64');
	} : function (u) {
		return btoa(utob(u));
	};
	var encode = function encode(u, urisafe) {
		return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function (m0) {
			return m0 == '+' ? '-' : '_';
		}).replace(/=/g, '');
	};
	var encodeURI = function encodeURI(u) {
		return encode(u, true);
	};
	// decoder stuff
	var re_btou = new RegExp(['[\xC0-\xDF][\x80-\xBF]', '[\xE0-\xEF][\x80-\xBF]{2}', '[\xF0-\xF7][\x80-\xBF]{3}'].join('|'), 'g');
	var cb_btou = function cb_btou(cccc) {
		switch (cccc.length) {
			case 4:
				var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3),
				    offset = cp - 0x10000;
				return fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00);
			case 3:
				return fromCharCode((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));
			default:
				return fromCharCode((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
		}
	};
	var btou = function btou(b) {
		return b.replace(re_btou, cb_btou);
	};
	var cb_decode = function cb_decode(cccc) {
		var len = cccc.length,
		    padlen = len % 4,
		    n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
		    chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 0xff), fromCharCode(n & 0xff)];
		chars.length -= [0, 0, 2, 1][padlen];
		return chars.join('');
	};
	var atob = global.atob ? function (a) {
		return global.atob(a);
	} : function (a) {
		return a.replace(/[\s\S]{1,4}/g, cb_decode);
	};
	var _decode = buffer ? function (a) {
		return (a.constructor === buffer.constructor ? a : new buffer(a, 'base64')).toString();
	} : function (a) {
		return btou(atob(a));
	};
	var decode = function decode(a) {
		return _decode(String(a).replace(/[-_]/g, function (m0) {
			return m0 == '-' ? '+' : '/';
		}).replace(/[^A-Za-z0-9\+\/]/g, ''));
	};
	var noConflict = function noConflict() {
		var Base64 = global.Base64;
		global.Base64 = _Base64;
		return Base64;
	};
	// export Base64
	global.Base64 = {
		VERSION: version,
		atob: atob,
		btoa: btoa,
		fromBase64: decode,
		toBase64: encode,
		utob: utob,
		encode: encode,
		encodeURI: encodeURI,
		btou: btou,
		decode: decode,
		noConflict: noConflict
	};
	// if ES5 is available, make Base64.extendString() available
	if (typeof Object.defineProperty === 'function') {
		var noEnum = function noEnum(v) {
			return { value: v, enumerable: false, writable: true, configurable: true };
		};
		global.Base64.extendString = function () {
			Object.defineProperty(String.prototype, 'fromBase64', noEnum(function () {
				return decode(this);
			}));
			Object.defineProperty(String.prototype, 'toBase64', noEnum(function (urisafe) {
				return encode(this, urisafe);
			}));
			Object.defineProperty(String.prototype, 'toBase64URI', noEnum(function () {
				return encode(this, true);
			}));
		};
	}
	// that's it!

	if (typeof module !== 'undefined' && module.exports) {
		module.exports.Base64 = global.Base64;
	}
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return global.Base64;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var postcss = __webpack_require__(5),
    main = __webpack_require__(51);

module.exports = postcss.plugin('postcss-grid-kiss', main);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templateObject = _taggedTemplateLiteral(["\n<header>\n\tHeader\n</header>\n\n<aside class=\"sidebar\">\n\tSidebar\n</aside>\n\n<main>\n\tMain content\n</main>\n\n<footer>\n\tFooter\n</footer>\n\t\t"], ["\n<header>\n\tHeader\n</header>\n\n<aside class=\"sidebar\">\n\tSidebar\n</aside>\n\n<main>\n\tMain content\n</main>\n\n<footer>\n\tFooter\n</footer>\n\t\t"]),
    _templateObject2 = _taggedTemplateLiteral(["\nbody {\n\tgrid-kiss:\n\t\t\"+------------------------------+      \"\n\t\t\"|           header \u2191           | 120px\"\n\t\t\"+------------------------------+      \"\n\t\t\"                                      \"\n\t\t\"+--150px---+  +----- auto -----+      \"\n\t\t\"| .sidebar |  |      main      | auto \"\n\t\t\"+----------+  +----------------+      \"\n\t\t\"                                      \"\n\t\t\"+------------------------------+      \"\n\t\t\"|              \u2193               |      \"\n\t\t\"|         \u2192 footer \u2190           | 60px \"\n\t\t\"+------------------------------+      \"\n}\n\nheader   { background: cyan; }\n.sidebar { background: lime; }\nmain     { background: yellow; }\nfooter   { background: pink; }\n"], ["\nbody {\n\tgrid-kiss:\n\t\t\"+------------------------------+      \"\n\t\t\"|           header \u2191           | 120px\"\n\t\t\"+------------------------------+      \"\n\t\t\"                                      \"\n\t\t\"+--150px---+  +----- auto -----+      \"\n\t\t\"| .sidebar |  |      main      | auto \"\n\t\t\"+----------+  +----------------+      \"\n\t\t\"                                      \"\n\t\t\"+------------------------------+      \"\n\t\t\"|              \u2193               |      \"\n\t\t\"|         \u2192 footer \u2190           | 60px \"\n\t\t\"+------------------------------+      \"\n}\n\nheader   { background: cyan; }\n.sidebar { background: lime; }\nmain     { background: yellow; }\nfooter   { background: pink; }\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n#grid {\n    grid-kiss:        \n    \"\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510       \"\n    \"\u2502      \u2502 \u2502             \u2502 100px \"\n    \"\u2502   ^  \u2502 \u2502   < .bar >  \u2502       \"\n    \"\u2502 .baz \u2502 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518   -   \"\n    \"\u2502   v  \u2502 \u250C\u2500\u2500\u2500\u2500\u2510 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510       \"\n    \"\u2502      \u2502 |    | \u2502  ^   \u2502 100px \"\n    \"\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2500\u2500\u2500\u2500\u2518 \u2502      \u2502       \"\n    \"\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502 .foo \u2502   -   \"\n    \"\u2502   < .qux >  \u2502 \u2502  v   \u2502       \"\n    \"\u2502             \u2502 \u2502      \u2502 100px \"\n    \"\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518       \"\n    \"  100px | 100px | 100px        \"\n    ;  \n}\n\n#grid > div {\n    border:2px solid black;\n    background-color: #ccc;\n    padding: 0.5em;\n}\n\n#container {    \n    width: 400px;\n    height: 400px;\n    padding: 1em;\n}    \n"], ["\n#grid {\n    grid-kiss:        \n    \"\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510       \"\n    \"\u2502      \u2502 \u2502             \u2502 100px \"\n    \"\u2502   ^  \u2502 \u2502   < .bar >  \u2502       \"\n    \"\u2502 .baz \u2502 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518   -   \"\n    \"\u2502   v  \u2502 \u250C\u2500\u2500\u2500\u2500\u2510 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510       \"\n    \"\u2502      \u2502 |    | \u2502  ^   \u2502 100px \"\n    \"\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2500\u2500\u2500\u2500\u2518 \u2502      \u2502       \"\n    \"\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502 .foo \u2502   -   \"\n    \"\u2502   < .qux >  \u2502 \u2502  v   \u2502       \"\n    \"\u2502             \u2502 \u2502      \u2502 100px \"\n    \"\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518       \"\n    \"  100px | 100px | 100px        \"\n    ;  \n}\n\n#grid > div {\n    border:2px solid black;\n    background-color: #ccc;\n    padding: 0.5em;\n}\n\n#container {    \n    width: 400px;\n    height: 400px;\n    padding: 1em;\n}    \n"]),
    _templateObject4 = _taggedTemplateLiteral(["\n<div id=\"container\">\n\t<div id=\"grid\">\n\t\t<div class=\"foo\">Foo</div>\n\t\t<div class=\"bar\">Bar</div>\n\t\t<div class=\"baz\">Baz</div>\n\t\t<div class=\"qux\">Qux</div>\n\t</div>\t\n</div>\n"], ["\n<div id=\"container\">\n\t<div id=\"grid\">\n\t\t<div class=\"foo\">Foo</div>\n\t\t<div class=\"bar\">Bar</div>\n\t\t<div class=\"baz\">Baz</div>\n\t\t<div class=\"qux\">Qux</div>\n\t</div>\t\n</div>\n"]),
    _templateObject5 = _taggedTemplateLiteral(["\nbody {\n\tgrid-kiss:\n\t\"\u2554\u255010\u2550\u2557                  \u2554\u255010\u2550\u2557    \"\n\t\"\u2551 .a \u2551                  \u2551 .b \u2551 3fr\"\n\t\"\u255A\u2550\u2550\u2550\u2550\u255D                  \u255A\u2550\u2550\u2550\u2550\u255D    \"\n\t\"      \u2554\u255020\u2550\u2557      \u2554\u255020\u2550\u2557          \"\n\t\"      \u2551 .c \u2551      \u2551 .d \u2551       5fr\"\n\t\"      \u255A\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u255D          \"\n\t\"            \u2554\u255030\u2550\u2557                \"\n\t\"            \u2551 .e \u2551             7fr\"\n\t\"            \u255A\u2550\u2550\u2550\u2550\u255D                \"\n}\n\ndiv {   \n   background: #eee;\n   border: 1px solid #999;\n   padding: 1em;\n}"], ["\nbody {\n\tgrid-kiss:\n\t\"\u2554\u255010\u2550\u2557                  \u2554\u255010\u2550\u2557    \"\n\t\"\u2551 .a \u2551                  \u2551 .b \u2551 3fr\"\n\t\"\u255A\u2550\u2550\u2550\u2550\u255D                  \u255A\u2550\u2550\u2550\u2550\u255D    \"\n\t\"      \u2554\u255020\u2550\u2557      \u2554\u255020\u2550\u2557          \"\n\t\"      \u2551 .c \u2551      \u2551 .d \u2551       5fr\"\n\t\"      \u255A\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u255D          \"\n\t\"            \u2554\u255030\u2550\u2557                \"\n\t\"            \u2551 .e \u2551             7fr\"\n\t\"            \u255A\u2550\u2550\u2550\u2550\u255D                \"\n}\n\ndiv {   \n   background: #eee;\n   border: 1px solid #999;\n   padding: 1em;\n}"]),
    _templateObject6 = _taggedTemplateLiteral(["\nbody {\n  grid-kiss:\n    \"+-------+\"\n    \"|   \u2193   |\"\n    \"|\u2192 div \u2190|\"\n    \"|   \u2191   |\"\n    \"+-------+\"\n}\n\ndiv { \n  border: 1px solid black;\n  padding: 1rem;\n  overflow: scroll;\n  resize: both;\n}\n"], ["\nbody {\n  grid-kiss:\n    \"+-------+\"\n    \"|   \u2193   |\"\n    \"|\u2192 div \u2190|\"\n    \"|   \u2191   |\"\n    \"+-------+\"\n}\n\ndiv { \n  border: 1px solid black;\n  padding: 1rem;\n  overflow: scroll;\n  resize: both;\n}\n"]),
    _templateObject7 = _taggedTemplateLiteral(["\nbody {\n  grid-kiss:\n    \"+----------+      \"\n    \"|  header  | 80px \"\n    \"+----------+      \"\n    \"                  \"\n    \"+----------+      \"\n    \"|  .bloc1  |      \"\n    \"+----------+      \"\n    \"                  \"\n    \"+----------+      \"\n    \"|  .bloc2  |      \"\n    \"+----------+      \"\n    \"                  \"\n    \"+----------+      \"\n    \"|  .bloc3  |      \"\n    \"+----------+      \"\n    \"                  \"\n    \"+----------+      \"\n    \"|  .bloc4  |      \"\n    \"+----------+      \"    \n}     \n\n@media (min-width:640px){\n  body {\n    grid-kiss:\n    \"+----------------------------+      \"\n    \"|        header              | 120px\"\n    \"+----------------------------+      \"\n    \"                                    \"\n    \"+------------+  +------------+      \"\n    \"|   .bloc1   |  |   .bloc2   |      \"\n    \"+------------+  +------------+      \"\n    \"                                    \"\n    \"+------------+  +------------+      \"\n    \"|   .bloc3   |  |   .bloc4   |      \"\n    \"+------------+  +------------+      \"\n  }\n}\n\n@media (min-width: 960px){\n  body {\n    grid-kiss:\n    \"+--------------------------------+       \"\n    \"|             header             | 120px \"\n    \"+--------------------------------+       \"\n    \"                                         \"\n    \"+--------------------------------+       \"\n    \"|             .bloc1             | <6rem \"\n    \"+--------------------------------+       \"\n    \"                                         \"\n    \"+--------+  +--------+  +--------+       \"\n    \"| .bloc2 |  | .bloc3 |  | .bloc4 |       \"\n    \"+--------+  +--------+  +--------+       \"\n  }\n}\t\n\t\nheader { background: yellow }\n.bloc1 { background: blue }\n.bloc2 { background: green }\n.bloc3 { background: purple }\n.bloc4 { background: chocolate }\t\n\t\n.bloc {\n\ttext-align:center;\n\tcolor: white;\n\tfont-size: 48px;\n}\t\n"], ["\nbody {\n  grid-kiss:\n    \"+----------+      \"\n    \"|  header  | 80px \"\n    \"+----------+      \"\n    \"                  \"\n    \"+----------+      \"\n    \"|  .bloc1  |      \"\n    \"+----------+      \"\n    \"                  \"\n    \"+----------+      \"\n    \"|  .bloc2  |      \"\n    \"+----------+      \"\n    \"                  \"\n    \"+----------+      \"\n    \"|  .bloc3  |      \"\n    \"+----------+      \"\n    \"                  \"\n    \"+----------+      \"\n    \"|  .bloc4  |      \"\n    \"+----------+      \"    \n}     \n\n@media (min-width:640px){\n  body {\n    grid-kiss:\n    \"+----------------------------+      \"\n    \"|        header              | 120px\"\n    \"+----------------------------+      \"\n    \"                                    \"\n    \"+------------+  +------------+      \"\n    \"|   .bloc1   |  |   .bloc2   |      \"\n    \"+------------+  +------------+      \"\n    \"                                    \"\n    \"+------------+  +------------+      \"\n    \"|   .bloc3   |  |   .bloc4   |      \"\n    \"+------------+  +------------+      \"\n  }\n}\n\n@media (min-width: 960px){\n  body {\n    grid-kiss:\n    \"+--------------------------------+       \"\n    \"|             header             | 120px \"\n    \"+--------------------------------+       \"\n    \"                                         \"\n    \"+--------------------------------+       \"\n    \"|             .bloc1             | <6rem \"\n    \"+--------------------------------+       \"\n    \"                                         \"\n    \"+--------+  +--------+  +--------+       \"\n    \"| .bloc2 |  | .bloc3 |  | .bloc4 |       \"\n    \"+--------+  +--------+  +--------+       \"\n  }\n}\t\n\t\nheader { background: yellow }\n.bloc1 { background: blue }\n.bloc2 { background: green }\n.bloc3 { background: purple }\n.bloc4 { background: chocolate }\t\n\t\n.bloc {\n\ttext-align:center;\n\tcolor: white;\n\tfont-size: 48px;\n}\t\n"]),
    _templateObject8 = _taggedTemplateLiteral(["\n<header> Responsive design layout with media queries\n  <br> Try to resize your browser !\n</header>\t\n<div class=\"bloc bloc1\">1</div>\n<div class=\"bloc bloc2\">2</div>\n<div class=\"bloc bloc3\">3</div>\n<div class=\"bloc bloc4\">4</div>\n"], ["\n<header> Responsive design layout with media queries\n  <br> Try to resize your browser !\n</header>\t\n<div class=\"bloc bloc1\">1</div>\n<div class=\"bloc bloc2\">2</div>\n<div class=\"bloc bloc3\">3</div>\n<div class=\"bloc bloc4\">4</div>\n"]),
    _templateObject9 = _taggedTemplateLiteral(["\n#calc {\n\tgrid-kiss:\n\t\"+-----------------------------------------------------+\"\n\t\"|                       output                        |\"\n\t\"+-----------------------------------------------------+\"\t\n\t\"+----------+  +----------+  +----------+  +-----------+\"\n\t\"|   .ac    |  |  .sign   |  | .percent |  |  .divide  |\"\n\t\"+----------+  +----------+  +----------+  +-----------+\"\t\n\t\"+----------+  +----------+  +----------+  +-----------+\"\n\t\"|    :7    |  |    :8    |  |    :9    |  | .multiply |\"\n\t\"+----------+  +----------+  +----------+  +-----------+\"\t\n\t\"+----------+  +----------+  +----------+  +-----------+\"\n\t\"|    :4    |  |    :5    |  |    :6    |  |  .minus   |\"\n\t\"+----------+  +----------+  +----------+  +-----------+\"\t\n\t\"+----------+  +----------+  +----------+  +-----------+\"\n\t\"|    :1    |  |    :2    |  |    :3    |  |  .plus    |\"\n\t\"+----------+  +----------+  +----------+  +-----------+\"\t\n\t\"+------------------------+  +----------+  +-----------+\"\n\t\"|         .zero          |  |  .point  |  |  .equals  |\"\n\t\"+------------------------+  +----------+  +-----------+\"\n}\n\noutput { \n    background-color: #333;\n\tcolor: white;\n\tmargin: 0;\n\tpadding: 1rem;\n\tfont-size: 2rem;\n\ttext-align: right;\n}\n\nbutton {\n\tfont-size: 2rem;\n\tborder: 1px solid #333;\n\tbackground-color: #efefef;\n}\n\n.ac, .sign, .percent {\n\tbackground-color: #ccc;\n}\n\nbutton.operation {\n\tbackground-color: orange;\n}\n"], ["\n#calc {\n\tgrid-kiss:\n\t\"+-----------------------------------------------------+\"\n\t\"|                       output                        |\"\n\t\"+-----------------------------------------------------+\"\t\n\t\"+----------+  +----------+  +----------+  +-----------+\"\n\t\"|   .ac    |  |  .sign   |  | .percent |  |  .divide  |\"\n\t\"+----------+  +----------+  +----------+  +-----------+\"\t\n\t\"+----------+  +----------+  +----------+  +-----------+\"\n\t\"|    :7    |  |    :8    |  |    :9    |  | .multiply |\"\n\t\"+----------+  +----------+  +----------+  +-----------+\"\t\n\t\"+----------+  +----------+  +----------+  +-----------+\"\n\t\"|    :4    |  |    :5    |  |    :6    |  |  .minus   |\"\n\t\"+----------+  +----------+  +----------+  +-----------+\"\t\n\t\"+----------+  +----------+  +----------+  +-----------+\"\n\t\"|    :1    |  |    :2    |  |    :3    |  |  .plus    |\"\n\t\"+----------+  +----------+  +----------+  +-----------+\"\t\n\t\"+------------------------+  +----------+  +-----------+\"\n\t\"|         .zero          |  |  .point  |  |  .equals  |\"\n\t\"+------------------------+  +----------+  +-----------+\"\n}\n\noutput { \n    background-color: #333;\n\tcolor: white;\n\tmargin: 0;\n\tpadding: 1rem;\n\tfont-size: 2rem;\n\ttext-align: right;\n}\n\nbutton {\n\tfont-size: 2rem;\n\tborder: 1px solid #333;\n\tbackground-color: #efefef;\n}\n\n.ac, .sign, .percent {\n\tbackground-color: #ccc;\n}\n\nbutton.operation {\n\tbackground-color: orange;\n}\n"]),
    _templateObject10 = _taggedTemplateLiteral(["\n<div id=\"calc\">\n    <button>1</button>\n    <button>2</button>\n    <button>3</button>\n    <button>4</button>\n    <button>5</button>\n    <button>6</button>\n    <button>7</button>\n    <button>8</button>\n    <button>9</button>\n    <button class=\"zero\">0</button>\n    <button class=\"point\">.</button>\n    <button class=\"ac\">AC</button>\n    <button class=\"sign\">+/-</button>\n    <button class=\"percent\">%</button>\n    <button class=\"divide operation\">/</button>\n    <button class=\"multiply operation\">X</button>\n    <button class=\"minus operation\">-</button>\n    <button class=\"plus operation\">+</button>\n    <button class=\"equals operation\">=</button>\n    <output>0</output>\n</div>\n"], ["\n<div id=\"calc\">\n    <button>1</button>\n    <button>2</button>\n    <button>3</button>\n    <button>4</button>\n    <button>5</button>\n    <button>6</button>\n    <button>7</button>\n    <button>8</button>\n    <button>9</button>\n    <button class=\"zero\">0</button>\n    <button class=\"point\">.</button>\n    <button class=\"ac\">AC</button>\n    <button class=\"sign\">+/-</button>\n    <button class=\"percent\">%</button>\n    <button class=\"divide operation\">/</button>\n    <button class=\"multiply operation\">X</button>\n    <button class=\"minus operation\">-</button>\n    <button class=\"plus operation\">+</button>\n    <button class=\"equals operation\">=</button>\n    <output>0</output>\n</div>\n"]),
    _templateObject11 = _taggedTemplateLiteral(["\nbody {\t\n\tgrid-kiss:\n\t\"                                               \"\n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"    | .nw |      | .n  |      | .ne | 100px    \"\n\t\"    +-----+      +-----+      +-----+  ----    \"\t\t   \n\t\"                                       50px    \"\t\t   \n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"    | .w  |      |     |      | .e  | 100px    \"\n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"                                       50px    \"\t\t   \n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"    | .sw |      | .s  |      | .se | 100px    \"\n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"    |100px| 50px |100px| 50px |100px|          \"\n\t\"                                               \"\n}\n\ndiv {\n\tbackground: #ccc;\n\tborder: 1px dashed black;\n\ttext-align: center;\n\tline-height: 100px;\n}\n"], ["\nbody {\t\n\tgrid-kiss:\n\t\"                                               \"\n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"    | .nw |      | .n  |      | .ne | 100px    \"\n\t\"    +-----+      +-----+      +-----+  ----    \"\t\t   \n\t\"                                       50px    \"\t\t   \n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"    | .w  |      |     |      | .e  | 100px    \"\n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"                                       50px    \"\t\t   \n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"    | .sw |      | .s  |      | .se | 100px    \"\n\t\"    +-----+      +-----+      +-----+  ----    \"\n\t\"    |100px| 50px |100px| 50px |100px|          \"\n\t\"                                               \"\n}\n\ndiv {\n\tbackground: #ccc;\n\tborder: 1px dashed black;\n\ttext-align: center;\n\tline-height: 100px;\n}\n"]),
    _templateObject12 = _taggedTemplateLiteral(["\n<div class=\"n\">N</div>\n<div class=\"e\">E</div>\n<div class=\"s\">S</div>\n<div class=\"w\">W</div>\n<div class=\"ne\">NE</div>\n<div class=\"se\">SE</div>\n<div class=\"nw\">NW</div>\n<div class=\"sw\">SW</div>\n"], ["\n<div class=\"n\">N</div>\n<div class=\"e\">E</div>\n<div class=\"s\">S</div>\n<div class=\"w\">W</div>\n<div class=\"ne\">NE</div>\n<div class=\"se\">SE</div>\n<div class=\"nw\">NW</div>\n<div class=\"sw\">SW</div>\n"]),
    _templateObject13 = _taggedTemplateLiteral(["\n.justify-start {\n\tgrid-kiss:\n\t\"+---+ +---+ +---+    \"\n\t\"| a | | b | | c |    \"\n\t\"+---+ +---+ +---+    \"\n\t\"+---+ +---+ +---+    \"\n\t\"| d | | e | | f |    \"\n\t\"+---+ +---+ +---+    \"\n\t\"+---+ +---+ +---+    \"\n\t\"| g | | h | | i |    \"\n\t\"+---+ +---+ +---+    \"\n\t\" 50px  50px  50px    \"\n}\n\n.justify-end {\n\tgrid-kiss:\n\t\"    +---+ +---+ +---+\"\n\t\"    | a | | b | | c |\"\n\t\"    +---+ +---+ +---+\"\n\t\"    +---+ +---+ +---+\"\n\t\"    | d | | e | | f |\"\n\t\"    +---+ +---+ +---+\"\n\t\"    +---+ +---+ +---+\"\n\t\"    | g | | h | | i |\"\n\t\"    +---+ +---+ +---+\"\n\t\"     50px  50px  50px\"\n}\n\n.justify-center {\n\tgrid-kiss:\n\t\"    +---+ +---+ +---+    \"\n\t\"    | a | | b | | c |    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"    | d | | e | | f |    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"    | g | | h | | i |    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"     50px  50px  50px    \"\n}\n\n.justify-space-between {\n\tgrid-kiss:\n\t\"+---+    +---+    +---+\"\n\t\"| a |    | b |    | c |\"\n\t\"+---+    +---+    +---+\"\n\t\"+---+    +---+    +---+\"\n\t\"| d |    | e |    | f |\"\n\t\"+---+    +---+    +---+\"\n\t\"+---+    +---+    +---+\"\n\t\"| g |    | h |    | i |\"\n\t\"+---+    +---+    +---+\"\n\t\" 50px     50px     50px\"\n}\n\n.justify-space-evenly {\n\tgrid-kiss:\n\t\"    +---+  +---+  +---+    \"\n\t\"    | a |  | b |  | c |    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"    | d |  | e |  | f |    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"    | g |  | h |  | i |    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"     50px   50px   50px    \"\n}\n\n.justify-space-around {\n\tgrid-kiss:\n\t\"  +---+    +---+    +---+  \"\n\t\"  | a |    | b |    | c |  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"  | d |    | e |    | f |  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"  | g |    | h |    | i |  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"   50px     50px     50px  \"\n}\n.align-start {\n\tgrid-kiss:\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"                      \"\n}\n\n.align-end {\n\tgrid-kiss:\n\t\"                      \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n}\n\n.align-center {\n\tgrid-kiss:\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n}\n\n.align-space-between {\n\tgrid-kiss:\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n}\n\n.align-space-evenly {\n\tgrid-kiss:\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n}\n\n.align-space-around {\n\tgrid-kiss:\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n}\n\n.justify-self {\n\tgrid-kiss:\n\t\"+-------+  +-------+  +-------+  +-------+\"\n\t\"| <  a  |  | > b < |  | c  >  |  | < d > |\"\n\t\"+-------+  +-------+  +-------+  +-------+\"\n}\n\n.align-self {\n\tgrid-kiss:\n\t\"+-------+  +-------+  +-------+  +-------+\"\n\t\"|   ^   |  |   v   |  |       |  |   ^   |\"\n\t\"|   a   |  |   b   |  |   c   |  |   d   |\"\n\t\"|       |  |   ^   |  |   v   |  |   v   |\"\n\t\"+-------+  +-------+  +-------+  +-------+\"\n}\n\n.grid {\n\tbackground-color: #CCC;\n\twidth: 250px;\n\theight: 250px;\n\tborder: 2px dotted black;\n}\n\n.grid-row {\n\tbackground-color: #CCC;\n\twidth: 400px;\n\theight: 100px;\n\tborder: 2px dotted black;\n}\n\na,b,c,d,e,f,g,h,i {\n\tdisplay: block;\t\t\n\tbox-sizing: border-box;\n\tfont-style: normal;\n\tfont-weight: normal;\n\ttext-align:center;\n\tbackground-color: #EEE;\n\tborder: 1px solid black;\t\n\tmin-width: 40px;\n\tmin-height: 40px;\n}\n\nbody {\n\tpadding: 1em;\n\tbox-sizing: border-box;\n}\n\nli {\n\tmargin-bottom: 1em;\n}\n"], ["\n.justify-start {\n\tgrid-kiss:\n\t\"+---+ +---+ +---+    \"\n\t\"| a | | b | | c |    \"\n\t\"+---+ +---+ +---+    \"\n\t\"+---+ +---+ +---+    \"\n\t\"| d | | e | | f |    \"\n\t\"+---+ +---+ +---+    \"\n\t\"+---+ +---+ +---+    \"\n\t\"| g | | h | | i |    \"\n\t\"+---+ +---+ +---+    \"\n\t\" 50px  50px  50px    \"\n}\n\n.justify-end {\n\tgrid-kiss:\n\t\"    +---+ +---+ +---+\"\n\t\"    | a | | b | | c |\"\n\t\"    +---+ +---+ +---+\"\n\t\"    +---+ +---+ +---+\"\n\t\"    | d | | e | | f |\"\n\t\"    +---+ +---+ +---+\"\n\t\"    +---+ +---+ +---+\"\n\t\"    | g | | h | | i |\"\n\t\"    +---+ +---+ +---+\"\n\t\"     50px  50px  50px\"\n}\n\n.justify-center {\n\tgrid-kiss:\n\t\"    +---+ +---+ +---+    \"\n\t\"    | a | | b | | c |    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"    | d | | e | | f |    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"    | g | | h | | i |    \"\n\t\"    +---+ +---+ +---+    \"\n\t\"     50px  50px  50px    \"\n}\n\n.justify-space-between {\n\tgrid-kiss:\n\t\"+---+    +---+    +---+\"\n\t\"| a |    | b |    | c |\"\n\t\"+---+    +---+    +---+\"\n\t\"+---+    +---+    +---+\"\n\t\"| d |    | e |    | f |\"\n\t\"+---+    +---+    +---+\"\n\t\"+---+    +---+    +---+\"\n\t\"| g |    | h |    | i |\"\n\t\"+---+    +---+    +---+\"\n\t\" 50px     50px     50px\"\n}\n\n.justify-space-evenly {\n\tgrid-kiss:\n\t\"    +---+  +---+  +---+    \"\n\t\"    | a |  | b |  | c |    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"    | d |  | e |  | f |    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"    | g |  | h |  | i |    \"\n\t\"    +---+  +---+  +---+    \"\n\t\"     50px   50px   50px    \"\n}\n\n.justify-space-around {\n\tgrid-kiss:\n\t\"  +---+    +---+    +---+  \"\n\t\"  | a |    | b |    | c |  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"  | d |    | e |    | f |  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"  | g |    | h |    | i |  \"\n\t\"  +---+    +---+    +---+  \"\n\t\"   50px     50px     50px  \"\n}\n.align-start {\n\tgrid-kiss:\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"                      \"\n}\n\n.align-end {\n\tgrid-kiss:\n\t\"                      \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n}\n\n.align-center {\n\tgrid-kiss:\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n}\n\n.align-space-between {\n\tgrid-kiss:\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n}\n\n.align-space-evenly {\n\tgrid-kiss:\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n}\n\n.align-space-around {\n\tgrid-kiss:\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| a | | b | | c | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| d | | e | | f | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n\t\"                      \"\n\t\"+---+ +---+ +---+     \"\n\t\"| g | | h | | i | 50px\"\n\t\"+---+ +---+ +---+     \"\n\t\"                      \"\n}\n\n.justify-self {\n\tgrid-kiss:\n\t\"+-------+  +-------+  +-------+  +-------+\"\n\t\"| <  a  |  | > b < |  | c  >  |  | < d > |\"\n\t\"+-------+  +-------+  +-------+  +-------+\"\n}\n\n.align-self {\n\tgrid-kiss:\n\t\"+-------+  +-------+  +-------+  +-------+\"\n\t\"|   ^   |  |   v   |  |       |  |   ^   |\"\n\t\"|   a   |  |   b   |  |   c   |  |   d   |\"\n\t\"|       |  |   ^   |  |   v   |  |   v   |\"\n\t\"+-------+  +-------+  +-------+  +-------+\"\n}\n\n.grid {\n\tbackground-color: #CCC;\n\twidth: 250px;\n\theight: 250px;\n\tborder: 2px dotted black;\n}\n\n.grid-row {\n\tbackground-color: #CCC;\n\twidth: 400px;\n\theight: 100px;\n\tborder: 2px dotted black;\n}\n\na,b,c,d,e,f,g,h,i {\n\tdisplay: block;\t\t\n\tbox-sizing: border-box;\n\tfont-style: normal;\n\tfont-weight: normal;\n\ttext-align:center;\n\tbackground-color: #EEE;\n\tborder: 1px solid black;\t\n\tmin-width: 40px;\n\tmin-height: 40px;\n}\n\nbody {\n\tpadding: 1em;\n\tbox-sizing: border-box;\n}\n\nli {\n\tmargin-bottom: 1em;\n}\n"]),
    _templateObject14 = _taggedTemplateLiteral(["\n<h3>Horizontal alignment of the grid</h3>\n<p>Specifies how all the zones are aligned horizontally inside the grid container. Irrelevant if one of the zones fits all the remaining free space.</p>\n\n<ul>\n\n<li><code>justify-content: start</code>\nwhen there are two consecutive spaces or more at the end of the rows\n\n<div class=\"grid justify-start\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>justify-content: end</code>\nwhen there are two consecutive spaces or more at the beginning of the rows\n\n<div class=\"grid justify-end\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n\n<li><code>justify-content: center</code>\nwhen there are two consecutive spaces or more at the beginning and the end of the rows\n\n<div class=\"grid justify-center\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>justify-content: space-between</code>\nwhen there are two consecutive spaces or more between zones\n\n<div class=\"grid justify-space-between\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>justify-content: space-evenly</code>\nwhen there are two consecutive spaces or more at the beginning and the end of the rows, and exactly two consecutive spaces between zones\n\n<div class=\"grid justify-space-evenly\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>justify-content: space-around</code>\nwhen there are two consecutive spaces or more at the beginning and the end of the rows, and four consecutive spaces or more between zones\n\n<div class=\"grid justify-space-around\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n</ul>\n\n<h3>Vertical alignment of the grid</h3>\n\n<p>Specifies how all the zones are aligned vertically inside the grid container. Irrelevant if one of the zones fits all the remaining free space.</p>\n\n<ul>\n\n<li><code>align-content: start</code>\nwhen at least one space row at the end\n\n<div class=\"grid align-start\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>align-content: end</code>\nwhen at least one space row at the beginning\n\n<div class=\"grid align-end\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>align-content: center</code>\nwhen at least one space row at the beginning and one space row at the end\n\n<div class=\"grid align-center\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>align-content: space-between</code>\nwhen there is one space row between zones\n\n<div class=\"grid align-space-between\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n\n<li><code>align-content: space-evenly</code>\nwhen there is one space row at the beginning, at the end and between zones\n\n<div class=\"grid align-space-evenly\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>align-content: space-around</code>\nwhen there is one space row at the beginning and at the end, and two space rows between zones\n\n<div class=\"grid align-space-around\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n</ul>\n\n<h3>Horizontal alignment inside a zone</h3>\n\n<p>Each zone can specify an alignment indicator. When no indicators are specified, defaults are stretch horizontally and vertically.</p>\n\n<ul>\n<li><code>justify-self: start</code> with <code>&lt;</code> or <code>\u2190</code>\n<li><code>justify-self: end</code> with <code>&gt;</code> or <code>\u2192</code></li>\n<li><code>justify-self: stretch</code> with <code>&lt;</code> and <code>&gt;</code> or <code>\u2190</code> and <code>\u2192</code> in this order</li>\n<li><code>justify-self: center</code> with <code>&gt;</code> and <code>&lt;</code> or <code>\u2192</code> and <code>\u2190</code> in this order</li>\n</ul>\n\n<div class=\"grid-row justify-self\">\n<a>\u2190 a</a>  <b>\u2192 b \u2190</b>  <c>c \u2192</c>  <d>\u2190 d \u2192</d> \n</div>\n\n<h3>Vertical alignment inside a zone</h3>\n\n<ul>\n<li><code>align-self: start</code> with <code>^</code> or <code>\u2191</code></li>\n<li><code>align-self: end</code> with <code>v</code> or <code>\u2193</code></li>\n<li><code>align-self: stretch</code> with <code>^</code> and <code>v</code> or <code>\u2191</code> and <code>\u2193</code> in this order</li>\n<li><code>align-self: center</code> with <code>v</code> and <code>^</code> or <code>\u2193</code> and <code>\u2191</code> in this order</li>\n</ul>\n\n<div class=\"grid-row align-self\">\n<a>\u2191 a</a>  <b>\u2193 b \u2191</b>  <c>\u2193 c</c>  <d>\u2191 d \u2193</d>\n</div>\n"], ["\n<h3>Horizontal alignment of the grid</h3>\n<p>Specifies how all the zones are aligned horizontally inside the grid container. Irrelevant if one of the zones fits all the remaining free space.</p>\n\n<ul>\n\n<li><code>justify-content: start</code>\nwhen there are two consecutive spaces or more at the end of the rows\n\n<div class=\"grid justify-start\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>justify-content: end</code>\nwhen there are two consecutive spaces or more at the beginning of the rows\n\n<div class=\"grid justify-end\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n\n<li><code>justify-content: center</code>\nwhen there are two consecutive spaces or more at the beginning and the end of the rows\n\n<div class=\"grid justify-center\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>justify-content: space-between</code>\nwhen there are two consecutive spaces or more between zones\n\n<div class=\"grid justify-space-between\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>justify-content: space-evenly</code>\nwhen there are two consecutive spaces or more at the beginning and the end of the rows, and exactly two consecutive spaces between zones\n\n<div class=\"grid justify-space-evenly\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>justify-content: space-around</code>\nwhen there are two consecutive spaces or more at the beginning and the end of the rows, and four consecutive spaces or more between zones\n\n<div class=\"grid justify-space-around\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n</ul>\n\n<h3>Vertical alignment of the grid</h3>\n\n<p>Specifies how all the zones are aligned vertically inside the grid container. Irrelevant if one of the zones fits all the remaining free space.</p>\n\n<ul>\n\n<li><code>align-content: start</code>\nwhen at least one space row at the end\n\n<div class=\"grid align-start\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>align-content: end</code>\nwhen at least one space row at the beginning\n\n<div class=\"grid align-end\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>align-content: center</code>\nwhen at least one space row at the beginning and one space row at the end\n\n<div class=\"grid align-center\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>align-content: space-between</code>\nwhen there is one space row between zones\n\n<div class=\"grid align-space-between\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n\n<li><code>align-content: space-evenly</code>\nwhen there is one space row at the beginning, at the end and between zones\n\n<div class=\"grid align-space-evenly\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n<li><code>align-content: space-around</code>\nwhen there is one space row at the beginning and at the end, and two space rows between zones\n\n<div class=\"grid align-space-around\">\n<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>\n</div>\n</li>\n\n</ul>\n\n<h3>Horizontal alignment inside a zone</h3>\n\n<p>Each zone can specify an alignment indicator. When no indicators are specified, defaults are stretch horizontally and vertically.</p>\n\n<ul>\n<li><code>justify-self: start</code> with <code>&lt;</code> or <code>\u2190</code>\n<li><code>justify-self: end</code> with <code>&gt;</code> or <code>\u2192</code></li>\n<li><code>justify-self: stretch</code> with <code>&lt;</code> and <code>&gt;</code> or <code>\u2190</code> and <code>\u2192</code> in this order</li>\n<li><code>justify-self: center</code> with <code>&gt;</code> and <code>&lt;</code> or <code>\u2192</code> and <code>\u2190</code> in this order</li>\n</ul>\n\n<div class=\"grid-row justify-self\">\n<a>\u2190 a</a>  <b>\u2192 b \u2190</b>  <c>c \u2192</c>  <d>\u2190 d \u2192</d> \n</div>\n\n<h3>Vertical alignment inside a zone</h3>\n\n<ul>\n<li><code>align-self: start</code> with <code>^</code> or <code>\u2191</code></li>\n<li><code>align-self: end</code> with <code>v</code> or <code>\u2193</code></li>\n<li><code>align-self: stretch</code> with <code>^</code> and <code>v</code> or <code>\u2191</code> and <code>\u2193</code> in this order</li>\n<li><code>align-self: center</code> with <code>v</code> and <code>^</code> or <code>\u2193</code> and <code>\u2191</code> in this order</li>\n</ul>\n\n<div class=\"grid-row align-self\">\n<a>\u2191 a</a>  <b>\u2193 b \u2191</b>  <c>\u2193 c</c>  <d>\u2191 d \u2193</d>\n</div>\n"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function format(_ref) {
	var _ref2 = _slicedToArray(_ref, 1),
	    str = _ref2[0];

	return str.trim();
}

var presets = [{
	name: "Basic website layout",
	hash: "basic-layout",
	html: format(_templateObject),
	css: format(_templateObject2)
}, {
	name: "Zones on multiple rows/cols - alt style 1",
	hash: "multiple-span-zones",
	css: format(_templateObject3),

	html: format(_templateObject4)

}, {
	name: "Fractions of free space - alt style 2",
	hash: "fr-fractions",
	css: format(_templateObject5),

	html: "\n<div class=\"a\">a</div>\n<div class=\"b\">b</div>\n<div class=\"c\">c</div>\n<div class=\"d\">d</div>\n<div class=\"e\">e</div>\n"

}, {
	name: "Vertical and horizontal centering",
	hash: "vertical-horizontal-centering",
	css: format(_templateObject6),

	html: "<div> Resize me </div>"
}, {
	name: "Responsive layout with media queries",
	hash: "responsive-layout",
	css: format(_templateObject7),

	html: format(_templateObject8)
}, {
	name: "Calculator with :nth-of-type helpers",
	hash: "nth-of-type-helpers",
	css: format(_templateObject9),
	html: format(_templateObject10)
}, {
	name: "Layout with gaps",
	hash: "gaps",
	css: format(_templateObject11),

	html: format(_templateObject12)
}, {
	name: "All the alignment options",
	hash: "all-alignment-options",

	css: format(_templateObject13),

	html: format(_templateObject14)
}];

exports.default = presets;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

function assembleStyles() {
	var styles = {
		modifiers: {
			reset: [0, 0],
			bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		colors: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39]
		},
		bgColors: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49]
		}
	};

	// fix humans
	styles.colors.grey = styles.colors.gray;

	Object.keys(styles).forEach(function (groupName) {
		var group = styles[groupName];

		Object.keys(group).forEach(function (styleName) {
			var style = group[styleName];

			styles[styleName] = group[styleName] = {
				open: '\x1B[' + style[0] + 'm',
				close: '\x1B[' + style[1] + 'm'
			};
		});

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	});

	return styles;
}

Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(75)(module)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function hasFlag(flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ansiRegex = __webpack_require__(16);
var re = new RegExp(ansiRegex().source); // remove the `g` flag
module.exports = re.test.bind(re);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mexp = __webpack_require__(41);
Mexp.prototype.formulaEval = function () {
	"use strict";

	var stack = [],
	    pop1,
	    pop2,
	    pop3;
	var disp = [];
	var temp = '';
	var arr = this.value;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].type === 1 || arr[i].type === 3) {
			disp.push({ value: arr[i].type === 3 ? arr[i].show : arr[i].value, type: 1 });
		} else if (arr[i].type === 13) {
			disp.push({ value: arr[i].show, type: 1 });
		} else if (arr[i].type === 0) {
			disp[disp.length - 1] = { value: arr[i].show + (arr[i].show != "-" ? "(" : "") + disp[disp.length - 1].value + (arr[i].show != "-" ? ")" : ""), type: 0 };
		} else if (arr[i].type === 7) {
			disp[disp.length - 1] = { value: (disp[disp.length - 1].type != 1 ? "(" : "") + disp[disp.length - 1].value + (disp[disp.length - 1].type != 1 ? ")" : "") + arr[i].show, type: 7 };
		} else if (arr[i].type === 10) {
			pop1 = disp.pop();
			pop2 = disp.pop();
			if (arr[i].show === 'P' || arr[i].show === 'C') disp.push({ value: "<sup>" + pop2.value + "</sup>" + arr[i].show + "<sub>" + pop1.value + "</sub>", type: 10 });else disp.push({ value: (pop2.type != 1 ? "(" : "") + pop2.value + (pop2.type != 1 ? ")" : "") + "<sup>" + pop1.value + "</sup>", type: 1 });
		} else if (arr[i].type === 2 || arr[i].type === 9) {
			pop1 = disp.pop();
			pop2 = disp.pop();
			disp.push({ value: (pop2.type != 1 ? "(" : "") + pop2.value + (pop2.type != 1 ? ")" : "") + arr[i].show + (pop1.type != 1 ? "(" : "") + pop1.value + (pop1.type != 1 ? ")" : ""), type: arr[i].type });
		} else if (arr[i].type === 12) {
			pop1 = disp.pop();
			pop2 = disp.pop();
			pop3 = disp.pop();
			disp.push({ value: arr[i].show + "(" + pop3.value + "," + pop2.value + "," + pop1.value + ")", type: 12 });
		}
	}
	return disp[0].value;
};
module.exports = Mexp;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mexp = __webpack_require__(39);
function inc(arr, val) {
	for (var i = 0; i < arr.length; i++) {
		arr[i] += val;
	}return arr;
}
var token = ['sin', 'cos', 'tan', 'pi', '(', ')', 'P', 'C', 'asin', 'acos', 'atan', '7', '8', '9', 'int', 'cosh', 'acosh', 'ln', '^', 'root', '4', '5', '6', '/', '!', 'tanh', 'atanh', 'Mod', '1', '2', '3', '*', 'sinh', 'asinh', 'e', 'log', '0', '.', '+', '-', ',', 'Sigma', 'n', 'Pi', 'pow'];
var show = ['sin', 'cos', 'tan', '&pi;', '(', ')', 'P', 'C', 'asin', 'acos', 'atan', '7', '8', '9', 'Int', 'cosh', 'acosh', ' ln', '^', 'root', '4', '5', '6', '&divide;', '!', 'tanh', 'atanh', ' Mod ', '1', '2', '3', '&times;', 'sinh', 'asinh', 'e', ' log', '0', '.', '+', '-', ',', '&Sigma;', 'n', '&Pi;', 'pow'];
var eva = [Mexp.math.sin, Mexp.math.cos, Mexp.math.tan, 'PI', '(', ')', Mexp.math.P, Mexp.math.C, Mexp.math.asin, Mexp.math.acos, Mexp.math.atan, '7', '8', '9', Math.floor, Mexp.math.cosh, Mexp.math.acosh, Math.log, Math.pow, Math.sqrt, '4', '5', '6', Mexp.math.div, Mexp.math.fact, Mexp.math.tanh, Mexp.math.atanh, Mexp.math.mod, '1', '2', '3', Mexp.math.mul, Mexp.math.sinh, Mexp.math.asinh, 'E', Mexp.math.log, '0', '.', Mexp.math.add, Mexp.math.sub, ',', Mexp.math.sigma, 'n', Mexp.math.Pi, Math.pow];
var preced = { 0: 11, 1: 0, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 7: 11, 8: 11, 9: 1, 10: 10, 11: 0, 12: 11, 13: 0 };
var type = [0, 0, 0, 3, 4, 5, 10, 10, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 10, 0, 1, 1, 1, 2, 7, 0, 0, 2, 1, 1, 1, 2, 0, 0, 3, 0, 1, 6, 9, 9, 11, 12, 13, 12, 8];
/*
0 : function with syntax function_name(Maths_exp)
1 : numbers
2 : binary operators like * / Mod left associate and same precedence
3 : Math constant values like e,pi,Cruncher ans
4 : opening bracket
5 : closing bracket
6 : decimal
7 : function with syntax (Math_exp)function_name
8: function with syntax function_name(Math_exp1,Math_exp2)
9 : binary operator like +,-
10: binary operator like P C or ^
11: ,
12: function with , seperated three parameters
13: variable of Sigma function
*/
var type0 = { 0: true, 1: true, 3: true, 4: true, 6: true, 8: true, 9: true, 12: true, 13: true },
    //type2:true,type4:true,type9:true,type11:true,type21:true,type22
type1 = { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true, 13: true },
    //type3:true,type5:true,type7:true,type23
type_1 = { 0: true, 3: true, 4: true, 8: true, 12: true, 13: true },
    empty = {},
    type_3 = { 0: true, 1: true, 3: true, 4: true, 6: true, 8: true, 12: true, 13: true },
    //type_5:true,type_7:true,type_23
type6 = { 1: true },
    newAr = [[], ["1", "2", "3", "7", "8", "9", "4", "5", "6", "+", "-", "*", "/", "(", ")", "^", "!", "P", "C", "e", "0", ".", ",", "n"], ["pi", "ln", "Pi"], ["sin", "cos", "tan", "Del", "int", "Mod", "log", "pow"], ["asin", "acos", "atan", "cosh", "root", "tanh", "sinh"], ["acosh", "atanh", "asinh", "Sigma"]];
function match(str1, str2, i, x) {
	for (var f = 0; f < x; f++) {
		if (str1[i + f] !== str2[f]) return false;
	}
	return true;
}
Mexp.addToken = function (tokens) {
	for (i = 0; i < tokens.length; i++) {
		x = tokens[i].token.length;
		var temp = -1;

		//newAr is a specially designed data structure in which 1D array at location one of 2d array has all string with length 1 2 with 2 and so on

		if (x < newAr.length) //match to check if token is really huge and not existing
			//if not checked it will break in next line as undefined index
			for (y = 0; y < newAr[x].length; y++) {
				if (tokens[i].token === newAr[x][y]) {
					temp = token.indexOf(newAr[x][y]);
					break;
				}
			}
		if (temp === -1) {
			token.push(tokens[i].token);
			type.push(tokens[i].type);
			if (newAr.length <= tokens[i].token.length) newAr[tokens[i].token.length] = [];
			newAr[tokens[i].token.length].push(tokens[i].token);
			eva.push(tokens[i].value);
			show.push(tokens[i].show);
		} else {
			token[temp] = tokens[i].token;
			type[temp] = tokens[i].type;
			eva[temp] = tokens[i].value;
			show[temp] = tokens[i].show;
		}
	}
};
Mexp.lex = function (inp, tokens) {
	'use strict';

	var str = [{ type: 4, value: "(", show: "(", pre: 0 }];
	var ptc = []; //Parenthesis to close at the beginning is after one token
	var inpStr = inp;
	var key;
	var pcounter = 0;
	var allowed = type0;
	var bracToClose = 0;
	var asterick = empty;
	var prevKey = '';
	var i, x, y;
	if (typeof tokens !== "undefined") Mexp.addToken(tokens);
	var obj = {};
	for (i = 0; i < inpStr.length; i++) {
		if (inpStr[i] == ' ') {
			continue;
		}
		key = '';
		sec: for (x = inpStr.length - i > newAr.length - 2 ? newAr.length - 1 : inpStr.length - i; x > 0; x--) {
			for (y = 0; y < newAr[x].length; y++) {
				if (match(inpStr, newAr[x][y], i, x)) {
					key = newAr[x][y];
					break sec;
				}
			}
		}
		i += key.length - 1;
		if (key === '') {
			throw new Mexp.exception("Can't understand after " + inpStr.slice(i));
		}
		var index = token.indexOf(key);
		var cToken = key;
		var cType = type[index];
		var cEv = eva[index];
		var cPre = preced[cType];
		var cShow = show[index];
		var pre = str[str.length - 1];
		for (j = ptc.length; j--;) {
			//loop over ptc
			if (ptc[j] === 0) {
				if ([0, 2, 3, 5, 9, 11, 12, 13].indexOf(cType) !== -1) {
					if (allowed[cType] !== true) {
						throw new Mexp.exception(key + " is not allowed after " + prevKey);
					}
					str.push({ value: ")", type: 5, pre: 0, show: ")" });
					allowed = type1;
					asterick = type_3;
					inc(ptc, -1).pop();
				}
			}
		}
		if (allowed[cType] !== true) {
			throw new Mexp.exception(key + " is not allowed after " + prevKey);
		}
		if (asterick[cType] === true) {
			cType = 2;
			cEv = Mexp.math.mul;
			cShow = "&times;";
			cPre = 3;
			i = i - key.length;
		}
		obj = { value: cEv, type: cType, pre: cPre, show: cShow };
		if (cType === 0) {
			allowed = type0;
			asterick = empty;
			inc(ptc, 2).push(2);
			str.push(obj);
			str.push({ value: "(", type: 4, pre: 0, show: "(" });
		} else if (cType === 1) {
			if (pre.type === 1) {
				pre.value += cEv;
				inc(ptc, 1);
			} else {
				str.push(obj);
			}
			allowed = type1;
			asterick = type_1;
		} else if (cType === 2) {
			allowed = type0;
			asterick = empty;
			inc(ptc, 2);
			str.push(obj);
		} else if (cType === 3) {
			//constant
			str.push(obj);
			allowed = type1;
			asterick = type_3;
		} else if (cType === 4) {
			pcounter += ptc.length;
			ptc = [];
			bracToClose++;
			allowed = type0;
			asterick = empty;
			str.push(obj);
		} else if (cType === 5) {
			if (!bracToClose) {
				throw new Mexp.exception("Closing parenthesis are more than opening one, wait What!!!");
			}
			while (pcounter--) {
				//loop over ptc
				str.push({ value: ")", type: 5, pre: 0, show: ")" });
			}
			pcounter = 0;
			bracToClose--;
			allowed = type1;
			asterick = type_3;
			str.push(obj);
		} else if (cType === 6) {
			if (pre.hasDec) {
				throw new Mexp.exception("Two decimals are not allowed in one number");
			}
			if (pre.type !== 1) {
				pre = { value: 0, type: 1, pre: 0 }; //pre needs to be changed as it will the last value now to be safe in later code
				str.push(pre);
				inc(ptc, -1);
			}
			allowed = type6;
			inc(ptc, 1);
			asterick = empty;
			pre.value += cEv;
			pre.hasDec = true;
		} else if (cType === 7) {
			allowed = type1;
			asterick = type_3;
			inc(ptc, 1);
			str.push(obj);
		}
		if (cType === 8) {
			allowed = type0;
			asterick = empty;
			inc(ptc, 4).push(4);
			str.push(obj);
			str.push({ value: "(", type: 4, pre: 0, show: "(" });
		} else if (cType === 9) {
			if (pre.type === 9) {
				if (pre.value === Mexp.math.add) {
					pre.value = cEv;
					pre.show = cShow;
					inc(ptc, 1);
				} else if (pre.value === Mexp.math.sub && cShow === '-') {
					pre.value = Mexp.math.add;
					pre.show = '+';
					inc(ptc, 1);
				}
			} else if (pre.type !== 5 && pre.type !== 7 && pre.type !== 1 && pre.type !== 3 && pre.type !== 13) {
				//changesign only when negative is found
				if (cToken === '-') {
					//do nothing for + token
					//don't add with the above if statement as that will run the else statement of parent if on Ctoken +
					allowed = type0;
					asterick = empty;
					inc(ptc, 2).push(2);
					str.push({ value: Mexp.math.changeSign, type: 0, pre: 21, show: "-" });
					str.push({ value: "(", type: 4, pre: 0, show: "(" });
				}
			} else {
				str.push(obj);
				inc(ptc, 2);
			}
			allowed = type0;
			asterick = empty;
		} else if (cType === 10) {
			allowed = type0;
			asterick = empty;
			inc(ptc, 2);
			str.push(obj);
		} else if (cType === 11) {
			allowed = type0;
			asterick = empty;
			str.push(obj);
		} else if (cType === 12) {
			allowed = type0;
			asterick = empty;
			inc(ptc, 6).push(6);
			str.push(obj);
			str.push({ value: "(", type: 4, pre: 0 });
		} else if (cType === 13) {
			allowed = type1;
			asterick = type_3;
			str.push(obj);
		}
		inc(ptc, -1);
		prevKey = key;
	}
	for (var j = ptc.length; j--;) {
		//loop over ptc
		if (ptc[j] === 0) {

			str.push({ value: ")", show: ")", type: 5, pre: 3 });
			inc(ptc, -1).pop();
		}
	}
	if (allowed[5] !== true) {
		throw new Mexp.exception("complete the expression");
	}
	while (bracToClose--) {
		str.push({ value: ")", show: ")", type: 5, pre: 3 });
	}str.push({ type: 5, value: ")", show: ")", pre: 0 });
	//        console.log(str);
	return new Mexp(str);
};
module.exports = Mexp;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mexp = function Mexp(parsed) {
	this.value = parsed;
};

Mexp.math = {
	isDegree: true, //mode of calculator
	acos: function acos(x) {
		return Mexp.math.isDegree ? 180 / Math.PI * Math.acos(x) : Math.acos(x);
	},
	add: function add(a, b) {
		return a + b;
	},
	asin: function asin(x) {
		return Mexp.math.isDegree ? 180 / Math.PI * Math.asin(x) : Math.asin(x);
	},
	atan: function atan(x) {
		return Mexp.math.isDegree ? 180 / Math.PI * Math.atan(x) : Math.atan(x);
	},
	acosh: function acosh(x) {
		return Math.log(x + Math.sqrt(x * x - 1));
	},
	asinh: function asinh(x) {
		return Math.log(x + Math.sqrt(x * x + 1));
	},
	atanh: function atanh(x) {
		return Math.log((1 + x) / (1 - x));
	},
	C: function C(n, r) {
		var pro = 1,
		    other = n - r,
		    choice = r;
		if (choice < other) {
			choice = other;
			other = r;
		}
		for (var i = choice + 1; i <= n; i++) {
			pro *= i;
		}return pro / Mexp.math.fact(other);
	},
	changeSign: function changeSign(x) {
		return -x;
	},
	cos: function cos(x) {
		if (Mexp.math.isDegree) x = Mexp.math.toRadian(x);
		return Math.cos(x);
	},
	cosh: function cosh(x) {
		return (Math.pow(Math.E, x) + Math.pow(Math.E, -1 * x)) / 2;
	},
	div: function div(a, b) {
		return a / b;
	},
	fact: function fact(n) {
		if (n % 1 !== 0) return "NAN";
		var pro = 1;
		for (var i = 2; i <= n; i++) {
			pro *= i;
		}return pro;
	},
	inverse: function inverse(x) {
		return 1 / x;
	},
	log: function log(i) {
		return Math.log(i) / Math.log(10);
	},
	mod: function mod(a, b) {
		return a % b;
	},
	mul: function mul(a, b) {
		return a * b;
	},
	P: function P(n, r) {
		var pro = 1;
		for (var i = Math.floor(n) - Math.floor(r) + 1; i <= Math.floor(n); i++) {
			pro *= i;
		}return pro;
	},
	Pi: function Pi(low, high, ex) {
		var pro = 1;
		for (var i = low; i <= high; i++) {
			pro *= Number(ex.postfixEval({ n: i }));
		}
		return pro;
	},
	pow10x: function pow10x(e) {
		var x = 1;
		while (e--) {
			x *= 10;
		}
		return x;
	},
	sigma: function sigma(low, high, ex) {
		var sum = 0;
		for (var i = low; i <= high; i++) {
			sum += Number(ex.postfixEval({ n: i }));
		}
		return sum;
	},
	sin: function sin(x) {
		if (Mexp.math.isDegree) x = Mexp.math.toRadian(x);
		return Math.sin(x);
	},
	sinh: function sinh(x) {
		return (Math.pow(Math.E, x) - Math.pow(Math.E, -1 * x)) / 2;
	},
	sub: function sub(a, b) {
		return a - b;
	},
	tan: function tan(x) {
		if (Mexp.math.isDegree) x = Mexp.math.toRadian(x);
		return Math.tan(x);
	},
	tanh: function tanh(x) {
		return Mexp.sinha(x) / Mexp.cosha(x);
	},
	toRadian: function toRadian(x) {
		return x * Math.PI / 180;
	}
};
Mexp.exception = function (message) {
	this.message = message;
};
module.exports = Mexp;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mexp = __webpack_require__(38);

Mexp.prototype.toPostfix = function () {
	'use strict';

	var post = [],
	    elem,
	    popped,
	    prep,
	    pre,
	    ele;
	var stack = [{ value: "(", type: 4, pre: 0 }];
	var arr = this.value;
	for (var i = 1; i < arr.length; i++) {
		if (arr[i].type === 1 || arr[i].type === 3 || arr[i].type === 13) {
			//if token is number,constant,or n(which is also a special constant in our case)
			if (arr[i].type === 1) arr[i].value = Number(arr[i].value);
			post.push(arr[i]);
		} else if (arr[i].type === 4) {
			stack.push(arr[i]);
		} else if (arr[i].type === 5) {
			while ((popped = stack.pop()).type !== 4) {
				post.push(popped);
			}
		} else if (arr[i].type === 11) {
			while ((popped = stack.pop()).type !== 4) {
				post.push(popped);
			}
			stack.push(popped);
		} else {
			elem = arr[i];
			pre = elem.pre;
			ele = stack[stack.length - 1];
			prep = ele.pre;
			var flag = ele.value == 'Math.pow' && elem.value == 'Math.pow';
			if (pre > prep) stack.push(elem);else {
				while (prep >= pre && !flag || flag && pre < prep) {
					popped = stack.pop();
					ele = stack[stack.length - 1];
					post.push(popped);
					prep = ele.pre;
					flag = elem.value == 'Math.pow' && ele.value == 'Math.pow';
				}
				stack.push(elem);
			}
		}
	}
	return new Mexp(post);
};
module.exports = Mexp;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mexp = __webpack_require__(40);
Mexp.prototype.postfixEval = function (UserDefined) {
	'use strict';

	UserDefined = UserDefined || {};
	UserDefined.PI = Math.PI;
	UserDefined.E = Math.E;
	var stack = [],
	    pop1,
	    pop2,
	    pop3;
	var disp = [];
	var temp = '';
	var arr = this.value;
	var bool = typeof UserDefined.n !== "undefined";
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].type === 1) {
			stack.push({ value: arr[i].value, type: 1 });
		} else if (arr[i].type === 3) {
			stack.push({ value: UserDefined[arr[i].value], type: 1 });
		} else if (arr[i].type === 0) {
			if (typeof stack[stack.length - 1].type === "undefined") {
				stack[stack.length - 1].value.push(arr[i]);
			} else stack[stack.length - 1].value = arr[i].value(stack[stack.length - 1].value);
		} else if (arr[i].type === 7) {
			if (typeof stack[stack.length - 1].type === "undefined") {
				stack[stack.length - 1].value.push(arr[i]);
			} else stack[stack.length - 1].value = arr[i].value(stack[stack.length - 1].value);
		} else if (arr[i].type === 8) {
			pop1 = stack.pop();
			pop2 = stack.pop();
			stack.push({ type: 1, value: arr[i].value(pop2.value, pop1.value) });
		} else if (arr[i].type === 10) {
			pop1 = stack.pop();
			pop2 = stack.pop();
			if (typeof pop2.type === "undefined") {
				pop2.value = pop2.concat(pop1);
				pop2.value.push(arr[i]);
				stack.push(pop2);
			} else if (typeof pop1.type === "undefined") {
				pop1.unshift(pop2);
				pop1.push(arr[i]);
				stack.push(pop1);
			} else {
				stack.push({ type: 1, value: arr[i].value(pop2.value, pop1.value) });
			}
		} else if (arr[i].type === 2 || arr[i].type === 9) {
			pop1 = stack.pop();
			pop2 = stack.pop();
			if (typeof pop2.type === "undefined") {
				console.log(pop2);
				pop2 = pop2.concat(pop1);
				pop2.push(arr[i]);
				stack.push(pop2);
			} else if (typeof pop1.type === "undefined") {
				pop1.unshift(pop2);
				pop1.push(arr[i]);
				stack.push(pop1);
			} else {
				stack.push({ type: 1, value: arr[i].value(pop2.value, pop1.value) });
			}
		} else if (arr[i].type === 12) {
			pop1 = stack.pop();
			if (typeof pop1.type !== "undefined") {
				pop1 = [pop1];
			}
			pop2 = stack.pop();
			pop3 = stack.pop();
			stack.push({ type: 1, value: arr[i].value(pop3.value, pop2.value, new Mexp(pop1)) });
		} else if (arr[i].type === 13) {
			if (bool) {
				stack.push({ value: UserDefined[arr[i].value], type: 3 });
			} else stack.push([arr[i]]);
		}
	}
	if (stack.length > 1) {
		throw new Mexp.exception("Uncaught Syntax error");
	}
	return stack[0].value > 1000000000000000 ? "Infinity" : Number(stack[0].value.toFixed(15)).toPrecision();
};
Mexp.eval = function (str, tokens, obj) {
	if (typeof tokens === "undefined") {
		return this.lex(str).toPostfix().postfixEval();
	} else if (typeof obj === "undefined") {
		if (typeof tokens.length !== "undefined") return this.lex(str, tokens).toPostfix().postfixEval();else return this.lex(str).toPostfix().postfixEval(tokens);
	} else return this.lex(str, tokens).toPostfix().postfixEval(obj);
};
module.exports = Mexp;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.getAlignContent = function (_ref) {
	var rows = _ref.rows;

	var isSpaceRow = function isSpaceRow(row) {
		return (/^\s*$/.test(row)
		);
	},
	    hasSpaceRows = rows.some(isSpaceRow),
	    hasSpaceRowsBeforeContent = isSpaceRow(rows[0]),
	    hasSpaceRowsAfterContent = isSpaceRow(rows[rows.length - 1]),
	    firstContentRowIndex = rows.findIndex(function (row) {
		return !isSpaceRow(row);
	}),
	    lastContentRowIndex = rows.length - 1 - rows.slice().reverse().findIndex(function (row) {
		return !isSpaceRow(row);
	}),
	    hasContent = firstContentRowIndex >= 0 && lastContentRowIndex < rows.length,
	    hasSpaceRowsBetweenContent = hasContent && rows.slice(firstContentRowIndex, lastContentRowIndex).some(isSpaceRow),
	    hasDoubleSpaceRowsBetweenContent = hasContent && rows.slice(firstContentRowIndex, lastContentRowIndex - 1).some(function (row, index, rows) {
		return isSpaceRow(row) && isSpaceRow(rows[index + 1]);
	});

	if (!hasSpaceRows) return "stretch";
	if (hasSpaceRowsBeforeContent && hasSpaceRowsAfterContent && hasDoubleSpaceRowsBetweenContent) return "space-around";
	if (hasSpaceRowsBeforeContent && hasSpaceRowsAfterContent && hasSpaceRowsBetweenContent) return "space-evenly";
	if (hasSpaceRowsBeforeContent && hasSpaceRowsAfterContent) return "center";
	if (hasSpaceRowsBeforeContent) return "end";
	if (hasSpaceRowsAfterContent) return "start";
	if (hasSpaceRowsBetweenContent) return "space-between";
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.getAlignSelf = function (zone) {

	var topIndicator = zone.content.search(/↑|\^/),
	    bottomIndicator = zone.content.search(/↓|[^\w]v[^\w]/);

	if (topIndicator >= 0 && bottomIndicator > topIndicator) return "stretch";
	if (bottomIndicator >= 0 && topIndicator >= bottomIndicator) return "center";
	if (topIndicator >= 0) return "start";
	if (bottomIndicator >= 0) return "end";

	return null;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}return arr2;
	} else {
		return Array.from(arr);
	}
}

var reduceCSSCalc = __webpack_require__(64);
var reduce = function reduce(expr) {
	return expr ? reduceCSSCalc(expr) : expr;
};

var _require = __webpack_require__(2),
    isFillingRemainingSpace = _require.isFillingRemainingSpace;

var shouldOptimizeCalc = void 0;
function enableOptimization(bool) {
	shouldOptimizeCalc = bool;
}
function optimize(expr) {
	return shouldOptimizeCalc ? reduce(expr) : expr;
}

function sum() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	var dims = args.filter(function (arg) {
		return arg && arg !== "0";
	});
	return dims.length < 2 ? dims[0] : optimize("calc(" + dims.join(" + ") + ")");
}

function remaining(dim) {
	if (!dim || dim == "0") return "100%";
	return optimize("calc(100% - " + dim + ")");
}

function fraction(dims, allDims) {
	if (dims.length === 0 || dims.length === allDims.length) return null; // use default value

	if (dims.length === 1 && !isFillingRemainingSpace(dims[0])) return dims[0];

	if (dims.every(function (dim) {
		return !isFillingRemainingSpace(dim);
	})) // all fixed
		return sum.apply(undefined, _toConsumableArray(dims));

	var fr = dims.reduce(function (total, dim) {
		return isFillingRemainingSpace(dim) ? total + parseInt(dim) : total;
	}, 0),
	    totalFr = allDims.reduce(function (total, dim) {
		return isFillingRemainingSpace(dim) ? total + parseInt(dim) : total;
	}, 0),
	    allFixedDims = allDims.filter(function (dim) {
		return !isFillingRemainingSpace(dim);
	}),
	    fixedDims = dims.filter(function (dim) {
		return !isFillingRemainingSpace(dim);
	}),
	    remainingSpace = remaining(allFixedDims.join(" - "));

	if (fixedDims.length === 0) {
		// all relative
		if (fr === totalFr) {
			return remainingSpace;
		}
		return optimize("calc(" + remainingSpace + " * " + fr + " / " + totalFr + ")");
	}

	var sumFixed = fixedDims.length == 1 ? fixedDims[0] : sum.apply(undefined, _toConsumableArray(fixedDims));
	if (fr === totalFr) {
		return sum(sumFixed, remainingSpace);
	}

	return sum(sumFixed, "calc(" + remainingSpace + " * " + fr + " / " + totalFr + ")");
}

module.exports = { sum: sum, remaining: remaining, fraction: fraction, optimize: optimize, enableOptimization: enableOptimization };

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () {
	function sliceIterator(arr, i) {
		var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
			for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
				_arr.push(_s.value);if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;_e = err;
		} finally {
			try {
				if (!_n && _i["return"]) _i["return"]();
			} finally {
				if (_d) throw _e;
			}
		}return _arr;
	}return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError("Invalid attempt to destructure non-iterable instance");
		}
	};
}();

function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}return arr2;
	} else {
		return Array.from(arr);
	}
}

var _require = __webpack_require__(2),
    isFillingRemainingSpace = _require.isFillingRemainingSpace;

var calc = __webpack_require__(44);

function getFallback(_ref) {
	var zones = _ref.zones,
	    grid = _ref.grid,
	    decl = _ref.decl,
	    result = _ref.result,
	    input = _ref.input,
	    options = _ref.options;

	calc.enableOptimization(options.optimize);

	var colIndexes = input.colIndexes,
	    rowIndexes = input.rowIndexes;

	var colsDim = input.colsDim.map(function (dim) {
		return dimensionFallback(dim, { decl: decl, result: result });
	});
	var rowsDim = input.rowsDim.map(function (dim) {
		return dimensionFallback(dim, { decl: decl, result: result });
	});

	var fallback = {
		grid: getGridFallback({ colsDim: colsDim, rowsDim: rowsDim, rule: grid.rule, props: grid.props }),
		zones: new Map()
	};

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = zones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var zone = _step.value;

			fallback.zones.set(zone, getZoneFallback({
				zone: zone, grid: grid, colIndexes: colIndexes, rowIndexes: rowIndexes, colsDim: colsDim, rowsDim: rowsDim
			}));
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return fallback;
}

function dimensionFallback(dim, _ref2) {
	var decl = _ref2.decl,
	    result = _ref2.result;

	if (dim.startsWith("minmax(")) {
		decl.warn(result, "minmax() operator is not supported in fallback mode. Replaced by 1fr.");
		dim = "1fr";
	}
	if (dim.startsWith("fit-content")) {
		decl.warn(result, "fit-content() operator is not supported in fallback mode. Replaced by 1fr.");
		dim = "1fr";
	}
	return dim;
}

function getGridFallback(_ref3) {
	var rowsDim = _ref3.rowsDim,
	    colsDim = _ref3.colsDim,
	    rule = _ref3.rule;

	var grid = {
		rule: rule.clone({ nodes: [] }),
		props: new Map()
	};

	var gridWidth = colsDim.some(isFillingRemainingSpace) ? "100%" : calc.optimize(calc.sum.apply(calc, _toConsumableArray(colsDim)));
	var gridHeight = rowsDim.some(isFillingRemainingSpace) ? "100%" : calc.optimize(calc.sum.apply(calc, _toConsumableArray(rowsDim)));

	grid.props.set("position", "relative");
	grid.props.set("display", "block");
	grid.props.set("width", gridWidth);
	grid.props.set("height", gridHeight);

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = grid.props[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var _ref4 = _step2.value;

			var _ref5 = _slicedToArray(_ref4, 2);

			var prop = _ref5[0];
			var value = _ref5[1];

			if (value != null) {
				grid.rule.append({ prop: prop, value: value });
			}
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return grid;
}

function getZoneFallback(_ref6) {
	var _ref6$zone = _ref6.zone,
	    rule = _ref6$zone.rule,
	    props = _ref6$zone.props,
	    zone = _ref6$zone.zone,
	    rowIndexes = _ref6.rowIndexes,
	    colIndexes = _ref6.colIndexes,
	    rowsDim = _ref6.rowsDim,
	    colsDim = _ref6.colsDim,
	    grid = _ref6.grid;

	var fallbackRule = rule.clone({ nodes: [] });
	var fallbackProps = new Map();

	var _getHeight = getHeight({ zone: zone, props: props, rowsDim: rowsDim, rowIndexes: rowIndexes }),
	    height = _getHeight.height,
	    isStretchingVertically = _getHeight.isStretchingVertically;

	var _getWidth = getWidth({ zone: zone, props: props, colsDim: colsDim, colIndexes: colIndexes }),
	    width = _getWidth.width,
	    isStretchingHorizontally = _getWidth.isStretchingHorizontally;

	var _getVerticalOffset = getVerticalOffset({ props: props, zone: zone, grid: grid, rowsDim: rowsDim, rowIndexes: rowIndexes, height: height }),
	    verticalOffset = _getVerticalOffset.verticalOffset,
	    alignByBottom = _getVerticalOffset.alignByBottom;

	var _getHorizontalOffset = getHorizontalOffset({ props: props, zone: zone, grid: grid, colsDim: colsDim, colIndexes: colIndexes, width: width }),
	    horizontalOffset = _getHorizontalOffset.horizontalOffset,
	    alignByRight = _getHorizontalOffset.alignByRight;

	fallbackProps.set("position", "absolute");
	fallbackProps.set("box-sizing", "border-box");
	fallbackProps.set("transform", getTransform({ props: props }));
	fallbackProps.set(isStretchingVertically ? "height" : "max-height", height);
	fallbackProps.set(isStretchingHorizontally ? "width" : "max-width", width);
	fallbackProps.set(alignByBottom ? "bottom" : "top", verticalOffset);
	fallbackProps.set(alignByRight ? "right" : "left", horizontalOffset);

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = fallbackProps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var _ref7 = _step3.value;

			var _ref8 = _slicedToArray(_ref7, 2);

			var prop = _ref8[0];
			var value = _ref8[1];

			if (value != null) {
				fallbackRule.append({ prop: prop, value: value });
			}
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	return { props: fallbackProps, rule: fallbackRule };
}

function getVerticalOffset(_ref9) {
	var props = _ref9.props,
	    zone = _ref9.zone,
	    grid = _ref9.grid,
	    rowsDim = _ref9.rowsDim,
	    rowIndexes = _ref9.rowIndexes,
	    height = _ref9.height;

	var alignSelf = props.get("align-self") || "stretch";

	var offsetDims = [],
	    alignByBottom = false,
	    gridDelta = getAlignContentFallbackDelta({ zone: zone, grid: grid, rowsDim: rowsDim, rowIndexes: rowIndexes });

	if (alignSelf === "end") {
		alignByBottom = true;
		var bottomIndex = rowIndexes.findIndex(function (rowIndex) {
			return rowIndex === zone.bottom;
		});
		for (var y = rowIndexes.length - 1; y > bottomIndex; y -= 2) {
			offsetDims.push(rowsDim[Math.floor(y / 2)]);
		}
	} else {
		var topIndex = rowIndexes.findIndex(function (rowIndex) {
			return rowIndex === zone.top;
		});
		for (var _y = 0; _y < topIndex; _y += 2) {
			offsetDims.push(rowsDim[Math.floor(_y / 2)]);
		}
	}

	if (alignByBottom && gridDelta && gridDelta != "0") {
		gridDelta = calc.remaining(gridDelta);
	}

	var offset = calc.sum(gridDelta, calc.fraction(offsetDims, rowsDim), alignSelf === "center" ? "calc(" + height + " / 2)" : "0") || "0";

	return {
		verticalOffset: calc.optimize(offset),
		alignByBottom: alignByBottom
	};
}

function getHorizontalOffset(_ref10) {
	var props = _ref10.props,
	    zone = _ref10.zone,
	    grid = _ref10.grid,
	    colsDim = _ref10.colsDim,
	    colIndexes = _ref10.colIndexes,
	    width = _ref10.width;

	var justifySelf = props.get("justify-self") || "stretch";

	var offsetDims = [],
	    alignByRight = false,
	    gridDelta = getJustifyContentFallbackDelta({ zone: zone, grid: grid, colsDim: colsDim, colIndexes: colIndexes });

	if (justifySelf === "end") {
		alignByRight = true;
		var rightIndex = colIndexes.findIndex(function (colIndex) {
			return colIndex === zone.right;
		});
		for (var x = colIndexes.length - 1; x > rightIndex; x -= 2) {
			offsetDims.push(colsDim[Math.floor(x / 2)]);
		}
	} else {
		var leftIndex = colIndexes.findIndex(function (colIndex) {
			return colIndex === zone.left;
		});
		for (var _x = 0; _x < leftIndex; _x += 2) {
			offsetDims.push(colsDim[Math.floor(_x / 2)]);
		}
	}

	if (alignByRight && gridDelta && gridDelta != "0") {
		gridDelta = calc.remaining(gridDelta);
	}

	var offset = calc.sum(gridDelta, calc.fraction(offsetDims, colsDim), justifySelf === "center" ? "calc(" + width + " / 2)" : "0") || "0";

	return {
		horizontalOffset: calc.optimize(offset),
		alignByRight: alignByRight
	};
}

function getHeight(_ref11) {
	var zone = _ref11.zone,
	    props = _ref11.props,
	    rowsDim = _ref11.rowsDim,
	    rowIndexes = _ref11.rowIndexes;

	var alignSelf = props.get("align-self") || "stretch";

	var dims = [],
	    topIndex = rowIndexes.findIndex(function (rowIndex) {
		return rowIndex === zone.top;
	}),
	    bottomIndex = rowIndexes.findIndex(function (rowIndex) {
		return rowIndex === zone.bottom;
	});

	for (var y = topIndex; y < bottomIndex; y += 2) {
		dims.push(rowsDim[Math.floor(y / 2)]);
	}

	return {
		height: calc.optimize(calc.fraction(dims, rowsDim) || "100%"),
		isStretchingVertically: alignSelf === "stretch"
	};
}

function getWidth(_ref12) {
	var zone = _ref12.zone,
	    props = _ref12.props,
	    colsDim = _ref12.colsDim,
	    colIndexes = _ref12.colIndexes;

	var justifySelf = props.get("justify-self") || "stretch";

	var dims = [],
	    leftIndex = colIndexes.findIndex(function (colIndex) {
		return colIndex === zone.left;
	}),
	    rightIndex = colIndexes.findIndex(function (colIndex) {
		return colIndex === zone.right;
	});
	for (var x = leftIndex; x < rightIndex; x += 2) {
		dims.push(colsDim[Math.floor(x / 2)]);
	}

	return {
		width: calc.optimize(calc.fraction(dims, colsDim) || "100%"),
		isStretchingHorizontally: justifySelf === "stretch"
	};
}

function getTransform(_ref13) {
	var props = _ref13.props;

	var isCenteredVertically = props.get("align-self") === "center";
	var isCenteredHorizontally = props.get("justify-self") === "center";

	if (isCenteredVertically && isCenteredHorizontally) return "translate(-50%,-50%)";
	if (isCenteredVertically) return "translateY(-50%)";
	if (isCenteredHorizontally) return "translateX(-50%)";
}

function getJustifyContentFallbackDelta(_ref14) {
	var zone = _ref14.zone,
	    grid = _ref14.grid,
	    colsDim = _ref14.colsDim,
	    colIndexes = _ref14.colIndexes;

	if (colsDim.some(isFillingRemainingSpace)) return "0"; // fluid zone will fit all the remaining space

	var justifyGrid = grid.props.get("justify-content") || "stretch";

	if (justifyGrid === "stretch") return "0";
	if (justifyGrid === "start") return "0";

	var remainingSpace = calc.remaining(calc.sum.apply(calc, _toConsumableArray(colsDim))),
	    leftIndex = colIndexes.findIndex(function (colIndex) {
		return colIndex === zone.left;
	}),
	    index = Math.floor(leftIndex / 2),
	    nbCols = colsDim.length;

	if (justifyGrid === "end") return remainingSpace;
	if (justifyGrid === "center") return "calc(" + remainingSpace + " / 2)";
	if (justifyGrid === "space-between") return "calc(" + remainingSpace + " * " + index + " / " + (nbCols - 1) + ")";
	if (justifyGrid === "space-around") return "calc(" + remainingSpace + " * " + (index * 2 + 1) + " / " + nbCols * 2 + ")";
	if (justifyGrid === "space-evenly") return "calc(" + remainingSpace + " * " + (index + 1) + " / " + (nbCols + 1) + ")";
}

function getAlignContentFallbackDelta(_ref15) {
	var zone = _ref15.zone,
	    grid = _ref15.grid,
	    rowsDim = _ref15.rowsDim,
	    rowIndexes = _ref15.rowIndexes;

	if (rowsDim.some(isFillingRemainingSpace)) return "0"; // fluid zone will fit all the remaining space

	var alignGrid = grid.props.get("align-content") || "stretch";

	if (alignGrid === "stretch") return "0";
	if (alignGrid === "start") return "0";

	var remainingSpace = calc.remaining(calc.sum.apply(calc, _toConsumableArray(rowsDim))),
	    topIndex = rowIndexes.findIndex(function (rowIndex) {
		return rowIndex === zone.top;
	}),
	    index = Math.floor(topIndex / 2),
	    nbRows = rowsDim.length;

	if (alignGrid === "end") return remainingSpace;
	if (alignGrid === "center") return "calc(" + remainingSpace + " / 2)";
	if (alignGrid === "space-between") return "calc(" + remainingSpace + " * " + index + " / " + (nbRows - 1) + ")";
	if (alignGrid === "space-around") return "calc(" + remainingSpace + " * " + (index * 2 + 1) + " / " + nbRows * 2 + ")";
	if (alignGrid === "space-evenly") return "calc(" + remainingSpace + " * " + (index + 1) + " / " + (nbRows + 1) + ")";
}

module.exports = { getFallback: getFallback, getZoneFallback: getZoneFallback, getGridFallback: getGridFallback };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.getGridAreas = function (_ref) {
	var zones = _ref.zones,
	    rowIndexes = _ref.rowIndexes,
	    colIndexes = _ref.colIndexes;

	var areaNames = [];

	var _loop = function _loop(y) {
		areaNames[y] = [];

		var _loop2 = function _loop2(_x) {
			var currentZone = zones.find(function (zone) {
				return rowIndexes[2 * y] >= zone.top && rowIndexes[2 * y + 1] <= zone.bottom && colIndexes[2 * _x] >= zone.left && colIndexes[2 * _x + 1] <= zone.right;
			});
			if (currentZone) {
				areaNames[y][_x] = currentZone.name || "...";
			} else {
				// gap
				areaNames[y][_x] = "...";
				zones.push({
					isGap: true,
					top: rowIndexes[2 * y], bottom: rowIndexes[2 * y + 1],
					left: colIndexes[2 * _x], right: colIndexes[2 * _x + 1]
				});
			}
		};

		for (var _x = 0; _x < colIndexes.length / 2; _x++) {
			_loop2(_x);
		}
	};

	for (var y = 0; y < rowIndexes.length / 2; y++) {
		_loop(y);
	}

	var longestNameLengthByCol = [];
	for (var y = 0; y < areaNames.length; y++) {
		for (var x = 0; x < areaNames[y].length; x++) {
			if (!(x in longestNameLengthByCol)) longestNameLengthByCol[x] = 0;
			var nameLength = areaNames[y][x].length;
			if (nameLength > longestNameLengthByCol[x]) {
				longestNameLengthByCol[x] = nameLength;
			}
		}
	}

	return areaNames.map(function (row) {
		return "\"" + row.map(function (name, x) {
			return (name + " ".repeat(longestNameLengthByCol[x])).slice(0, longestNameLengthByCol[x]);
		}).join(" ") + "\"";
	});
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    parseDimension = _require.parseDimension;

exports.getGridCols = function (input) {
	var decl = input.decl,
	    rows = input.rows,
	    zones = input.zones,
	    colIndexes = input.colIndexes,
	    rowIndexes = input.rowIndexes;

	var gridCols = new Array(Math.floor(colIndexes.length / 2)).fill("1fr"); // autofill by default

	// match border content
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = zones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var zone = _step.value;
			var _arr = ["top", "bottom"];

			for (var _i = 0; _i < _arr.length; _i++) {
				var side = _arr[_i];
				var borderContent = cleanupDimInput(rows[zone[side]].substring(zone.left, zone.right)),
				    colIndexLeft = colIndexes.indexOf(zone.left),
				    colIndexRight = colIndexes.indexOf(zone.right),
				    _colDim = parseDimension(borderContent, "horizontal");

				if (_colDim != null) {
					if (colIndexRight === colIndexLeft + 1) {
						gridCols[Math.floor(colIndexLeft / 2)] = _colDim;
					} else {
						throw decl.error("You cannot specify the width of a zone occupying more than one column.", { plugin: 'postcss-mixins' });
					}
				}
			}
		}

		// check the last row
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var lastRow = rows[rowIndexes.slice(-1)[0] + 1];
	if (lastRow) {
		for (var x = 0; x < gridCols.length; x++) {
			var content = cleanupDimInput(lastRow.substring(colIndexes[2 * x], colIndexes[2 * x + 1] + 1)),
			    colDim = parseDimension(content, "horizontal");

			if (colDim != null) {
				gridCols[x] = colDim;
			}
		}

		// check horizontal gaps
		for (var _x = 0; _x < colIndexes.length - 2; _x += 2) {
			var left = colIndexes[_x + 1] + 1,
			    right = colIndexes[_x + 2] - 1;

			var gapDimensionInfo = cleanupDimInput(lastRow.substring(left, right)),
			    gapDim = parseDimension(gapDimensionInfo, "horizontal");

			if (gapDim != null) {
				// horizontal gap detected
				gridCols.splice(Math.floor(_x / 2) + 1, 0, gapDim);
				colIndexes.splice(_x + 2, 0, left, right);
				_x += 2;
			}
		}
	}

	input.colsDim = gridCols;
	return gridCols.join(" ");
};

function cleanupDimInput(input) {
	return input.replace(/[^a-zA-Z0-9()\-+\/*\s%,<>]/g, "") // remove anything that is not part of a dimension value
	.replace(/^[\-+\s]+|[\-+\s]+$/g, ""); // remove remaining '-' '+' segments but preserve range dimensions
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    parseDimension = _require.parseDimension;

exports.getGridRows = function (input) {
	var rows = input.rows,
	    colIndexes = input.colIndexes,
	    rowIndexes = input.rowIndexes,
	    gridRows = [];

	for (var y = 0; y < rowIndexes.length; y += 2) {
		var dimension = parseDimension(getRowDimInfo({
			rows: rows, colIndexes: colIndexes,
			from: rowIndexes[y] + 1,
			to: rowIndexes[y + 1] - 1
		}), "vertical");

		if (dimension === null) dimension = "1fr";
		gridRows.push(dimension);
	}

	// check vertical gaps
	for (var _y = 0; _y < rowIndexes.length - 2; _y += 2) {
		var top = rowIndexes[_y + 1] + 1,
		    bottom = rowIndexes[_y + 2] - 1,
		    gapDimension = parseDimension(getRowDimInfo({ rows: rows, colIndexes: colIndexes, from: top, to: bottom }), "vertical");

		if (gapDimension != null) {
			// vertical gap detected
			gridRows.splice(Math.floor(_y / 2) + 1, 0, gapDimension);
			rowIndexes.splice(_y + 2, 0, top, bottom);
			_y += 2;
		}
	}

	input.rowsDim = gridRows;
	return gridRows.join(" ");
};

function getRowDimInfo(_ref) {
	var rows = _ref.rows,
	    colIndexes = _ref.colIndexes,
	    from = _ref.from,
	    to = _ref.to;

	var lastContentColIndex = colIndexes.slice(-1)[0];
	return rows.slice(from, to + 1).map(function (row) {
		return row.substring(lastContentColIndex + 1);
	}).join(" ");
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(7),
    range = _require.range;

exports.getJustifyContent = function (_ref) {
	var cols = _ref.cols;

	var isSpaceCol = function isSpaceCol(col) {
		return (/^\s*$/.test(col)
		);
	},
	    hasSpaceCols = cols.some(isSpaceCol),
	    hasSpaceColsBeforeContent = isSpaceCol(cols[0]) && isSpaceCol(cols[1]),
	    hasSpaceRowsAfterContent = isSpaceCol(cols[cols.length - 1]) && isSpaceCol(cols[cols.length - 2]),
	    firstContentColIndex = cols.findIndex(function (col) {
		return !isSpaceCol(col);
	}),
	    lastContentColIndex = cols.length - 1 - cols.slice().reverse().findIndex(function (col) {
		return !isSpaceCol(col);
	}),
	    hasContent = firstContentColIndex >= 0 && lastContentColIndex < cols.length,
	    hasSpaceColsBetweenContent = hasContent && cols.slice(firstContentColIndex, lastContentColIndex - 1).some(function (col, index, cols) {
		return isSpaceCol(col) && isSpaceCol(cols[index + 1]);
	}),
	    hasDoubleSpaceColsBetweenContent = hasContent && cols.slice(firstContentColIndex, lastContentColIndex - 3).some(function (col, index, cols) {
		return isSpaceCol(col) && range(1, 4).every(function (i) {
			return isSpaceCol(cols[index + i]);
		});
	});

	if (!hasSpaceCols) return "stretch";
	if (hasDoubleSpaceColsBetweenContent && hasSpaceColsBeforeContent && hasSpaceRowsAfterContent) return "space-around";
	if (hasSpaceColsBetweenContent && hasSpaceColsBeforeContent && hasSpaceRowsAfterContent) return "space-evenly";
	if (hasSpaceColsBetweenContent && !hasSpaceColsBeforeContent && !hasSpaceRowsAfterContent) return "space-between";
	if (hasSpaceColsBeforeContent && hasSpaceRowsAfterContent) return "center";
	if (hasSpaceColsBeforeContent) return "end";
	if (hasSpaceRowsAfterContent) return "start";
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.getJustifySelf = function (zone) {

	var leftIndicator = zone.content.search(/←|</),
	    rightIndicator = zone.content.search(/→|>/);

	if (leftIndicator >= 0 && rightIndicator > leftIndicator) return "stretch";
	if (rightIndicator >= 0 && leftIndicator > rightIndicator) return "center";
	if (leftIndicator >= 0) return "start";
	if (rightIndicator >= 0) return "end";

	return null;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () {
	function sliceIterator(arr, i) {
		var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
			for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
				_arr.push(_s.value);if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;_e = err;
		} finally {
			try {
				if (!_n && _i["return"]) _i["return"]();
			} finally {
				if (_d) throw _e;
			}
		}return _arr;
	}return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError("Invalid attempt to destructure non-iterable instance");
		}
	};
}();

var postcss = __webpack_require__(5);
var browserslist = __webpack_require__(76);
var caniuse = __webpack_require__(77);
var optimizeRule = __webpack_require__(56);

var _require = __webpack_require__(52),
    parse = _require.parse;

var _require2 = __webpack_require__(7),
    indentMultiline = _require2.indentMultiline;

var _require3 = __webpack_require__(42),
    getAlignContent = _require3.getAlignContent;

var _require4 = __webpack_require__(49),
    getJustifyContent = _require4.getJustifyContent;

var _require5 = __webpack_require__(43),
    getAlignSelf = _require5.getAlignSelf;

var _require6 = __webpack_require__(50),
    getJustifySelf = _require6.getJustifySelf;

var _require7 = __webpack_require__(48),
    getGridRows = _require7.getGridRows;

var _require8 = __webpack_require__(47),
    getGridCols = _require8.getGridCols;

var _require9 = __webpack_require__(46),
    getGridAreas = _require9.getGridAreas;

var _require10 = __webpack_require__(45),
    getFallback = _require10.getFallback;

var DEFAULTS_OPTIONS = {
	optimize: true
};

module.exports = function (options) {
	options = Object.assign({}, DEFAULTS_OPTIONS, options);

	var browsers = browserslist(options.browsers);
	var isFallbackNeeded = !caniuse.isSupported("css-grid", browsers);
	var isIEHackNeeded = !caniuse.isSupported("css-supports-api", browsers);

	if (options.hasOwnProperty("fallback")) {
		isFallbackNeeded = options.fallback;
		isIEHackNeeded = options.fallback;
	}

	return function (css, result) {
		css.walkDecls('grid-kiss', function (decl) {

			var input = parse(decl);
			var grid = { props: new Map(), rule: decl.parent };
			var zones = [];
			var indent = decl.raws.before.match(/.*$/)[0];
			var nameMapping = new Map();

			grid.props.set("display", "grid");
			grid.props.set("align-content", getAlignContent(input));
			grid.props.set("justify-content", getJustifyContent(input));
			grid.props.set("grid-template-rows", getGridRows(input));
			grid.props.set("grid-template-columns", getGridCols(input));
			grid.props.set("grid-template-areas", indentMultiline(getGridAreas(input), indent));

			// grid properties
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = grid.props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _ref = _step.value;

					var _ref2 = _slicedToArray(_ref, 2);

					var prop = _ref2[0];
					var value = _ref2[1];

					if (value) {
						decl.cloneBefore({ prop: prop, value: value });
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (options.optimize) {
				optimizeRule(grid.rule, nameMapping);
			}

			// zone declarations
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = input.zones.filter(function (zone) {
					return zone.selector;
				})[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var zone = _step2.value;

					var props = new Map();
					var name = zone.name;

					if (options.optimize && nameMapping.has(zone.name)) {
						name = nameMapping.get(zone.name);
					}

					props.set("grid-area", name);
					props.set("justify-self", getJustifySelf(zone));
					props.set("align-self", getAlignSelf(zone));

					var rule = postcss.rule({
						selector: grid.rule.selector + " > " + zone.selector,
						source: decl.source
					});

					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;

					try {
						for (var _iterator4 = props[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var _ref3 = _step4.value;

							var _ref4 = _slicedToArray(_ref3, 2);

							var _prop = _ref4[0];
							var _value = _ref4[1];

							if (_value) {
								rule.append({ prop: _prop, value: _value });
							}
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4.return) {
								_iterator4.return();
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4;
							}
						}
					}

					var lastRule = zones.length > 0 ? zones[zones.length - 1].rule : grid.rule;
					grid.rule.parent.insertAfter(lastRule, rule);
					zones.push({ props: props, rule: rule, zone: zone });
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			if (isFallbackNeeded) {
				var fallback = getFallback({
					zones: zones, grid: grid, input: input, decl: decl, result: result, options: options
				});

				var supportsRule = postcss.atRule({
					name: "supports",
					params: 'not (grid-template-areas:"test")'
				});

				var ieHackRule = postcss.atRule({
					name: "media",
					params: 'screen and (min-width:0\\0)'
				});

				supportsRule.append(fallback.grid.rule);
				ieHackRule.append(fallback.grid.rule);
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = fallback.zones.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var zoneFallback = _step3.value;

						supportsRule.append(zoneFallback.rule);
						ieHackRule.append(zoneFallback.rule);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}

				var lastRule = zones.length > 0 ? zones[zones.length - 1].rule : grid.rule;

				if (isIEHackNeeded) {
					grid.rule.parent.insertAfter(lastRule, ieHackRule);
				}

				grid.rule.parent.insertAfter(lastRule, supportsRule);
			}

			decl.remove();
		});
	};
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}return arr2;
	} else {
		return Array.from(arr);
	}
}

var _require = __webpack_require__(7),
    range = _require.range;

var CORNERS_CHARS = /[+┌┐└┘╔╗╚╝]/;

function parse(decl) {
	var rows = getRows(decl.value),
	    cols = getCols({ rows: rows }),
	    _getCorners = getCorners({ rows: rows }),
	    colIndexes = _getCorners.colIndexes,
	    rowIndexes = _getCorners.rowIndexes,
	    zones = getZones({ rows: rows, cols: cols, colIndexes: colIndexes, rowIndexes: rowIndexes });

	return {
		decl: decl, rows: rows, cols: cols, zones: zones, rowIndexes: rowIndexes, colIndexes: colIndexes
	};
}

function getRows(str) {
	return str.match(/".*"/g).map(function (row) {
		return row.slice(1, row.length - 1);
	});
}

function getCols(_ref) {
	var rows = _ref.rows;

	var colsLength = rows.reduce(function (min, row) {
		return row.length < min ? row.length : min;
	}, Math.pow(2, 31) - 1);
	return range(0, colsLength).map(function (x) {
		return rows.map(function (row) {
			return row[x];
		}).join('');
	});
}

function getCorners(_ref2) {
	var rows = _ref2.rows;

	var colIndexes = new Set(),
	    rowIndexes = new Set();
	rows.forEach(function (row, rowIndex) {
		row.split('').forEach(function (char, colIndex) {
			if (CORNERS_CHARS.test(char)) {
				colIndexes.add(colIndex);
				rowIndexes.add(rowIndex);
			}
		});
	});

	colIndexes = Array.from(colIndexes).sort(function (a, b) {
		return a - b;
	});
	rowIndexes = Array.from(rowIndexes).sort(function (a, b) {
		return a - b;
	});

	return { colIndexes: colIndexes, rowIndexes: rowIndexes };
}

function getZones(_ref3) {
	var rows = _ref3.rows,
	    cols = _ref3.cols,
	    colIndexes = _ref3.colIndexes,
	    rowIndexes = _ref3.rowIndexes;

	var zones = [];

	for (var y = 0; y < rowIndexes.length; y += 2) {
		var _loop = function _loop(x) {
			var top = rowIndexes[y],
			    left = colIndexes[x],
			    zone = { top: top, left: left };

			if (!isInZone({ zones: zones, x: left, y: top }) && x + 1 in colIndexes && y + 1 in rowIndexes) {

				var bottom = void 0,
				    right = void 0;

				if (CORNERS_CHARS.test(rows[top][left])) {
					// a zone starts here, see how far if goes
					bottom = cols[left].slice(top + 1).search(CORNERS_CHARS) + top + 1;
					right = rows[top].slice(left + 1).search(CORNERS_CHARS) + left + 1;
				} else {
					zone.isHole = true; // no zone found, presumed as hole
					bottom = rowIndexes[y + 1];
					right = colIndexes[x + 1];
				}

				zone.bottom = bottom;
				zone.right = right;
				zone.content = rows.slice(top + 1, bottom).map(function (row) {
					return row.substring(left + 1, right);
				}).join(" ");
				zone.selector = getZoneSelector(zone) || null;
				zone.name = getZoneName({ zone: zone, zones: zones });

				zones.push(zone);
			}
		};

		for (var x = 0; x < colIndexes.length; x += 2) {
			_loop(x);
		}
	}

	return zones;
}

function getZoneSelector(zone) {
	return zone.content.replace(/[^\w]v[^\w]|[^\w#.:\-\[\]()]/g, "");
}

function getZoneName(_ref4) {
	var zone = _ref4.zone,
	    zones = _ref4.zones;

	if (!zone.selector) return null;

	var zoneNames = new Set(zones.map(function (z) {
		return z.name;
	})),
	    zoneSelectors = new Set(zones.map(function (z) {
		return z.selector;
	})),
	    zoneNamesBySelector = new Map([].concat(_toConsumableArray(zoneSelectors)).map(function (selector) {
		return [selector, zones.find(function (z) {
			return z.selector === selector;
		}).name];
	}));

	if (zoneNamesBySelector.has(zone.selector)) {
		return zoneNamesBySelector.get(zone.selector);
	}

	var baseName = zone.selector.replace(/(\w)([#.\[])/g, "$1_") // .foo#bar.baz[qux] => .foo_bar_baz_qux]
	.replace(/[^\w]/g, ""); // .foo_bar_baz_qux] => foo_baz_baz_qux

	var aliasNum = 1,
	    name = baseName;

	while (zoneNames.has(name)) {
		name = baseName + aliasNum;
		aliasNum++;
	}

	zoneNames.add(name);
	zoneNamesBySelector.set(zone.selector, name);
	return name;
}

function isInZone(_ref5) {
	var zones = _ref5.zones,
	    x = _ref5.x,
	    y = _ref5.y;

	return zones.some(function (zone) {
		return x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom;
	});
}

module.exports = { parse: parse, getRows: getRows, getCols: getCols, getCorners: getCorners, getZones: getZones, getZoneName: getZoneName, isInZone: isInZone };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function encode(slotNumber) {
	var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var base = characters.length;
	var character = slotNumber % base;
	var result = characters[character];
	var remainder = Math.floor(slotNumber / base);
	if (remainder) {
		base = 64;
		characters += '0123456789-_';
		while (remainder) {
			character = remainder % base;
			remainder = Math.floor(remainder / base);
			result += characters[character];
		}
	}
	return result;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(53);

var holeRegex = /^\.+$/g;

function getIdentifiers() {
	var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	var match = input.match(/"[^"]*"/g);
	if (!match) return null;

	return match.map(function (row) {
		return row.slice(1, -1);
	}) // remove quotes
	.map(function (row) {
		return row.split(/\s+/);
	}) // split by whitespace
	.reduce(function (accu, ids) {
		return accu.concat(ids);
	}, []) // flatten array
	.filter(function (id) {
		return !holeRegex.test(id);
	}) // remove holes
	.filter(function (item, index, array) {
		return array.indexOf(item) === index;
	}); // remove duplicates
}

function renameIdentifiers(identifiers, map) {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = identifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var id = _step.value;

			if (!map.has(id)) {
				map.set(id, encode(map.size));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return map;
}

function replaceIdentifiers(input, map) {
	var output = input.replace(/\.{2,}/g, '.'); // reduce holes to a single dot identifier
	output = output.split(/\b/).map(function (word) {
		return map.get(word) || word;
	}).join(''); // rename identifiers
	var rows = output.match(/"[^"]*"/g);
	if (rows) {
		output = output.match(/"[^"]*"/g).join(' '); // join rows with a single whitespace
	}
	output = output.replace(/\s{2,}/g, ' '); // merge whitespaces
	return output;
}

module.exports = { getIdentifiers: getIdentifiers, renameIdentifiers: renameIdentifiers, replaceIdentifiers: replaceIdentifiers };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function mergeDecls(_ref) {
	var rowDecl = _ref.rowDecl,
	    columnDecl = _ref.columnDecl,
	    areaDecl = _ref.areaDecl;

	var rowValues = rowDecl.value.split(/\s+(?![^(]*\))/);
	var areasRows = areaDecl.value.match(/"[^"]*"/g);
	var rows = areasRows.map(function (areasRow, i) {
		return areasRow + ' ' + (rowValues[i] || '');
	});
	return rows.join(' ') + ' / ' + columnDecl.value;
}

module.exports = { mergeDecls: mergeDecls };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(55),
    mergeDecls = _require.mergeDecls;

var _require2 = __webpack_require__(54),
    getIdentifiers = _require2.getIdentifiers,
    renameIdentifiers = _require2.renameIdentifiers,
    replaceIdentifiers = _require2.replaceIdentifiers;

module.exports = function optimizeRule(rule, nameMapping) {

	var areaDecl = rule.nodes.find(function (decl) {
		return decl.prop === 'grid-template-areas';
	});
	var columnDecl = rule.nodes.find(function (decl) {
		return decl.prop === 'grid-template-columns';
	});
	var rowDecl = rule.nodes.find(function (decl) {
		return decl.prop === 'grid-template-rows';
	});

	// <'grid-template-rows'> / <'grid-template-columns'>
	if (columnDecl && rowDecl && !areaDecl) {
		rule.append({
			prop: 'grid-template',
			value: rowDecl.value + ' / ' + columnDecl.value
		});
		rule.removeChild(rowDecl);
		rule.removeChild(columnDecl);
	} else if (areaDecl) {
		var identifiers = getIdentifiers(areaDecl.value);
		if (identifiers) {
			renameIdentifiers(identifiers, nameMapping);
		}
		areaDecl.value = replaceIdentifiers(areaDecl.value, nameMapping);

		if (columnDecl && rowDecl) {
			// [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <track-list> ]?
			rule.append({
				prop: 'grid-template',
				value: mergeDecls({ rowDecl: rowDecl, columnDecl: columnDecl, areaDecl: areaDecl })
			});
			rule.removeChild(areaDecl);
			rule.removeChild(rowDecl);
			rule.removeChild(columnDecl);
		}
	}
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _jsBase = __webpack_require__(30);

var _sourceMap = __webpack_require__(29);

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var MapGenerator = function () {
    function MapGenerator(stringify, root, opts) {
        _classCallCheck(this, MapGenerator);

        this.stringify = stringify;
        this.mapOpts = opts.map || {};
        this.root = root;
        this.opts = opts;
    }

    MapGenerator.prototype.isMap = function isMap() {
        if (typeof this.opts.map !== 'undefined') {
            return !!this.opts.map;
        } else {
            return this.previous().length > 0;
        }
    };

    MapGenerator.prototype.previous = function previous() {
        var _this = this;

        if (!this.previousMaps) {
            this.previousMaps = [];
            this.root.walk(function (node) {
                if (node.source && node.source.input.map) {
                    var map = node.source.input.map;
                    if (_this.previousMaps.indexOf(map) === -1) {
                        _this.previousMaps.push(map);
                    }
                }
            });
        }

        return this.previousMaps;
    };

    MapGenerator.prototype.isInline = function isInline() {
        if (typeof this.mapOpts.inline !== 'undefined') {
            return this.mapOpts.inline;
        }

        var annotation = this.mapOpts.annotation;
        if (typeof annotation !== 'undefined' && annotation !== true) {
            return false;
        }

        if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.inline;
            });
        } else {
            return true;
        }
    };

    MapGenerator.prototype.isSourcesContent = function isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent !== 'undefined') {
            return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.withContent();
            });
        } else {
            return true;
        }
    };

    MapGenerator.prototype.clearAnnotation = function clearAnnotation() {
        if (this.mapOpts.annotation === false) return;

        var node = void 0;
        for (var i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type !== 'comment') continue;
            if (node.text.indexOf('# sourceMappingURL=') === 0) {
                this.root.removeChild(i);
            }
        }
    };

    MapGenerator.prototype.setSourcesContent = function setSourcesContent() {
        var _this2 = this;

        var already = {};
        this.root.walk(function (node) {
            if (node.source) {
                var from = node.source.input.from;
                if (from && !already[from]) {
                    already[from] = true;
                    var relative = _this2.relative(from);
                    _this2.map.setSourceContent(relative, node.source.input.css);
                }
            }
        });
    };

    MapGenerator.prototype.applyPrevMaps = function applyPrevMaps() {
        for (var _iterator = this.previous(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var prev = _ref;

            var from = this.relative(prev.file);
            var root = prev.root || _path2.default.dirname(prev.file);
            var map = void 0;

            if (this.mapOpts.sourcesContent === false) {
                map = new _sourceMap2.default.SourceMapConsumer(prev.text);
                if (map.sourcesContent) {
                    map.sourcesContent = map.sourcesContent.map(function () {
                        return null;
                    });
                }
            } else {
                map = prev.consumer();
            }

            this.map.applySourceMap(map, from, this.relative(root));
        }
    };

    MapGenerator.prototype.isAnnotation = function isAnnotation() {
        if (this.isInline()) {
            return true;
        } else if (typeof this.mapOpts.annotation !== 'undefined') {
            return this.mapOpts.annotation;
        } else if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.annotation;
            });
        } else {
            return true;
        }
    };

    MapGenerator.prototype.addAnnotation = function addAnnotation() {
        var content = void 0;

        if (this.isInline()) {
            content = 'data:application/json;base64,' + _jsBase.Base64.encode(this.map.toString());
        } else if (typeof this.mapOpts.annotation === 'string') {
            content = this.mapOpts.annotation;
        } else {
            content = this.outputFile() + '.map';
        }

        var eol = '\n';
        if (this.css.indexOf('\r\n') !== -1) eol = '\r\n';

        this.css += eol + '/*# sourceMappingURL=' + content + ' */';
    };

    MapGenerator.prototype.outputFile = function outputFile() {
        if (this.opts.to) {
            return this.relative(this.opts.to);
        } else if (this.opts.from) {
            return this.relative(this.opts.from);
        } else {
            return 'to.css';
        }
    };

    MapGenerator.prototype.generateMap = function generateMap() {
        this.generateString();
        if (this.isSourcesContent()) this.setSourcesContent();
        if (this.previous().length > 0) this.applyPrevMaps();
        if (this.isAnnotation()) this.addAnnotation();

        if (this.isInline()) {
            return [this.css];
        } else {
            return [this.css, this.map];
        }
    };

    MapGenerator.prototype.relative = function relative(file) {
        if (file.indexOf('<') === 0) return file;
        if (/^\w+:\/\//.test(file)) return file;

        var from = this.opts.to ? _path2.default.dirname(this.opts.to) : '.';

        if (typeof this.mapOpts.annotation === 'string') {
            from = _path2.default.dirname(_path2.default.resolve(from, this.mapOpts.annotation));
        }

        file = _path2.default.relative(from, file);
        if (_path2.default.sep === '\\') {
            return file.replace(/\\/g, '/');
        } else {
            return file;
        }
    };

    MapGenerator.prototype.sourcePath = function sourcePath(node) {
        if (this.mapOpts.from) {
            return this.mapOpts.from;
        } else {
            return this.relative(node.source.input.from);
        }
    };

    MapGenerator.prototype.generateString = function generateString() {
        var _this3 = this;

        this.css = '';
        this.map = new _sourceMap2.default.SourceMapGenerator({ file: this.outputFile() });

        var line = 1;
        var column = 1;

        var lines = void 0,
            last = void 0;
        this.stringify(this.root, function (str, node, type) {
            _this3.css += str;

            if (node && type !== 'end') {
                if (node.source && node.source.start) {
                    _this3.map.addMapping({
                        source: _this3.sourcePath(node),
                        generated: { line: line, column: column - 1 },
                        original: {
                            line: node.source.start.line,
                            column: node.source.start.column - 1
                        }
                    });
                } else {
                    _this3.map.addMapping({
                        source: '<no source>',
                        original: { line: 1, column: 0 },
                        generated: { line: line, column: column - 1 }
                    });
                }
            }

            lines = str.match(/\n/g);
            if (lines) {
                line += lines.length;
                last = str.lastIndexOf('\n');
                column = str.length - last;
            } else {
                column += str.length;
            }

            if (node && type !== 'start') {
                if (node.source && node.source.end) {
                    _this3.map.addMapping({
                        source: _this3.sourcePath(node),
                        generated: { line: line, column: column - 1 },
                        original: {
                            line: node.source.end.line,
                            column: node.source.end.column
                        }
                    });
                } else {
                    _this3.map.addMapping({
                        source: '<no source>',
                        original: { line: 1, column: 0 },
                        generated: { line: line, column: column - 1 }
                    });
                }
            }
        });
    };

    MapGenerator.prototype.generate = function generate() {
        this.clearAnnotation();

        if (this.isMap()) {
            return this.generateMap();
        } else {
            var result = '';
            this.stringify(this.root, function (i) {
                result += i;
            });
            return [result];
        }
    };

    return MapGenerator;
}();

exports.default = MapGenerator;
module.exports = exports['default'];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _declaration = __webpack_require__(10);

var _declaration2 = _interopRequireDefault(_declaration);

var _tokenize = __webpack_require__(25);

var _tokenize2 = _interopRequireDefault(_tokenize);

var _comment = __webpack_require__(8);

var _comment2 = _interopRequireDefault(_comment);

var _atRule = __webpack_require__(3);

var _atRule2 = _interopRequireDefault(_atRule);

var _root = __webpack_require__(13);

var _root2 = _interopRequireDefault(_root);

var _rule = __webpack_require__(4);

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parser = function () {
    function Parser(input) {
        _classCallCheck(this, Parser);

        this.input = input;

        this.pos = 0;
        this.root = new _root2.default();
        this.current = this.root;
        this.spaces = '';
        this.semicolon = false;

        this.root.source = { input: input, start: { line: 1, column: 1 } };
    }

    Parser.prototype.tokenize = function tokenize() {
        this.tokens = (0, _tokenize2.default)(this.input);
    };

    Parser.prototype.loop = function loop() {
        var token = void 0;
        while (this.pos < this.tokens.length) {
            token = this.tokens[this.pos];

            switch (token[0]) {

                case 'space':
                case ';':
                    this.spaces += token[1];
                    break;

                case '}':
                    this.end(token);
                    break;

                case 'comment':
                    this.comment(token);
                    break;

                case 'at-word':
                    this.atrule(token);
                    break;

                case '{':
                    this.emptyRule(token);
                    break;

                default:
                    this.other();
                    break;
            }

            this.pos += 1;
        }
        this.endFile();
    };

    Parser.prototype.comment = function comment(token) {
        var node = new _comment2.default();
        this.init(node, token[2], token[3]);
        node.source.end = { line: token[4], column: token[5] };

        var text = token[1].slice(2, -2);
        if (/^\s*$/.test(text)) {
            node.text = '';
            node.raws.left = text;
            node.raws.right = '';
        } else {
            var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
            node.text = match[2];
            node.raws.left = match[1];
            node.raws.right = match[3];
        }
    };

    Parser.prototype.emptyRule = function emptyRule(token) {
        var node = new _rule2.default();
        this.init(node, token[2], token[3]);
        node.selector = '';
        node.raws.between = '';
        this.current = node;
    };

    Parser.prototype.other = function other() {
        var token = void 0;
        var end = false;
        var type = null;
        var colon = false;
        var bracket = null;
        var brackets = [];

        var start = this.pos;
        while (this.pos < this.tokens.length) {
            token = this.tokens[this.pos];
            type = token[0];

            if (type === '(' || type === '[') {
                if (!bracket) bracket = token;
                brackets.push(type === '(' ? ')' : ']');
            } else if (brackets.length === 0) {
                if (type === ';') {
                    if (colon) {
                        this.decl(this.tokens.slice(start, this.pos + 1));
                        return;
                    } else {
                        break;
                    }
                } else if (type === '{') {
                    this.rule(this.tokens.slice(start, this.pos + 1));
                    return;
                } else if (type === '}') {
                    this.pos -= 1;
                    end = true;
                    break;
                } else if (type === ':') {
                    colon = true;
                }
            } else if (type === brackets[brackets.length - 1]) {
                brackets.pop();
                if (brackets.length === 0) bracket = null;
            }

            this.pos += 1;
        }
        if (this.pos === this.tokens.length) {
            this.pos -= 1;
            end = true;
        }

        if (brackets.length > 0) this.unclosedBracket(bracket);

        if (end && colon) {
            while (this.pos > start) {
                token = this.tokens[this.pos][0];
                if (token !== 'space' && token !== 'comment') break;
                this.pos -= 1;
            }
            this.decl(this.tokens.slice(start, this.pos + 1));
            return;
        }

        this.unknownWord(start);
    };

    Parser.prototype.rule = function rule(tokens) {
        tokens.pop();

        var node = new _rule2.default();
        this.init(node, tokens[0][2], tokens[0][3]);

        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, 'selector', tokens);
        this.current = node;
    };

    Parser.prototype.decl = function decl(tokens) {
        var node = new _declaration2.default();
        this.init(node);

        var last = tokens[tokens.length - 1];
        if (last[0] === ';') {
            this.semicolon = true;
            tokens.pop();
        }
        if (last[4]) {
            node.source.end = { line: last[4], column: last[5] };
        } else {
            node.source.end = { line: last[2], column: last[3] };
        }

        while (tokens[0][0] !== 'word') {
            node.raws.before += tokens.shift()[1];
        }
        node.source.start = { line: tokens[0][2], column: tokens[0][3] };

        node.prop = '';
        while (tokens.length) {
            var type = tokens[0][0];
            if (type === ':' || type === 'space' || type === 'comment') {
                break;
            }
            node.prop += tokens.shift()[1];
        }

        node.raws.between = '';

        var token = void 0;
        while (tokens.length) {
            token = tokens.shift();

            if (token[0] === ':') {
                node.raws.between += token[1];
                break;
            } else {
                node.raws.between += token[1];
            }
        }

        if (node.prop[0] === '_' || node.prop[0] === '*') {
            node.raws.before += node.prop[0];
            node.prop = node.prop.slice(1);
        }
        node.raws.between += this.spacesAndCommentsFromStart(tokens);
        this.precheckMissedSemicolon(tokens);

        for (var i = tokens.length - 1; i > 0; i--) {
            token = tokens[i];
            if (token[1] === '!important') {
                node.important = true;
                var string = this.stringFrom(tokens, i);
                string = this.spacesFromEnd(tokens) + string;
                if (string !== ' !important') node.raws.important = string;
                break;
            } else if (token[1] === 'important') {
                var cache = tokens.slice(0);
                var str = '';
                for (var j = i; j > 0; j--) {
                    var _type = cache[j][0];
                    if (str.trim().indexOf('!') === 0 && _type !== 'space') {
                        break;
                    }
                    str = cache.pop()[1] + str;
                }
                if (str.trim().indexOf('!') === 0) {
                    node.important = true;
                    node.raws.important = str;
                    tokens = cache;
                }
            }

            if (token[0] !== 'space' && token[0] !== 'comment') {
                break;
            }
        }

        this.raw(node, 'value', tokens);

        if (node.value.indexOf(':') !== -1) this.checkMissedSemicolon(tokens);
    };

    Parser.prototype.atrule = function atrule(token) {
        var node = new _atRule2.default();
        node.name = token[1].slice(1);
        if (node.name === '') {
            this.unnamedAtrule(node, token);
        }
        this.init(node, token[2], token[3]);

        var last = false;
        var open = false;
        var params = [];

        this.pos += 1;
        while (this.pos < this.tokens.length) {
            token = this.tokens[this.pos];

            if (token[0] === ';') {
                node.source.end = { line: token[2], column: token[3] };
                this.semicolon = true;
                break;
            } else if (token[0] === '{') {
                open = true;
                break;
            } else if (token[0] === '}') {
                this.end(token);
                break;
            } else {
                params.push(token);
            }

            this.pos += 1;
        }
        if (this.pos === this.tokens.length) {
            last = true;
        }

        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
            node.raws.afterName = this.spacesAndCommentsFromStart(params);
            this.raw(node, 'params', params);
            if (last) {
                token = params[params.length - 1];
                node.source.end = { line: token[4], column: token[5] };
                this.spaces = node.raws.between;
                node.raws.between = '';
            }
        } else {
            node.raws.afterName = '';
            node.params = '';
        }

        if (open) {
            node.nodes = [];
            this.current = node;
        }
    };

    Parser.prototype.end = function end(token) {
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;

        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
        this.spaces = '';

        if (this.current.parent) {
            this.current.source.end = { line: token[2], column: token[3] };
            this.current = this.current.parent;
        } else {
            this.unexpectedClose(token);
        }
    };

    Parser.prototype.endFile = function endFile() {
        if (this.current.parent) this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
    };

    // Helpers

    Parser.prototype.init = function init(node, line, column) {
        this.current.push(node);

        node.source = { start: { line: line, column: column }, input: this.input };
        node.raws.before = this.spaces;
        this.spaces = '';
        if (node.type !== 'comment') this.semicolon = false;
    };

    Parser.prototype.raw = function raw(node, prop, tokens) {
        var token = void 0,
            type = void 0;
        var length = tokens.length;
        var value = '';
        var clean = true;
        for (var i = 0; i < length; i += 1) {
            token = tokens[i];
            type = token[0];
            if (type === 'comment' || type === 'space' && i === length - 1) {
                clean = false;
            } else {
                value += token[1];
            }
        }
        if (!clean) {
            var raw = tokens.reduce(function (all, i) {
                return all + i[1];
            }, '');
            node.raws[prop] = { value: value, raw: raw };
        }
        node[prop] = value;
    };

    Parser.prototype.spacesAndCommentsFromEnd = function spacesAndCommentsFromEnd(tokens) {
        var lastTokenType = void 0;
        var spaces = '';
        while (tokens.length) {
            lastTokenType = tokens[tokens.length - 1][0];
            if (lastTokenType !== 'space' && lastTokenType !== 'comment') break;
            spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
    };

    Parser.prototype.spacesAndCommentsFromStart = function spacesAndCommentsFromStart(tokens) {
        var next = void 0;
        var spaces = '';
        while (tokens.length) {
            next = tokens[0][0];
            if (next !== 'space' && next !== 'comment') break;
            spaces += tokens.shift()[1];
        }
        return spaces;
    };

    Parser.prototype.spacesFromEnd = function spacesFromEnd(tokens) {
        var lastTokenType = void 0;
        var spaces = '';
        while (tokens.length) {
            lastTokenType = tokens[tokens.length - 1][0];
            if (lastTokenType !== 'space') break;
            spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
    };

    Parser.prototype.stringFrom = function stringFrom(tokens, from) {
        var result = '';
        for (var i = from; i < tokens.length; i++) {
            result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
    };

    Parser.prototype.colon = function colon(tokens) {
        var brackets = 0;
        var token = void 0,
            type = void 0,
            prev = void 0;
        for (var i = 0; i < tokens.length; i++) {
            token = tokens[i];
            type = token[0];

            if (type === '(') {
                brackets += 1;
            } else if (type === ')') {
                brackets -= 1;
            } else if (brackets === 0 && type === ':') {
                if (!prev) {
                    this.doubleColon(token);
                } else if (prev[0] === 'word' && prev[1] === 'progid') {
                    continue;
                } else {
                    return i;
                }
            }

            prev = token;
        }
        return false;
    };

    // Errors

    Parser.prototype.unclosedBracket = function unclosedBracket(bracket) {
        throw this.input.error('Unclosed bracket', bracket[2], bracket[3]);
    };

    Parser.prototype.unknownWord = function unknownWord(start) {
        var token = this.tokens[start];
        throw this.input.error('Unknown word', token[2], token[3]);
    };

    Parser.prototype.unexpectedClose = function unexpectedClose(token) {
        throw this.input.error('Unexpected }', token[2], token[3]);
    };

    Parser.prototype.unclosedBlock = function unclosedBlock() {
        var pos = this.current.source.start;
        throw this.input.error('Unclosed block', pos.line, pos.column);
    };

    Parser.prototype.doubleColon = function doubleColon(token) {
        throw this.input.error('Double colon', token[2], token[3]);
    };

    Parser.prototype.unnamedAtrule = function unnamedAtrule(node, token) {
        throw this.input.error('At-rule without name', token[2], token[3]);
    };

    Parser.prototype.precheckMissedSemicolon = function precheckMissedSemicolon(tokens) {
        // Hook for Safe Parser
        tokens;
    };

    Parser.prototype.checkMissedSemicolon = function checkMissedSemicolon(tokens) {
        var colon = this.colon(tokens);
        if (colon === false) return;

        var founded = 0;
        var token = void 0;
        for (var j = colon - 1; j >= 0; j--) {
            token = tokens[j];
            if (token[0] !== 'space') {
                founded += 1;
                if (founded === 2) break;
            }
        }
        throw this.input.error('Missed semicolon', token[2], token[3]);
    };

    return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _jsBase = __webpack_require__(30);

var _sourceMap = __webpack_require__(29);

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(78);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * Source map information from input CSS.
 * For example, source map after Sass compiler.
 *
 * This class will automatically find source map in input CSS or in file system
 * near input file (according `from` option).
 *
 * @example
 * const root = postcss.parse(css, { from: 'a.sass.css' });
 * root.input.map //=> PreviousMap
 */
var PreviousMap = function () {

    /**
     * @param {string}         css    - input CSS source
     * @param {processOptions} [opts] - {@link Processor#process} options
     */
    function PreviousMap(css, opts) {
        _classCallCheck(this, PreviousMap);

        this.loadAnnotation(css);
        /**
         * @member {boolean} - Was source map inlined by data-uri to input CSS.
         */
        this.inline = this.startWith(this.annotation, 'data:');

        var prev = opts.map ? opts.map.prev : undefined;
        var text = this.loadMap(opts.from, prev);
        if (text) this.text = text;
    }

    /**
     * Create a instance of `SourceMapGenerator` class
     * from the `source-map` library to work with source map information.
     *
     * It is lazy method, so it will create object only on first call
     * and then it will use cache.
     *
     * @return {SourceMapGenerator} object with source map information
     */

    PreviousMap.prototype.consumer = function consumer() {
        if (!this.consumerCache) {
            this.consumerCache = new _sourceMap2.default.SourceMapConsumer(this.text);
        }
        return this.consumerCache;
    };

    /**
     * Does source map contains `sourcesContent` with input source text.
     *
     * @return {boolean} Is `sourcesContent` present
     */

    PreviousMap.prototype.withContent = function withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    };

    PreviousMap.prototype.startWith = function startWith(string, start) {
        if (!string) return false;
        return string.substr(0, start.length) === start;
    };

    PreviousMap.prototype.loadAnnotation = function loadAnnotation(css) {
        var match = css.match(/\/\*\s*# sourceMappingURL=(.*)\s*\*\//);
        if (match) this.annotation = match[1].trim();
    };

    PreviousMap.prototype.decodeInline = function decodeInline(text) {
        var utfd64 = 'data:application/json;charset=utf-8;base64,';
        var utf64 = 'data:application/json;charset=utf8;base64,';
        var b64 = 'data:application/json;base64,';
        var uri = 'data:application/json,';

        if (this.startWith(text, uri)) {
            return decodeURIComponent(text.substr(uri.length));
        } else if (this.startWith(text, b64)) {
            return _jsBase.Base64.decode(text.substr(b64.length));
        } else if (this.startWith(text, utf64)) {
            return _jsBase.Base64.decode(text.substr(utf64.length));
        } else if (this.startWith(text, utfd64)) {
            return _jsBase.Base64.decode(text.substr(utfd64.length));
        } else {
            var encoding = text.match(/data:application\/json;([^,]+),/)[1];
            throw new Error('Unsupported source map encoding ' + encoding);
        }
    };

    PreviousMap.prototype.loadMap = function loadMap(file, prev) {
        if (prev === false) return false;

        if (prev) {
            if (typeof prev === 'string') {
                return prev;
            } else if (typeof prev === 'function') {
                var prevPath = prev(file);
                if (prevPath && _fs2.default.existsSync && _fs2.default.existsSync(prevPath)) {
                    return _fs2.default.readFileSync(prevPath, 'utf-8').toString().trim();
                } else {
                    throw new Error('Unable to load previous source map: ' + prevPath.toString());
                }
            } else if (prev instanceof _sourceMap2.default.SourceMapConsumer) {
                return _sourceMap2.default.SourceMapGenerator.fromSourceMap(prev).toString();
            } else if (prev instanceof _sourceMap2.default.SourceMapGenerator) {
                return prev.toString();
            } else if (this.isMap(prev)) {
                return JSON.stringify(prev);
            } else {
                throw new Error('Unsupported previous source map format: ' + prev.toString());
            }
        } else if (this.inline) {
            return this.decodeInline(this.annotation);
        } else if (this.annotation) {
            var map = this.annotation;
            if (file) map = _path2.default.join(_path2.default.dirname(file), map);

            this.root = _path2.default.dirname(map);
            if (_fs2.default.existsSync && _fs2.default.existsSync(map)) {
                return _fs2.default.readFileSync(map, 'utf-8').toString().trim();
            } else {
                return false;
            }
        }
    };

    PreviousMap.prototype.isMap = function isMap(map) {
        if ((typeof map === 'undefined' ? 'undefined' : _typeof(map)) !== 'object') return false;
        return typeof map.mappings === 'string' || typeof map._mappings === 'string';
    };

    return PreviousMap;
}();

exports.default = PreviousMap;
module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _warning = __webpack_require__(63);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Provides the result of the PostCSS transformations.
 *
 * A Result instance is returned by {@link LazyResult#then}
 * or {@link Root#toResult} methods.
 *
 * @example
 * postcss([cssnext]).process(css).then(function (result) {
 *    console.log(result.css);
 * });
 *
 * @example
 * var result2 = postcss.parse(css).toResult();
 */
var Result = function () {

  /**
   * @param {Processor} processor - processor used for this transformation.
   * @param {Root}      root      - Root node after all transformations.
   * @param {processOptions} opts - options from the {@link Processor#process}
   *                                or {@link Root#toResult}
   */
  function Result(processor, root, opts) {
    _classCallCheck(this, Result);

    /**
     * @member {Processor} - The Processor instance used
     *                       for this transformation.
     *
     * @example
     * for ( let plugin of result.processor.plugins) {
     *   if ( plugin.postcssPlugin === 'postcss-bad' ) {
     *     throw 'postcss-good is incompatible with postcss-bad';
     *   }
     * });
     */
    this.processor = processor;
    /**
     * @member {Message[]} - Contains messages from plugins
     *                       (e.g., warnings or custom messages).
     *                       Each message should have type
     *                       and plugin properties.
     *
     * @example
     * postcss.plugin('postcss-min-browser', () => {
     *   return (root, result) => {
     *     var browsers = detectMinBrowsersByCanIUse(root);
     *     result.messages.push({
     *       type:    'min-browser',
     *       plugin:  'postcss-min-browser',
     *       browsers: browsers
     *     });
     *   };
     * });
     */
    this.messages = [];
    /**
     * @member {Root} - Root node after all transformations.
     *
     * @example
     * root.toResult().root == root;
     */
    this.root = root;
    /**
     * @member {processOptions} - Options from the {@link Processor#process}
     *                            or {@link Root#toResult} call
     *                            that produced this Result instance.
     *
     * @example
     * root.toResult(opts).opts == opts;
     */
    this.opts = opts;
    /**
     * @member {string} - A CSS string representing of {@link Result#root}.
     *
     * @example
     * postcss.parse('a{}').toResult().css //=> "a{}"
     */
    this.css = undefined;
    /**
     * @member {SourceMapGenerator} - An instance of `SourceMapGenerator`
     *                                class from the `source-map` library,
     *                                representing changes
     *                                to the {@link Result#root} instance.
     *
     * @example
     * result.map.toJSON() //=> { version: 3, file: 'a.css', … }
     *
     * @example
     * if ( result.map ) {
     *   fs.writeFileSync(result.opts.to + '.map', result.map.toString());
     * }
     */
    this.map = undefined;
  }

  /**
   * Returns for @{link Result#css} content.
   *
   * @example
   * result + '' === result.css
   *
   * @return {string} string representing of {@link Result#root}
   */

  Result.prototype.toString = function toString() {
    return this.css;
  };

  /**
   * Creates an instance of {@link Warning} and adds it
   * to {@link Result#messages}.
   *
   * @param {string} text        - warning message
   * @param {Object} [opts]      - warning options
   * @param {Node}   opts.node   - CSS node that caused the warning
   * @param {string} opts.word   - word in CSS source that caused the warning
   * @param {number} opts.index  - index in CSS node string that caused
   *                               the warning
   * @param {string} opts.plugin - name of the plugin that created
   *                               this warning. {@link Result#warn} fills
   *                               this property automatically.
   *
   * @return {Warning} created warning
   */

  Result.prototype.warn = function warn(text) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin;
      }
    }

    var warning = new _warning2.default(text, opts);
    this.messages.push(warning);

    return warning;
  };

  /**
   * Returns warnings from plugins. Filters {@link Warning} instances
   * from {@link Result#messages}.
   *
   * @example
   * result.warnings().forEach(warn => {
   *   console.warn(warn.toString());
   * });
   *
   * @return {Warning[]} warnings from plugins
   */

  Result.prototype.warnings = function warnings() {
    return this.messages.filter(function (i) {
      return i.type === 'warning';
    });
  };

  /**
   * An alias for the {@link Result#css} property.
   * Use it with syntaxes that generate non-CSS output.
   * @type {string}
   *
   * @example
   * result.css === result.content;
   */

  _createClass(Result, [{
    key: 'content',
    get: function get() {
      return this.css;
    }
  }]);

  return Result;
}();

exports.default = Result;

/**
 * @typedef  {object} Message
 * @property {string} type   - message type
 * @property {string} plugin - source PostCSS plugin name
 */

module.exports = exports['default'];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _chalk = __webpack_require__(18);

var _chalk2 = _interopRequireDefault(_chalk);

var _tokenize = __webpack_require__(25);

var _tokenize2 = _interopRequireDefault(_tokenize);

var _input = __webpack_require__(20);

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var colors = new _chalk2.default.constructor({ enabled: true });

var HIGHLIGHT_THEME = {
    'brackets': colors.cyan,
    'at-word': colors.cyan,
    'call': colors.cyan,
    'comment': colors.gray,
    'string': colors.green,
    'class': colors.yellow,
    'hash': colors.magenta,
    '(': colors.cyan,
    ')': colors.cyan,
    '{': colors.yellow,
    '}': colors.yellow,
    '[': colors.yellow,
    ']': colors.yellow,
    ':': colors.yellow,
    ';': colors.yellow
};

function getTokenType(_ref, index, tokens) {
    var type = _ref[0],
        value = _ref[1];

    if (type === 'word') {
        if (value[0] === '.') {
            return 'class';
        }
        if (value[0] === '#') {
            return 'hash';
        }
    }

    var nextToken = tokens[index + 1];
    if (nextToken && (nextToken[0] === 'brackets' || nextToken[0] === '(')) {
        return 'call';
    }

    return type;
}

function terminalHighlight(css) {
    var tokens = (0, _tokenize2.default)(new _input2.default(css), { ignoreErrors: true });
    return tokens.map(function (token, index) {
        var color = HIGHLIGHT_THEME[getTokenType(token, index, tokens)];
        if (color) {
            return token[1].split(/\r?\n/).map(function (i) {
                return color(i);
            }).join('\n');
        } else {
            return token[1];
        }
    }).join('');
}

exports.default = terminalHighlight;
module.exports = exports['default'];

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Contains helpers for working with vendor prefixes.
 *
 * @example
 * const vendor = postcss.vendor;
 *
 * @namespace vendor
 */
var vendor = {

    /**
     * Returns the vendor prefix extracted from an input string.
     *
     * @param {string} prop - string with or without vendor prefix
     *
     * @return {string} vendor prefix or empty string
     *
     * @example
     * postcss.vendor.prefix('-moz-tab-size') //=> '-moz-'
     * postcss.vendor.prefix('tab-size')      //=> ''
     */
    prefix: function prefix(prop) {
        var match = prop.match(/^(-\w+-)/);
        if (match) {
            return match[0];
        } else {
            return '';
        }
    },

    /**
     * Returns the input string stripped of its vendor prefix.
     *
     * @param {string} prop - string with or without vendor prefix
     *
     * @return {string} string name without vendor prefixes
     *
     * @example
     * postcss.vendor.unprefixed('-moz-tab-size') //=> 'tab-size'
     */
    unprefixed: function unprefixed(prop) {
        return prop.replace(/^-\w+-/, '');
    }
};

exports.default = vendor;
module.exports = exports['default'];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Represents a plugin’s warning. It can be created using {@link Node#warn}.
 *
 * @example
 * if ( decl.important ) {
 *     decl.warn(result, 'Avoid !important', { word: '!important' });
 * }
 */
var Warning = function () {

  /**
   * @param {string} text        - warning message
   * @param {Object} [opts]      - warning options
   * @param {Node}   opts.node   - CSS node that caused the warning
   * @param {string} opts.word   - word in CSS source that caused the warning
   * @param {number} opts.index  - index in CSS node string that caused
   *                               the warning
   * @param {string} opts.plugin - name of the plugin that created
   *                               this warning. {@link Result#warn} fills
   *                               this property automatically.
   */
  function Warning(text) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Warning);

    /**
     * @member {string} - Type to filter warnings from
     *                    {@link Result#messages}. Always equal
     *                    to `"warning"`.
     *
     * @example
     * const nonWarning = result.messages.filter(i => i.type !== 'warning')
     */
    this.type = 'warning';
    /**
     * @member {string} - The warning message.
     *
     * @example
     * warning.text //=> 'Try to avoid !important'
     */
    this.text = text;

    if (opts.node && opts.node.source) {
      var pos = opts.node.positionBy(opts);
      /**
       * @member {number} - Line in the input file
       *                    with this warning’s source
       *
       * @example
       * warning.line //=> 5
       */
      this.line = pos.line;
      /**
       * @member {number} - Column in the input file
       *                    with this warning’s source.
       *
       * @example
       * warning.column //=> 6
       */
      this.column = pos.column;
    }

    for (var opt in opts) {
      this[opt] = opts[opt];
    }
  }

  /**
   * Returns a warning position and message.
   *
   * @example
   * warning.toString() //=> 'postcss-lint:a.css:10:14: Avoid !important'
   *
   * @return {string} warning position and message
   */

  Warning.prototype.toString = function toString() {
    if (this.node) {
      return this.node.error(this.text, {
        plugin: this.plugin,
        index: this.index,
        word: this.word
      }).message;
    } else if (this.plugin) {
      return this.plugin + ': ' + this.text;
    } else {
      return this.text;
    }
  };

  /**
   * @memberof Warning#
   * @member {string} plugin - The name of the plugin that created
   *                           it will fill this property automatically.
   *                           this warning. When you call {@link Node#warn}
   *
   * @example
   * warning.plugin //=> 'postcss-important'
   */

  /**
   * @memberof Warning#
   * @member {Node} node - Contains the CSS node that caused the warning.
   *
   * @example
   * warning.node.toString() //=> 'color: white !important'
   */

  return Warning;
}();

exports.default = Warning;
module.exports = exports['default'];

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 */
var balanced = __webpack_require__(17);
var reduceFunctionCall = __webpack_require__(65);
var mexp = __webpack_require__(37);

/**
 * Constantes
 */
var MAX_STACK = 100; // should be enough for a single calc()...
var NESTED_CALC_RE = /(\+|\-|\*|\\|[^a-z]|)(\s*)(\()/g;

/**
 * Global variables
 */
var stack;

/**
 * Expose reduceCSSCalc plugin
 *
 * @type {Function}
 */
module.exports = reduceCSSCalc;

/**
 * Reduce CSS calc() in a string, whenever it's possible
 *
 * @param {String} value css input
 */
function reduceCSSCalc(value, decimalPrecision) {
  stack = 0;
  decimalPrecision = Math.pow(10, decimalPrecision === undefined ? 5 : decimalPrecision);

  // Allow calc() on multiple lines
  value = value.replace(/\n+/g, " ");

  /**
   * Evaluates an expression
   *
   * @param {String} expression
   * @returns {String}
   */
  function evaluateExpression(expression, functionIdentifier, call) {
    if (stack++ > MAX_STACK) {
      stack = 0;
      throw new Error("Call stack overflow for " + call);
    }

    if (expression === "") {
      throw new Error(functionIdentifier + "(): '" + call + "' must contain a non-whitespace string");
    }

    expression = evaluateNestedExpression(expression, call);

    var units = getUnitsInExpression(expression);

    // If the expression contains multiple units or CSS variables,
    // then let the expression be (i.e. browser calc())
    if (units.length > 1 || expression.indexOf("var(") > -1) {
      return functionIdentifier + "(" + expression + ")";
    }

    var unit = units[0] || "";

    if (unit === "%") {
      // Convert percentages to numbers, to handle expressions like: 50% * 50% (will become: 25%):
      // console.log(expression)
      expression = expression.replace(/\b[0-9\.]+%/g, function (percent) {
        return parseFloat(percent.slice(0, -1)) * 0.01;
      });
    }

    // Remove units in expression:
    var toEvaluate = expression.replace(new RegExp(unit, "gi"), "");
    var result;

    try {
      result = mexp.eval(toEvaluate);
    } catch (e) {
      return functionIdentifier + "(" + expression + ")";
    }

    // Transform back to a percentage result:
    if (unit === "%") {
      result *= 100;
    }

    // adjust rounding shit
    // (0.1 * 0.2 === 0.020000000000000004)
    if (functionIdentifier.length || unit === "%") {
      result = Math.round(result * decimalPrecision) / decimalPrecision;
    }

    // Add unit
    result += unit;

    return result;
  }

  /**
   * Evaluates nested expressions
   *
   * @param {String} expression
   * @returns {String}
   */
  function evaluateNestedExpression(expression, call) {
    // Remove the calc part from nested expressions to ensure
    // better browser compatibility
    expression = expression.replace(/((?:\-[a-z]+\-)?calc)/g, "");
    var evaluatedPart = "";
    var nonEvaluatedPart = expression;
    var matches;
    while (matches = NESTED_CALC_RE.exec(nonEvaluatedPart)) {
      if (matches[0].index > 0) {
        evaluatedPart += nonEvaluatedPart.substring(0, matches[0].index);
      }

      var balancedExpr = balanced("(", ")", nonEvaluatedPart.substring([0].index));
      if (balancedExpr.body === "") {
        throw new Error("'" + expression + "' must contain a non-whitespace string");
      }

      var evaluated = evaluateExpression(balancedExpr.body, "", call);

      evaluatedPart += balancedExpr.pre + evaluated;
      nonEvaluatedPart = balancedExpr.post;
    }

    return evaluatedPart + nonEvaluatedPart;
  }

  return reduceFunctionCall(value, /((?:\-[a-z]+\-)?calc)\(/, evaluateExpression);
}

/**
 * Checks what units are used in an expression
 *
 * @param {String} expression
 * @returns {Array}
 */

function getUnitsInExpression(expression) {
  var uniqueUnits = [];
  var uniqueLowerCaseUnits = [];
  var unitRegEx = /[\.0-9]([%a-z]+)/gi;
  var matches = unitRegEx.exec(expression);

  while (matches) {
    if (!matches || !matches[1]) {
      continue;
    }

    if (uniqueLowerCaseUnits.indexOf(matches[1].toLowerCase()) === -1) {
      uniqueUnits.push(matches[1]);
      uniqueLowerCaseUnits.push(matches[1].toLowerCase());
    }

    matches = unitRegEx.exec(expression);
  }

  return uniqueUnits;
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies
 */
var balanced = __webpack_require__(17);

/**
 * Expose `reduceFunctionCall`
 *
 * @type {Function}
 */
module.exports = reduceFunctionCall;

/**
 * Walkthrough all expressions, evaluate them and insert them into the declaration
 *
 * @param {Array} expressions
 * @param {Object} declaration
 */

function reduceFunctionCall(string, functionRE, callback) {
  var call = string;
  return getFunctionCalls(string, functionRE).reduce(function (string, obj) {
    return string.replace(obj.functionIdentifier + "(" + obj.matches.body + ")", evalFunctionCall(obj.matches.body, obj.functionIdentifier, callback, call, functionRE));
  }, string);
}

/**
 * Parses expressions in a value
 *
 * @param {String} value
 * @returns {Array}
 * @api private
 */

function getFunctionCalls(call, functionRE) {
  var expressions = [];

  var fnRE = typeof functionRE === "string" ? new RegExp("\\b(" + functionRE + ")\\(") : functionRE;
  do {
    var searchMatch = fnRE.exec(call);
    if (!searchMatch) {
      return expressions;
    }
    if (searchMatch[1] === undefined) {
      throw new Error("Missing the first couple of parenthesis to get the function identifier in " + functionRE);
    }
    var fn = searchMatch[1];
    var startIndex = searchMatch.index;
    var matches = balanced("(", ")", call.substring(startIndex));

    if (!matches || matches.start !== searchMatch[0].length - 1) {
      throw new SyntaxError(fn + "(): missing closing ')' in the value '" + call + "'");
    }

    expressions.push({ matches: matches, functionIdentifier: fn });
    call = matches.post;
  } while (fnRE.test(call));

  return expressions;
}

/**
 * Evaluates an expression
 *
 * @param {String} expression
 * @returns {String}
 * @api private
 */

function evalFunctionCall(string, functionIdentifier, callback, call, functionRE) {
  // allow recursivity
  return callback(reduceFunctionCall(string, functionRE, callback), functionIdentifier, call);
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65; // 'A'
  var bigZ = 90; // 'Z'

  var littleA = 97; // 'a'
  var littleZ = 122; // 'z'

  var zero = 48; // '0'
  var nine = 57; // '9'

  var plus = 43; // '+'
  var slash = 47; // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return charCode - bigA;
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return charCode - littleA + littleOffset;
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return charCode - zero + numberOffset;
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  } else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  } else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(1);

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = { generatedLine: -1, generatedColumn: 0 };
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
  this._array.forEach(aCallback, aThisArg);
};

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + Math.random() * (high - low));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(1);
var binarySearch = __webpack_require__(67);
var ArraySet = __webpack_require__(26).ArraySet;
var base64VLQ = __webpack_require__(27);
var quickSort = __webpack_require__(69).quickSort;

function SourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap) : new BasicSourceMapConsumer(sourceMap);
}

SourceMapConsumer.fromSourceMap = function (aSourceMap) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  get: function get() {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  get: function get() {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
  var c = aStr.charAt(index);
  return c === ";" || c === ",";
};

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
  throw new Error("Subclasses must implement _parseMappings");
};

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
  var context = aContext || null;
  var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

  var mappings;
  switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
  }

  var sourceRoot = this.sourceRoot;
  mappings.map(function (mapping) {
    var source = mapping.source === null ? null : this._sources.at(mapping.source);
    if (source != null && sourceRoot != null) {
      source = util.join(sourceRoot, source);
    }
    return {
      source: source,
      generatedLine: mapping.generatedLine,
      generatedColumn: mapping.generatedColumn,
      originalLine: mapping.originalLine,
      originalColumn: mapping.originalColumn,
      name: mapping.name === null ? null : this._names.at(mapping.name)
    };
  }, this).forEach(aCallback, context);
};

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: Optional. the column number in the original source.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
  var line = util.getArg(aArgs, 'line');

  // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
  // returns the index of the closest mapping less than the needle. By
  // setting needle.originalColumn to 0, we thus find the last mapping for
  // the given line, provided such a mapping exists.
  var needle = {
    source: util.getArg(aArgs, 'source'),
    originalLine: line,
    originalColumn: util.getArg(aArgs, 'column', 0)
  };

  if (this.sourceRoot != null) {
    needle.source = util.relative(this.sourceRoot, needle.source);
  }
  if (!this._sources.has(needle.source)) {
    return [];
  }
  needle.source = this._sources.indexOf(needle.source);

  var mappings = [];

  var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
  if (index >= 0) {
    var mapping = this._originalMappings[index];

    if (aArgs.column === undefined) {
      var originalLine = mapping.originalLine;

      // Iterate until either we run out of mappings, or we run into
      // a mapping for a different line than the one we found. Since
      // mappings are sorted, this is guaranteed to find all mappings for
      // the line we found.
      while (mapping && mapping.originalLine === originalLine) {
        mappings.push({
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        });

        mapping = this._originalMappings[++index];
      }
    } else {
      var originalColumn = mapping.originalColumn;

      // Iterate until either we run out of mappings, or we run into
      // a mapping for a different line than the one we were searching for.
      // Since mappings are sorted, this is guaranteed to find all mappings for
      // the line we are searching for.
      while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
        mappings.push({
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        });

        mapping = this._originalMappings[++index];
      }
    }
  }

  return mappings;
};

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The only parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  sources = sources.map(String)
  // Some source maps produce relative source paths like "./foo.js" instead of
  // "foo.js".  Normalize these first so that future comparisons will succeed.
  // See bugzil.la/1090768.
  .map(util.normalize)
  // Always ensure that absolute sources are internally stored relative to
  // the source root, if the source root is absolute. Not doing this would
  // be particularly problematic when the source root is a prefix of the
  // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
  .map(function (source) {
    return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
  });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap) {
  var smc = Object.create(BasicSourceMapConsumer.prototype);

  var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
  var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
  smc.sourceRoot = aSourceMap._sourceRoot;
  smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
  smc.file = aSourceMap._file;

  // Because we are modifying the entries (by converting string sources and
  // names to indices into the sources and names ArraySets), we have to make
  // a copy of the entry or else bad things happen. Shared mutable state
  // strikes again! See github issue #191.

  var generatedMappings = aSourceMap._mappings.toArray().slice();
  var destGeneratedMappings = smc.__generatedMappings = [];
  var destOriginalMappings = smc.__originalMappings = [];

  for (var i = 0, length = generatedMappings.length; i < length; i++) {
    var srcMapping = generatedMappings[i];
    var destMapping = new Mapping();
    destMapping.generatedLine = srcMapping.generatedLine;
    destMapping.generatedColumn = srcMapping.generatedColumn;

    if (srcMapping.source) {
      destMapping.source = sources.indexOf(srcMapping.source);
      destMapping.originalLine = srcMapping.originalLine;
      destMapping.originalColumn = srcMapping.originalColumn;

      if (srcMapping.name) {
        destMapping.name = names.indexOf(srcMapping.name);
      }

      destOriginalMappings.push(destMapping);
    }

    destGeneratedMappings.push(destMapping);
  }

  quickSort(smc.__originalMappings, util.compareByOriginalPositions);

  return smc;
};

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function get() {
    return this._sources.toArray().map(function (s) {
      return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
    }, this);
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
  var generatedLine = 1;
  var previousGeneratedColumn = 0;
  var previousOriginalLine = 0;
  var previousOriginalColumn = 0;
  var previousSource = 0;
  var previousName = 0;
  var length = aStr.length;
  var index = 0;
  var cachedSegments = {};
  var temp = {};
  var originalMappings = [];
  var generatedMappings = [];
  var mapping, str, segment, end, value;

  while (index < length) {
    if (aStr.charAt(index) === ';') {
      generatedLine++;
      index++;
      previousGeneratedColumn = 0;
    } else if (aStr.charAt(index) === ',') {
      index++;
    } else {
      mapping = new Mapping();
      mapping.generatedLine = generatedLine;

      // Because each offset is encoded relative to the previous one,
      // many segments often have the same encoding. We can exploit this
      // fact by caching the parsed variable length fields of each segment,
      // allowing us to avoid a second parse if we encounter the same
      // segment again.
      for (end = index; end < length; end++) {
        if (this._charIsMappingSeparator(aStr, end)) {
          break;
        }
      }
      str = aStr.slice(index, end);

      segment = cachedSegments[str];
      if (segment) {
        index += str.length;
      } else {
        segment = [];
        while (index < end) {
          base64VLQ.decode(aStr, index, temp);
          value = temp.value;
          index = temp.rest;
          segment.push(value);
        }

        if (segment.length === 2) {
          throw new Error('Found a source, but no line and column');
        }

        if (segment.length === 3) {
          throw new Error('Found a source and line, but no column');
        }

        cachedSegments[str] = segment;
      }

      // Generated column.
      mapping.generatedColumn = previousGeneratedColumn + segment[0];
      previousGeneratedColumn = mapping.generatedColumn;

      if (segment.length > 1) {
        // Original source.
        mapping.source = previousSource + segment[1];
        previousSource += segment[1];

        // Original line.
        mapping.originalLine = previousOriginalLine + segment[2];
        previousOriginalLine = mapping.originalLine;
        // Lines are stored 0-based
        mapping.originalLine += 1;

        // Original column.
        mapping.originalColumn = previousOriginalColumn + segment[3];
        previousOriginalColumn = mapping.originalColumn;

        if (segment.length > 4) {
          // Original name.
          mapping.name = previousName + segment[4];
          previousName += segment[4];
        }
      }

      generatedMappings.push(mapping);
      if (typeof mapping.originalLine === 'number') {
        originalMappings.push(mapping);
      }
    }
  }

  quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
  this.__generatedMappings = generatedMappings;

  quickSort(originalMappings, util.compareByOriginalPositions);
  this.__originalMappings = originalMappings;
};

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
  // To return the position we are searching for, we must first find the
  // mapping for the given position and then return the opposite position it
  // points to. Because the mappings are sorted, we can use binary search to
  // find the best mapping.

  if (aNeedle[aLineName] <= 0) {
    throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
  }
  if (aNeedle[aColumnName] < 0) {
    throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
  }

  return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
};

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
  for (var index = 0; index < this._generatedMappings.length; ++index) {
    var mapping = this._generatedMappings[index];

    // Mappings do not contain a field for the last generated columnt. We
    // can come up with an optimistic estimate, however, by assuming that
    // mappings are contiguous (i.e. given two consecutive mappings, the
    // first mapping ends where the second one starts).
    if (index + 1 < this._generatedMappings.length) {
      var nextMapping = this._generatedMappings[index + 1];

      if (mapping.generatedLine === nextMapping.generatedLine) {
        mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
        continue;
      }
    }

    // The last mapping for each line spans the entire line.
    mapping.lastGeneratedColumn = Infinity;
  }
};

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
  var needle = {
    generatedLine: util.getArg(aArgs, 'line'),
    generatedColumn: util.getArg(aArgs, 'column')
  };

  var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));

  if (index >= 0) {
    var mapping = this._generatedMappings[index];

    if (mapping.generatedLine === needle.generatedLine) {
      var source = util.getArg(mapping, 'source', null);
      if (source !== null) {
        source = this._sources.at(source);
        if (this.sourceRoot != null) {
          source = util.join(this.sourceRoot, source);
        }
      }
      var name = util.getArg(mapping, 'name', null);
      if (name !== null) {
        name = this._names.at(name);
      }
      return {
        source: source,
        line: util.getArg(mapping, 'originalLine', null),
        column: util.getArg(mapping, 'originalColumn', null),
        name: name
      };
    }
  }

  return {
    source: null,
    line: null,
    column: null,
    name: null
  };
};

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
  if (!this.sourcesContent) {
    return false;
  }
  return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function (sc) {
    return sc == null;
  });
};

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
  if (!this.sourcesContent) {
    return null;
  }

  if (this.sourceRoot != null) {
    aSource = util.relative(this.sourceRoot, aSource);
  }

  if (this._sources.has(aSource)) {
    return this.sourcesContent[this._sources.indexOf(aSource)];
  }

  var url;
  if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
    // XXX: file:// URIs and absolute paths lead to unexpected behavior for
    // many users. We can help them out when they expect file:// URIs to
    // behave like it would if they were running a local HTTP server. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
    var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
    if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
      return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
    }

    if ((!url.path || url.path == "/") && this._sources.has("/" + aSource)) {
      return this.sourcesContent[this._sources.indexOf("/" + aSource)];
    }
  }

  // This function is used recursively from
  // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
  // don't want to throw if we can't find the source - we just want to
  // return null, so we provide a flag to exit gracefully.
  if (nullOnMissing) {
    return null;
  } else {
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }
};

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
  var source = util.getArg(aArgs, 'source');
  if (this.sourceRoot != null) {
    source = util.relative(this.sourceRoot, source);
  }
  if (!this._sources.has(source)) {
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }
  source = this._sources.indexOf(source);

  var needle = {
    source: source,
    originalLine: util.getArg(aArgs, 'line'),
    originalColumn: util.getArg(aArgs, 'column')
  };

  var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));

  if (index >= 0) {
    var mapping = this._originalMappings[index];

    if (mapping.source === needle.source) {
      return {
        line: util.getArg(mapping, 'generatedLine', null),
        column: util.getArg(mapping, 'generatedColumn', null),
        lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
      };
    }
  }

  return {
    line: null,
    column: null,
    lastColumn: null
  };
};

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The only parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'))
    };
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function get() {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
  var needle = {
    generatedLine: util.getArg(aArgs, 'line'),
    generatedColumn: util.getArg(aArgs, 'column')
  };

  // Find the section containing the generated position we're trying to map
  // to an original position.
  var sectionIndex = binarySearch.search(needle, this._sections, function (needle, section) {
    var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
    if (cmp) {
      return cmp;
    }

    return needle.generatedColumn - section.generatedOffset.generatedColumn;
  });
  var section = this._sections[sectionIndex];

  if (!section) {
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }

  return section.consumer.originalPositionFor({
    line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
    column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
    bias: aArgs.bias
  });
};

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
  return this._sections.every(function (s) {
    return s.consumer.hasContentsOfAllSources();
  });
};

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];

    var content = section.consumer.sourceContentFor(aSource, true);
    if (content) {
      return content;
    }
  }
  if (nullOnMissing) {
    return null;
  } else {
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }
};

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];

    // Only consider this section if the requested source is in the list of
    // sources of the consumer.
    if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
      continue;
    }
    var generatedPosition = section.consumer.generatedPositionFor(aArgs);
    if (generatedPosition) {
      var ret = {
        line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
        column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
      };
      return ret;
    }
  }

  return {
    line: null,
    column: null
  };
};

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
  this.__generatedMappings = [];
  this.__originalMappings = [];
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];
    var sectionMappings = section.consumer._generatedMappings;
    for (var j = 0; j < sectionMappings.length; j++) {
      var mapping = sectionMappings[j];

      var source = section.consumer._sources.at(mapping.source);
      if (section.consumer.sourceRoot !== null) {
        source = util.join(section.consumer.sourceRoot, source);
      }
      this._sources.add(source);
      source = this._sources.indexOf(source);

      var name = section.consumer._names.at(mapping.name);
      this._names.add(name);
      name = this._names.indexOf(name);

      // The mappings coming from the consumer for the section have
      // generated positions relative to the start of the section, so we
      // need to offset them to be relative to the start of the concatenated
      // generated file.
      var adjustedMapping = {
        source: source,
        generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
        generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: name
      };

      this.__generatedMappings.push(adjustedMapping);
      if (typeof adjustedMapping.originalLine === 'number') {
        this.__originalMappings.push(adjustedMapping);
      }
    }
  }

  quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
  quickSort(this.__originalMappings, util.compareByOriginalPositions);
};

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(28).SourceMapGenerator;
var util = __webpack_require__(1);

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
  // The SourceNode we want to fill with the generated code
  // and the SourceMap
  var node = new SourceNode();

  // All even indices of this array are one line of the generated code,
  // while all odd indices are the newlines between two adjacent lines
  // (since `REGEX_NEWLINE` captures its match).
  // Processed fragments are removed from this array, by calling `shiftNextLine`.
  var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
  var shiftNextLine = function shiftNextLine() {
    var lineContents = remainingLines.shift();
    // The last line of a file might not have a newline.
    var newLine = remainingLines.shift() || "";
    return lineContents + newLine;
  };

  // We need to remember the position of "remainingLines"
  var lastGeneratedLine = 1,
      lastGeneratedColumn = 0;

  // The generate SourceNodes we need a code range.
  // To extract it current and last mapping is used.
  // Here we store the last mapping.
  var lastMapping = null;

  aSourceMapConsumer.eachMapping(function (mapping) {
    if (lastMapping !== null) {
      // We add the code from "lastMapping" to "mapping":
      // First check if there is a new line in between.
      if (lastGeneratedLine < mapping.generatedLine) {
        // Associate first line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
        lastGeneratedLine++;
        lastGeneratedColumn = 0;
        // The remaining code is added without mapping
      } else {
        // There is no new line in between.
        // Associate the code between "lastGeneratedColumn" and
        // "mapping.generatedColumn" with "lastMapping"
        var nextLine = remainingLines[0];
        var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
        remainingLines[0] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
        addMappingWithCode(lastMapping, code);
        // No more remaining code, continue
        lastMapping = mapping;
        return;
      }
    }
    // We add the generated code until the first mapping
    // to the SourceNode without any mapping.
    // Each line is added as separate string.
    while (lastGeneratedLine < mapping.generatedLine) {
      node.add(shiftNextLine());
      lastGeneratedLine++;
    }
    if (lastGeneratedColumn < mapping.generatedColumn) {
      var nextLine = remainingLines[0];
      node.add(nextLine.substr(0, mapping.generatedColumn));
      remainingLines[0] = nextLine.substr(mapping.generatedColumn);
      lastGeneratedColumn = mapping.generatedColumn;
    }
    lastMapping = mapping;
  }, this);
  // We have processed all mappings.
  if (remainingLines.length > 0) {
    if (lastMapping) {
      // Associate the remaining code in the current line with "lastMapping"
      addMappingWithCode(lastMapping, shiftNextLine());
    }
    // and add the remaining lines without any mapping
    node.add(remainingLines.join(""));
  }

  // Copy sourcesContent into SourceNode
  aSourceMapConsumer.sources.forEach(function (sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    if (content != null) {
      if (aRelativePath != null) {
        sourceFile = util.join(aRelativePath, sourceFile);
      }
      node.setSourceContent(sourceFile, content);
    }
  });

  return node;

  function addMappingWithCode(mapping, code) {
    if (mapping === null || mapping.source === undefined) {
      node.add(code);
    } else {
      var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
      node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
    }
  }
};

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  } else {
    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length - 1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  } else {
    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    } else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
          line: this.line,
          column: this.column,
          name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len - 1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  } else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  } else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
  this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
};

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    if (this.children[i][isSourceNode]) {
      this.children[i].walkSourceContents(aFn);
    }
  }

  var sources = Object.keys(this.sourceContents);
  for (var i = 0, len = sources.length; i < len; i++) {
    aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
  }
};

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null && original.line !== null && original.column !== null) {
      if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ansiRegex = __webpack_require__(16)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = false;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return [];
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	isSupported: function isSupported() {
		return false;
	}
};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _postcss = __webpack_require__(5);

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssGridKiss = __webpack_require__(31);

var _postcssGridKiss2 = _interopRequireDefault(_postcssGridKiss);

var _presets = __webpack_require__(32);

var _presets2 = _interopRequireDefault(_presets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* global ace */


var processor = void 0;

var input = document.querySelector("#input"),
    output = document.querySelector("#output"),
    demo = document.querySelector("#demo"),
    html = document.querySelector("#html"),
    optionsInputs = [].concat(_toConsumableArray(document.querySelectorAll(".options input[type='checkbox']"))),
    presetSelector = document.querySelector("select.presets"),
    cssEditor = ace.edit(input),
    htmlEditor = ace.edit(html);

initEditor(cssEditor, "css");
initEditor(htmlEditor, "html");

cssEditor.on("input", update);
htmlEditor.on("input", update);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = optionsInputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var option = _step.value;

		option.addEventListener("change", function () {
			changeOptions();
			update();
		});
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

presetSelector.innerHTML = _presets2.default.map(function (preset, index) {
	return '<option value=' + index + '>' + preset.name + '</option>';
});
presetSelector.addEventListener("change", function () {
	selectPreset(_presets2.default[presetSelector.value]);
	update();
});

window.onload = function () {
	if (demo.contentDocument.readyState === 'complete') {
		init();
	} else {
		demo.onload = init;
	}
};

function init() {
	var presetByHash = _presets2.default.find(function (p) {
		return p.hash === window.location.hash.slice(1);
	});
	selectPreset(presetByHash || _presets2.default[0]);
	changeOptions();
	update();
	initGithubButtons();
}

function selectPreset(preset) {
	cssEditor.setValue(preset.css, -1);
	htmlEditor.setValue(preset.html, -1);
	window.location.hash = preset.hash;
	presetSelector.value = _presets2.default.indexOf(preset);
}

function changeOptions() {
	var options = {};
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = optionsInputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var checkbox = _step2.value;

			options[checkbox.parentElement.textContent.trim()] = checkbox.checked;
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	processor = (0, _postcss2.default)([(0, _postcssGridKiss2.default)(options)]);
}

function update() {
	demo.contentDocument.body.innerHTML = htmlEditor.getValue();
	processor.process(cssEditor.getValue()).then(function (result) {
		output.textContent = result.css;
		var warnings = result.warnings().map(function (w) {
			return '<p class=\'warning\'>' + w.toString() + '</p>';
		});
		if (warnings && warnings.length > 0) {
			output.innerHTML = '/*\n' + warnings.join('\n') + '*/\n\n' + output.innerHTML;
		}
		setTimeout(function () {
			demo.contentDocument.querySelector("#css_injected").textContent = output.textContent;
		}, 10);
	}).catch(function (error) {
		output.innerHTML = '<p class=\'error\'>' + error.stack + '</p>';
	});
}

function initEditor(editor, mode) {
	editor.setTheme("ace/theme/textmate");
	editor.getSession().setMode('ace/mode/' + mode);
	editor.getSession().setOption("useWorker", false); // disable syntax checking since it is not customizable
	editor.setShowPrintMargin(false);
	editor.setHighlightActiveLine(false);
	editor.setFontSize(16);
	editor.$blockScrolling = Infinity;
}

function initGithubButtons() {
	var script = document.createElement("script");
	script.src = "https://buttons.github.io/buttons.js";
	document.body.appendChild(script);
}

/***/ })
/******/ ]);