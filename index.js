const Canvas = require('isomorphic-canvas'),
      getCanvasPixels = require('get-canvas-pixels');

/*
 * @return Promise<uint8Array>
 */
module.exports = function(frame) {
  if (frame instanceof Canvas) {
    return Promise.resolve(getCanvasPixels(frame));
  }
}
