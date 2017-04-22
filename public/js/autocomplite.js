/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Autocomplite = Autocomplite;

	var _request = __webpack_require__(2);

	function Autocomplite(path) {
	  this.path = path;
	  var data;

	  this.getData = function (str) {
	    data = setData(this.path).then(parse);

	    return data.then(function (data) {
	      var reg = new RegExp("^" + str, "ig");

	      return data.filter(function (value) {
	        return value.City.search(reg) >= 0;
	      });
	    });
	  };

	  function setData(path) {
	    var req = new _request.Request();
	    return req.get(path).then(function (text) {
	      return text;
	    }, function (error) {
	      console.log("Fail to fetch data " + error);
	    });
	  };

	  function parse(text) {
	    return JSON.parse(text);
	  };
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Request = Request;
	function Request() {
	  this.get = function (path) {
	    return new Promise(function (succeed, fail) {
	      var xhr = new XMLHttpRequest();

	      xhr.open('GET', path, true);
	      xhr.addEventListener("load", function () {
	        if (xhr.status < 400) {
	          succeed(xhr.responseText);
	        } else {
	          fail(new Error("Request failed: " + xhr.statusText));
	        }
	      });

	      xhr.addEventListener("error", function () {
	        fail(new Error("Network error"));
	      });

	      xhr.send(null);
	    });
	  };
	}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsaXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDliYjkyYjQ3NWYyMjU5MzM1NGY4Iiwid2VicGFjazovLy9mcm9udGVuZC9qcy9hdXRvY29tcGxpdGUuanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2pzL3JlcXVlc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDliYjkyYjQ3NWYyMjU5MzM1NGY4IiwiaW1wb3J0IHtSZXF1ZXN0fSBmcm9tIFwiLi9yZXF1ZXN0LmpzXCJcblxuZXhwb3J0IGZ1bmN0aW9uIEF1dG9jb21wbGl0ZShwYXRoKSB7XG4gIHRoaXMucGF0aCA9IHBhdGg7XG4gIHZhciBkYXRhO1xuXG4gIHRoaXMuZ2V0RGF0YSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGRhdGEgPSBzZXREYXRhKHRoaXMucGF0aCkudGhlbihwYXJzZSk7XG5cbiAgICByZXR1cm4gZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiXlwiICsgc3RyLCBcImlnXCIpO1xuXG4gICAgICByZXR1cm4gZGF0YS5maWx0ZXIoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgIHJldHVybiB2YWx1ZS5DaXR5LnNlYXJjaChyZWcpID49IDA7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBzZXREYXRhKHBhdGgpIHtcbiAgICB2YXIgcmVxID0gbmV3IFJlcXVlc3QoKTtcbiAgICByZXR1cm4gcmVxLmdldChwYXRoKS50aGVuKGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkZhaWwgdG8gZmV0Y2ggZGF0YSBcIiArIGVycm9yKTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBwYXJzZSh0ZXh0KSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvanMvYXV0b2NvbXBsaXRlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIFJlcXVlc3QoKSB7XG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihzdWNjZWVkLCBmYWlsKSB7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHhoci5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICBzdWNjZWVkKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZhaWwobmV3IEVycm9yKFwiUmVxdWVzdCBmYWlsZWQ6IFwiICsgeGhyLnN0YXR1c1RleHQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZhaWwobmV3IEVycm9yKFwiTmV0d29yayBlcnJvclwiKSk7XG4gICAgICB9KTtcblxuICAgICAgeGhyLnNlbmQobnVsbClcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2pzL3JlcXVlc3QuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
