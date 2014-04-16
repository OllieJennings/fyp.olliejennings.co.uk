module('API', {

  setup: function () {
      },
  teardown: function () {
    delete response;
  }
});



test('exists', function () {
  ok(assert.isObj(api), 'There is an API module');
});


test('API.extract.collection', function () {
  ok(assert.isFun(api.extract.collection), 'API extract collection is a function');

  ok(!api.extract.collection(''), 'Rejects bad arguments');
  ok(!api.extract.collection({}), 'Only accepts non-empty objects');

  var response = {
      key: 12345689
    };


  ok(!api.extract.collection(response), "Rejects if song array doesn't exists");

   response = {
      key: 12345689,
      songs: []
    };

  ok(!api.extract.collection(response), "Rejects if song array is empty");
});



test('API.extract.key', function () {
  ok(assert.isFun(api.extract.key), 'API extract key is a function');
  
  ok(!api.extract.key('', {}), 'Rejects bad arguements');
  
   var response = {
      key: 123456789,
      songs: [
        {
          title: 'Timber',
          artist: 'Pitbull',
          valence: 0.81,
          energy: 074
        }
      ]
    };

  ok(!api.extract.key(response, 1359), 'Rejects non-matching keys');
  ok(api.extract.key(response, 123456789), 'Accepts matching keys');
});
