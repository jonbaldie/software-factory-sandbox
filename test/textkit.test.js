import { test } from 'node:test';
import assert from 'node:assert/strict';
import { capitalize, camelCase, collapseWhitespace, countOccurrences, ensurePrefix, ensureSuffix, initials, isBlank, isPalindrome, kebabCase, padCenter, padLeftTo, padRightTo, pascalCase, reverseWords, slugify, snakeCase, stripPrefix, stripSuffix, swapCase, titleCase, truncate, wordCount, wordWrap } from '../src/textkit.js';

test('ensurePrefix leaves input unchanged when it already has the prefix', () => {
  assert.equal(ensurePrefix('https://example.com', 'https://'), 'https://example.com');
});

test('ensurePrefix adds a missing prefix', () => {
  assert.equal(ensurePrefix('example.com', 'https://'), 'https://example.com');
});

test('ensurePrefix returns the prefix for empty input', () => {
  assert.equal(ensurePrefix('', '/'), '/');
});

test('ensurePrefix leaves input unchanged for an empty prefix', () => {
  assert.equal(ensurePrefix('abc', ''), 'abc');
});

test('ensurePrefix matches prefixes case-sensitively', () => {
  assert.equal(ensurePrefix('HTTPS://example.com', 'https://'), 'https://HTTPS://example.com');
});

test('stripPrefix removes a matching leading prefix', () => {
  assert.equal(stripPrefix('v1.2', 'v'), '1.2');
});

test('stripPrefix leaves a substring after the start unchanged', () => {
  assert.equal(stripPrefix('path/v1', 'v'), 'path/v1');
});

test('stripPrefix leaves an empty input unchanged', () => {
  assert.equal(stripPrefix('', 'v'), '');
});

test('stripPrefix leaves input unchanged for an empty prefix', () => {
  assert.equal(stripPrefix('abc', ''), 'abc');
});

test('stripPrefix leaves input unchanged when the prefix is longer', () => {
  assert.equal(stripPrefix('v', 'version'), 'v');
});

test('stripPrefix matches prefixes case-sensitively', () => {
  assert.equal(stripPrefix('HTTP://example.com', 'http://'), 'HTTP://example.com');
});

test('stripPrefix removes a Unicode prefix', () => {
  assert.equal(stripPrefix('🌐東京', '🌐'), '東京');
});

test('stripPrefix removes only one matching prefix', () => {
  assert.equal(stripPrefix('vv1', 'v'), 'v1');
});

test('ensurePrefix preserves matching Unicode input', () => {
  assert.equal(ensurePrefix('🌐東京', '🌐'), '🌐東京');
});

test('swapCase flips uppercase and lowercase letters in mixed-case input', () => {
  assert.equal(swapCase('Hello World'), 'hELLO wORLD');
});

test('swapCase returns empty for empty input', () => {
  assert.equal(swapCase(''), '');
});

test('swapCase leaves digits, punctuation, emoji, and combining marks unchanged', () => {
  assert.equal(swapCase('abc123! 👋\u0301'), 'ABC123! 👋\u0301');
});

test('swapCase supports expanding uppercase mappings', () => {
  assert.equal(swapCase('ß'), 'SS');
});

test('swapCase processes supplementary letters as single code points', () => {
  assert.equal(swapCase('\u{10428}'), '\u{10400}');
});

test('stripSuffix removes a matching trailing suffix', () => {
  assert.equal(stripSuffix('report.txt', '.txt'), 'report');
});

test('stripSuffix leaves input unchanged when suffix is absent', () => {
  assert.equal(stripSuffix('report.txt.bak', '.txt'), 'report.txt.bak');
});

test('stripSuffix leaves input unchanged for an empty suffix', () => {
  assert.equal(stripSuffix('abc', ''), 'abc');
});

test('stripSuffix leaves an empty input unchanged', () => {
  assert.equal(stripSuffix('', '.txt'), '');
});

test('stripSuffix leaves input unchanged when suffix is longer', () => {
  assert.equal(stripSuffix('v', 'version'), 'v');
});

test('stripSuffix matches suffixes case-sensitively', () => {
  assert.equal(stripSuffix('report.TXT', '.txt'), 'report.TXT');
});

test('stripSuffix removes a Unicode suffix', () => {
  assert.equal(stripSuffix('report🌐', '🌐'), 'report');
});

test('stripSuffix removes only one repeated suffix', () => {
  assert.equal(stripSuffix('report.txt.txt', '.txt'), 'report.txt');
});

test('ensureSuffix appends a missing suffix', () => {
  assert.equal(ensureSuffix('report', '.txt'), 'report.txt');
});

test('ensureSuffix does not duplicate an existing suffix', () => {
  assert.equal(ensureSuffix('report.txt', '.txt'), 'report.txt');
});

test('ensureSuffix appends a suffix to empty input', () => {
  assert.equal(ensureSuffix('', '/'), '/');
});

test('ensureSuffix leaves input unchanged for an empty suffix', () => {
  assert.equal(ensureSuffix('abc', ''), 'abc');
});

