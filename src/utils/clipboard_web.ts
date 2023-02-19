async function writeText(str: string): Promise<void> {
  try {
    if (navigator.clipboard) {
      return navigator.clipboard.writeText(str)
    }
  } catch (error) {
  }
  return Promise.reject(void 0);
}

export async function writeToClipboard(str: string): Promise<void> {
  return await writeText(str);
}