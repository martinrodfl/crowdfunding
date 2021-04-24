function makeApiRequest(config) {
  return new Promise(function (resolve) {
    var apiUrl = 'http://localhost:8081';
    fetch(`${apiUrl}${config.path}`, {
      method: 'POST',
      body: config.body
    })
      .then(function (response) { return response.json(); })
      .then(function (json) { resolve(json); });
  });
}