async function writeText(str: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(str)
  }
  return Promise.reject(void 0);
}

export async function writeToClipboard(str: string): Promise<void> {
  return await writeText(str);
}