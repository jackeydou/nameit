import { getClient, Body, Client } from "@tauri-apps/api/http";
import { OPEN_AI_HOST, OPEN_AI_KEY, OpenAIResponse, getVariblePrompt, VariableNamingConventions } from './openai';
import { removeNewlines } from "../utils";

let client: Client;

async function singletonClient() {
  if (client) {
    return client;
  }
  client = await getClient();
  return client;
}

export async function openAIVaribleNamingApi(
  prompt: string,
  convention: VariableNamingConventions
) {
  if (!OPEN_AI_KEY) {
    throw new Error("Missing OpenAI OPEN_AI_KEY");
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
      Authorization: `Bearer ${OPEN_AI_KEY}`,
    },
  });
  const { data } = response;

  const result = removeNewlines(data.choices?.[0]?.text);
  return result;
}
