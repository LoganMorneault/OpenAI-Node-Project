import axios from "axios";
import config from "../config.json"
import { Application, Response, Request } from "express";

const DEFAULT_MODEL: string = config["OPENAI"]["DEFAULT_MODEL"];
const DEFAULT_TEMP: number = config["OPENAI"]["DEFAULT_TEMPERATURE"];
const DEFAULT_MAX_TOKENS: number = config["OPENAI"]["DEFAULT_MAX_TOKENS"];
const GPT_API_URL: string = config["OPENAI"]["API_URL"];
const GPT_SECRET_KEY: string = config["OPENAI"]["API_SECRET_KEY"];


async function generate_chat_completion(messages: any[], model: string = DEFAULT_MODEL, temperature: number = DEFAULT_TEMP, max_tokens: number = DEFAULT_MAX_TOKENS) {

    // url, data, options
    const { data, status } = await axios.post<any>(
        GPT_API_URL,
        {
            "model": model,
            "messages": messages,
            "temperature": temperature
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GPT_SECRET_KEY}`
            }
        }
    );

    if (status == 200) {
        const response = data["choices"][0]["message"]["content"];
        console.log(response);
        return response;
    }
    else return undefined;
}



const apiRequest = async (req, res) => {
    const messages = req.body;
    console.log(messages);

    const response = await generate_chat_completion(messages);

    if (response) res.json(response);
    else res.json("Failed to reach GPT 3.5 Turbo");
}


// Summarizes a Wikipedia article. 
// Request body should be a JSON object with key "url", representing the url of the article to be summarized.
// Returns a JSON object with key "Summary", representing the summary of the article as returned by GPT.
const wikipediaSummary = async (req: Request, res: Response) => {
    const url: string = req.body["url"];

    console.log(url);

    const delimiter = "####";

    const prompt = `
    You will be provided with hyperlinks to wikipedia articles.
    The hyperlinks will be delimited with ${delimiter} characters.

    You are an assistant that extracts information from wikipedia articles to educate laymen users. From the provided wikipedia article, extract key points. 
    
    Ignore information in tables.
    
    Format your response as a JSON object with "Summary" as the key.
    `;

    const messages = [
        { "role": "system", "content": prompt },
        { "role": "user", "content": `${delimiter}${url}${delimiter}` }
    ]

    const response = await generate_chat_completion(messages);

    if (response) res.json(JSON.parse(response));
    else res.json("Failed to reach GPT 3.5 Turbo");
}




// req is the request, res is the response.
const ping = async (req, res) => {
    console.log("Received a ping. Sending 'pong'.");
    res.json("pong");
}



const OpenAiController = (app: Application): void => {
    app.get('/ping', ping); // Create a GET endpoint at /ping that calls the ping function.
    app.post('/api/completion', apiRequest);
    app.post('/api/wikipedia', wikipediaSummary);
};
export default OpenAiController;