import * as sym from './symbols.js';

export class AsyncIter {
  constructor(source) {
    this._source = source;
  }

  [sym.asyncIterator]() {
    return this._source[sym.asyncIterator]();
  }

  do(generator) {
    return new this.constructor({
      [sym.asyncIterator]: () => generator(this._source),
    });
  }

  map(fn) {
    return this.do(async function*(iter) {
      for await (let x of iter) {
        yield fn(x);
      }
    });
  }

  filter(fn) {
    return this.do(async function*(iter) {
      for await (let x of iter) {
        if (fn(x)) yield x;
      }
    });
  }

  async forEach(fn) {
    for await (let x of this) {
      fn(x);
    }
  }
}
