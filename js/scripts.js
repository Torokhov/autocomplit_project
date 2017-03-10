
var autocompliteField = document.getElementById("autocomplite-field");
autocompliteField.autocompliteLogic = new Autocomplite("data/kladr.json");

var variants = document.getElementById("variants");

variants.onclick = function(event) {
  var target = event.target;
  
  if (target.tagName === "LI") {
    autocompliteField.value = target.textContent;
    this.removeChild(this.firstChild);
    this.classList.remove("variants-container--visible");
  }
};

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
  }
}

function removeChildren(elem) {
  while (elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
}
