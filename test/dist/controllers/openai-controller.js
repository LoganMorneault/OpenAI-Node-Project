"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("../config.json"));
const DEFAULT_MODEL = config_json_1.default["OPENAI"]["DEFAULT_MODEL"];
const DEFAULT_TEMP = config_json_1.default["OPENAI"]["DEFAULT_TEMPERATURE"];
const DEFAULT_MAX_TOKENS = config_json_1.default["OPENAI"]["DEFAULT_MAX_TOKENS"];
const GPT_API_URL = config_json_1.default["OPENAI"]["API_URL"];
const GPT_SECRET_KEY = config_json_1.default["OPENAI"]["API_SECRET_KEY"];
function generate_chat_completion(messages, model = DEFAULT_MODEL, temperature = DEFAULT_TEMP, max_tokens = DEFAULT_MAX_TOKENS) {
    return __awaiter(this, void 0, void 0, function* () {
        // url, data, options
        const { data, status } = yield axios_1.default.post(GPT_API_URL, {
            "model": model,
            "messages": messages,
            "temperature": temperature
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GPT_SECRET_KEY}`
            }
        });
        if (status == 200) {
            const response = data["choices"][0]["message"]["content"];
            console.log(response);
            return response;
        }
        else
            return undefined;
    });
}
const apiRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = req.body;
    console.log(messages);
    const response = yield generate_chat_completion(messages);
    if (response)
        res.json(response);
    else
        res.json("Failed to reach GPT 3.5 Turbo");
});
const wikipediaSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body["url"];
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
    ];
    const response = yield generate_chat_completion(messages);
    if (response)
        res.json(JSON.parse(response));
    else
        res.json("Failed to reach GPT 3.5 Turbo");
});
// req is the request, res is the response.
const ping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received a ping. Sending 'pong'.");
    res.json("pong");
});
const OpenAiController = (app) => {
    app.get('/ping', ping); // Create a GET endpoint at /ping that calls the ping function.
    app.post('/api/completion', apiRequest),
        app.post('/api/wikipedia', wikipediaSummary);
};
exports.default = OpenAiController;
//# sourceMappingURL=openai-controller.js.map