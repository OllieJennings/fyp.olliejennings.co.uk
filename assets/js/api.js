var api = {};
api.clientKey = {};
api.get = {};
api.extract = {};



api.clientKey.post = function (clientKey) {
  $.ajax({
    type: 'POST',
    url: '0.0.0.0:3000',
    data: { key: clientKey }
  }).done(function (response) {
    if (api.extract.key(response, clientKey)) {
      console.log('The client key is valid');
      if (api.extract.collection(response)) {
        console.log('visualisation of collection has begun');
      }
    }
  });
};


// takes response and extracts the songs, returns true if done and false if not
// also passes the collection onto the visualisation engine
api.extract.collection = function (response) {
  if (assert.isObj(response) && !assert.isEmptyObj(response) && assert.objHas(response, 'songs') && !assert.isEmptyArr(response.songs)) {
    //visEngine.init(response.songs);
    return true;
  }
  return false;
};

// makes sure the key field exists, then compares it with the client key
api.extract.key = function (response, clientKey) {
  if (assert.isObj(response) && assert.isNum(clientKey) && assert.objHas(response, 'key')) {
    if (assert.isEq(response.key, clientKey)) {
      return true;
    }
    return false;
  }
  return false;
};
