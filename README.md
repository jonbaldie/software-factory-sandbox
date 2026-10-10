# textkit

Tiny string helpers. The code is a stand-in: the real point of this repo is the **software factory** that builds it, a set of GitHub Actions that turn labelled issues into reviewed, merged pull requests. See [FACTORY.md](FACTORY.md).

```js
import { capitalize, camelCase, collapseWhitespace, countOccurrences, ensurePrefix, ensureSuffix, isBlank, isPalindrome, initials, kebabCase, padCenter, padLeftTo, padRightTo, pascalCase, repeatWithSeparator, reverseWords, slugify, snakeCase, stripPrefix, stripSuffix, swapCase, titleCase, truncate, wordCount, wordWrap } from './src/textkit.js';
```

## API

### `capitalize(input)`

Uppercases the first Unicode code point and leaves the remainder unchanged. It does not trim or lowercase the input; an empty string returns an empty string. Uppercase mappings may expand.

```js
capitalize('hello world'); // "Hello world"
capitalize('ßeta');        // "SSeta"
```

### `camelCase(input)`

Joins words into camelCase, splitting at whitespace, hyphens, and underscores. Each word is lowercased, and each word after the first has its first letter capitalised. Repeated and surrounding separators are ignored.

```js
camelCase('Hello-World_foo bar'); // "helloWorldFooBar"
```

### `pascalCase(input)`

Joins words into PascalCase, splitting at whitespace, hyphens, and underscores. Each word is lowercased and its first letter is capitalised. Repeated and surrounding separators are ignored; empty or separator-only input returns an empty string.

```js
pascalCase('hello world');         // "HelloWorld"
pascalCase('Hello-World_foo bar'); // "HelloWorldFooBar"
```

### `repeatWithSeparator(s, count, separator)`

Returns `count` copies of `s`, joined by `separator`, with no leading or trailing separator. The separator is used literally, including when it is empty or multiple characters. `count` must be a non-negative integer or a `RangeError` is thrown.

```js
repeatWithSeparator('ab', 3, '-'); // "ab-ab-ab"
repeatWithSeparator('ab', 0, '-'); // ""
```

### `countOccurrences(input, search)`

Counts occurrences of `search` in `input` from left to right without counting overlapping matches. An empty search string returns `0`.

```js
countOccurrences('banana', 'an'); // 2
```

### `ensurePrefix(input, prefix)`

Returns `input` unchanged if it already starts with `prefix`; otherwise prepends `prefix`. Matching is case-sensitive, and an empty prefix leaves `input` unchanged.

```js
ensurePrefix('example.com', 'https://');         // "https://example.com"
ensurePrefix('https://example.com', 'https://'); // "https://example.com"
```

### `stripPrefix(s, prefix)`

Returns `s` without one leading `prefix` when `s` starts with it; otherwise returns `s` unchanged. Matching is literal and case-sensitive. An empty prefix or empty string leaves `s` unchanged.

```js
stripPrefix('v1.2', 'v'); // "1.2"
stripPrefix('vv1', 'v');  // "v1"
```

### `ensureSuffix(input, suffix)`

Returns `input` unchanged if it already ends with `suffix`; otherwise appends `suffix`. Matching is case-sensitive, and an empty suffix leaves `input` unchanged.

```js
ensureSuffix('report', '.txt');     // "report.txt"
ensureSuffix('report.txt', '.txt'); // "report.txt"
```

### `stripSuffix(s, suffix)`

Returns `s` without one trailing `suffix` when `s` ends with it; otherwise returns `s` unchanged. Matching is literal and case-sensitive. An empty suffix or empty `s` leaves `s` unchanged.

```js
stripSuffix('report.txt', '.txt');     // "report"
stripSuffix('report.txt.txt', '.txt'); // "report.txt"
```

### `collapseWhitespace(input)`

Replaces each run of whitespace with a single space and trims whitespace from the ends.

```js
collapseWhitespace('  a \t b\n\nc  '); // "a b c"
```

### `isBlank(input)`

Returns `true` when the string is empty or contains only whitespace; otherwise returns `false`.

```js
isBlank(' \t\n '); // true
```

### `isPalindrome(input)`

Returns `true` when the input reads the same backwards, ignoring case and all characters other than Unicode letters and numbers. Empty input returns `true`.

```js
isPalindrome('A man, a plan, a canal: Panama'); // true
isPalindrome('abc'); // false
```

