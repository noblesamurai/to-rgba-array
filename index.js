/**
 * @module to-rgba-array
 */
const Canvas = require('@noblesam/canvas');

const getCanvasPixels = require('get-canvas-pixels');
const imageType = require('image-type');

/**
 * Convert an input image into a Uint8ClampedArray containing RGBA pixels.
 * @param {Canvas|Buffer} frame The input image.  Buffer can contain an image format
 *        (jpeg/png etc) or just RGBA pixels.
 * @param {string} type specify image type. If not specified we will attempt to
 *        guess what type to interpret the data as. If the frame is RAW data,
 *        use type 'raw' so we don't accidentally interpret it as a PNG or BMP
 *        file based on the first few bytes.
 * @returns {Uint8ClampedArray} The RGBA pixels.
 */
module.exports = function (frame, type) {
  // HACK(tim): not using instanceof b/c sometimes npm has different packages
  // in different places, esp. if you are using npm link. Using canvas as a
  // peer dependency attempts to get around this but in practice it is not
  // working out for me when using npm link.
  if (frame.constructor.name !== 'Canvas') {
    type = type || imageType(frame) || 'raw';
    if (type === 'raw') return new Uint8ClampedArray(frame);
    frame = imageToCanvas(frame);
  }
  return getCanvasPixels(frame);
};

function imageToCanvas (frame) {
  let img = new Canvas.Image();
  img.src = frame;
  let c = new Canvas(img.width, img.height);
  let ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return c;
}
