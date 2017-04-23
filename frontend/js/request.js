export default class Request {
  get(path) {
    return new Promise(function(succeed, fail) {
      const xhr = new XMLHttpRequest();

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

      xhr.send(null)
    });
  }
}
