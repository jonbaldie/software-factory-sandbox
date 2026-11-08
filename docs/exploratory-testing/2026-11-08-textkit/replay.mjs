import { padCenter, padLeftTo, padRightTo, wordWrap, truncate, ensurePrefix, stripPrefix, ensureSuffix, stripSuffix } from '../../../src/textkit.js';

const graphemes = (value) => [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(value)].length;
const cases = [
  ['center ordinary', () => padCenter('ab', 5, '*'), '*ab**'],
  ['center decomposed input', () => padCenter('e\u0301', 5), '  e\u0301  '],
  ['center combining fill cluster count', () => graphemes(padCenter('a', 5, '\u0301')), 5],
  ['center joining fill cluster count', () => graphemes(padCenter('a', 5, '\u200d')), 5],
  ['left emoji fill', () => padLeftTo('7', 3, '😀'), '😀😀7'],
  ['right emoji fill', () => padRightTo('ab', 4, '😀'), 'ab😀😀'],
  ['wrap ordinary', () => wordWrap('The quick brown fox', 10), 'The quick\nbrown fox'],
  ['wrap long emoji word', () => wordWrap('😀😀😀 ok', 2), '😀😀\n😀\nok'],
  ['truncate ordinary', () => truncate('The quick brown fox', 12), 'The quick…'],
  ['truncate emoji word', () => truncate('😀😀😀 hello', 3), '😀😀…'],
  ['prefix ordinary', () => ensurePrefix('example.com', 'https://'), 'https://example.com'],
  ['prefix already present', () => ensurePrefix('https://example.com', 'https://'), 'https://example.com'],
  ['strip one prefix', () => stripPrefix('vv1', 'v'), 'v1'],
  ['suffix ordinary', () => ensureSuffix('report', '.txt'), 'report.txt'],
  ['suffix already present', () => ensureSuffix('report.txt', '.txt'), 'report.txt'],
  ['strip one suffix', () => stripSuffix('report.txt.txt', '.txt'), 'report.txt'],
  ['strip empty suffix', () => stripSuffix('report', ''), 'report'],
];

for (const [name, run, expected] of cases) {
  const actual = run();
  console.log(JSON.stringify({ name, expected, actual, matches: actual === expected }));
}
for (const fill of ['\u0301', '\u200d']) {
  const output = padCenter('a', 5, fill);
  console.log(JSON.stringify({ fill, output, graphemes: graphemes(output) }));
}
