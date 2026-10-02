# textkit

Tiny string helpers. The code is a stand-in: the real point of this repo is the **software factory** that builds it, a set of GitHub Actions that turn labelled issues into reviewed, merged pull requests. See [FACTORY.md](FACTORY.md).

```js
import { camelCase, collapseWhitespace, isBlank, padCenter, padLeftTo, padRightTo, reverseWords, slugify, titleCase, truncate, wordCount } from './src/textkit.js';
```

## API

### `camelCase(input)`

Joins words into camelCase, splitting at whitespace, hyphens, and underscores. Each word is lowercased, and each word after the first has its first letter capitalised. Repeated and surrounding separators are ignored.

```js
camelCase('Hello-World_foo bar'); // "helloWorldFooBar"
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

### `padCenter(input, width, fill = ' ')`

Centres `input` in a field of `width` Unicode code points. If the padding cannot be split evenly, the extra fill character goes on the right. The default fill is a space; a `fill` other than exactly one Unicode code point causes a `RangeError`. Input that is already at least `width` code points long is returned unchanged.

```js
padCenter('ab', 6, '*'); // "**ab**"
padCenter('ab', 5);      // " ab  "
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

Turns a string into a URL-safe slug: lowercases it, strips accents, and replaces runs of other characters with `-`.

```js
slugify('Crème Brûlée!'); // "creme-brulee"
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
