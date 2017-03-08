var autocompliteField = document.getElementById("autocomplite-field");

var variants = document.getElementById("variants");

variants.onclick = function(event) {
  var target = event.target;
  
  if (target.tagName === "LI") {
    autocompliteField.value = target.textContent;
    this.removeChild(this.firstChild);
  }
};

autocompliteField.addEventListener("input", function(event) {
  function f(text) {
    if (this.value) {
      var data = JSON.parse(text);
    
      var reg = new RegExp(this.value, "ig");
    
      data = data.filter(isRegularTrue);
    
      variants.textContent = "";
      variants.appendChild(CreateList(data));
      variants.classList.add("variants-container--visible");
    } else {
      variants.classList.remove("variants-container--visible");
    }
    
    function isRegularTrue(value) {
      return value.City.search(reg) > 0;
    };
    
    function CreateList(data) {
      var fragment = document.createDocumentFragment();
      var elem;
      
      data.forEach(function(value) {
        elem = document.createElement("li");
        elem.textContent = value.City;
        
        fragment.appendChild(elem);
      });
      
      var list = document.createElement("ul");
      list.appendChild(fragment);
      
      return list;
    };
  };
  
  var g = f.bind(this);
  
  get("data/kladr.json").then(g);
}); 