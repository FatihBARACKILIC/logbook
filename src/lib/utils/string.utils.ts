type Options = { everyWord: boolean };

/**
 * The function `toCamelCase` converts a given text to camel case format based on the specified
 * options.
 * @param {string} text - The `text` parameter is a string that represents the text you want to convert
 * to camel case.
 * @param {Options} options - The `options` parameter in the `toCamelCase` function is an object with a
 * property `everyWord` which is set to `false` by default. This property determines whether every word
 * in the text should be converted to camel case or just the first word. If `everyWord`
 * @returns The function `toCamelCase` returns a string with the first letter capitalized and the rest
 * of the letters in lowercase if the `everyWord` option is set to `false`. If the `everyWord` option
 * is set to `true`, it returns a string with each word converted to camel case.
 */
export function toCamelCase(text: string, options: Options = { everyWord: false }): string {
  if (!options.everyWord) return text.at(0)?.toUpperCase() + text.slice(1).toLowerCase();
  return text
    .split(" ")
    .map((word) => toCamelCase(word))
    .join(" ");
}
