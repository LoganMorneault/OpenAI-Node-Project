import express from 'express';
import config from "./config.json"

import { Application } from 'express';
import { WikipediaController } from './controllers/wikipedia-controller';
import { OpenAIService } from './services/openai-service';
import { TestController } from './controllers/test-controller';
import { ConfigService } from './services/config-service';
import { PromptService } from './services/prompt-service';


const app: Application = express();
app.use(express.json());


// Instantiate services
const configService: ConfigService = new ConfigService();
const promptService: PromptService = new PromptService();
const openAiService: OpenAIService = new OpenAIService(configService);


// Allows for querying Wikipedia
const wikipediaController = new WikipediaController(openAiService, promptService)
wikipediaController.attach(app);

// Miscellaneous
const testController = new TestController();
testController.attach(app);


// Start app.
app.listen(config["PORT_NUMBER"], () => {
    console.log(`Express is now listening on port ${config["PORT_NUMBER"]}.\n`);
})
