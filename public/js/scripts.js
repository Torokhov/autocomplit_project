webpackJsonp([2,3],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	var autocompliteField = document.getElementById("autocomplite-field");
	autocompliteField.autocompliteLogic = new Autocomplite("data/kladr.json");

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
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9mcm9udGVuZC9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBhdXRvY29tcGxpdGVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0b2NvbXBsaXRlLWZpZWxkXCIpO1xyXG5hdXRvY29tcGxpdGVGaWVsZC5hdXRvY29tcGxpdGVMb2dpYyA9IG5ldyBBdXRvY29tcGxpdGUoXCJkYXRhL2tsYWRyLmpzb25cIik7XHJcblxyXG52YXIgZXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW1lc3NhZ2VcIik7XHJcbnZhciB2YXJpYW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmFyaWFudHNcIik7XHJcbnZhciBjdXJyZW50RWxlbSA9IG51bGw7XHJcblxyXG52YXJpYW50cy5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gIFxyXG4gIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gXCJMSVwiKSB7XHJcbiAgICBhdXRvY29tcGxpdGVGaWVsZC52YWx1ZSA9IHRhcmdldC50ZXh0Q29udGVudDtcclxuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcInZhcmlhbnRzLWNvbnRhaW5lci0tdmlzaWJsZVwiKTtcclxuICB9XHJcbn07XHJcblxyXG52YXJpYW50cy5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgaWYgKGN1cnJlbnRFbGVtKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIFxyXG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgXHJcbiAgd2hpbGUgKHRhcmdldCAhPT0gdGhpcykge1xyXG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09IFwiTElcIikgYnJlYWs7XHJcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICB9XHJcbiAgaWYgKHRhcmdldCA9PT0gdGhpcykgcmV0dXJuO1xyXG5cclxuICBjdXJyZW50RWxlbSA9IHRhcmdldDtcclxuICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcInZhcmlhbnRzLWxpc3RfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG59XHJcblxyXG52YXJpYW50cy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICBpZiAoIWN1cnJlbnRFbGVtKSByZXR1cm47XHJcblxyXG4gIHZhciByZWxhdGVkVGFyZ2V0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcclxuICBpZiAocmVsYXRlZFRhcmdldCkge1xyXG4gICAgd2hpbGUgKHJlbGF0ZWRUYXJnZXQpIHtcclxuICAgICAgaWYgKHJlbGF0ZWRUYXJnZXQgPT0gY3VycmVudEVsZW0pIHJldHVybjtcclxuICAgICAgcmVsYXRlZFRhcmdldCA9IHJlbGF0ZWRUYXJnZXQucGFyZW50Tm9kZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGN1cnJlbnRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJ2YXJpYW50cy1saXN0X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICBjdXJyZW50RWxlbSA9IG51bGw7XHJcbn07XHJcblxyXG5hdXRvY29tcGxpdGVGaWVsZC5vbmZvY3VzID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5zZWxlY3QoKTtcclxuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJ0ZXh0LWZpZWxkLS1lcnJvclwiKTtcclxuICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItLXZpc2libGVcIik7XHJcbn07XHJcblxyXG5hdXRvY29tcGxpdGVGaWVsZC5vbmJsdXIgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgb25CbHVyRnVuYyA9IGlzVmFsaWQuYmluZCh0aGlzKTtcclxuICBcclxuICBzZXRUaW1lb3V0KG9uQmx1ckZ1bmMsIDIwMCk7XHJcbiAgXHJcbiAgZnVuY3Rpb24gaXNWYWxpZCgpIHtcclxuICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgIGlmICh2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIikgJiYgdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIikuZmlyc3RDaGlsZC50ZXh0Q29udGVudDtcclxuICAgICAgICB2YXJpYW50cy5jbGFzc0xpc3QucmVtb3ZlKFwidmFyaWFudHMtY29udGFpbmVyLS12aXNpYmxlXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKSkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpO1xyXG4gICAgICAgIGlmIChmaWx0ZXIodGhpcy52YWx1ZSwgbGlzdC5jaGlsZHJlbikubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBzaG93RXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKSAmJiAhdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIikpIHtcclxuICAgICAgICBzaG93RXJyb3IoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hvd0Vycm9yKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuIFxyXG4gIGZ1bmN0aW9uIHNob3dFcnJvcigpIHtcclxuICAgIGF1dG9jb21wbGl0ZUZpZWxkLmNsYXNzTGlzdC5hZGQoXCJ0ZXh0LWZpZWxkLS1lcnJvclwiKTtcclxuICAgIHZhcmlhbnRzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2YXJpYW50cy1jb250YWluZXItLXZpc2libGVcIik7XHJcbiAgICBlcnJvci5jbGFzc0xpc3QuYWRkKFwiZXJyb3ItLXZpc2libGVcIik7XHJcbiAgfTtcclxuICBcclxuICBmdW5jdGlvbiBmaWx0ZXIodmFsdWUsIGxpc3QpIHtcclxuICAgIHJldHVybiBbXS5maWx0ZXIuY2FsbChsaXN0LCBmdW5jdGlvbihlbGVtKSB7XHJcbiAgICAgIHJldHVybiBlbGVtLnRleHRDb250ZW50ID09PSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmF1dG9jb21wbGl0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBpbnB1dEhhbmRsZXIpOyBcclxuXHJcbmZ1bmN0aW9uIGlucHV0SGFuZGxlcigpIHtcclxuICB2YXIgbGlzdFNpemUgPSB2YXJpYW50cy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWxpc3Qtc2l6ZVwiKTtcclxuICB2YXIgbG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2FkZXJcIik7XHJcbiAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgIHJlbW92ZUNoaWxkcmVuKHZhcmlhbnRzKTtcclxuICAgIHZhcmlhbnRzLmNsYXNzTGlzdC5hZGQoXCJ2YXJpYW50cy1jb250YWluZXItLXZpc2libGVcIik7XHJcbiAgICBpZiAoIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS0tc2VydmVyLWVycm9yXCIpKSB7XHJcbiAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKFwibG9hZGVyLXdyYXBwZXItLXZpc2libGVcIik7ICBcclxuICAgIH1cclxuICAgIHNldFBvc2l0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5hdXRvY29tcGxpdGVMb2dpYy5nZXREYXRhKHRoaXMudmFsdWUpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICByZW1vdmVDaGlsZHJlbih2YXJpYW50cyk7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoZGF0YS5sZW5ndGggPiBsaXN0U2l6ZSkge1xyXG4gICAgICAgIHZhcmlhbnRzLmluc2VydEJlZm9yZShjcmVhdGVNZXNzYWdlKFwiYW1vdW50XCIsIGxpc3RTaXplLCBkYXRhLmxlbmd0aCksIGxvYWRlcik7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlTGlzdChkYXRhKTsgXHJcbiAgICAgIH1cclxuICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZChcImxvYWRlci13cmFwcGVyLS12aXNpYmxlXCIpO1xyXG4gICAgICBpZiAodmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIikpIHtcclxuICAgICAgICB2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLmJ0bi0tcmVmcmVzaC1idG5cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS0tc2VydmVyLWVycm9yXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgfVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGVyLXdyYXBwZXItLXZpc2libGVcIilcclxuICAgICAgICBpZiAoIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS0tc2VydmVyLWVycm9yXCIpKSB7XHJcbiAgICAgICAgICB2YXJpYW50cy5pbnNlcnRCZWZvcmUoY3JlYXRlUmVmcmVzaEJ0bigpLCB2YXJpYW50cy5maXJzdENoaWxkKTtcclxuICAgICAgICAgIHZhcmlhbnRzLmluc2VydEJlZm9yZShjcmVhdGVNZXNzYWdlKFwic2VydmVyIGVycm9yXCIpLCB2YXJpYW50cy5maXJzdENoaWxkKTtcclxuICAgICAgICAgIHNldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLS1yZWZyZXNoLWJ0blwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXJ2ZXIgZXJyb3JcIik7XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKGxpc3QpIHtcclxuICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICBpZiAodmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi52YXJpYW50cy1saXN0XCIpKSB7XHJcbiAgICAgICAgICB2YXJpYW50cy5yZW1vdmVDaGlsZCh2YXJpYW50cy5xdWVyeVNlbGVjdG9yKFwiLnZhcmlhbnRzLWxpc3RcIikpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGVyLXdyYXBwZXItLXZpc2libGVcIilcclxuICAgICAgICB2YXJpYW50cy5pbnNlcnRCZWZvcmUobGlzdCwgdmFyaWFudHMuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgc2V0UG9zaXRpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgZGF0YVwiKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0sIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KS50aGVuKG51bGwgLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChlLm1lc3NhZ2UgPT09IFwibm90IGRhdGFcIiAmJiAhdmFyaWFudHMucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLS1ub3QtZm91bmRcIikgJiYgIXZhcmlhbnRzLnF1ZXJ5U2VsZWN0b3IoXCIudmFyaWFudHMtbGlzdFwiKSkge1xyXG4gICAgICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGVyLXdyYXBwZXItLXZpc2libGVcIik7XHJcbiAgICAgICAgdmFyaWFudHMuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1lc3NhZ2UoXCJub3QgZm91bmRcIiksIHZhcmlhbnRzLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIHNldFBvc2l0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2FkZXIuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRlci13cmFwcGVyLS12aXNpYmxlXCIpO1xyXG4gICAgdmFyaWFudHMuY2xhc3NMaXN0LnJlbW92ZShcInZhcmlhbnRzLWNvbnRhaW5lci0tdmlzaWJsZVwiKTtcclxuICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRQb3NpdGlvbigpIHtcclxuICB2YXIgY29vcmRzID0gYXV0b2NvbXBsaXRlRmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgdmFyIGRvY0VuZFNwYWNlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIGNvb3Jkcy5ib3R0b207XHJcbiAgICBpZiAoZG9jRW5kU3BhY2UgPCB2YXJpYW50cy5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgdmFyaWFudHMuc3R5bGUudG9wID0gLXZhcmlhbnRzLm9mZnNldEhlaWdodCAtIDMgKyBcInB4XCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXJpYW50cy5zdHlsZS50b3AgPSBhdXRvY29tcGxpdGVGaWVsZC5vZmZzZXRIZWlnaHQgKyAzICtcInB4XCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaXN0KGRhdGEpIHtcclxuICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgdmFyIGxpc3RTaXplID0gdmFyaWFudHMuZ2V0QXR0cmlidXRlKFwiZGF0YS1saXN0LXNpemVcIik7XHJcbiAgdmFyIGVsZW07XHJcbiAgdmFyIGkgPSAwO1xyXG4gIHdoaWxlIChpIDwgbGlzdFNpemUgJiYgaSA8IGRhdGEubGVuZ3RoKSB7XHJcbiAgICBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgZWxlbS50ZXh0Q29udGVudCA9IGRhdGFbaV0uQ2l0eTtcclxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInZhcmlhbnRzLWxpc3RfX2l0ZW1cIik7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtKTtcclxuICAgIFxyXG4gICAgaSsrO1xyXG4gIH1cclxuICBcclxuICB2YXIgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICBsaXN0LmNsYXNzTGlzdC5hZGQoXCJ2YXJpYW50cy1saXN0XCIpO1xyXG4gIGxpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gIGxpc3QuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKFwidmFyaWFudHMtbGlzdF9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgY3VycmVudEVsZW0gPSBsaXN0LmZpcnN0Q2hpbGQ7XHJcbiAgXHJcbiAgcmV0dXJuIGxpc3Q7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNZXNzYWdlKHR5cGUsIGxpc3RTaXplLCBkYXRhTGVuZ3RoKSB7XHJcbiAgdmFyIG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIFxyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBcImFtb3VudFwiOlxyXG4gICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gXCLQn9C+0LrQsNC30LDQvdC+IFwiICsgbGlzdFNpemUgKyBcIiDQuNC3IFwiICsgZGF0YUxlbmd0aCArIFwiINC90LDQudC00LXQvdC90YvRhSDQs9C+0YDQvtC00L7Qsi4g0KPRgtC+0YfQvdC40YLQtSDQt9Cw0L/RgNC+0YEsINGH0YLQvtCx0Ysg0YPQstC40LTQtdGC0Ywg0L7RgdGC0LDQu9GM0L3Ri9C1LlwiO1xyXG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJtZXNzYWdlXCIpO1xyXG4gICAgICByZXR1cm4gbWVzc2FnZTsgICBcclxuICAgICAgICBcclxuICAgIGNhc2UgXCJub3QgZm91bmRcIjogXHJcbiAgICAgIG1lc3NhZ2UudGV4dENvbnRlbnQgPSBcItCd0LUg0L3QsNC50LTQtdC90L5cIjtcclxuICAgICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwibWVzc2FnZS0tbm90LWZvdW5kXCIpO1xyXG4gICAgICByZXR1cm4gbWVzc2FnZTsgICBcclxuICAgICAgXHJcbiAgICBjYXNlIFwic2VydmVyIGVycm9yXCI6IFxyXG4gICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gXCLQp9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LiDQn9GA0L7QstC10YDRjNGC0LUg0YHQvtC10LTQuNC90LXQvdC40LUg0YEg0LjQvdGC0LXRgNC90LXRgtC+0Lwg0Lgg0L/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1INGA0LDQt1wiO1xyXG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJtZXNzYWdlLS1zZXJ2ZXItZXJyb3JcIik7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlZnJlc2hCdG4oKSB7XHJcbiAgdmFyIHJlZnJlc2hCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHJlZnJlc2hCdG4udGV4dENvbnRlbnQgPSBcItCe0LHQvdC+0LLQuNGC0YxcIjtcclxuICByZWZyZXNoQnRuLmNsYXNzTGlzdC5hZGQoXCJidG4tLXJlZnJlc2gtYnRuXCIpO1xyXG4gIHJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGlucHV0SGFuZGxlci5iaW5kKGF1dG9jb21wbGl0ZUZpZWxkKSk7XHJcbiAgcmV0dXJuIHJlZnJlc2hCdG47XHJcbn07XHJcblxyXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihlbGVtKSB7XHJcbiAgd2hpbGUgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xyXG4gICAgZWxlbS5yZW1vdmVDaGlsZChlbGVtLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvanMvc2NyaXB0cy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9
