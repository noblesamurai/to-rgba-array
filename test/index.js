const expect = require('chai').expect;
const toRGBAArray = require('..');
const Canvas = require('canvas');
const fs = require('fs');
const path = require('path');

describe('to-rgba-array', function () {
  it('will work with a canvas', function () {
    const width = 200;
    const height = 200;
    var canvas = new Canvas(width, height);
    return toRGBAArray(canvas).then(function (result) {
      expect(result).to.be.a('Uint8ClampedArray');
      expect(result.length).to.equal(width * height * 4);
    });
  });
  it('will work with a PNG image', function () {
    var png = fs.readFileSync(path.resolve(__dirname, 'fixtures', 'watermark-color.png'));
    return toRGBAArray(png).then(function (result) {
      expect(result).to.be.a('Uint8ClampedArray');
    });
  });
});
