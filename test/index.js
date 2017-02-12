const expect = require('chai').expect;
const toRGBAArray = require('..');
const Canvas = require('canvas');
const PNG = require('pngjs').PNG;
const ImageData = Canvas.ImageData;

describe('to-rgba-array', function () {
  let testImage = Buffer.from(
    [ 200, 100, 200, 1, 100, 200, 200, 255, 200, 100, 200, 255,
      200, 100, 200, 255, 100, 200, 200, 255, 200, 100, 200, 255,
      200, 100, 200, 255, 100, 200, 200, 255, 200, 100, 200, 255
    ]);
  it('will work with a canvas', function () {
    // Note that there is a slight difference between the input and output for
    // the non 255 alpha value (pixel 1).
    // This is due to the fact that we are using a canvas and the
    // pre-multplication of alpha values and reversal thereof is a lossy process.
    // Here we are going to canvas twice.., hence the three zeros in a row for
    // pixel one.
    // In practice I don't think this will be a major problem.
    let expectedImage = Buffer.from(
      [ 0, 0, 0, 1, 100, 200, 200, 255, 200, 100, 200, 255,
        200, 100, 200, 255, 100, 200, 200, 255, 200, 100, 200, 255,
        200, 100, 200, 255, 100, 200, 200, 255, 200, 100, 200, 255
      ]);

    const width = 3;
    const height = 3;
    let canvas = new Canvas(width, height);
    let ctx = canvas.getContext('2d');
    let imageData = new ImageData(new Uint8ClampedArray(testImage), ctx.canvas.width, ctx.canvas.height);
    ctx.putImageData(imageData, 0, 0);

    return toRGBAArray(canvas).then(function (result) {
      expect(Buffer.from(result).length).to.equal(testImage.length);
      expect(Buffer.from(result)).to.eql(expectedImage);
    });
  });

  it('will work with a PNG image', function () {
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
