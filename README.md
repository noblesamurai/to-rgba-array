# To-rgba-array [![Build Status](https://secure.travis-ci.org/noblesamurai/to-rgba-array.png?branch=master)](http://travis-ci.org/noblesamurai/to-rgba-array) [![NPM version](https://badge-me.herokuapp.com/api/npm/to-rgba-array.png)](http://badges.enytc.com/for/npm/to-rgba-array)

> Convert a variety of formats to an rgba array.

## Purpose
Basically used to make plugins etc input format agnostic.
Give it a canvas, an image in a buffer, a buffer with RGBA pixels, and it'll
ensure you have a `Uint8ClampedArray` out.

## Usage
```javascript
var toRGBAArray = require('to-rgba-array');
var assert = require('assert');

var canvas = new Canvas(200,200);
const result = toRGBAArray(canvas);
assert(result instanceof Uint8ClampedArray);
```

## API
<a name="module_to-rgba-array"></a>

## to-rgba-array
<a name="exp_module_to-rgba-array--module.exports"></a>

### module.exports(frame) ⇒ <code>Uint8ClampedArray</code> ⏏
Convert an input image into a Uint8ClampedArray containing RGBA pixels.

**Kind**: Exported function
**Returns**: <code>Uint8ClampedArray</code> - The RGBA pixels.

| Param | Type | Description |
| --- | --- | --- |
| frame | <code>Canvas</code> &#124; <code>Buffer</code> | The input image.  Buffer can contain an image format        (jpeg/png etc) or just RGBA pixels. |

Note: To regenerate this section from the jsdoc run `npm run docs` and paste
the output above.
