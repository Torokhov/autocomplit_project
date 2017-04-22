webpackJsonp([0,3],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	function Autocomplite(path) {
	  this.path = path;
	  var data;

	  this.getData = function (str) {
	    data = setData(this.path).then(parse);

	    return data.then(function (data) {
	      var reg = new RegExp("^" + str, "ig");

	      return data.filter(function (value) {
	        return value.City.search(reg) >= 0;
	      });
	    });
	  };

	  function setData(path) {
	    var req = new Request();
	    return req.get(path).then(function (text) {
	      return text;
	    }, function (error) {
	      console.log("Fail to fetch data " + error);
	    });
	  };

	  function parse(text) {
	    return JSON.parse(text);
	  };
	}

/***/ })
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsaXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2pzL2F1dG9jb21wbGl0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBBdXRvY29tcGxpdGUocGF0aCkge1xyXG4gIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgdmFyIGRhdGE7XHJcbiAgXHJcbiAgdGhpcy5nZXREYXRhID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICBkYXRhID0gc2V0RGF0YSh0aGlzLnBhdGgpLnRoZW4ocGFyc2UpO1xyXG4gIFxyXG4gICAgcmV0dXJuIGRhdGEudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiXlwiICsgc3RyLCBcImlnXCIpO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGRhdGEuZmlsdGVyKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgIHJldHVybiB2YWx1ZS5DaXR5LnNlYXJjaChyZWcpID49IDA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBcclxuICBmdW5jdGlvbiBzZXREYXRhKHBhdGgpIHtcclxuICAgIHZhciByZXEgPSBuZXcgUmVxdWVzdCgpO1xyXG4gICAgcmV0dXJuIHJlcS5nZXQocGF0aCkudGhlbihmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJGYWlsIHRvIGZldGNoIGRhdGEgXCIgKyBlcnJvcik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHBhcnNlKHRleHQpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xyXG4gIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2pzL2F1dG9jb21wbGl0ZS5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
