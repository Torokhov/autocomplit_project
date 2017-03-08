describe("Чтение данных", function() {
  it("get", function() {
    get("data/dataExample.json").then(function(text) {
      var data = JSON.parse(text);
      assert.deepEqual(data, [
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
        }
      ]);
    });
  });
});
