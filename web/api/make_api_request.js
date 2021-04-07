function makeApiRequest(config) {
  return new Promise(function (resolve) {
    var apiUrl = 'https://google.com';
    fetch(`${apiUrl}${config.path}`, {
      method: 'POST',
      body: config.body
    })
      .then(function (response) {
        resolve(response);
      })
  });
}