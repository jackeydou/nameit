export function removeNewlines(str: string) {
  return str.replace(/^\s+|\s+$/g, '');
}
