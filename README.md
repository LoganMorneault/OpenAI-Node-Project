# OpenAI-Node-Project

Proof-of-concept for a RESTful API hosted on a Node server, to be used as a middle-man between an Angular front-end and OpenAI's GPT API.

## Setup

Download repo, then run `npm install` to install node modules.

Update `src/config.json` to include your own OpenAI secret key.

To run the Node server, run `npm start`.

You may need to install node or tsc.

## To Do:

- Refactor to use LangChain.js
- System for prompt storage.
  - Formatting/interpolation can be done with LangChain.
