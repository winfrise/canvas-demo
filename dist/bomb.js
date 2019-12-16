/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bomb.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bomb.js":
/*!*********************!*\
  !*** ./src/bomb.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var canvas = document.getElementById('canvas'),\n      ctx = canvas.getContext('2d'),\n      maxWidth = window.innerWidth,\n      maxHeight = window.innerHeight\n\nvar pieces = []\n\ncanvas.width = maxWidth\ncanvas.height = maxHeight\n\nclass Piece {\n  constructor (ctx, x, y, r, v, accX, accY, deg, tailLength) {\n    this.ctx = ctx\n    this.startX  = x\n    this.startY = y\n    this.x = x  || 0\n    this.y = y  || 0\n    this.r = r || 2\n    this.v = v || 4\n    this.accX = accX\n    this.accY = accY\n    this.angle = Math.PI / 180 * deg\n    this.velocityY = Math.cos(this.angle) * v\n    this.velocityX = Math.sin(this.angle) * v\n    this.tailLength = tailLength  || 60\n    this.opacity = 1\n  }\n  \n  calcVelocity () {\n    this.velocityX += this.accX\n    this.velocityY += this.accY\n  }\n\n  calcPosition () {\n    this.x += this.velocityX\n    this.y -= this.velocityY\n    this.opacity -= 0.015\n  }\n\n  update () {\n    this.calcVelocity()\n    this.calcPosition()\n  }\n\n  draw () {\n    let { ctx, x, y, r, angle, startX, startY, history } = this\n    let tailLen  = this.tailLength // 尾巴长度\n    let dist = Math.sqrt((x - startX) * (x - startX) + (y - startY) * (y - startY))\n    if (dist < tailLen) {\n      tailLen = dist\n    }\n\n    ctx.beginPath()\n    ctx.fillStyle = `rgba(100, 0, 130, ${this.opacity})`\n    ctx.arc(x, y, r, angle, Math.PI + angle, true)\n    ctx.lineTo(x - Math.sin(angle) * tailLen, y + Math.cos(angle) * tailLen)\n    ctx.save()\n    ctx.closePath()\n    ctx.fill()\n  }\n}\n\n;(function () {\n  setInterval(function () {\n    pieces = []\n    initPieces()\n  }, 2000)\n  initPieces()\n\n  function initPieces () {\n    function createPieces (startDeg = 0) {\n      let x = 500,\n      y = 500,\n      r = 10,\n      v = 4,\n      accX = 0,\n      accY = 0\n      for (let i = 0; i < 12; i++) {\n        deg = 30 * i\n        pieces.push(new Piece(ctx, x, y, r, v, accX, accY, startDeg + deg)) // ctx, x, y, r, v, accX, accY, deg \n      }\n    }\n  \n    createPieces()\n  \n    setTimeout(function () {\n      createPieces(15)\n    }, 200)\n  \n    setTimeout(function () {\n      createPieces(0)\n    }, 500)\n  }\n\n\n\n})()\n\n\nfunction render () {\n  ctx.clearRect(0, 0, maxWidth, maxHeight)\n\n  pieces.forEach(piece => {\n    if (!piece.end) {\n      piece.update()\n      piece.draw()\n    }\n  })\n\n  window.requestAnimationFrame(render)\n}\nrender()\n\n//# sourceURL=webpack:///./src/bomb.js?");

/***/ })

/******/ });