import { getClient, Body, Client } from "@tauri-apps/api/http";
import { removeNewlines } from "../utils";

let client: Client;

async function singletonClient() {
  if (client) {
    return client;
  }
  client = await getClient();
  return client;
}

const OPEN_AI_HOST = "https://api.openai.com";

const key = import.meta.env.VITE_OPEN_AI_KEY;

export enum VariableNamingConventions {
  Snakecase = "Snakecase",
  Pascalcase = "Pascalcase",
  Camelcase = "Camelcase",
}

function getVariblePrompt(
  prompt: string,
  convention: VariableNamingConventions
) {
  return `I am a programmer and have encountered some variable naming problems, and I hope you can come up with a suitable variable name for me. You need to follow the ${convention} naming convention. Please generate a suitable variable name based on my descriptive information, which is given below:\n${prompt}$$`;
}

interface OpenAIResponse {
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

export async function openAIVaribleNamingApi(
  prompt: string,
  convention: VariableNamingConventions
) {
  if (!key) {
    throw new Error("Missing OpenAI Key");
  }
  const url = `${OPEN_AI_HOST}/v1/completions`;
  const body = Body.json({
    model: "text-davinci-003",
    prompt: getVariblePrompt(prompt, convention),
    max_tokens: 100,
    temperature: 0,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "$$",
  });
  const response = await (await singletonClient()).post<OpenAIResponse>(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  });
  const { data } = response;

  const result = removeNewlines(data.choices?.[0]?.text);
  return result;
}
