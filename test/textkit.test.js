import { test } from 'node:test';
import assert from 'node:assert/strict';
import { camelCase, collapseWhitespace, countOccurrences, initials, isBlank, isPalindrome, padCenter, padLeftTo, padRightTo, reverseWords, slugify, snakeCase, titleCase, truncate, wordCount } from '../src/textkit.js';

test('snakeCase lowercases words and joins them with underscores', () => {
  assert.equal(snakeCase('Hello World'), 'hello_world');
});

test('snakeCase treats punctuation and repeated whitespace as word separators', () => {
  assert.equal(snakeCase('  Already-split  words '), 'already_split_words');
});

test('snakeCase returns empty for empty input', () => {
  assert.equal(snakeCase(''), '');
});

test('snakeCase keeps Unicode letters and digits in words', () => {
  assert.equal(snakeCase('Crème-東京 ٤٢!'), 'crème_東京_٤٢');
});

test('collapseWhitespace replaces runs of whitespace with one space and trims ends', () => {
  assert.equal(collapseWhitespace('  a \t b\n\nc  '), 'a b c');
});

test('collapseWhitespace returns empty for empty or whitespace-only input', () => {
  assert.deepEqual([collapseWhitespace(''), collapseWhitespace(' \t\n ')], ['', '']);
});

test('isBlank returns true for an empty string', () => {
  assert.equal(isBlank(''), true);
});

test('isBlank returns true for a whitespace-only string', () => {
  assert.equal(isBlank('  \t\n'), true);
});

test('isBlank returns false for nonblank text surrounded by whitespace', () => {
  assert.equal(isBlank(' a '), false);
});

test('isPalindrome ignores case and non-alphanumeric characters', () => {
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
});

test('isPalindrome returns false for non-palindromic input', () => {
  assert.equal(isPalindrome('abc'), false);
});

test('isPalindrome returns true for empty input', () => {
  assert.equal(isPalindrome(''), true);
});

test('isPalindrome recognizes Unicode letters and digits', () => {
  assert.equal(isPalindrome('É2X2é'), true);
});

test('initials uppercases and joins the first letter of each word', () => {
  assert.equal(initials('Ada Lovelace'), 'AL');
});

test('initials handles repeated and surrounding spaces', () => {
  assert.equal(initials('  grace   brewster murray hopper '), 'GBMH');
});

test('initials treats tabs and line breaks as word separators', () => {
  assert.equal(initials('Ada\tLovelace\nByron'), 'ALB');
});

test('initials returns empty for empty input', () => {
  assert.equal(initials(''), '');
});

test('initials uppercases accented Unicode letters', () => {
  assert.equal(initials('élan vital'), 'ÉV');
});

test('initials appends the separator after every initial', () => {
  assert.equal(initials('Ada Lovelace', '.'), 'A.L.');
});

test('padCenter centres input and puts an uneven extra fill character on the right', () => {
  assert.equal(padCenter('ab', 6, '*'), '**ab**');
  assert.equal(padCenter('ab', 5), ' ab  ');
});

test('padCenter handles empty and Unicode strings and leaves fitting strings unchanged', () => {
  assert.equal(padCenter('', 3, '*'), '***');
  assert.equal(padCenter('👋', 3, '.'), '.👋.');
  assert.equal(padCenter('x', 3, '👋'), '👋x👋');
  assert.equal(padCenter('abc', 3, '*'), 'abc');
  assert.equal(padCenter('longer', 3, '*'), 'longer');
});

test('padCenter rejects fills that are not exactly one character', () => {
  assert.throws(() => padCenter('ab', 5, ''), RangeError);
  assert.throws(() => padCenter('ab', 5, '**'), RangeError);
  assert.throws(() => padCenter('longer', 3, 1), RangeError);
});

test('padLeftTo pads the input on the left', () => {
  assert.equal(padLeftTo('7', 3, '0'), '007');
});

test('padLeftTo handles empty and Unicode strings and leaves fitting strings unchanged', () => {
  assert.equal(padLeftTo('', 3, '0'), '000');
  assert.equal(padLeftTo('👋', 2, '0'), '0👋');
  assert.equal(padLeftTo('abc', 3, '0'), 'abc');
  assert.equal(padLeftTo('longer', 3, '0'), 'longer');
});

test('padLeftTo rejects fills that are not exactly one character', () => {
  assert.throws(() => padLeftTo('7', 3, ''), RangeError);
  assert.throws(() => padLeftTo('7', 3, '00'), RangeError);
  assert.throws(() => padLeftTo('longer', 3, null), RangeError);
});

test('padRightTo pads the input on the right', () => {
  assert.equal(padRightTo('ab', 4, '.'), 'ab..');
});

test('padRightTo handles empty and Unicode strings and leaves fitting strings unchanged', () => {
  assert.equal(padRightTo('', 2, '.'), '..');
  assert.equal(padRightTo('👋', 2, '.'), '👋.');
  assert.equal(padRightTo('abc', 3, '.'), 'abc');
  assert.equal(padRightTo('longer', 3, '.'), 'longer');
});

test('padRightTo rejects fills that are not exactly one character', () => {
  assert.throws(() => padRightTo('ab', 4, ''), RangeError);
  assert.throws(() => padRightTo('ab', 4, '..'), RangeError);
  assert.throws(() => padRightTo('longer', 3, null), RangeError);
});

test('reverseWords reverses whitespace-separated words with single spaces', () => {
  assert.equal(reverseWords('one  two three'), 'three two one');
});

test('reverseWords returns empty for empty or whitespace-only input', () => {
  assert.deepEqual([reverseWords(''), reverseWords(' \t\n ')], ['', '']);
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

test('countOccurrences counts matches from left to right', () => {
  assert.equal(countOccurrences('banana', 'an'), 2);
});

test('countOccurrences does not count overlapping matches', () => {
  assert.equal(countOccurrences('aaaa', 'aa'), 2);
});

test('countOccurrences returns zero when the search is absent', () => {
  assert.equal(countOccurrences('abc', 'x'), 0);
});

test('countOccurrences returns zero for an empty search', () => {
  assert.equal(countOccurrences('abc', ''), 0);
});
