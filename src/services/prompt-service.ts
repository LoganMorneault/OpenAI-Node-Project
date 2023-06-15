import prompts from "../data/prompts.json"
import { Prompt } from "../models/prompt";

export class PromptService {
    private prompts: Prompt[];

    // Reads prompts from JSON
    public constructor() {
        this.prompts = [];

        for (let p of prompts) {
            this.prompts.push(new Prompt(p["prompt_text"], p["prompt_name"], p["input_variables"]))
        }
    }

    /** Returns a single prompt with the given name from the prompt database. */
    public getPromptByName(promptName: string): Prompt {
        return this.prompts.filter(p => p.promptName == promptName)[0];
    }

}