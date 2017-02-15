function readFromFile(path) {
  var xhr = new XMLHttpRequest();
  
  xhr.open('GET', path, false);
  xhr.send();
  
  if (xhr.status != 200) {
      console.log('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
      return;
  } else {
    return xhr.responseText;
  }
}
