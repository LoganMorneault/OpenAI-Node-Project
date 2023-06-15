import { Application, Request, Response } from "express";
import { IController } from "./controller";
import { Gpt2Model } from "../models/HuggingFace/llms/gpt2-llm";
import { BartLargeCnnModel } from "../models/HuggingFace/llms/bart-large-cnn";

export class TestController implements IController {
    readonly urlPrefix: string = "test";

    public constructor() { }


    public attach = (app: Application): void => {
        app.get(`/api/${this.urlPrefix}/ping`, this.ping);
        app.post(`/api/${this.urlPrefix}/gpt2`, this.gpt2Completion);
        app.post(`/api/${this.urlPrefix}/bartsummary`, this.bartSummarization);
    }


    /** Returns "pong" */
    private ping = async (req: Request, res: Response) => {
        console.log("Received a ping. Sending 'pong'.");
        res.json("pong");
    }


    /**
     * Completes a given text using GPT2 via LangChain's HuggingFace integration.
     * @param req req.body should be a JSON object with key 'text', containing the text to be completed.
     * @param res A JSON object with key 'response', containing the model's response.
     */
    private gpt2Completion = async (req: Request, res: Response) => {
        const text: string = req.body["text"];
        console.log(`GPT Completion: ${text}`);

        let model = new Gpt2Model();

        let response = await model.execute(text);

        res.json({ response });
    }


    /**
     * Summarizes a given text using Facebook's Bart Large CNN model via HuggingFace's TS library.
     * @param req req.body should be a JSON object with key 'text', containing the text to be summarized.
     * @param res A JSON object with key 'summary_text', containing the model's response.
     */
    private bartSummarization = async (req: Request, res: Response) => {
        const text: string = req.body["text"];
        console.log(`Bart Summarization of: "${text}"`);

        let model = new BartLargeCnnModel();
        let response = await model.execute(text);
        console.log(response);

        res.json(response);
    }
}