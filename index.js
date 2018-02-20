/**
 * @module to-rgba-array
 */
const Canvas = require('canvas');

const getCanvasPixels = require('get-canvas-pixels');
const imageType = require('image-type');
const debug = require('debug')('to-rgba-array');
// require('easy-profiler');

/**
 * Convert an input image into a Uint8ClampedArray containing RGBA pixels.
 * @param {Canvas|Buffer} frame The input image.  Buffer can contain an image format
 *        (jpeg/png etc) or just RGBA pixels.
 * @returns {Uint8ClampedArray} The RGBA pixels.
 */
module.exports = function (frame) {
  let mode;
  let canvas;
  function setMode (name) {
    mode = name;
    debug('to-rgba-array', mode);
  }
  // HACK(tim): not using instanceof b/c sometimes npm has different packages
  // in different places, esp. if you are using npm link. Using canvas as a
  // peer dependency attempts to get around this but in practice it is not
  // working out for me when using npm link.
  if (frame.constructor.name === 'Canvas') {
    setMode('canvas');
    canvas = frame;
  } else {
    let type = imageType(frame);
    if (type) setMode('image');
    else {
      setMode('buffer');
      return new Uint8ClampedArray(frame);
    }
    canvas = imageToCanvas(frame);
  }
  if (!mode) {
    throw new Error('unknown input format');
  }

  var pixels = getCanvasPixels(canvas);
  return pixels;
};

function imageToCanvas (frame) {
  let img = new Canvas.Image();
  img.src = frame;
  let c = new Canvas(img.width, img.height);
  let ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return c;
}
