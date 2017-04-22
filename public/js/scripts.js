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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _autocomplite = __webpack_require__(1);

	var autocompliteField = document.getElementById("autocomplite-field");
	autocompliteField.autocompliteLogic = new _autocomplite.Autocomplite("data/kladr.json");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZTIwMTdkZTEzZGIyOGU1ZGEzNCIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvanMvYXV0b2NvbXBsaXRlLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9qcy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy9mcm9udGVuZC9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhZTIwMTdkZTEzZGIyOGU1ZGEzNCIsImltcG9ydCB7UmVxdWVzdH0gZnJvbSBcIi4vcmVxdWVzdC5qc1wiXG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRvY29tcGxpdGUocGF0aCkge1xuICB0aGlzLnBhdGggPSBwYXRoO1xuICB2YXIgZGF0YTtcblxuICB0aGlzLmdldERhdGEgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBkYXRhID0gc2V0RGF0YSh0aGlzLnBhdGgpLnRoZW4ocGFyc2UpO1xuXG4gICAgcmV0dXJuIGRhdGEudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIl5cIiArIHN0ciwgXCJpZ1wiKTtcblxuICAgICAgcmV0dXJuIGRhdGEuZmlsdGVyKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICByZXR1cm4gdmFsdWUuQ2l0eS5zZWFyY2gocmVnKSA+PSAwO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gc2V0RGF0YShwYXRoKSB7XG4gICAgdmFyIHJlcSA9IG5ldyBSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIHJlcS5nZXQocGF0aCkudGhlbihmdW5jdGlvbih0ZXh0KSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJGYWlsIHRvIGZldGNoIGRhdGEgXCIgKyBlcnJvcik7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcGFyc2UodGV4dCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2pzL2F1dG9jb21wbGl0ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBSZXF1ZXN0KCkge1xuICB0aGlzLmdldCA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24oc3VjY2VlZCwgZmFpbCkge1xuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgcGF0aCwgdHJ1ZSk7XG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgc3VjY2VlZCh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmYWlsKG5ldyBFcnJvcihcIlJlcXVlc3QgZmFpbGVkOiBcIiArIHhoci5zdGF0dXNUZXh0KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmYWlsKG5ldyBFcnJvcihcIk5ldHdvcmsgZXJyb3JcIikpO1xuICAgICAgfSk7XG5cbiAgICAgIHhoci5zZW5kKG51bGwpXG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9qcy9yZXF1ZXN0LmpzIiwiaW1wb3J0IHtBdXRvY29tcGxpdGV9IGZyb20gXCIuL2F1dG9jb21wbGl0ZS5qc1wiXG5cbnZhciBhdXRvY29tcGxpdGVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0b2NvbXBsaXRlLWZpZWxkXCIpO1xuYXV0b2NvbXBsaXRlRmllbGQuYXV0b2NvbXBsaXRlTG9naWMgPSBuZXcgQXV0b2NvbXBsaXRlKFwiZGF0YS9rbGFkci5qc29uXCIpO1xuXG52YXIgZXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW1lc3NhZ2VcIik7XG52YXIgdmFyaWFudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZhcmlhbnRzXCIpO1xudmFyIGN1cnJlbnRFbGVtID0gbnVsbDtcblxudmFyaWFudHMub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIkxJXCIpIHtcbiAgICBhdXRvY29tcGxpdGVGaWVsZC52YWx1ZSA9IHRhcmdldC50ZXh0Q29udGVudDtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2YXJpYW50cy1jb250YWluZXItLXZpc2libGVcIik7XG4gIH1cbn07XG5cbnZhcmlhbnRzLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGN1cnJlbnRFbGVtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICB3aGlsZSAodGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09IFwiTElcIikgYnJlYWs7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gIH1cbiAgaWYgKHRhcmdldCA9PT0gdGhpcykgcmV0dXJuO1xuXG4gIGN1cnJlbnRFbGVtID0gdGFyZ2V0O1xuICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcInZhcmlhbnRzLWxpc3RfX2l0ZW0tLXNlbGVjdGVkXCIpO1xufVxuXG52YXJpYW50cy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKCFjdXJyZW50RWxlbSkgcmV0dXJuO1xuXG4gIHZhciByZWxhdGVkVGFyZ2V0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcbiAgaWYgKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICB3aGlsZSAocmVsYXRlZFRhcmdldCkge1xuICAgICAgaWYgKHJlbGF0ZWRUYXJnZXQgPT0gY3VycmVudEVsZW0pIHJldHVybjtcbiAgICAgIHJlbGF0ZWRUYXJnZXQgPSByZWxhdGVkVGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgY3VycmVudEVsZW0uY2xhc3NMaXN0LnJlbW92ZShcInZhcmlhbnRzLWxpc3RfX2l0ZW0tLXNlbGVjdGVkXCIpO1xuICBjdXJyZW50RWxlbSA9IG51bGw7XG59O1xuXG5hdXRvY29tcGxpdGVGaWVsZC5vbmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2VsZWN0KCk7XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcInRleHQtZmllbGQtLWVycm9yXCIpO1xuICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItLXZpc2libGVcIik7XG59O1xuXG5hdXRvY29tcGxpdGVGaWVsZC5vbmJsdXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9uQmx1ckZ1bmMgPSBpc1ZhbGlkLmJpbmQodGhpcyk7XG5cbiAgc2V0VGltZW91dChvbkJsdXJGdW5jLCAyMDApO1xuXG4gIGZ1bmN0aW9uIGlzVmFsaWQoKSB7XG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIGlmICh2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIikgJiYgdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgIHZhcmlhbnRzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2YXJpYW50cy1jb250YWluZXItLXZpc2libGVcIik7XG4gICAgICB9IGVsc2UgaWYgKHZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKSkge1xuICAgICAgICB2YXIgbGlzdCA9IHZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKTtcbiAgICAgICAgaWYgKGZpbHRlcih0aGlzLnZhbHVlLCBsaXN0LmNoaWxkcmVuKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzaG93RXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpICYmICF2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2UtLXNlcnZlci1lcnJvclwiKSkge1xuICAgICAgICBzaG93RXJyb3IoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd0Vycm9yKCk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHNob3dFcnJvcigpIHtcbiAgICBhdXRvY29tcGxpdGVGaWVsZC5jbGFzc0xpc3QuYWRkKFwidGV4dC1maWVsZC0tZXJyb3JcIik7XG4gICAgdmFyaWFudHMuY2xhc3NMaXN0LnJlbW92ZShcInZhcmlhbnRzLWNvbnRhaW5lci0tdmlzaWJsZVwiKTtcbiAgICBlcnJvci5jbGFzc0xpc3QuYWRkKFwiZXJyb3ItLXZpc2libGVcIik7XG4gIH07XG5cbiAgZnVuY3Rpb24gZmlsdGVyKHZhbHVlLCBsaXN0KSB7XG4gICAgcmV0dXJuIFtdLmZpbHRlci5jYWxsKGxpc3QsIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtLnRleHRDb250ZW50ID09PSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxufTtcblxuYXV0b2NvbXBsaXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGlucHV0SGFuZGxlcik7XG5cbmZ1bmN0aW9uIGlucHV0SGFuZGxlcigpIHtcbiAgdmFyIGxpc3RTaXplID0gdmFyaWFudHMuZ2V0QXR0cmlidXRlKFwiZGF0YS1saXN0LXNpemVcIik7XG4gIHZhciBsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRlclwiKTtcbiAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICByZW1vdmVDaGlsZHJlbih2YXJpYW50cyk7XG4gICAgdmFyaWFudHMuY2xhc3NMaXN0LmFkZChcInZhcmlhbnRzLWNvbnRhaW5lci0tdmlzaWJsZVwiKTtcbiAgICBpZiAoIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS0tc2VydmVyLWVycm9yXCIpKSB7XG4gICAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZChcImxvYWRlci13cmFwcGVyLS12aXNpYmxlXCIpO1xuICAgIH1cbiAgICBzZXRQb3NpdGlvbigpO1xuXG4gICAgdGhpcy5hdXRvY29tcGxpdGVMb2dpYy5nZXREYXRhKHRoaXMudmFsdWUpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmVtb3ZlQ2hpbGRyZW4odmFyaWFudHMpO1xuXG4gICAgICBpZiAoZGF0YS5sZW5ndGggPiBsaXN0U2l6ZSkge1xuICAgICAgICB2YXJpYW50cy5pbnNlcnRCZWZvcmUoY3JlYXRlTWVzc2FnZShcImFtb3VudFwiLCBsaXN0U2l6ZSwgZGF0YS5sZW5ndGgpLCBsb2FkZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMaXN0KGRhdGEpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgbG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJsb2FkZXItd3JhcHBlci0tdmlzaWJsZVwiKTtcbiAgICAgIGlmICh2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2UtLXNlcnZlci1lcnJvclwiKSkge1xuICAgICAgICB2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLmJ0bi0tcmVmcmVzaC1idG5cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2UtLXNlcnZlci1lcnJvclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBsb2FkZXIuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRlci13cmFwcGVyLS12aXNpYmxlXCIpXG4gICAgICAgIGlmICghdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIikpIHtcbiAgICAgICAgICB2YXJpYW50cy5pbnNlcnRCZWZvcmUoY3JlYXRlUmVmcmVzaEJ0bigpLCB2YXJpYW50cy5maXJzdENoaWxkKTtcbiAgICAgICAgICB2YXJpYW50cy5pbnNlcnRCZWZvcmUoY3JlYXRlTWVzc2FnZShcInNlcnZlciBlcnJvclwiKSwgdmFyaWFudHMuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgc2V0UG9zaXRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLmJ0bi0tcmVmcmVzaC1idG5cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICB2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2UtLXNlcnZlci1lcnJvclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uKGxpc3QpIHtcbiAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgIGlmICh2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIikpIHtcbiAgICAgICAgICB2YXJpYW50cy5yZW1vdmVDaGlsZCh2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkZXItd3JhcHBlci0tdmlzaWJsZVwiKVxuICAgICAgICB2YXJpYW50cy5pbnNlcnRCZWZvcmUobGlzdCwgdmFyaWFudHMuZmlyc3RDaGlsZCk7XG4gICAgICAgIHNldFBvc2l0aW9uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgZGF0YVwiKTtcbiAgICAgIH1cblxuICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBlO1xuICAgIH0pLnRoZW4obnVsbCAsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLm1lc3NhZ2UgPT09IFwibm90IGRhdGFcIiAmJiAhdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1ub3QtZm91bmRcIikgJiYgIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKSkge1xuICAgICAgICBsb2FkZXIuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRlci13cmFwcGVyLS12aXNpYmxlXCIpO1xuICAgICAgICB2YXJpYW50cy5pbnNlcnRCZWZvcmUoY3JlYXRlTWVzc2FnZShcIm5vdCBmb3VuZFwiKSwgdmFyaWFudHMuZmlyc3RDaGlsZCk7XG4gICAgICAgIHNldFBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkZXItd3JhcHBlci0tdmlzaWJsZVwiKTtcbiAgICB2YXJpYW50cy5jbGFzc0xpc3QucmVtb3ZlKFwidmFyaWFudHMtY29udGFpbmVyLS12aXNpYmxlXCIpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRQb3NpdGlvbigpIHtcbiAgdmFyIGNvb3JkcyA9IGF1dG9jb21wbGl0ZUZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgZG9jRW5kU3BhY2UgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gY29vcmRzLmJvdHRvbTtcbiAgICBpZiAoZG9jRW5kU3BhY2UgPCB2YXJpYW50cy5vZmZzZXRIZWlnaHQpIHtcbiAgICAgIHZhcmlhbnRzLnN0eWxlLnRvcCA9IC12YXJpYW50cy5vZmZzZXRIZWlnaHQgLSAzICsgXCJweFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXJpYW50cy5zdHlsZS50b3AgPSBhdXRvY29tcGxpdGVGaWVsZC5vZmZzZXRIZWlnaHQgKyAzICtcInB4XCI7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlTGlzdChkYXRhKSB7XG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgdmFyIGxpc3RTaXplID0gdmFyaWFudHMuZ2V0QXR0cmlidXRlKFwiZGF0YS1saXN0LXNpemVcIik7XG4gIHZhciBlbGVtO1xuICB2YXIgaSA9IDA7XG4gIHdoaWxlIChpIDwgbGlzdFNpemUgJiYgaSA8IGRhdGEubGVuZ3RoKSB7XG4gICAgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBlbGVtLnRleHRDb250ZW50ID0gZGF0YVtpXS5DaXR5O1xuICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInZhcmlhbnRzLWxpc3RfX2l0ZW1cIik7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbSk7XG5cbiAgICBpKys7XG4gIH1cblxuICB2YXIgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgbGlzdC5jbGFzc0xpc3QuYWRkKFwidmFyaWFudHMtbGlzdFwiKTtcbiAgbGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIGxpc3QuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKFwidmFyaWFudHMtbGlzdF9faXRlbS0tc2VsZWN0ZWRcIik7XG4gIGN1cnJlbnRFbGVtID0gbGlzdC5maXJzdENoaWxkO1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlTWVzc2FnZSh0eXBlLCBsaXN0U2l6ZSwgZGF0YUxlbmd0aCkge1xuICB2YXIgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcImFtb3VudFwiOlxuICAgICAgbWVzc2FnZS50ZXh0Q29udGVudCA9IFwi0J/QvtC60LDQt9Cw0L3QviBcIiArIGxpc3RTaXplICsgXCIg0LjQtyBcIiArIGRhdGFMZW5ndGggKyBcIiDQvdCw0LnQtNC10L3QvdGL0YUg0LPQvtGA0L7QtNC+0LIuINCj0YLQvtGH0L3QuNGC0LUg0LfQsNC/0YDQvtGBLCDRh9GC0L7QsdGLINGD0LLQuNC00LXRgtGMINC+0YHRgtCw0LvRjNC90YvQtS5cIjtcbiAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcIm1lc3NhZ2VcIik7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcblxuICAgIGNhc2UgXCJub3QgZm91bmRcIjpcbiAgICAgIG1lc3NhZ2UudGV4dENvbnRlbnQgPSBcItCd0LUg0L3QsNC50LTQtdC90L5cIjtcbiAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcIm1lc3NhZ2UtLW5vdC1mb3VuZFwiKTtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuXG4gICAgY2FzZSBcInNlcnZlciBlcnJvclwiOlxuICAgICAgbWVzc2FnZS50ZXh0Q29udGVudCA9IFwi0KfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQui4g0J/RgNC+0LLQtdGA0YzRgtC1INGB0L7QtdC00LjQvdC10L3QuNC1INGBINC40L3RgtC10YDQvdC10YLQvtC8INC4INC/0L7Qv9GA0L7QsdGD0LnRgtC1INC10YnQtSDRgNCw0LdcIjtcbiAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcIm1lc3NhZ2UtLXNlcnZlci1lcnJvclwiKTtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVSZWZyZXNoQnRuKCkge1xuICB2YXIgcmVmcmVzaEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHJlZnJlc2hCdG4udGV4dENvbnRlbnQgPSBcItCe0LHQvdC+0LLQuNGC0YxcIjtcbiAgcmVmcmVzaEJ0bi5jbGFzc0xpc3QuYWRkKFwiYnRuLS1yZWZyZXNoLWJ0blwiKTtcbiAgcmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaW5wdXRIYW5kbGVyLmJpbmQoYXV0b2NvbXBsaXRlRmllbGQpKTtcbiAgcmV0dXJuIHJlZnJlc2hCdG47XG59O1xuXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihlbGVtKSB7XG4gIHdoaWxlIChlbGVtLmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0uZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9qcy9zY3JpcHRzLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=
