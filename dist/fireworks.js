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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/fireworks.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fireworks.js":
/*!**************************!*\
  !*** ./src/fireworks.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var canvas = document.getElementById('canvas'),\n\t\tctx = canvas.getContext('2d'),\n\t\tmaxWidth = window.innerWidth,\n\t\tmaxHeight = window.innerHeight\n\n\tcanvas.width = maxWidth\n\tcanvas.height = maxHeight\n\nvar rockets = []\n\tparticles = [],\n\tmaxParticles = 400\n\n\n\tfunction Particle (ctx, x, y, r, deg, v, accX, accY) {\n\t\tthis.ctx = ctx\n\t\tthis.startX = x\n\t\tthis.startY = y\n\t\tthis.x = x\n\t\tthis.y = y\n\t\tthis.r = r\n\t\tthis.angle = Math.PI / 180 * deg\n\t\tthis.v = v\n\t\tthis.vx = Math.cos(this.angle) * v\n\t\tthis.vy = Math.sin(this.angle) * v\n\t\tthis.accX = accX || 0\n\t\tthis.accY = accY || 9.8 / 20\n\t\tthis.alpha = 1\n\t\tthis.fade = 0.02\n\t\tthis.color = Math.floor(Math.random() * 360 / 10) * 10\n\t\tthis.end = false\n\t\tthis.history = []\n\t}\n\t\n\tParticle.prototype = {\n\t\tcalcVelocity () {\n\t\t\tthis.vx += this.accX\n\t\t\tthis.vy += this.accY\n\t\t},\n\t\tcalcPosition () {\n\t\t\tthis.x += this.vx\n\t\t\tthis.y += this.vy\n\t\t\tthis.alpha -= this.fade \n\t\t\t\n\t\t\tif (this.alpha < 0) {\n\t\t\t\tthis.end = true\n\t\t\t\tthis.alpha = 0\n\t\t\t}\n\n\t\t\tthis.history.push([this.x, this.y])\n\t\t\tif (this.history.length > 20) {\n\t\t\t\tthis.history.shift()\n\t\t\t}\n\t\t},\n\t\tupdate () {\n\t\t\tthis.calcVelocity()\n\t\t\tthis.calcPosition()\n\t\t},\n\t\tdraw () {\n\t\t\tconst ctx = this.ctx\n\t\n\t\t\t// ctx.fillStyle = 'green'\n\t\t\tctx.globalCompositeOperation = 'lighter'\n\t\t\tlet gradient = ctx.createRadialGradient(this.x, this.y, 0.1, this.x, this.y, this.r)\n\t\t\tgradient.addColorStop(0.1, `rgba(255, 255, 255 , ${ this.alpha })`)\n\t\t\tgradient.addColorStop(0.8, `hsla( ${this.color}, 100%, 50%, ${this.alpha})`)\n\t\t\tgradient.addColorStop(1, `rgba(0, 0, 0, ${ this.alpha })`)\n\t\t\tctx.beginPath()\n\t\t\tthis.history.forEach(pos => {\n\t\t\t\tif (Math.abs(pos[0] - this.x) > 5 || Math.abs(pos[1] -this.y) > 5) {\n\t\t\t\t\treturn\n\t\t\t\t} \n\t\t\t\tctx.arc(pos[0], pos[1], this.r, 0, Math.PI * 2, true)\n\t\t\t\tctx.fill()\n\t\t\t\tctx.closePath()\n\t\t\t})\n\t\t},\n\t\treset () {\n\t\t\tthis.x = this.startX\n\t\t\tthis.y = this.startY\n\t\t\tthis.vx = Math.cos(this.angle) * this.v\n\t\t\tthis.vy = Math.sin(this.angle) * this.v\n\t\t\tthis.end = false\n\t\t}\n\t}\n\n\nfunction Rocket (ctx, x, y, r, h, v, acc) {\n\tthis.ctx = ctx\n\tthis.startX = x\n\tthis.startY = y\n\tthis.startV = v\n\tthis.x = x\n\tthis.y = y\n\tthis.r = r\n\tthis.h = h || 500\n\tthis.v = v || -18\n\tthis.acc = acc || 9.8 / 20\n\n\tthis.end = false\n\tthis.history = []\n}\n\nRocket.prototype = {\n\tcalcVelocity () {\n\t\tthis.v += this.acc\n\t},\n\tcalcPosition () {\n\t\tthis.y += this.v\n\n\t\tthis.history.push([this.x, this.y])\n\t\tif (this.history.length > 25) {\n\t\t\tthis.history.shift()\n\t\t}\n\t},\n\tcheckHeight () {\n\t\tif (this.startY - this.y >= this.h || this.v >= 0) {\n\t\t\tthis.end = true\n\t\t\tthis.bomb()\n\t\t}\n\t},\n\tbomb () {\n\t\tlet x = this.x\n\t\tlet y = this.y\n\t\tlet r = 2\n\t\tlet v = -2\n\t\tlet accX = 0\n\t\tlet accY = 0.05\n\n\t\tlet count = Math.floor(Math.random() * 20) + 40\n\t\tfor (let i = 0; i < count; i++) {\n\t\t\tlet deg = Math.floor(Math.random() * 360)\n\t\t\tparticles.push(new Particle(ctx, x, y, r, deg, v, accX, accY))\n\t\t}\n\t},\n\tupdate () {\n\t\tthis.calcVelocity()\n\t\tthis.calcPosition()\n\t\tthis.checkHeight()\n\t},\n\tdraw () {\n\t\tconst ctx = this.ctx\n\n\t\tthis.history.forEach(pos => {\n\t\t\tctx.beginPath()\n\t\t\tctx.fillStyle = 'rgba(255, 255, 255, 0.4)'\n\t\t\tctx.arc(pos[0], pos[1], this.r, 0, Math.PI * 2, true)\n\t\t\tctx.fill()\n\t\t\tctx.closePath()\n\t\t})\n\n\t},\n\treset () {\n\t\tthis.x = this.startX\n\t\tthis.y = this.startY\n\t\tthis.v = startV\n\t\tthis.end = false\n\t}\n}\n\n\n\n;(function () {\n\tfor (var i = 0; i < 2; i++) {\n\t\tlet x = Math.random() * maxWidth\n\t\tlet y = maxHeight - 100\n\t\tlet r = 4\n\t\trockets.push(new Rocket(ctx, x, y, r))\n\t}\n})()\n\n\nfunction render () {\n\tctx.clearRect(0, 0, maxWidth, maxHeight)\n\trockets.forEach(rocket => {\n\t\tif (!rocket.end) {\n\t\t\trocket.update()\n\t\t\trocket.draw()\n\t\t}\n\t})\n\n\tparticles.forEach(particle => {\n\t\tif (!particle.end) {\n\t\t\tparticle.update()\n\t\t\tparticle.draw()\n\t\t}\n\t})\n\trequestAnimationFrame(render)\n}\nrender()\n\n//# sourceURL=webpack:///./src/fireworks.js?");

/***/ })

/******/ });