const Canvas = require('canvas');

const getCanvasPixels = require('get-canvas-pixels');
const imageType = require('image-type');
const getPixels = require('get-pixels');
require('easy-profiler');

/*
 * @return Promise<uint8Array>
 */
module.exports = function (frame) {
  let mode;
  let canvas;
  function setMode (name) {
    mode = name;
    EP.begin(mode); // profiling
  }
  if (frame.constructor.name === 'Canvas') {
    setMode('canvas');
    canvas = frame;
  } else {
    let type = imageType(frame);
    if (type) setMode('image');
    canvas = imageToCanvas(frame);
  }
  if (!mode) {
    throw new Error ('unknown input format');
  }

  var result = getCanvasPixels(canvas);
  EP.end(mode);
  return Promise.resolve(result);
};

function imageToCanvas (frame) {
  let img = new Canvas.Image();
  img.src = frame;
  let c = new Canvas(img.width, img.height);
  let ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return c;
}