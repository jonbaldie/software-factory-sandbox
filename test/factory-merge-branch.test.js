import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('factory merge smoke preserves the branch update', () => {
  const fixture = JSON.parse(readFileSync(new URL('../smoke-merge.json', import.meta.url), 'utf8'));
  assert.equal(fixture.branch, "20261004-060726-m3");
});
