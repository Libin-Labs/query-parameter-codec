import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('parses single and repeated keys', () => {
  assert.deepEqual(api.parseQuery('?x=1&tag=a&tag=b'), { x: '1', tag: ['a', 'b'] });
});
test('decodes plus as space', () => {
  assert.deepEqual(api.parseQuery('q=hello+world'), { q: 'hello world' });
});
test('serializes spaces and symbols', () => {
  assert.equal(api.stringifyQuery({ q: 'a b&c' }), 'q=a+b%26c');
});
test('serializes repeated values', () => {
  assert.equal(api.stringifyQuery({ tag: ['a', 'b'] }), 'tag=a&tag=b');
});
test('handles empty and prototype-like keys', () => {
  assert.equal(api.stringifyQuery({}), '');
  const parsed = api.parseQuery('__proto__=x&constructor=y');
  assert.equal(Object.getPrototypeOf(parsed), Object.prototype);
  assert.equal(parsed.__proto__, 'x');
  assert.equal(parsed.constructor, 'y');
});
test('rejects non-string query', () => {
  assert.throws(() => api.parseQuery(2), TypeError);
});
