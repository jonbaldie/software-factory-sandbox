/**
 * Replace runs of whitespace with a single space and trim the ends.
 * @example collapseWhitespace('  a \t b\n\nc  ') // "a b c"
 * @param {string} input
 * @returns {string}
 */
export function collapseWhitespace(input) {
  return input.replace(/\s+/gu, ' ').trim();
}

/**
 * Check whether a string is empty or contains only whitespace.
 * @example isBlank(' \t\n ') // true
 * @param {string} input
 * @returns {boolean}
 */
export function isBlank(input) {
  return input.trim().length === 0;
}

/**
 * Check whether a string reads the same backwards, ignoring case and non-alphanumeric characters.
 * @example isPalindrome('A man, a plan, a canal: Panama') // true
 * @param {string} input
 * @returns {boolean}
 */
export function isPalindrome(input) {
  const characters = [...input.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')];
  return characters.every((character, index) => character === characters[characters.length - index - 1]);
}

/**
 * Return the uppercase first letter of each whitespace-separated word.
 * @example initials('Ada Lovelace') // "AL"
 * @example initials('Ada Lovelace', '.') // "A.L."
 * @param {string} input
 * @param {string} [separator='']
 * @returns {string}
 */
export function initials(input, separator = '') {
  return (input.match(/\S+/gu) ?? [])
    .map((word) => `${[...word][0].toUpperCase()}${separator}`)
    .join('');
}

/**
 * Reverse the order of whitespace-separated words, joining them with single spaces.
 * @example reverseWords('one  two three') // "three two one"
 * @param {string} input
 * @returns {string}
 */
export function reverseWords(input) {
  return input.trim().split(/\s+/u).reverse().join(' ');
}

/**
 * Convert a string to camelCase, splitting words at whitespace, hyphens, and underscores.
 * @example camelCase('hello world') // "helloWorld"
 * @param {string} input
 * @returns {string}
 */
export function camelCase(input) {
  return input
    .split(/[\s_-]+/u)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index === 0 ? lower : lower[0].toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * Turn a string into a URL-safe slug.
 * @example slugify("Hello, World!") // "hello-world"
 * @param {string} input
 * @returns {string}
 */
export function slugify(input) {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert runs of letters and numbers into lowercase words joined by hyphens.
 * @example kebabCase('Hello World') // "hello-world"
 * @param {string} input
 * @returns {string}
 */
export function kebabCase(input) {
  const separated = input.replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, '$1 $2');
  return separated.match(/[\p{L}\p{N}]+/gu)?.map((word) => word.toLowerCase()).join('-') ?? '';
}

/**
 * Convert runs of letters and numbers into lowercase words joined by underscores.
 * @example snakeCase('Hello World') // "hello_world"
 * @param {string} input
 * @returns {string}
 */
export function snakeCase(input) {
  return input.match(/[\p{L}\p{N}]+/gu)?.map((word) => word.toLowerCase()).join('_') ?? '';
}

/**
 * Capitalise the first letter of every word and each hyphenated part.
 * Apostrophes are treated as part of a word.
 * @example titleCase("hello world") // "Hello World"
 * @param {string} input
 * @returns {string}
 */
export function titleCase(input) {
  return input.replace(
    /(?<![\p{L}\p{M}\p{N}_]['’])(?<![\p{L}\p{M}\p{N}_])\p{L}/gu,
    (c) => c.toUpperCase(),
  );
}

/**
 * Count words, treating hyphenated and apostrophe-connected words as one.
 * @example wordCount('well-known phrase') // 2
 * @param {string} input
 * @returns {number}
 */
export function wordCount(input) {
  return input.match(/[\p{L}\p{N}\p{M}]+(?:[-'’][\p{L}\p{N}\p{M}]+)*/gu)?.length ?? 0;
}

/**
 * Count non-overlapping occurrences of a search string from left to right.
 * @example countOccurrences('banana', 'an') // 2
 * @param {string} input
 * @param {string} search
 * @returns {number}
 */
export function countOccurrences(input, search) {
  if (search.length === 0) return 0;

  let count = 0;
  let position = input.indexOf(search);
  while (position !== -1) {
    count++;
    position = input.indexOf(search, position + search.length);
  }
  return count;
}

/**
 * Ensure a string ends with the given suffix.
 * @example ensureSuffix('report', '.txt') // "report.txt"
 * @param {string} input
 * @param {string} suffix
 * @returns {string}
 */
export function ensureSuffix(input, suffix) {
  return input.endsWith(suffix) ? input : input + suffix;
}

/**
 * Shorten a string at a whitespace-delimited word boundary, appending an ellipsis.
 * Length is counted in Unicode code points, including the ellipsis.
 * @example truncate('The quick brown fox', 12) // "The quick…"
 * @param {string} input
 * @param {number} maxLength
 * @returns {string}
 * @throws {RangeError} If maxLength is not a positive integer.
 */
export function truncate(input, maxLength) {
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new RangeError('maxLength must be a positive integer');
  }

  const characters = [...input];
  if (characters.length <= maxLength) return input;

  const prefix = characters.slice(0, maxLength - 1);
  const nextCharacter = characters[maxLength - 1];
  if (nextCharacter && !/\s/u.test(nextCharacter)) {
    let lastWhitespace = -1;
    for (let index = prefix.length - 1; index >= 0; index--) {
      if (/\s/u.test(prefix[index])) {
        lastWhitespace = index;
        break;
      }
    }

    if (lastWhitespace !== -1) {
      const wholeWords = prefix.slice(0, lastWhitespace).join('').trimEnd();
      if (wholeWords) return `${wholeWords}…`;
    }
  }

  return `${prefix.join('').trimEnd()}…`;
}

/**
 * Centre a string in a field of grapheme clusters, putting extra padding on the right.
 * @example padCenter('ab', 5) // " ab  "
 * @example padCenter('e\u0301', 5) // "  e\u0301  "
 * @param {string} input
 * @param {number} width
 * @param {string} [fill=' ']
 * @returns {string}
 * @throws {RangeError} If fill is not exactly one Unicode code point.
 */
export function padCenter(input, width, fill = ' ') {
  if (typeof fill !== 'string' || [...fill].length !== 1) {
    throw new RangeError('fill must be exactly one character');
  }

  const inputLength = [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(input)].length;
  if (inputLength >= width) return input;

  const paddingLength = width - inputLength;
  const leftPaddingLength = Math.floor(paddingLength / 2);
  const rightPaddingLength = paddingLength - leftPaddingLength;
  return `${fill.repeat(leftPaddingLength)}${input}${fill.repeat(rightPaddingLength)}`;
}

/**
 * Pad a string on the left to a width measured in Unicode code points.
 * @example padLeftTo('7', 3, '0') // "007"
 * @param {string} input
 * @param {number} width
 * @param {string} [fill=' ']
 * @returns {string}
 * @throws {RangeError} If fill is not exactly one Unicode code point.
 */
export function padLeftTo(input, width, fill = ' ') {
  if (typeof fill !== 'string' || [...fill].length !== 1) {
    throw new RangeError('fill must be exactly one character');
  }

  const inputLength = [...input].length;
  if (inputLength >= width) return input;

  return `${fill.repeat(width - inputLength)}${input}`;
}

/**
 * Pad a string on the right to a width measured in Unicode code points.
 * @example padRightTo('ab', 4, '.') // "ab.."
 * @param {string} input
 * @param {number} width
 * @param {string} [fill=' ']
 * @returns {string}
 * @throws {RangeError} If fill is not exactly one Unicode code point.
 */
export function padRightTo(input, width, fill = ' ') {
  if (typeof fill !== 'string' || [...fill].length !== 1) {
    throw new RangeError('fill must be exactly one character');
  }

  const inputLength = [...input].length;
  if (inputLength >= width) return input;

  return `${input}${fill.repeat(width - inputLength)}`;
}

/**
 * Uppercase the first Unicode code point and leave the rest unchanged.
 * @example capitalize('hello world') // "Hello world"
 * @param {string} input
 * @returns {string}
 */
export function capitalize(input) {
  const [first, ...rest] = input;
  return first === undefined ? '' : `${first.toUpperCase()}${rest.join('')}`;
}

/**
 * Wrap whitespace-separated words to fit within a maximum line width.
 * @example wordWrap('The quick brown fox', 10) // "The quick\nbrown fox"
 * @param {string} input
 * @param {number} maxWidth
 * @returns {string}
 * @throws {RangeError} If maxWidth is not a positive integer.
 */
export function wordWrap(input, maxWidth) {
  if (!Number.isInteger(maxWidth) || maxWidth < 1) {
    throw new RangeError('maxWidth must be a positive integer');
  }

  const words = input.match(/\S+/gu) ?? [];
  const lines = [];
  let line = '';
  let lineWidth = 0;

  for (const word of words) {
    const characters = [...word];
    if (characters.length > maxWidth) {
      if (line !== '') lines.push(line);
      line = '';
      lineWidth = 0;

      for (let offset = 0; offset < characters.length; offset += maxWidth) {
        const chunk = characters.slice(offset, offset + maxWidth).join('');
        if (offset + maxWidth < characters.length) {
          lines.push(chunk);
        } else {
          line = chunk;
          lineWidth = characters.length - offset;
        }
      }
    } else if (line === '') {
      line = word;
      lineWidth = characters.length;
    } else if (lineWidth + characters.length + 1 <= maxWidth) {
      line += ` ${word}`;
      lineWidth += characters.length + 1;
    } else {
      lines.push(line);
      line = word;
      lineWidth = characters.length;
    }
  }

  if (line !== '') lines.push(line);
  return lines.join('\n');
}
