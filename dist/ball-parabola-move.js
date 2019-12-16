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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ball-parabola-move.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball-parabola-move.js":
/*!***********************************!*\
  !*** ./src/ball-parabola-move.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var canvas = document.getElementById('canvas'),\n    ctx = canvas.getContext('2d'),\n    maxWidth = window.innerWidth,\n    maxHeight = window.innerHeight,\n    balls = [],\n    endBalls = []\n\n    canvas.width = maxWidth\n    canvas.height = maxHeight\n\n/**\n * 小球对象\n * @param {*} x -\b 小球 x 轴开始坐标\n * @param {*} y - 小球 y 轴开始坐标\n * @param {*} r - 小球半径\n * @param {*} color - 小球颜色\n * @param {*} deg - 小球运动的角度\n * @param {*} velocity  - 小球速度\n * @param {*} acceleration  - 加速度\n * @param {*} mass - 小球重量\n */\nfunction Ball (x, y, r, color, deg, velocity, mass, accelerationX, accelerationY) {\n  this.end = false\n  this.startX   = x\n  this.startY = y\n  this.x = x\n  this.y = y\n  this.r = r\n  this.color = color\n  this.angle = Math.PI / 180 * deg // 度数转为弧度\n  this.velocity = velocity\n  this.velocityX = Math.cos(this.angle) * velocity\n  this.velocityY = Math.sin(this.angle) * velocity\n  this.mass = mass || 10\n  this.accelerationX = accelerationX || 0\n  this.accelerationY = accelerationY || 9.8 / 20 // 默认为重力加速度(9.8)\n}\n\nBall.prototype = {\n  /**\n   * 计算速度\n   */\n  calcVelocity () {\n    this.velocityX += this.accelerationX\n    this.velocityY += this.accelerationY\n  },\n\n  /**\n   * 计算小球是否出界\n   */\n  checkWallColisions () {\n    if (this.x < 0 || this.x > maxWidth || this.y > maxHeight) {\n      this.end = true\n    }\n  },\n  /**\n   * 计算位置\n   */\n  calcPosition () {\n    this.x += this.velocityX\n    this.y += this.velocityY\n  },\n\n  update () {\n    this.calcVelocity()\n    this.calcPosition()\n    this.checkWallColisions()\n  },\n\n  draw () {\n    ctx.beginPath()\n    ctx.fillStyle = this.color\n    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)\n    ctx.fill()\n    ctx.closePath()\n  },\n\n  reset () {\n    this.x = this.startX\n    this.y = this.startY\n    this.velocityX = Math.cos(this.angle) * this.velocity\n    this.velocityY = Math.sin(this.angle) * this.velocity\n    this.end = false\n  }\n}\n\n/**\n * 创建小球\n */\n;(function () {\n  var x = 400,\n      y = 400,\n      r = 20,\n      angle \n  for (var i = 0; i < 20; i++) {\n    angle = Math.random() * 360\n    balls.push(new Ball(x, y, r, 'red', angle, 6))\n  }\n})()\n\nfunction render () {\n  ctx.clearRect(0, 0, maxWidth, maxHeight)\n\n  if (balls.length === 0) {\n    balls = endBalls.slice(0)\n    endBalls = []\n  }\n\n  balls.forEach((ball, index) => {\n    if (!ball.end) {\n      ball.update()\n      ball.draw()\n    } else {\n      let endBall = balls.splice(index, 1)[0]\n      endBall.reset()\n      endBalls.push(endBall) // 移除已结束的小球\n    }\n  })    \n\n  requestAnimationFrame(render)\n}\nrender()\n\n\n\n//# sourceURL=webpack:///./src/ball-parabola-move.js?");

/***/ })

/******/ });