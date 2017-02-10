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
to-rgba-array(canvas).then(function(result) {
  assert(result instanceof Uint8ClampedArray);
});;
```

## API
See [here](docs/api.md).

