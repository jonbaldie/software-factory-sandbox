# textkit

Tiny string helpers. The code is a stand-in: the real point of this repo is the **software factory** that builds it, a set of GitHub Actions that turn labelled issues into reviewed, merged pull requests. See [FACTORY.md](FACTORY.md).

```js
import { slugify, titleCase } from './src/textkit.js';
```

## API

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
