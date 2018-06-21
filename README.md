# iterop

Simple iterator and async iterator operators.

## Example

```js
import iterop from 'iterop';

iterop([1, 2, 3, 4, 5])
  .map(x => 2 ** x)
  .filter(x => x > 10)
  .forEach(console.log); // 16, 32
```

## Install

```sh
npm install iterop
```

## API

### `iterop(iterable)`

Creates an `iterop` wrapper around an iterable or async iterable.

```js
let iter = iterop([1, 2, 3]);
```

### `map(fn)`

Returns a new iterable which contains the results of calling the mapping function on each input value.

```js
iterop([1, 2, 3]).map(x => x ** 2);
```

### `filter(fn)`

Returns a new iterable which contains the values for which the supplied predicate returns true.

```js
iterop([1, 2, 3]).filter(x => x > 1);
```

### `forEach(fn)`

Executes a callback function for each input value.
