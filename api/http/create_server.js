module.exports = function createServer(routes) {
  var server = require('http').createServer();

  function log(_) {
    if (!process.env.SHOW_LOGS) return;
    console.log(new Date(), _);
  }

  function mapUrlUsecase(request) {
    return routes[request.url];
  }

  function readRequestBody(request) {
    return new Promise(function (resolve) {
      request.body = [];
      request.on('data', function (data) {
        request.body.push(data.toString());
      });
      request.on('end', function () {
        var body = request.body.join('');
        try { body = JSON.parse(body); }
        catch { body = {}; }
        resolve(body);
      });
    });
  }

  function usecaseNotFound(response) {
    response.writeHead(404, {});
    response.end('');
  }

  server.on('request', async function (request, response) {
    var usecase = mapUrlUsecase(request);
    if (!usecase) return usecaseNotFound(response);
    var input = await readRequestBody(request);
    usecase(input)
      .then(function (output) {
        response.writeHead(200, {});
        response.end(JSON.stringify(output));
      })
      .catch(function (errors) {
        log(errors);
        response.writeHead(400, {});
        response.end(JSON.stringify(errors));
      });
  });

  return server;
};