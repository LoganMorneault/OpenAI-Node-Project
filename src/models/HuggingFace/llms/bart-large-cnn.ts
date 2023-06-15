import { HfInference } from "@huggingface/inference";

export class BartLargeCnnModel {

    public constructor() { }

    /**
     * Executes a summarization using Facebook's bart-large-cnn model.
     * 
     * Uses HuggingFace's implementation, not LangChain's.
     * @param text The text to be summarized
     * @returns A JSON object with key 'summary_text' containing the summarized text.
     */
    public async execute(text: string) {
        const model = new HfInference("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");

        const result = await model.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: 'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.',
            parameters: {
                max_length: 130,
                min_length: 50,
                temperature: 5
            }
        });

        return result;
    }
}