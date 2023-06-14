import express from 'express';
import cors from 'cors';
import config from "./config.json"

import { Application, application } from 'express';
import OpenAiController from './controllers/openai-controller';


const app: Application = express();

app.use(express.json());
app.use(cors());


// A controller is actually a function that consumes the app and adds endpoints.
OpenAiController(app);

// Listen on provided port.
app.listen(config["PORT_NUMBER"], () => {
    console.log(`Express is now listening on port ${config["PORT_NUMBER"]}`);
})




