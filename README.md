# es-symbol

> A spec-compliant as much as it could be, small, and tested ES6 Symbol implementation.

* No unnecessary dependencies
* Works in node + browser
* Uses native `Symbol` if possible otherwise exports a polyfill

## Usage

```sh
npm install es-symbol
```

```js
var Symbol = require('es-symbol')

var sym = Symbol('foo')

var obj = {}
obj[sym] = 'hello'

// The following are true
obj.foo === undefined
obj[sym] === 'hello'
```

Disclaimer: This depends on ES5. If you need to support legacy browsers consider using an ES5 shim.

## More information

[Symbol Spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-symbol-constructor)

[Symbols in ECMAScript 6](http://www.2ality.com/2014/12/es6-symbols.html)

## License

[![MIT](https://img.shields.io/npm/l/alt.svg?style=flat)](http://josh.mit-license.org)
