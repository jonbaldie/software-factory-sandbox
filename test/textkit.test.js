import { test } from 'node:test';
import assert from 'node:assert/strict';
import { camelCase, kebabCase, pascalCase, snakeCase, slugify, titleCase, truncate, wordCount } from '../src/textkit.js';

test('kebabCase converts spaces and lower-to-upper boundaries to lowercase hyphenated words', () => {
  assert.deepEqual([kebabCase('Hello World'), kebabCase('fooBarBaz')], ['hello-world', 'foo-bar-baz']);
});

test('kebabCase treats repeated separators as one and drops empty words', () => {
  assert.equal(kebabCase('  --foo__BAR--  '), 'foo-bar');
});

test('kebabCase returns empty for empty and whitespace-only input', () => {
  assert.deepEqual([kebabCase(''), kebabCase(' \t\n ')], ['', '']);
});

test('snakeCase converts spaces and lower-to-upper boundaries to lowercase underscore-separated words', () => {
  assert.deepEqual([snakeCase('Hello World'), snakeCase('fooBarBaz')], ['hello_world', 'foo_bar_baz']);
});

test('snakeCase treats repeated separators as one and drops empty words', () => {
  assert.equal(snakeCase('  --foo__BAR--  '), 'foo_bar');
});

test('snakeCase returns empty for empty and whitespace-only input', () => {
  assert.deepEqual([snakeCase(''), snakeCase(' \t\n ')], ['', '']);
});

test('pascalCase joins words and capitalises each word', () => {
  assert.deepEqual(
    [pascalCase('hello world'), pascalCase('foo-bar_baz'), pascalCase('fooBarBaz')],
    ['HelloWorld', 'FooBarBaz', 'FooBarBaz'],
  );
});

test('pascalCase capitalises supplementary Unicode letters', () => {
  assert.equal(pascalCase('\u{10428}word'), '\u{10400}word');
});

test('pascalCase treats repeated separators as one and drops empty words', () => {
  assert.equal(pascalCase('  --foo__BAR--  '), 'FooBar');
});

test('pascalCase returns empty for empty and whitespace-only input', () => {
  assert.deepEqual([pascalCase(''), pascalCase(' \t\n ')], ['', '']);
});

test('camelCase joins words with a lowercase first word and camel-cased remainder', () => {
  assert.equal(camelCase('hello world'), 'helloWorld');
});

test('camelCase splits words at spaces, hyphens, and underscores', () => {
  assert.equal(camelCase('Hello-World_foo bar'), 'helloWorldFooBar');
});

test('camelCase lowercases uppercase input', () => {
  assert.equal(camelCase('HELLO WORLD'), 'helloWorld');
});

test('camelCase ignores leading, trailing, and repeated separators', () => {
  assert.equal(camelCase('  --foo__  '), 'foo');
});

test('camelCase keeps numeric words in sequence', () => {
  assert.equal(camelCase('version 2 beta'), 'version2Beta');
});

test('camelCase keeps accented letters', () => {
  assert.equal(camelCase('élan vital'), 'élanVital');
});

test('camelCase returns empty for empty or separator-only input', () => {
  assert.deepEqual([camelCase(''), camelCase(' - _ ')], ['', '']);
});

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

test('titleCase capitalises words beginning with accented letters', () => {
  assert.equal(titleCase('élan vital'), 'Élan Vital');
  assert.equal(titleCase('über cool'), 'Über Cool');
  assert.equal(titleCase('éa'), 'Éa');
});

test('titleCase keeps apostrophes within words and capitalises hyphenated parts', () => {
  assert.equal(titleCase("don't stop"), "Don't Stop");
  assert.equal(titleCase('well-known fact'), 'Well-Known Fact');
  assert.equal(titleCase('l’amour'), 'L’amour');
});

test('titleCase handles an empty string', () => {
  assert.equal(titleCase(''), '');
});

test('truncate leaves fitting and empty strings unchanged', () => {
  assert.equal(truncate('short', 10), 'short');
  assert.equal(truncate('', 1), '');
});

test('truncate keeps the longest whole-word prefix and removes trailing whitespace', () => {
  assert.equal(truncate('The quick brown fox', 12), 'The quick…');
  assert.equal(truncate('Hello world again', 13), 'Hello world…');
  assert.equal(truncate('one two three', 9), 'one two…');
});

test('truncate shortens a word when the first word does not fit', () => {
  assert.equal(truncate('Supercalifragilistic', 6), 'Super…');
  assert.equal(truncate('abc', 1), '…');
});

test('truncate counts Unicode code points without splitting emoji', () => {
  assert.equal(truncate('👋👋👋 wave', 4), '👋👋👋…');
  assert.equal(truncate('👋👋', 1), '…');
});

test('truncate rejects invalid maximum lengths', () => {
  assert.throws(() => truncate('abc', 0), RangeError);
  assert.throws(() => truncate('abc', 2.5), RangeError);
  assert.throws(() => truncate('abc', -1), RangeError);
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
