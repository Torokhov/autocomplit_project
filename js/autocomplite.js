function Autocomplite() {
  var data;
  
  this.getData = function(path) {
    if (!data) {
      var req = new Request();
      data = req.get(path).then(function(text) {
        return text;
      }, function(error) {
        console.log("Fail to fetch data " + error);
      });
    }
    
    return data;
  };
}
