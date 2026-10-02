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

function splitWords(input) {
  return input
    .replace(/([\p{Ll}])([\p{Lu}])/gu, '$1 $2')
    .split(/[\s_-]+/u)
    .filter(Boolean);
}

/**
 * Convert a string to kebab-case, splitting on separators and lower-to-upper boundaries.
 * @example kebabCase('Hello World') // "hello-world"
 * @param {string} input
 * @returns {string}
 */
export function kebabCase(input) {
  return splitWords(input).map((word) => word.toLowerCase()).join('-');
}

/**
 * Convert a string to snake_case, splitting on separators and lower-to-upper boundaries.
 * @example snakeCase('Hello World') // "hello_world"
 * @param {string} input
 * @returns {string}
 */
export function snakeCase(input) {
  return splitWords(input).map((word) => word.toLowerCase()).join('_');
}

/**
 * Convert a string to PascalCase, splitting on separators and lower-to-upper boundaries.
 * @example pascalCase('hello world') // "HelloWorld"
 * @param {string} input
 * @returns {string}
 */
export function pascalCase(input) {
  return splitWords(input)
    .map((word) => {
      const [first, ...rest] = word.toLowerCase();
      return first.toUpperCase() + rest.join('');
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
