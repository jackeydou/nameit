import { writeText } from '@tauri-apps/api/clipboard';

export async function writeToClipboard(str: string): Promise<void> {
  return await writeText(str);
}