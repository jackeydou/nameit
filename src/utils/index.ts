export function removeNewlines(str: string) {
  return str.replace(/^\s+|\s+$/g, '');
}

export async function writeText(str: string): Promise<void> {
  let write
  if (IS_WEB) {
    write = await (await import('./clipboad')).writeToClipboard;
  } else {
    write = await (await import('./clipboard_web')).writeToClipboard;
  }
  return write(str);
}
