/**
 * Replace string 'Hello {name}' with 'Hello Arthur' when `name` is a
 * property of **object** with value 'Arthur'
 *
 * @param s String to template
 * @param object Object with value to replace
 */
export function templateString(
  s: string,
  object: { [key: string]: any },
): string {
  const keys: any = Object.keys(object);
  for (var i = 0; i < keys.length; i++) {
    s = s.replace(new RegExp('{' + keys[i] + '}', 'gi'), object[keys[i]]);
  }
  return s;
}

/**
 * Camelize a string, cutting the string by multiple separators like
 * hyphens, underscores and spaces.
 *
 * @param {text} string Text to camelize
 * @return string Camelized text
 */
export function camelize(text: string) {
  return text
    .trim()
    .replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    });
}

/**
 * Decamelizes a string with/without a custom separator (underscore by default).
 *
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
export function decamelize(str: string, separator: string) {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();
}

/**
 * Capitalize the first letter of the given string
 *
 * @param s String to be capitalized
 */
export function capitalize(s: string, allWords: boolean = true) {
  if (allWords) {
    return s.replace(/(?:^|\s)\S/g, function(a) {
      return a.toUpperCase();
    });
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}
