const expect = require('chai').expect;
const toRGBAArray = require('..');
const Canvas = require('isomorphic-canvas');

describe('my thing', function () {
  it('should work', function () {
    var canvas = new Canvas(200, 200);
    console.log(canvas instanceof Canvas.constructor, canvas.constructor.name);
    return toRGBAArray(canvas).then(function (result) {
      expect(result).to.be.a('Uint8ClampedArray');
    });
  });
});
