import Request from "./request.js"

export default class Autocomplite {
  constructor(path) {
    this.path = path;
    this.data = null;
  };

  getData(str) {
    this.data = this.setData(this.path).then(this.parse);

    return this.data.then(function(data) {
      const reg = new RegExp("^" + str, "ig");

      return data.filter(function(value) {
         return value.City.search(reg) >= 0;
      });
    });
  };

  setData() {
    const req = new Request();
    return req.get(this.path).then(function(text) {
      return text;
    }, function(error) {
      console.log("Fail to fetch data " + error);
    });
  };

  parse(text) {
    return JSON.parse(text);
  };
}
