import { camelCase, pascalCase, wordCount, wordWrap, truncate } from '../../src/textkit.js';

const cases = [
  ['camelCase ordinary', () => camelCase('Hello-World_foo'), 'helloWorldFoo'],
  ['camelCase supplementary letter', () => camelCase('hello 𐐨orld'), 'hello𐐀orld'],
  ['pascalCase supplementary letter', () => pascalCase('hello 𐐨orld'), 'Hello𐐀orld'],
  ['wordCount ordinary', () => wordCount('well-known phrase'), 2],
  ['wordCount combining mark alone', () => wordCount('\u0301'), 0],
  ['wordCount combining mark between words', () => wordCount('one \u0301 two'), 2],
  ['wordWrap ordinary', () => wordWrap('The quick brown fox', 10), 'The quick\nbrown fox'],
  ['wordWrap Unicode', () => wordWrap('😀😀😀 ok', 2), '😀😀\n😀\nok'],
  ['truncate ordinary', () => truncate('The quick brown fox', 12), 'The quick…'],
  ['truncate Unicode', () => truncate('😀😀😀 hello', 3), '😀😀…'],
];

for (const [name, run, expected] of cases) {
  const actual = run();
  console.log(JSON.stringify({ name, expected, actual, matches: actual === expected }));
}
