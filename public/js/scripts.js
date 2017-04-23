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

	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _request = __webpack_require__(2);

	var _request2 = _interopRequireDefault(_request);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Autocomplite = function () {
	  function Autocomplite(path) {
	    _classCallCheck(this, Autocomplite);

	    this.path = path;
	    this.data = null;
	  }

	  _createClass(Autocomplite, [{
	    key: "getData",
	    value: function getData(str) {
	      this.data = this.setData(this.path).then(this.parse);

	      return this.data.then(function (data) {
	        var reg = new RegExp("^" + str, "ig");

	        return data.filter(function (value) {
	          return value.City.search(reg) >= 0;
	        });
	      });
	    }
	  }, {
	    key: "setData",
	    value: function setData() {
	      var req = new _request2.default();
	      return req.get(this.path).then(function (text) {
	        return text;
	      }, function (error) {
	        console.log("Fail to fetch data " + error);
	      });
	    }
	  }, {
	    key: "parse",
	    value: function parse(text) {
	      return JSON.parse(text);
	    }
	  }]);

	  return Autocomplite;
	}();

		exports.default = Autocomplite;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Request = function () {
	  function Request() {
	    _classCallCheck(this, Request);
	  }

	  _createClass(Request, [{
	    key: "get",
	    value: function get(path) {
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
	    }
	  }]);

	  return Request;
	}();

		exports.default = Request;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _autocomplite = __webpack_require__(1);

	var _autocomplite2 = _interopRequireDefault(_autocomplite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var autocompliteField = document.getElementById("autocomplite-field");
	autocompliteField.autocompliteLogic = new _autocomplite2.default("data/kladr.json");

	var error = document.getElementById("error-message");
	var variants = document.getElementById("variants");
	var currentElem = null;

	variants.onclick = function (event) {
	  var target = event.target;

	  if (target.tagName === "LI") {
	    autocompliteField.value = target.textContent;
	    this.classList.remove("variants-container--visible");
	  }
	};

	variants.onmouseover = function (event) {
	  if (currentElem) {
	    return;
	  }

	  var target = event.target;

	  while (target !== this) {
	    if (target.tagName == "LI") break;
	    target = target.parentNode;
	  }
	  if (target === this) return;

	  currentElem = target;
	  target.classList.add("variants-list__item--selected");
	};

	variants.onmouseout = function (event) {
	  if (!currentElem) return;

	  var relatedTarget = event.relatedTarget;
	  if (relatedTarget) {
	    while (relatedTarget) {
	      if (relatedTarget == currentElem) return;
	      relatedTarget = relatedTarget.parentNode;
	    }
	  }

	  currentElem.classList.remove("variants-list__item--selected");
	  currentElem = null;
	};

	autocompliteField.onfocus = function () {
	  this.select();
	  this.classList.remove("text-field--error");
	  error.classList.remove("error--visible");
	};

	autocompliteField.onblur = function () {
	  var onBlurFunc = isValid.bind(this);

	  setTimeout(onBlurFunc, 200);

	  function isValid() {
	    if (this.value) {
	      if (variants.querySelector(".variants-list") && variants.querySelector(".variants-list").children.length === 1) {
	        this.value = variants.querySelector(".variants-list").firstChild.textContent;
	        variants.classList.remove("variants-container--visible");
	      } else if (variants.querySelector(".variants-list")) {
	        var list = variants.querySelector(".variants-list");
	        if (filter(this.value, list.children).length === 0) {
	          showError();
	        }
	      } else if (!variants.querySelector(".variants-list") && !variants.querySelector(".message--server-error")) {
	        showError();
	      }
	    } else {
	      showError();
	    }
	  };

	  function showError() {
	    autocompliteField.classList.add("text-field--error");
	    variants.classList.remove("variants-container--visible");
	    error.classList.add("error--visible");
	  };

	  function filter(value, list) {
	    return [].filter.call(list, function (elem) {
	      return elem.textContent === value;
	    });
	  }
	};

	autocompliteField.addEventListener("input", inputHandler);

	function inputHandler() {
	  var listSize = variants.getAttribute("data-list-size");
	  var loader = document.getElementById("loader");
	  if (this.value) {
	    removeChildren(variants);
	    variants.classList.add("variants-container--visible");
	    if (!variants.querySelector(".message--server-error")) {
	      loader.classList.add("loader-wrapper--visible");
	    }
	    setPosition();

	    this.autocompliteLogic.getData(this.value).then(function (data) {
	      removeChildren(variants);

	      if (data.length > listSize) {
	        variants.insertBefore(createMessage("amount", listSize, data.length), loader);
	      }

	      if (data.length > 0) {
	        return createList(data);
	      }
	    }, function () {
	      loader.classList.add("loader-wrapper--visible");
	      if (variants.querySelector(".message--server-error")) {
	        variants.querySelector(".btn--refresh-btn").style.display = "none";
	        variants.querySelector(".message--server-error").style.display = "none";
	      }
	      setTimeout(function () {
	        loader.classList.remove("loader-wrapper--visible");
	        if (!variants.querySelector(".message--server-error")) {
	          variants.insertBefore(createRefreshBtn(), variants.firstChild);
	          variants.insertBefore(createMessage("server error"), variants.firstChild);
	          setPosition();
	        } else {
	          variants.querySelector(".btn--refresh-btn").style.display = "block";
	          variants.querySelector(".message--server-error").style.display = "block";
	        }
	      }, 1000);
	      throw new Error("server error");
	    }).then(function (list) {
	      if (list) {
	        if (variants.querySelector(".variants-list")) {
	          variants.removeChild(variants.querySelector(".variants-list"));
	        }

	        loader.classList.remove("loader-wrapper--visible");
	        variants.insertBefore(list, variants.firstChild);
	        setPosition();
	      } else {
	        throw new Error("not data");
	      }
	    }, function (e) {
	      return e;
	    }).then(null, function (e) {
	      if (e.message === "not data" && !variants.querySelector(".message--not-found") && !variants.querySelector(".variants-list")) {
	        loader.classList.remove("loader-wrapper--visible");
	        variants.insertBefore(createMessage("not found"), variants.firstChild);
	        setPosition();
	      }
	    });
	  } else {
	    loader.classList.remove("loader-wrapper--visible");
	    variants.classList.remove("variants-container--visible");
	  }
	};

	function setPosition() {
	  var coords = autocompliteField.getBoundingClientRect();
	  var docEndSpace = document.documentElement.clientHeight - coords.bottom;
	  if (docEndSpace < variants.offsetHeight) {
	    variants.style.top = -variants.offsetHeight - 3 + "px";
	  } else {
	    variants.style.top = autocompliteField.offsetHeight + 3 + "px";
	  }
	};

	function createList(data) {
	  var fragment = document.createDocumentFragment();
	  var listSize = variants.getAttribute("data-list-size");
	  var elem;
	  var i = 0;
	  while (i < listSize && i < data.length) {
	    elem = document.createElement("li");
	    elem.textContent = data[i].City;
	    elem.classList.add("variants-list__item");
	    fragment.appendChild(elem);

	    i++;
	  }

	  var list = document.createElement("ul");
	  list.classList.add("variants-list");
	  list.appendChild(fragment);
	  list.firstChild.classList.add("variants-list__item--selected");
	  currentElem = list.firstChild;

	  return list;
	};

	function createMessage(type, listSize, dataLength) {
	  var message = document.createElement("div");

	  switch (type) {
	    case "amount":
	      message.textContent = "Показано " + listSize + " из " + dataLength + " найденных городов. Уточните запрос, чтобы увидеть остальные.";
	      message.classList.add("message");
	      return message;

	    case "not found":
	      message.textContent = "Не найдено";
	      message.classList.add("message--not-found");
	      return message;

	    case "server error":
	      message.textContent = "Что-то пошло не так. Проверьте соединение с интернетом и попробуйте еще раз";
	      message.classList.add("message--server-error");
	      return message;
	  }
	};

	function createRefreshBtn() {
	  var refreshBtn = document.createElement("div");
	  refreshBtn.textContent = "Обновить";
	  refreshBtn.classList.add("btn--refresh-btn");
	  refreshBtn.addEventListener("click", inputHandler.bind(autocompliteField));
	  return refreshBtn;
	};

	function removeChildren(elem) {
	  while (elem.children.length > 1) {
	    elem.removeChild(elem.firstChild);
	  }
	}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxZWM2ODA2NTE1MDM0Yzc2ZWY5OD8yMThhIiwid2VicGFjazovLy9mcm9udGVuZC9qcy9hdXRvY29tcGxpdGUuanM/ZjgxZCIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvanMvcmVxdWVzdC5qcz9hYzYwIiwid2VicGFjazovLy9mcm9udGVuZC9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxZWM2ODA2NTE1MDM0Yzc2ZWY5OCIsImltcG9ydCBSZXF1ZXN0IGZyb20gXCIuL3JlcXVlc3QuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvY29tcGxpdGUge1xuICBjb25zdHJ1Y3RvcihwYXRoKSB7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xuICB9O1xuXG4gIGdldERhdGEoc3RyKSB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5zZXREYXRhKHRoaXMucGF0aCkudGhlbih0aGlzLnBhcnNlKTtcblxuICAgIHJldHVybiB0aGlzLmRhdGEudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKFwiXlwiICsgc3RyLCBcImlnXCIpO1xuXG4gICAgICByZXR1cm4gZGF0YS5maWx0ZXIoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgIHJldHVybiB2YWx1ZS5DaXR5LnNlYXJjaChyZWcpID49IDA7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBzZXREYXRhKCkge1xuICAgIGNvbnN0IHJlcSA9IG5ldyBSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIHJlcS5nZXQodGhpcy5wYXRoKS50aGVuKGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkZhaWwgdG8gZmV0Y2ggZGF0YSBcIiArIGVycm9yKTtcbiAgICB9KTtcbiAgfTtcblxuICBwYXJzZSh0ZXh0KSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvanMvYXV0b2NvbXBsaXRlLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWVzdCB7XG4gIGdldChwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHN1Y2NlZWQsIGZhaWwpIHtcbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgcGF0aCwgdHJ1ZSk7XG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgc3VjY2VlZCh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmYWlsKG5ldyBFcnJvcihcIlJlcXVlc3QgZmFpbGVkOiBcIiArIHhoci5zdGF0dXNUZXh0KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmYWlsKG5ldyBFcnJvcihcIk5ldHdvcmsgZXJyb3JcIikpO1xuICAgICAgfSk7XG5cbiAgICAgIHhoci5zZW5kKG51bGwpXG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9qcy9yZXF1ZXN0LmpzIiwiaW1wb3J0IEF1dG9jb21wbGl0ZSBmcm9tIFwiLi9hdXRvY29tcGxpdGUuanNcIlxuXG52YXIgYXV0b2NvbXBsaXRlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dG9jb21wbGl0ZS1maWVsZFwiKTtcbmF1dG9jb21wbGl0ZUZpZWxkLmF1dG9jb21wbGl0ZUxvZ2ljID0gbmV3IEF1dG9jb21wbGl0ZShcImRhdGEva2xhZHIuanNvblwiKTtcblxudmFyIGVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvci1tZXNzYWdlXCIpO1xudmFyIHZhcmlhbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2YXJpYW50c1wiKTtcbnZhciBjdXJyZW50RWxlbSA9IG51bGw7XG5cbnZhcmlhbnRzLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gXCJMSVwiKSB7XG4gICAgYXV0b2NvbXBsaXRlRmllbGQudmFsdWUgPSB0YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwidmFyaWFudHMtY29udGFpbmVyLS12aXNpYmxlXCIpO1xuICB9XG59O1xuXG52YXJpYW50cy5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmIChjdXJyZW50RWxlbSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgd2hpbGUgKHRhcmdldCAhPT0gdGhpcykge1xuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSBcIkxJXCIpIGJyZWFrO1xuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICB9XG4gIGlmICh0YXJnZXQgPT09IHRoaXMpIHJldHVybjtcblxuICBjdXJyZW50RWxlbSA9IHRhcmdldDtcbiAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJ2YXJpYW50cy1saXN0X19pdGVtLS1zZWxlY3RlZFwiKTtcbn1cblxudmFyaWFudHMub25tb3VzZW91dCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmICghY3VycmVudEVsZW0pIHJldHVybjtcblxuICB2YXIgcmVsYXRlZFRhcmdldCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gIGlmIChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgd2hpbGUgKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgIGlmIChyZWxhdGVkVGFyZ2V0ID09IGN1cnJlbnRFbGVtKSByZXR1cm47XG4gICAgICByZWxhdGVkVGFyZ2V0ID0gcmVsYXRlZFRhcmdldC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIGN1cnJlbnRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJ2YXJpYW50cy1saXN0X19pdGVtLS1zZWxlY3RlZFwiKTtcbiAgY3VycmVudEVsZW0gPSBudWxsO1xufTtcblxuYXV0b2NvbXBsaXRlRmllbGQub25mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNlbGVjdCgpO1xuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJ0ZXh0LWZpZWxkLS1lcnJvclwiKTtcbiAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLS12aXNpYmxlXCIpO1xufTtcblxuYXV0b2NvbXBsaXRlRmllbGQub25ibHVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbkJsdXJGdW5jID0gaXNWYWxpZC5iaW5kKHRoaXMpO1xuXG4gIHNldFRpbWVvdXQob25CbHVyRnVuYywgMjAwKTtcblxuICBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICBpZiAodmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpICYmIHZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKS5maXJzdENoaWxkLnRleHRDb250ZW50O1xuICAgICAgICB2YXJpYW50cy5jbGFzc0xpc3QucmVtb3ZlKFwidmFyaWFudHMtY29udGFpbmVyLS12aXNpYmxlXCIpO1xuICAgICAgfSBlbHNlIGlmICh2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIikpIHtcbiAgICAgICAgdmFyIGxpc3QgPSB2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIik7XG4gICAgICAgIGlmIChmaWx0ZXIodGhpcy52YWx1ZSwgbGlzdC5jaGlsZHJlbikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc2hvd0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKSAmJiAhdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIikpIHtcbiAgICAgICAgc2hvd0Vycm9yKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dFcnJvcigpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBzaG93RXJyb3IoKSB7XG4gICAgYXV0b2NvbXBsaXRlRmllbGQuY2xhc3NMaXN0LmFkZChcInRleHQtZmllbGQtLWVycm9yXCIpO1xuICAgIHZhcmlhbnRzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2YXJpYW50cy1jb250YWluZXItLXZpc2libGVcIik7XG4gICAgZXJyb3IuY2xhc3NMaXN0LmFkZChcImVycm9yLS12aXNpYmxlXCIpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGZpbHRlcih2YWx1ZSwgbGlzdCkge1xuICAgIHJldHVybiBbXS5maWx0ZXIuY2FsbChsaXN0LCBmdW5jdGlvbihlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbS50ZXh0Q29udGVudCA9PT0gdmFsdWU7XG4gICAgfSk7XG4gIH1cbn07XG5cbmF1dG9jb21wbGl0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBpbnB1dEhhbmRsZXIpO1xuXG5mdW5jdGlvbiBpbnB1dEhhbmRsZXIoKSB7XG4gIHZhciBsaXN0U2l6ZSA9IHZhcmlhbnRzLmdldEF0dHJpYnV0ZShcImRhdGEtbGlzdC1zaXplXCIpO1xuICB2YXIgbG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2FkZXJcIik7XG4gIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgcmVtb3ZlQ2hpbGRyZW4odmFyaWFudHMpO1xuICAgIHZhcmlhbnRzLmNsYXNzTGlzdC5hZGQoXCJ2YXJpYW50cy1jb250YWluZXItLXZpc2libGVcIik7XG4gICAgaWYgKCF2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2UtLXNlcnZlci1lcnJvclwiKSkge1xuICAgICAgbG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJsb2FkZXItd3JhcHBlci0tdmlzaWJsZVwiKTtcbiAgICB9XG4gICAgc2V0UG9zaXRpb24oKTtcblxuICAgIHRoaXMuYXV0b2NvbXBsaXRlTG9naWMuZ2V0RGF0YSh0aGlzLnZhbHVlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJlbW92ZUNoaWxkcmVuKHZhcmlhbnRzKTtcblxuICAgICAgaWYgKGRhdGEubGVuZ3RoID4gbGlzdFNpemUpIHtcbiAgICAgICAgdmFyaWFudHMuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1lc3NhZ2UoXCJhbW91bnRcIiwgbGlzdFNpemUsIGRhdGEubGVuZ3RoKSwgbG9hZGVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTGlzdChkYXRhKTtcbiAgICAgIH1cbiAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKFwibG9hZGVyLXdyYXBwZXItLXZpc2libGVcIik7XG4gICAgICBpZiAodmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIikpIHtcbiAgICAgICAgdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5idG4tLXJlZnJlc2gtYnRuXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkZXItd3JhcHBlci0tdmlzaWJsZVwiKVxuICAgICAgICBpZiAoIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS0tc2VydmVyLWVycm9yXCIpKSB7XG4gICAgICAgICAgdmFyaWFudHMuaW5zZXJ0QmVmb3JlKGNyZWF0ZVJlZnJlc2hCdG4oKSwgdmFyaWFudHMuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgdmFyaWFudHMuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1lc3NhZ2UoXCJzZXJ2ZXIgZXJyb3JcIiksIHZhcmlhbnRzLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIHNldFBvc2l0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5idG4tLXJlZnJlc2gtYnRuXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXJ2ZXIgZXJyb3JcIik7XG4gICAgfSkudGhlbihmdW5jdGlvbihsaXN0KSB7XG4gICAgICBpZiAobGlzdCkge1xuICAgICAgICBpZiAodmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpKSB7XG4gICAgICAgICAgdmFyaWFudHMucmVtb3ZlQ2hpbGQodmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGVyLXdyYXBwZXItLXZpc2libGVcIilcbiAgICAgICAgdmFyaWFudHMuaW5zZXJ0QmVmb3JlKGxpc3QsIHZhcmlhbnRzLmZpcnN0Q2hpbGQpO1xuICAgICAgICBzZXRQb3NpdGlvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGRhdGFcIik7XG4gICAgICB9XG5cbiAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZTtcbiAgICB9KS50aGVuKG51bGwgLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5tZXNzYWdlID09PSBcIm5vdCBkYXRhXCIgJiYgIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS0tbm90LWZvdW5kXCIpICYmICF2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIikpIHtcbiAgICAgICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkZXItd3JhcHBlci0tdmlzaWJsZVwiKTtcbiAgICAgICAgdmFyaWFudHMuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1lc3NhZ2UoXCJub3QgZm91bmRcIiksIHZhcmlhbnRzLmZpcnN0Q2hpbGQpO1xuICAgICAgICBzZXRQb3NpdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGVyLXdyYXBwZXItLXZpc2libGVcIik7XG4gICAgdmFyaWFudHMuY2xhc3NMaXN0LnJlbW92ZShcInZhcmlhbnRzLWNvbnRhaW5lci0tdmlzaWJsZVwiKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gc2V0UG9zaXRpb24oKSB7XG4gIHZhciBjb29yZHMgPSBhdXRvY29tcGxpdGVGaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGRvY0VuZFNwYWNlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIGNvb3Jkcy5ib3R0b207XG4gICAgaWYgKGRvY0VuZFNwYWNlIDwgdmFyaWFudHMub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICB2YXJpYW50cy5zdHlsZS50b3AgPSAtdmFyaWFudHMub2Zmc2V0SGVpZ2h0IC0gMyArIFwicHhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyaWFudHMuc3R5bGUudG9wID0gYXV0b2NvbXBsaXRlRmllbGQub2Zmc2V0SGVpZ2h0ICsgMyArXCJweFwiO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3QoZGF0YSkge1xuICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIHZhciBsaXN0U2l6ZSA9IHZhcmlhbnRzLmdldEF0dHJpYnV0ZShcImRhdGEtbGlzdC1zaXplXCIpO1xuICB2YXIgZWxlbTtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoaSA8IGxpc3RTaXplICYmIGkgPCBkYXRhLmxlbmd0aCkge1xuICAgIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgZWxlbS50ZXh0Q29udGVudCA9IGRhdGFbaV0uQ2l0eTtcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJ2YXJpYW50cy1saXN0X19pdGVtXCIpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW0pO1xuXG4gICAgaSsrO1xuICB9XG5cbiAgdmFyIGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gIGxpc3QuY2xhc3NMaXN0LmFkZChcInZhcmlhbnRzLWxpc3RcIik7XG4gIGxpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICBsaXN0LmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChcInZhcmlhbnRzLWxpc3RfX2l0ZW0tLXNlbGVjdGVkXCIpO1xuICBjdXJyZW50RWxlbSA9IGxpc3QuZmlyc3RDaGlsZDtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2UodHlwZSwgbGlzdFNpemUsIGRhdGFMZW5ndGgpIHtcbiAgdmFyIG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJhbW91bnRcIjpcbiAgICAgIG1lc3NhZ2UudGV4dENvbnRlbnQgPSBcItCf0L7QutCw0LfQsNC90L4gXCIgKyBsaXN0U2l6ZSArIFwiINC40LcgXCIgKyBkYXRhTGVuZ3RoICsgXCIg0L3QsNC50LTQtdC90L3Ri9GFINCz0L7RgNC+0LTQvtCyLiDQo9GC0L7Rh9C90LjRgtC1INC30LDQv9GA0L7RgSwg0YfRgtC+0LHRiyDRg9Cy0LjQtNC10YLRjCDQvtGB0YLQsNC70YzQvdGL0LUuXCI7XG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJtZXNzYWdlXCIpO1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG5cbiAgICBjYXNlIFwibm90IGZvdW5kXCI6XG4gICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gXCLQndC1INC90LDQudC00LXQvdC+XCI7XG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJtZXNzYWdlLS1ub3QtZm91bmRcIik7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcblxuICAgIGNhc2UgXCJzZXJ2ZXIgZXJyb3JcIjpcbiAgICAgIG1lc3NhZ2UudGV4dENvbnRlbnQgPSBcItCn0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LouINCf0YDQvtCy0LXRgNGM0YLQtSDRgdC+0LXQtNC40L3QtdC90LjQtSDRgSDQuNC90YLQtdGA0L3QtdGC0L7QvCDQuCDQv9C+0L/RgNC+0LHRg9C50YLQtSDQtdGJ0LUg0YDQsNC3XCI7XG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJtZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIik7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlUmVmcmVzaEJ0bigpIHtcbiAgdmFyIHJlZnJlc2hCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICByZWZyZXNoQnRuLnRleHRDb250ZW50ID0gXCLQntCx0L3QvtCy0LjRgtGMXCI7XG4gIHJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImJ0bi0tcmVmcmVzaC1idG5cIik7XG4gIHJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGlucHV0SGFuZGxlci5iaW5kKGF1dG9jb21wbGl0ZUZpZWxkKSk7XG4gIHJldHVybiByZWZyZXNoQnRuO1xufTtcblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4oZWxlbSkge1xuICB3aGlsZSAoZWxlbS5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgZWxlbS5yZW1vdmVDaGlsZChlbGVtLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvanMvc2NyaXB0cy5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUE3QkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQXBCQTs7Ozs7Ozs7QUNBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
