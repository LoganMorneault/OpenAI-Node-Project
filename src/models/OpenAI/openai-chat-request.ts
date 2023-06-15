import { OpenAIMessage } from "./openai-message";
import config from "../../config.json";

const DEFAULT_MODEL: string = config["OPENAI"]["DEFAULT_MODEL"];
const DEFAULT_TEMP: number = config["OPENAI"]["DEFAULT_TEMPERATURE"];
const DEFAULT_MAX_TOKENS: number = config["OPENAI"]["DEFAULT_MAX_TOKENS"];

// TO BE REMOVED
// A request to be sent to OpenAI
export class OpenAIChatRequest {
    public readonly messages: OpenAIMessage[];

    public readonly model: string;
    public readonly temperature: number;
    public readonly max_tokens: number;
    public readonly top_p: number;
    public readonly n: number;
    public readonly presence_penalty: number;
    public readonly frequency_penalty: number;

    public constructor(messages: OpenAIMessage[], model: string = DEFAULT_MODEL, temperature: number = DEFAULT_TEMP, max_tokens: number = DEFAULT_MAX_TOKENS, top_p: number = 1, n: number = 1, presence_penalty: number = 0, frequency_penalty: number = 0) {
        this.messages = messages;

        this.model = model;
        this.temperature = temperature;
        this.max_tokens = max_tokens;
        this.top_p = top_p;
        this.n = n;
        this.presence_penalty = presence_penalty;
        this.frequency_penalty = frequency_penalty;
    }
}