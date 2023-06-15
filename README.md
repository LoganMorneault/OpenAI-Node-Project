# OpenAI-Node-Project

Proof-of-concept for a RESTful API hosted on a Node server, to be used as a middle-man between an Angular front-end and OpenAI's GPT API.

## Setup

Download repo, then run `npm install` to install node modules.

Update `src/config.json` to include your own OpenAI secret key.

To run the Node server, run `npm start`.

You may need to install node or tsc.

## Project Structure

This project uses a model/controller structure.

```txt
|- app.ts (entrypoint)
|- Controllers
|  |- Classes that provide some specific functionality
|- Data
|  |- Sample data. Currently just prompts, might be replaced with a DB service.
|- Models
|  |- Classes to be used by other classes
|- Services
|  |- Classes that provide some functionality to be used by multiple other classes.
```

## To Do

- Database service?
- More controllers for different use cases
  - LangChain Agents might be an interesting pathway here.
