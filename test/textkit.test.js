import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, titleCase, wordCount } from '../src/textkit.js';

test('slugify lowercases and hyphenates', () => {
  assert.equal(slugify('Hello, World!'), 'hello-world');
});

test('slugify strips accents', () => {
  assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
});

test('slugify trims leading and trailing separators', () => {
  assert.equal(slugify('  --Hi there--  '), 'hi-there');
});

test('slugify handles an empty string', () => {
  assert.equal(slugify(''), '');
});

test('titleCase capitalises each word', () => {
  assert.equal(titleCase('hello world'), 'Hello World');
});

test('titleCase keeps apostrophes within words and capitalises hyphenated parts', () => {
  assert.equal(titleCase("don't stop"), "Don't Stop");
  assert.equal(titleCase('well-known fact'), 'Well-Known Fact');
  assert.equal(titleCase('l’amour'), 'L’amour');
});

test('titleCase handles an empty string', () => {
  assert.equal(titleCase(''), '');
});

test('wordCount counts words and treats hyphenated words as one', () => {
  assert.equal(wordCount('A well-known author wrote the story.'), 6);
});

test('wordCount returns zero when no words are present', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount(' \t\n '), 0);
  assert.equal(wordCount('...---!!!'), 0);
});

test('wordCount handles apostrophes, Unicode, numbers, and mixed whitespace', () => {
  assert.equal(wordCount("L’amour and don't eat crème-brûlée; 42."), 6);
});
