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
 * Capitalise the first letter of every word.
 * @example titleCase("hello world") // "Hello World"
 * @param {string} input
 * @returns {string}
 */
export function titleCase(input) {
  return input.replace(/\b\w/g, (c) => c.toUpperCase());
}

// TODO(factory): Add `truncate(input, maxLength)` that shortens long strings at a word boundary and appends "…".
// TODO(factory): Add `wordCount(input)` that counts words, treating hyphenated words as one word.
