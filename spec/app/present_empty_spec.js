describe('presentEmpty', function () {
  var fn = require('../../app/present_empty.js');

  it('presents empty', function (done) {
    fn(Math.random()).then(function (output) {
      expect(output).toEqual({});
      done();
    });
  });
});