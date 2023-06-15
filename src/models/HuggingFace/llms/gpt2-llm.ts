import { HuggingFaceInference } from "langchain/llms/hf"

export class Gpt2Model {

    public constructor() { }

    /**Executes a completion using GPT-2.
     * 
     * Uses LangChain's HuggingFace integration.
     */
    public async execute(text: string): Promise<string> {
        const model = new HuggingFaceInference({
            model: "gpt2",
            apiKey: "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"
        });

        // Execute completion
        const result = await model.call(text);
        console.log({ result });

        return result;
    }
}