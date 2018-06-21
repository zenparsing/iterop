import * as sym from './symbols.js';
import { SyncIterOp } from './SyncIterOp.js';
import { AsyncIterOp } from './AsyncIterOp.js';

function iterop(iter) {
  if (typeof iter[sym.asyncIterator] === 'function') {
    return new AsyncIterOp(iter);
  }
  if (typeof iter[sym.iterator] === 'function') {
    return new SyncIterOp(iter);
  }
  throw new TypeError(`${ iter } is not iterable`);
}


export default iterop;
