'use strict'

const globalSymbolRegistryList = {}

// Aliases & Helpers
const make = Object.create
const defProps = Object.defineProperties
const defProp = Object.defineProperty
const defValue = (value, opts = {}) => {
  return {
    value,
    configurable: !!opts.c,
    writable: !!opts.w,
    enumerable: !!opts.e
  }
}
const isSymbol = (symbol) => {
  return symbol && symbol[xSymbol.toStringTag] === 'Symbol'
}

let supportsAccessors;
try {
  const x = defProp({}, 'y', { get: function () { return 1 } })
  supportsAccessors = x.y === 1
} catch (e) {
  supportsAccessors = false;
}

const id = {}
const uid = (desc) => {
  desc = String(desc)
  let x = ''
  let i = 0
  while (id[desc + x]) { x = i += 1 }
  id[desc + x] = 1

  const tag = `Symbol(${desc}${x})`

  /* istanbul ignore else */
  if (supportsAccessors) {
    // Make the symbols hidden to pre-es6 code
    defProp(Object.prototype, tag, {
      get: undefined,
      set: function (value) {
        defProp(this, tag, defValue(value, { c: true, w: true }))
      },
      configurable: true,
      enumerable: false
    })
  }

  return tag
}

// The base symbol
const SymbolProto = make(null)

// 19.4.1.1
function xSymbol(descString) {
  if (this instanceof xSymbol) {
    throw new TypeError('Symbol is not a constructor')
  }

  descString = descString === undefined ? '' : String(descString)

  const tag = uid(descString)

  return make(SymbolProto, {
    __description__: defValue(descString),
    __tag__: defValue(tag)
  })
}

defProps(xSymbol, {
  // 19.4.2.1
  for: defValue((key) => {
    const stringKey = String(key)

    if (globalSymbolRegistryList[stringKey]) {
      return globalSymbolRegistryList[stringKey]
    }

    const symbol = xSymbol(stringKey)
    globalSymbolRegistryList[stringKey] = symbol

    return symbol
  }),

  // 19.4.2.5
  keyFor: defValue((sym) => {
    if (!isSymbol(sym)) {
      throw new TypeError(`${sym} is not a symbol`)
    }

    for (let key in globalSymbolRegistryList) {
      if (globalSymbolRegistryList[key] === sym) {
        return globalSymbolRegistryList[key].__description__
      }
    }
  })
})

// 6.1.5.1
defProps(xSymbol, {
  hasInstance: defValue(xSymbol('hasInstance')),
  isConcatSpreadable: defValue(xSymbol('isConcatSpreadable')),
  iterator: defValue(xSymbol('iterator')),
  match: defValue(xSymbol('match')),
  replace: defValue(xSymbol('replace')),
  search: defValue(xSymbol('search')),
  species: defValue(xSymbol('species')),
  split: defValue(xSymbol('split')),
  toPrimitive: defValue(xSymbol('toPrimitive')),
  toStringTag: defValue(xSymbol('toStringTag')),
  unscopables: defValue(xSymbol('unscopables'))
})

// 19.4.3
defProps(SymbolProto, {
  constructor: defValue(xSymbol),

  // 19.4.3.2
  toString: defValue(function () {
    return this.__tag__
  }),

  // 19.4.3.3
  valueOf: defValue(function () {
    return `Symbol(${this.__description__})`
  })
})

// 19.4.3.5
/* istanbul ignore else */
if (supportsAccessors) {
  defProp(SymbolProto, xSymbol.toStringTag, defValue('Symbol', { c: true }))
}

export default typeof Symbol === 'function' ? Symbol : xSymbol
