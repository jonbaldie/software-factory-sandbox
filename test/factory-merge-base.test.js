import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('factory merge smoke preserves the base update', () => {
  const fixture = JSON.parse(readFileSync(new URL('../smoke-merge.json', import.meta.url), 'utf8'));
  assert.equal(fixture.base, "20261004-075114-m5-human");
});
