
var autocompliteField = document.getElementById("autocomplite-field");
autocompliteField.autocompliteLogic = new Autocomplite("data/kladr.json");

var error = document.getElementById("error-message");

var variants = document.getElementById("variants");

variants.onclick = function(event) {
  var target = event.target;
  
  if (target.tagName === "LI") {
    autocompliteField.value = target.textContent;
    this.classList.remove("variants-container--visible");
  }
};

autocompliteField.onfocus = function() {
  this.select();
  this.classList.remove("text-field--error");
  error.classList.remove("error--visible");
};

autocompliteField.onblur = function() {
  var fullfilled = showError.bind(this);
  var onblurFunc = (function() {
    this.autocompliteLogic.isValid(this.value).then(fullfilled)
  }).bind(this);
  setTimeout(onblurFunc, 170);
 
  function showError(res) {
    if (!res || !this.value) {
      this.classList.add("text-field--error");
      variants.classList.remove("variants-container--visible");
      error.classList.add("error--visible");
    } 
  };
}

autocompliteField.addEventListener("input", function(event) {
  var listSize = variants.getAttribute("data-list-size");
  
  if (this.value) {
    this.autocompliteLogic.getData(this.value).then(function(data) {
      removeChildren(variants);
      variants.classList.add("variants-container--visible");
      
      if (data.length > listSize) {
        variants.appendChild(createMessage("amount", listSize, data.length));
      }
      
      if (data.length > 0) {
        return createList(data);
      }
    }).then(function(list) {
      variants.insertBefore(list, variants.firstChild);
    }).then(function() {} , function() {
      variants.appendChild(createMessage("not found"));
    });
  } else {
    variants.classList.remove("variants-container--visible");
  }
}); 

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
      message.classList.add("message--amount");
      return message;   
      
    case "error": 
      message.textContent = "Выберите значение из списка";
      message.classList.add("message--error");
      return message;
  }
};

function removeChildren(elem) {
  while (elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
}
