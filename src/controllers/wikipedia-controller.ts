import { Application, Response, Request } from "express";
import { IController } from "./controller";
import { OpenAIService } from "../services/openai-service";
import { PromptService } from "../services/prompt-service";
import { ChainValues } from "langchain/dist/schema";


/** Provides support for querying Wikipedia articles using GPT though LangChain. 
 */
export class WikipediaController implements IController {
    readonly urlPrefix: string = 'wikipedia';
    private static readonly delimiter: string = '####';

    private readonly apiService: OpenAIService;
    private readonly promptService: PromptService;

    public constructor(apiService: OpenAIService, promptService: PromptService) {
        this.apiService = apiService;
        this.promptService = promptService;
    }

    public attach = (app: Application): void => {
        app.post(`/api/${this.urlPrefix}/summarize`, this.summarize);
    }


    /**Summarizes a Wikipedia article when provided with a hyperlink to that article.
     * 
     * Request.body should be a JSON object with key 'url', representing the URL of the article.
     * 
     * Response is a JSON object with key 'summary', containing the generated summary of the article.
      */
    public summarize = async (req: Request, res: Response) => {
        const url: string = req.body["url"];
        console.log(url);

        const prompt = this.promptService.getPromptByName("wikipedia_summary").toTemplate();

        // For error logging
        let response: ChainValues;

        try {
            // Generate completion with API
            response = await this.apiService.generate_completion(
                prompt,
                { delimiter: "####", article_link: url }
            )

            const parsedResponse = JSON.parse(response["text"]);
            console.log(parsedResponse);

            // Return to user
            res.json(parsedResponse);
        }
        catch (error) {
            console.log(error);
            console.log(response);
            res.json(error.message);
        }

        console.log(); // newline
    }
}



