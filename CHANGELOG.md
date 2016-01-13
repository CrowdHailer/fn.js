## Unreleased

Notes:
  1. fn.js is moving to drop support for legacy browsers, browsers which do not implement ES5 collection methods will all be considered legacy.
    Therefore collection functions that have a native counterpart on array are to be depreciated.

Deprecations:
  - [cloneArray] This functionality is available through the use of `toArray(collection)`.
  - [each] [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) is defined as part of the ES5 specification.
  - [filter] [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) is defined as part of the ES5 specification.
  - [map] [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) is defined as part of the ES5 specification.
  - [reduce] [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) is defined as part of the ES5 specification.
  - [reverse] [`Array.prototype.reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) is defined as part of the ES5 specification.
  - [op] These were never documented and have been removed from tests.
  - [properties] [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) is defined as part of the ES5 specification and offers all functionality that was offered by `fn.properties`.
