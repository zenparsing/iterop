import * as sym from './symbols.js';
import { SyncIter } from './SyncIter.js';
import { AsyncIter } from './AsyncIter.js';

function iterop(iter) {
  if (typeof iter[sym.asyncIterator] === 'function') {
    return new AsyncIter(iter);
  }
  if (typeof iter[sym.iterator] === 'function') {
    return new SyncIter(iter);
  }
  throw new TypeError(`${ iter } is not iterable`);
}

iterop.async = function(iter) {
  if (typeof iter[sym.asyncIterator] === 'function') {
    return new AsyncIter(iter);
  }
  if (typeof iter[sym.iterator] === 'function') {
    return new AsyncIter(async function*() {
      for (let x of iter) {
        yield x;
      }
    }());
  }
};

export default iterop;
