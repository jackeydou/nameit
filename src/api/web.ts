import axios from "axios";
import { OpenAIResponse, getVariblePrompt, VariableNamingConventions, OpenAITurboResponse } from './openai';
import { removeNewlines } from "../utils";

export async function openAIVaribleNamingApi(
  prompt: string,
  convention: VariableNamingConventions
) {

  const url = '/api/edge';
  const response = await axios.post<OpenAITurboResponse>(url, {
    prompt: getVariblePrompt(prompt, convention),
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = response;

  const result = removeNewlines(data.choices?.[0]?.message.content);
  return result;
}
