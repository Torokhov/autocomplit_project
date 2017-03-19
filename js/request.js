function Request() {
  this.get = function(path) {
    return new Promise(function(succeed, fail) {
      var xhr = new XMLHttpRequest();
  
      xhr.open('GET', path, true);
      xhr.addEventListener("load", function() {
        if (xhr.status < 400) {
          succeed(xhr.responseText);
        } else {
          fail(new Error("Request failed: " + xhr.statusText));
        }
      });
  
      xhr.addEventListener("error", function() {
        fail(new Error("Network error"));
      });
      
//      setTimeout(function() {xhr.send(null)}, 10000);
      xhr.send(null)
    });
  }
}
