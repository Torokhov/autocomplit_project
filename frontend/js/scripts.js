import {Autocomplite} from "./autocomplite.js"

var autocompliteField = document.getElementById("autocomplite-field");
autocompliteField.autocompliteLogic = new Autocomplite("data/kladr.json");

var error = document.getElementById("error-message");
var variants = document.getElementById("variants");
var currentElem = null;

variants.onclick = function(event) {
  var target = event.target;

  if (target.tagName === "LI") {
    autocompliteField.value = target.textContent;
    this.classList.remove("variants-container--visible");
  }
};

variants.onmouseover = function(event) {
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
}

variants.onmouseout = function(event) {
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

autocompliteField.onfocus = function() {
  this.select();
  this.classList.remove("text-field--error");
  error.classList.remove("error--visible");
};

autocompliteField.onblur = function() {
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
    return [].filter.call(list, function(elem) {
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

    this.autocompliteLogic.getData(this.value).then(function(data) {
      removeChildren(variants);

      if (data.length > listSize) {
        variants.insertBefore(createMessage("amount", listSize, data.length), loader);
      }

      if (data.length > 0) {
        return createList(data);
      }
    }, function() {
      loader.classList.add("loader-wrapper--visible");
      if (variants.querySelector(".message--server-error")) {
        variants.querySelector(".btn--refresh-btn").style.display = "none";
        variants.querySelector(".message--server-error").style.display = "none";
      }
      setTimeout(function() {
        loader.classList.remove("loader-wrapper--visible")
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
    }).then(function(list) {
      if (list) {
        if (variants.querySelector(".variants-list")) {
          variants.removeChild(variants.querySelector(".variants-list"));
        }

        loader.classList.remove("loader-wrapper--visible")
        variants.insertBefore(list, variants.firstChild);
        setPosition();
      } else {
        throw new Error("not data");
      }

    }, function(e) {
      return e;
    }).then(null , function(e) {
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
      variants.style.top = autocompliteField.offsetHeight + 3 +"px";
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
