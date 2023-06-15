// TO BE REMOVED
export class OpenAIMessage {
    public readonly role: string;
    public readonly content: string;

    public constructor(role: string, content: string) {
        this.role = role;
        this.content = content;
    }
}