// XXX

// XXX this should be opt-in
if (false) {
  // 19.1.3.6
  let toString = Object.prototype.toString
  Object.prototype.toString = function () {
    return this[xSymbol.toStringTag]
      ? `[object${this[xSymbol.toStringTag]}]`
      : toString.call(this)
  }

  // 19.1.2.8 XXX
  defProp(Object, 'getOwnPropertySymbols', defValue(function (obj) {
    let results = []

    console.log('XXXXXXXXXX', Object.keys(obj))
    console.log('XXXXXXXXXX', Object.getOwnPropertyNames(obj))

    for (let key in obj) {
      console.log('*', key, typeof key, key instanceof xSymbol)
    }

    return results
  }))

  // XXX should be overridden to not return symbols
  // this should probably be opt-in. Or not included at all
  Object.getOwnPropertyNames
}
