import iterop from '../src/default.js';
import * as assert from 'assert';

let result = [];

function gather() {
  result = [];
  return function(value) { result.push(value); };
}

async function* asyncList(...args) {
  for (let x of args) yield x;
}

async function main() {
  iterop([1, 2, 3, 4, 5])
    .map(x => x ** 2)
    .filter(x => x > 4)
    .forEach(gather());
  assert.deepEqual(result, [9, 16, 25]);

  await iterop(asyncList(1, 2, 3, 4, 5))
    .map(x => x ** 2)
    .filter(x => x > 4)
    .forEach(gather());
  assert.deepEqual(result, [9, 16, 25]);

  await iterop.async([1, Promise.resolve(2), 3])
    .map(x => x * 2)
    .forEach(gather());
  assert.deepEqual(result, [2, 4, 6]);

  console.log('OK');
}

main();
