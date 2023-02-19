export const OPEN_AI_HOST = "https://api.openai.com";

export const OPEN_AI_KEY = import.meta.env.VITE_OPEN_AI_KEY;

export enum VariableNamingConventions {
  Snakecase = "Snakecase",
  Pascalcase = "Pascalcase",
  Camelcase = "Camelcase",
}

export function getVariblePrompt(
  prompt: string,
  convention: VariableNamingConventions
) {
  return `I am a programmer and have encountered some variable naming problems, and I hope you can come up with a suitable variable name for me. You need to follow the ${convention} naming convention. Please generate a suitable variable name based on my descriptive information, which is given below:\n${prompt}$$`;
}

export interface OpenAIResponse {
  id: string; // e.g. "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7";
  object: string; // e.g. "text_completion";
  created: Number;
  model: string; // e.g. "text-davinci-003";
  choices: [
    {
      text: string; // result
      index: number;
      logprobs: unknown;
      finish_reason: string; // e.g. "length";
    }
  ];
  usage: {
    prompt_tokens: number; // 5;
    completion_tokens: number; // 7;
    total_tokens: number; // 12;
  };
}