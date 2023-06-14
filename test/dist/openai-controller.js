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
Object.defineProperty(exports, "__esModule", { value: true });
// req is the request, res is the response.
const ping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("pong");
});
const apiRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gpt_endpoint = "https://api.openai.com/v1/chat/completions";
    const default_model = "gpt-3.5-turbo";
});
const OpenAiController = (app) => {
    app.get('/ping', ping); // Create a GET endpoint at /ping that calls the ping function.
};
exports.default = OpenAiController;
//# sourceMappingURL=openai-controller.js.map