# OpenAI Image Generator

This is a simple image generator built with Node.js and Express that uses [OpenAI's Dall-E models](https://beta.openai.com/docs/guides/images) to generate images.

## Usage

Create a `.env` file.

Generate an API KEY at [OpenAI](https://beta.openai.com/) and add it to the `.env` file.

Replace "<yourkey>" with the API key you get from OpenAI.

OPENAI_API_KEY="<yourkey>"

Install the dependencies

```bash
npm install
```

Run server

```bash
npm start
```

Visit `http://localhost:5000` in your browser.

The endpoint is at `POST http://localhost:5000/openai/generateimage`.
