const Canvas = require('isomorphic-canvas');
const getCanvasPixels = require('get-canvas-pixels');

/*
 * @return Promise<uint8Array>
 */
module.exports = function (frame) {
  console.log(frame);
  if (frame.constructor.name === 'Canvas') {
    return Promise.resolve(getCanvasPixels(frame));
  } else throw new Error ('unknown thing');
};
