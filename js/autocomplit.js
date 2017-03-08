function get(path) {
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
  xhr.send(null);
  });
}

function parse(path) {
  get(path).then(function(text) {
    return JSON.parse(text);
  }, function(error) {
    console.log("Failed to fetch: " + error);
  });
}
