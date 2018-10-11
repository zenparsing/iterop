import * as sym from './symbols.js';

export class SyncIter {
  constructor(source) {
    this._source = source;
  }

  [sym.iterator]() {
    return this._source[sym.iterator]();
  }

  do(generator) {
    return new this.constructor({
      [sym.iterator]: () => generator(this._source),
    });
  }

  map(fn) {
    return this.do(function*(iter) {
      for (let x of iter) {
        yield fn(x);
      }
    });
  }

  filter(fn) {
    return this.do(function*(iter) {
      for (let x of iter) {
        if (fn(x)) yield x;
      }
    });
  }

  forEach(fn) {
    for (let x of this) {
      fn(x);
    }
  }
}
