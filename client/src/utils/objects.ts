export function shallowEqual(
  a: { [key: string]: any },
  b: { [key: string]: any },
  ignoreKeys: string[] = [],
  verbose = false,
): boolean {
  for (const key in a) {
    if (!ignoreKeys.includes(key) && (!(key in b) || a[key] !== b[key])) {
      if (verbose) {
        console.log('Property ' + key + ' is different');
        console.log(a[key] + ' !== ' + b[key]);
      }
      return false;
    }
  }
  for (const key in b) {
    if (!ignoreKeys.includes(key) && (!(key in a) || a[key] !== b[key])) {
      if (verbose) {
        console.log('Property ' + key + ' is different');
        console.log(a[key] + ' !== ' + b[key]);
      }
      return false;
    }
  }
  return true;
}
