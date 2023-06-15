import { PromptTemplate } from "langchain/prompts";

export class Prompt {
    public readonly promptText: string;
    public readonly promptName: string;
    public readonly inputVariables: string[];

    public constructor(promptTemplate: string, promptName: string, inputVariables: string[]) {
        this.promptText = promptTemplate;
        this.promptName = promptName;
        this.inputVariables = inputVariables;
    }

    public toTemplate = () => {
        return PromptTemplate.fromTemplate(this.promptText);
    }

}