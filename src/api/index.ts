import { VariableNamingConventions } from './openai';

export { VariableNamingConventions } from './openai';

export async function openAIVaribleNamingApi(
  prompt: string,
  convention: VariableNamingConventions
) {
  let fetcher;
  if (IS_WEB) {
    fetcher = await (await import('./web')).openAIVaribleNamingApi;
  } else {
    fetcher = await (await import('./client')).openAIVaribleNamingApi;
  }
  return fetcher(prompt, convention);
}

