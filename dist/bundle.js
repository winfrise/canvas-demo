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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var canvas = document.getElementById('canvas'),\n    ctx = canvas.getContext('2d'),\n  max_width = window.innerWidth,\n  max_height = window.innerHeight,\n  spaceHeight = max_height,\n  spaceWidth = max_width,\n  acc = 9.81,\n  dt = 1,\n  balls = [],\n  ballIndex = 0,\n  bounce = 0.7,\n  surfaceResistance = 0.999\n\ncanvas.width = max_width\ncanvas.height = max_height\nctx.fillStyle = '#ccc'\n\nwindow.onresize = function () {\n  max_width = window.innerWidth\n  max_height = window.innerHeight\n  canvas.width = max_width\n  canvas.height = max_height\n}\n\nvar current = [],\n    end = [],\n    trigger = false\n\ndocument.onmousedown = function (e) {\n  trigger = true\n  end = [e.pageX, e.pageY]\n}\n\ndocument.onmousemove = function (e) {\n  current = [e.pageX, e.pageY]\n}\n\ndocument.onmouseup = function (e) {\n  if (trigger) {\n    new Ball(current, [(end[0] - current[0]) / 10, (end[1] - current[1]) / 10], [0, acc], 10, 20);\n    new Ball(current, [(end[0] - current[0]) / 10, (end[1] - current[1]) / 10], [0, acc], 10, 20) \n  }\n  trigger = false\n}\n\nfunction aimArrow(start, stop) {\n  console.log(trigger)\n  if (trigger) {\n    ctx.beginPath()\n    ctx.moveTo(start[0], start[1])\n    ctx.lineTo(stop[0], stop[1])\n    ctx.stroke()\n  }\n}\n\nfunction Ball(position, velocity, acceleration, mass, radius) {\n  this.prevPosition = position\n  this.position = position\n  this.velocity = velocity\n  this.acceleration = acceleration\n  this.mass  = mass\n  this.radius = radius\n\n  ballIndex++\n  balls[ballIndex] = this\n  this.Id = ballIndex\n\n  this.calcAcceleration = function () {\n    this.acceleration[1] = acc / 20\n  }\n\n  this.calcVelocity = function () {\n    this.velocity[0] += this.acceleration[0]\n    this.velocity[1] += this.acceleration[1]\n  }\n\n  this.calcPosition = function () {\n    this.position[0] += this.velocity[0]\n    this.position[1] += this.velocity[1]\n    this.prevPosition = this.position\n  }\n\n  this.checkWallColisions = function () {\n    if (this.position[1] >= spaceHeight - this.radius) {\n      this.position[1] = spaceHeight - this.radius\n      this.velocity[1] *= -bounce\n\n      if (this.velocity[1] > -0.1 && this.velocity[1] < 0.1) {\n        this.velocity[1] = 0\n\n        this.velocity[0] * surfaceResistance\n        if (Math.abs(this.velocity[0]) <= 0.1) {\n          this.velocity[0] = 0\n        }\n      }\n    } else if (this.position[1] <= this.radius) {\n      this.position[1] = this.radius\n      this.velocity[1] *= -bounce\n    }\n\n    if (this.position[0] <=0 + this.radius) {\n      this.position[0] = 0+ this.radius\n      this.velocity[0] *= -bounce\n    } else if (this.position[0] >= spaceWidth - this.radius) {\n      this.position[0] = spaceWidth - this.radius\n      this.velocity[0] *= -bounce\n    }\n  }\n\n  this.updatePosition = function () {\n    this.calcAcceleration()\n    this.checkWallColisions()\n    this.calcVelocity()\n    this.calcPosition()\n  }\n\n  this.draw = function () {\n    ctx.beginPath()\n    ctx.arc(this.position[0], this.position[1], this.radius, 0, Math.PI * 2, true)\n    ctx.fill()\n    ctx.closePath()\n  }\n}\n\nfunction Updater () {\n  ctx.clearRect(0, 0, max_width, max_height)\n  aimArrow(end, current)\n  for (var i in balls) {\n    balls[i].updatePosition()\n    balls[i].draw()\n  }\n  requestAnimationFrame(Updater)\n}\n\nUpdater()\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });