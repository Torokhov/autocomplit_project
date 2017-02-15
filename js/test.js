describe("readData", function() {
  describe("readFromFile", function() {
    it("Получение строки с данными из файла", function() {
      assert.equal(readFromFile("http://127.0.0.1:65077/data/dataExample.json"), '[\r\n    {\r\n      "Id": 0,\r\n      "City": "г. Белинский"\r\n    },\r\n    {\r\n      "Id": 1,\r\n      "City": "г. Каменка"\r\n    },\r\n    {\r\n      "Id": 2,\r\n      "City": "ЗАТО п. Солнечный"\r\n    },\r\n    {\r\n      "Id": 3,\r\n      "City": "р.п. Тамала"\r\n    },\r\n    {\r\n      "Id": 4,\r\n      "City": "Антропшино (Сусанинское СП)"\r\n    },\r\n    {\r\n      "Id": 5,\r\n      "City": "Адыгейск"\r\n    },\r\n    {\r\n      "Id": 6,\r\n      "City": "Майкоп"\r\n    },\r\n    {\r\n      "Id": 7,\r\n      "City": "Иткуловский 1-й"\r\n    }\r\n]\r\n');
    });
  });
  
  describe("parse", function() {
    it("Парсинг данных", function() {
      assert.equal(parse('[{"Id": 0, "City": "г. Белинский"}, {"Id": 1, "City": "г. Каменка"}, {"Id": 2, "City": "ЗАТО п. Солнечный"}]'), [
        {
          "Id": 0,
          "City": "г. Белинский"
        },
        {
          "Id": 1,
          "City": "г. Каменка"
        },
        {
          "Id": 2,
          "City": "ЗАТО п. Солнечный"
        }]);
    });
  });
  
  it("Чтение данных", function() {
    assert.deepEqual(readData("js/data/dataExample.json"), [
    {
      "Id": 0,
      "City": "г. Белинский"
    },
    {
      "Id": 1,
      "City": "г. Каменка"
    },
    {
      "Id": 2,
      "City": "ЗАТО п. Солнечный"
    },
    {
      "Id": 3,
      "City": "р.п. Тамала"
    },
    {
      "Id": 4,
      "City": "Антропшино (Сусанинское СП)"
    },
    {
      "Id": 5,
      "City": "Адыгейск"
    },
    {
      "Id": 6,
      "City": "Майкоп"
    },
    {
      "Id": 7,
      "City": "Иткуловский 1-й"
    }]);
  });
});
