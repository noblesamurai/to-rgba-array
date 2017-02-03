const expect = require('chai').expect;
const toRGBAArray = require('..');
const Canvas = require('canvas');
const range = require('lodash.range');
const fs = require('fs');
const path = require('path');

describe('to-rgba-array', function () {
  it('will work with a canvas', function () {
    var canvas = new Canvas(200, 200);
    return toRGBAArray(canvas).then(function (result) {
      expect(result).to.be.a('Uint8ClampedArray');
    });
  });
  it('will work with a PNG image', function () {
    var png = fs.readFileSync(path.resolve(__dirname, 'fixtures', 'watermark-color.png'));
    return toRGBAArray(png).then(function (result) {
      expect(result).to.be.a('Uint8ClampedArray');
    });
  });
  it('benchmark', function () {
    let png = fs.readFileSync(path.resolve(__dirname, 'fixtures', 'watermark-color.png'));
    let image = new Canvas.Image();
    image.src = png;
    let canvas = new Canvas(image.width, image.height);
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    console.log(canvas instanceof Canvas.constructor, canvas.constructor.name);
    let canvasIterations = range(100).map(() => toRGBAArray(canvas));
    let imageIterations = range(100).map(() => toRGBAArray(png));
    return Promise.all(canvasIterations.concat(imageIterations)).then(function (results) {
      EP.report(true);
    });
  });
});
