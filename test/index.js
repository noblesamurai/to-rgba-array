const expect = require('chai').expect;
const toRGBAArray = require('..');
const Canvas = require('canvas');
const PNG = require('pngjs').PNG;

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
    let testImage = Buffer.from(
      [ 200, 100, 200, 1, 100, 200, 200, 255, 200, 100, 200, 255,
        200, 100, 200, 255, 100, 200, 200, 255, 200, 100, 200, 255,
        200, 100, 200, 255, 100, 200, 200, 255, 200, 100, 200, 255
      ]);

    // Note that there is a slight difference between the input and output for
    // the non 255 alpha value (pixel 1).
    // This is due to the fact that we are using a canvas and the
    // pre-multplication of alpha values and reversal thereof is a lossy process.
    // In practice I don't think this will be a major problem.
    let expectedImage = Buffer.from(
      [ 254, 0, 254, 1, 100, 200, 200, 255, 200, 100, 200, 255,
        200, 100, 200, 255, 100, 200, 200, 255, 200, 100, 200, 255,
        200, 100, 200, 255, 100, 200, 200, 255, 200, 100, 200, 255
      ]);

    var png = new PNG({ width: 3, height: 3 });
    png.data = testImage;
    return toRGBAArray(PNG.sync.write(png)).then(function (result) {
      expect(Buffer.from(result).length).to.equal(testImage.length);
      expect(Buffer.from(result)).to.eql(expectedImage);
    });
  });
});