test('ensureSuffix matches suffixes case-sensitively', () => {
  assert.equal(ensureSuffix('report.TXT', '.txt'), 'report.TXT.txt');
});

test('kebabCase lowercases words and joins them with hyphens', () => {
  assert.equal(kebabCase('Hello World'), 'hello-world');
});

test('kebabCase splits camelCase boundaries', () => {
  assert.equal(kebabCase('fooBar baz'), 'foo-bar-baz');
});

test('kebabCase returns empty for empty input', () => {
  assert.equal(kebabCase(''), '');
});

test('kebabCase ignores punctuation and repeated separators', () => {
  assert.equal(kebabCase('  Already--split,  words! '), 'already-split-words');
});

test('kebabCase keeps Unicode letters and numbers', () => {
  assert.equal(kebabCase('Crème-東京 ٤٢!'), 'crème-東京-٤٢');
});

test('capitalize uppercases the first character', () => {
  assert.equal(capitalize('hello world'), 'Hello world');
});

test('capitalize leaves the suffix unchanged', () => {
  assert.equal(capitalize('hELLo'), 'HELLo');
});

test('capitalize does not skip leading whitespace', () => {
  assert.equal(capitalize(' hello'), ' hello');
});

test('capitalize does not skip leading punctuation', () => {
  assert.equal(capitalize('!hello'), '!hello');
});

test('capitalize returns empty for empty input', () => {
  assert.equal(capitalize(''), '');
});

test('capitalize preserves Unicode uppercase mappings that expand', () => {
  assert.equal(capitalize('ßeta'), 'SSeta');
});

test('capitalize handles a supplementary Unicode first code point', () => {
  assert.equal(capitalize('\u{10428}eta'), '\u{10400}eta');
});

test('capitalize leaves a non-letter first code point unchanged', () => {
  assert.equal(capitalize('👋hello'), '👋hello');
});

test('snakeCase lowercases words and joins them with underscores', () => {
  assert.equal(snakeCase('Hello World'), 'hello_world');
});

test('snakeCase does not split camelCase boundaries', () => {
  assert.equal(snakeCase('fooBar baz'), 'foobar_baz');
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

test('padCenter measures width in grapheme clusters', () => {
  const decomposedAccent = 'e\u0301';
  assert.equal(padCenter(decomposedAccent, 5), `  ${decomposedAccent}  `);
  assert.equal(padCenter(decomposedAccent, 2), `${decomposedAccent} `);
  assert.equal(padCenter(decomposedAccent, 1), decomposedAccent);
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

test('pascalCase capitalises the first word and joins words without separators', () => {
  assert.equal(pascalCase('hello world'), 'HelloWorld');
});

test('pascalCase splits words at spaces, hyphens, and underscores', () => {
  assert.equal(pascalCase('Hello-World_foo bar'), 'HelloWorldFooBar');
});

test('pascalCase lowercases uppercase input before capitalising each word', () => {
  assert.equal(pascalCase('HELLO WORLD'), 'HelloWorld');
});

test('pascalCase ignores leading, trailing, and repeated separators', () => {
  assert.equal(pascalCase('  --foo__  '), 'Foo');
});

test('pascalCase returns empty for empty or separator-only input', () => {
  assert.deepEqual([pascalCase(''), pascalCase(' - _ ')], ['', '']);
});

test('pascalCase keeps numeric words in sequence', () => {
  assert.equal(pascalCase('version 2 beta'), 'Version2Beta');
});

test('pascalCase capitalises accented Unicode words', () => {
  assert.equal(pascalCase('élan vital'), 'ÉlanVital');
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

test('wordWrap greedily wraps words and allows exact-width lines', () => {
  assert.equal(wordWrap('The quick brown fox jumps over the lazy dog', 10), 'The quick\nbrown fox\njumps over\nthe lazy\ndog');
});

test('wordWrap normalizes whitespace runs, including unusual whitespace', () => {
  assert.equal(wordWrap('  one\t\t two\nthree\u00a0four  ', 18), 'one two three four');
});

test('wordWrap returns empty for empty or whitespace-only input', () => {
  assert.deepEqual([wordWrap('', 4), wordWrap(' \t\n\u00a0 ', 4)], ['', '']);
});

test('wordWrap splits overlong words into width-sized chunks', () => {
  assert.equal(wordWrap('abcdefghij', 4), 'abcd\nefgh\nij');
});

test('wordWrap counts Unicode code points and spaces toward the width', () => {
  assert.equal(wordWrap('👋 x y', 3), '👋 x\ny');
});

test('wordWrap splits overlong Unicode words at code point boundaries', () => {
  assert.equal(wordWrap('👋👋👋', 2), '👋👋\n👋');
});

test('wordWrap rejects non-integer widths', () => {
  assert.throws(() => wordWrap('abc', 1.5), RangeError);
});

test('wordWrap rejects zero or negative widths', () => {
  assert.throws(() => wordWrap('abc', 0), RangeError);
  assert.throws(() => wordWrap('abc', -1), RangeError);
});
