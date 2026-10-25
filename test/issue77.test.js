import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('issue77 marker is correct', () => {
  const marker = JSON.parse(readFileSync(new URL('../issue77-marker.json', import.meta.url)));
  assert.equal(marker.value, 'correct');
});
