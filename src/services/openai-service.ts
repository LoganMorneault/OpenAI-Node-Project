import axios from "axios";

import { OpenAIMessage } from "../models/OpenAI/openai-message";
import { OpenAIChatRequest } from "../models/OpenAI/openai-chat-request";
import { ConfigService } from "./config-service";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { ChainValues } from "langchain/dist/schema";

/** Service providing access to OpenAI LLMs via LangChain */
export class OpenAIService {
    private configService: ConfigService;
    private llm: OpenAI;

    public constructor(configService: ConfigService) {
        this.configService = configService;
        this.llm = new OpenAI({ openAIApiKey: configService["OPENAI_API_SECRET_KEY"] });
    }

    // Sends a message(s) to OpenAI's API and returns the response.
    // Will probably be removed in favor of a LangChain solution.
    public async generate_chat_completion(
        messages: OpenAIMessage[],
        model: string = this.configService.DEFAULT_MODEL,
        temperature: number = this.configService.DEFAULT_TEMPERATURE,
        max_tokens: number = this.configService.DEFAULT_MAX_TOKENS) {

        const { data, status } = await axios.post<any>(
            this.configService.OPENAI_API_URL,
            JSON.stringify(new OpenAIChatRequest(messages, model, temperature, max_tokens)),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.configService.OPENAI_API_SECRET_KEY}`
                }
            }
        );

        if (status == 200) {
            const response = data["choices"][0]["message"]["content"];
            console.log(response);
            return data;
        }
        else throw new Error(`Received bad response from OpenAI.`);
    }


    /** Creates an LLM Chain from the given prompt and executes it. */
    public async generate_completion(prompt: PromptTemplate, args: any): Promise<ChainValues> {
        const chain = new LLMChain({ prompt: prompt, llm: this.llm });
        const result = await chain.call(args);
        return result;
    }

}