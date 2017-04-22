function Autocomplite(path) {
  this.path = path;
  var data;

  this.getData = function(str) {
    data = setData(this.path).then(parse);

    return data.then(function(data) {
      var reg = new RegExp("^" + str, "ig");

      return data.filter(function(value) {
         return value.City.search(reg) >= 0;
      });
    });
  };

  function setData(path) {
    var req = new Request();
    return req.get(path).then(function(text) {
      return text;
    }, function(error) {
      console.log("Fail to fetch data " + error);
    });
  };

  function parse(text) {
    return JSON.parse(text);
  };
}
