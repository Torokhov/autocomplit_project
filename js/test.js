describe("readData", function() {
  describe("readFromFile", function() {
    it("Получение строки с данными из файла", function() {
      assert.equal(readFromFile("js/data/dataExample.json"), '[{"Id": 0, "City": "г. Белинский"}, {"Id": 1, "City": "г. Каменка"}, {"Id": 2, "City": "ЗАТО п. Солнечный"}, {"Id": 3, "City": "р.п. Тамала"}, {"Id": 4, "City": "Антропшино (Сусанинское СП)"}, {"Id": 5, "City": "Адыгейск"}, {"Id": 6, "City": "Майкоп"}, {"Id": 7, "City": "Иткуловский 1-й"}]');
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
