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
  return input.replace(/\b\w/g, (c, index) => {
    const apostrophe = input[index - 1];
    const previousCharacter = input[index - 2];
    const followsApostropheInWord =
      (apostrophe === "'" || apostrophe === '’') && /\w/.test(previousCharacter ?? '');

    return followsApostropheInWord ? c : c.toUpperCase();
  });
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

// TODO(factory): Add `truncate(input, maxLength)` that shortens long strings at a word boundary and appends "…".