### `initials(input, separator = '')`

Returns the uppercase first character of each whitespace-separated word. Any run of whitespace separates words. `separator` is appended after every initial, including the last, and defaults to an empty string. Empty input returns an empty string.

```js
initials('Ada Lovelace');      // "AL"
initials('Ada Lovelace', '.'); // "A.L."
```

### `kebabCase(input)`

Converts runs of Unicode letters and numbers to lowercase words joined by hyphens. Other characters separate words, and camel-case boundaries are split. Empty input returns an empty string.

```js
kebabCase('Hello World'); // "hello-world"
kebabCase('fooBar baz'); // "foo-bar-baz"
```

### `padCenter(input, width, fill = ' ')`

Centres `input` in a field of `width` grapheme clusters, measured with `Intl.Segmenter` at grapheme granularity. If the padding cannot be split evenly, the extra fill character goes on the right. The default fill is a space; a `fill` other than exactly one Unicode code point causes a `RangeError`. Input that is already at least `width` grapheme clusters long is returned unchanged.

```js
padCenter('ab', 6, '*');  // "**ab**"
padCenter('ab', 5);       // " ab  "
padCenter('e\u0301', 5); // "  e\u0301  " (decomposed accented e)
```

### `padLeftTo(input, width, fill = ' ')`

Pads the left side of `input` to `width` Unicode code points. The default fill is a space; a `fill` other than exactly one Unicode code point causes a `RangeError`. Input that is already at least `width` code points long is returned unchanged.

```js
padLeftTo('7', 3, '0'); // "007"
```

### `padRightTo(input, width, fill = ' ')`

Pads the right side of `input` to `width` Unicode code points. The default fill is a space; a `fill` other than exactly one Unicode code point causes a `RangeError`. Input that is already at least `width` code points long is returned unchanged.

```js
padRightTo('ab', 4, '.'); // "ab.."
```

### `reverseWords(input)`

Reverses the order of whitespace-separated words and joins them with single spaces. Empty or whitespace-only input returns an empty string.

```js
reverseWords('one  two three'); // "three two one"
```

### `slugify(input)`

Turns a string into a URL-safe slug: lowercases it, strips accents, converts German `ß` (including uppercase `ẞ`) to `ss`, and replaces runs of other characters with `-`.

```js
slugify('Crème Brûlée!'); // "creme-brulee"
slugify('Straße');        // "strasse"
```

### `snakeCase(input)`

Converts runs of Unicode letters and numbers to lowercase words joined by underscores. Every other character separates words, and leading, trailing, or repeated separators are ignored. Empty input returns an empty string.

```js
snakeCase('  Already-split  words '); // "already_split_words"
```

### `swapCase(input)`

Flips the case of each Unicode code point: if lowercasing changes it, the lowercase form is used; otherwise its uppercase form is used. Uncased characters remain unchanged. Case mappings may expand, so `ß` becomes `SS`.

```js
swapCase('Hello World'); // "hELLO wORLD"
swapCase('abc123!');     // "ABC123!"
swapCase('ß');           // "SS"
```

### `titleCase(input)`

Capitalises the first letter of every word and each hyphenated part, while treating apostrophes as part of a word.

```js
titleCase('hello world'); // "Hello World"
```

### `truncate(input, maxLength)`

Shortens a string to at most `maxLength` Unicode code points, including the ellipsis. It keeps the longest prefix of whole whitespace-separated words that fits; if the first word is too long, it cuts that word to fit. `maxLength` must be a positive integer.

```js
truncate('The quick brown fox', 12); // "The quick…"
```

### `wordCount(input)`

Counts words made from Unicode letters or numbers. Internal hyphens and straight or curly apostrophes keep a word together; punctuation-only and empty input return `0`.

```js
wordCount('well-known phrase'); // 2
```

### `wordWrap(input, maxWidth)`

Greedily wraps words in order, joining them with single spaces and separating lines with newlines. Runs of whitespace (including newlines) are normalized; empty or whitespace-only input returns an empty string. Width is measured in Unicode code points, including spaces, and words longer than `maxWidth` are split at code-point boundaries. No output line exceeds the width, and `maxWidth` must be a positive integer or a `RangeError` is thrown.

```js
wordWrap('The quick brown fox', 10); // "The quick\nbrown fox"
wordWrap('abcdefghij', 4);           // "abcd\nefgh\nij"
```
