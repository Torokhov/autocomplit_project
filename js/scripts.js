var autocompliteField = document.getElementById("autocomplite-field");

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
  function f(text) {
    var data = JSON.parse(text);
    var reg = new RegExp(this.value, "ig");
    
    data = data.filter(isRegularTrue);
    
    if (data.length !== 0 && this.value) {
      variants.textContent = "";
      var listSize = variants.getAttribute("data-list-size");
      variants.appendChild(createList(data, listSize));
      
      if (data.length > listSize) {
        variants.appendChild(createMessage(listSize, data.length));  
      }
      
      variants.classList.add("variants-container--visible");
    } else {
      variants.classList.remove("variants-container--visible");
    }
    
    function isRegularTrue(value) {
      return value.City.search(reg) >= 0;
    };
    
    function createList(data, size) {
      var fragment = document.createDocumentFragment();
      var elem;
      if (data.length < size) {
        data.forEach(function(value) {
          elem = document.createElement("li");
          elem.textContent = value.City;
          elem.classList.add("variants-list__item");

          fragment.appendChild(elem);
        });
      } else {
        for (var i = 0; i < size; i++) {
          elem = document.createElement("li");
          elem.textContent = data[i].City;
          elem.classList.add("variants-list__item");
          
          fragment.appendChild(elem);
        }
      }
      
      var list = document.createElement("ul");
      list.classList.add("variants-list");
      list.appendChild(fragment);
      
      return list;
    };
    
    function createMessage(size, length) {
      var message = document.createElement("div");
      message.textContent = "Показано " + size + " из " + length + " найденных городов. Уточните запрос, чтобы увидеть остальные.";
      
      message.classList.add("message");
      
      return message;
    };
  };
  
  var g = f.bind(this);
  
  get("data/kladr.json").then(g);
}); 