webpackJsonp([1,3],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	function Request() {
	  this.get = function (path) {
	    return new Promise(function (succeed, fail) {
	      var xhr = new XMLHttpRequest();

	      xhr.open('GET', path, true);
	      xhr.addEventListener("load", function () {
	        if (xhr.status < 400) {
	          succeed(xhr.responseText);
	        } else {
	          fail(new Error("Request failed: " + xhr.statusText));
	        }
	      });

	      xhr.addEventListener("error", function () {
	        fail(new Error("Network error"));
	      });

	      xhr.send(null);
	    });
	  };
	}

/***/ })
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9mcm9udGVuZC9qcy9yZXF1ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIFJlcXVlc3QoKSB7XHJcbiAgdGhpcy5nZXQgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24oc3VjY2VlZCwgZmFpbCkge1xyXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgXHJcbiAgICAgIHhoci5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICBzdWNjZWVkKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmYWlsKG5ldyBFcnJvcihcIlJlcXVlc3QgZmFpbGVkOiBcIiArIHhoci5zdGF0dXNUZXh0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICBcclxuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmYWlsKG5ldyBFcnJvcihcIk5ldHdvcmsgZXJyb3JcIikpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHhoci5zZW5kKG51bGwpXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2pzL3JlcXVlc3QuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
