<h1 align="center">AI Helper</h1>

![JavaScript](https://img.shields.io/badge/JavaScript-grey?style=flat-square&logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-grey?style=flat-square&logo=node.js)
![ESLint](https://img.shields.io/badge/ESLint-grey?style=flat-square&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-grey?style=flat-square&logo=prettier)
![Docker](https://img.shields.io/badge/Docker-grey?style=flat-square&logo=docker)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

AI Helper is an AI assistant Discord bot, it is based on OpenAI's GPT-4 and DALL-E models.
AI Helper allows you to talk with it and generate images.

## How to install
There are two ways to use AI Helper, first one: with Docker and second one: without Docker.

### With Docker
If you prefer using Docker to run the bot, follow these steps:
1) Make sure you have Docker installed on your machine.
2) Clone this repository to your machine.
3) Navigate to the cloned repository directory.
4) Build the Docker image:
    ```bash
    docker build -t discord-ai-helper .
    ```

### Without Docker
If you prefer to run the bot without using Docker, follow these steps:
1) Make sure you have Node.js installed on your machine.
2) Clone this repository to your machine.
3) Navigate to the cloned repository directory.
4) Install the necessary dependencies:
    ```bash
    npm install --production
    ```
5) Create a `.env` file at the root of the cloned repository directory and provide the necessary configuration:
    ```
    DISCORD_BOT_TOKEN=your_discord_bot_token
    OPENAI_API_KEY=your_openai_api_key
    DISCORD_SERVER_ID=your_discord_server_id
    ```

## How to run
Now that you have completed the installations, follow the following steps to run the bot.

### With Docker
Run this command:
```bash
docker run -e DISCORD_BOT_TOKEN=your_discord_bot_token -e OPENAI_API_KEY=your_openai_api_key -e DISCORD_SERVER_ID=your_discord_server_id discord-ai-helper
```
If you have a `.env` file you can also run this command:
```bash
docker run --env-file your_env_file discord-ai-helper
```

### Without Docker
1) Navigate to the cloned repository directory.
2) Run this command:
    ```bash
    npm start
    ```

## Features
- <b>Interactive Chat:</b> Interact with the @bot using natural language, powered by GPT-4 AI Model. The bot's response is optimized through carefully crafted prompts.
- <b>Text Generation with GPT-4:</b> Use ```!gpt4 [prompt]``` command to generate text with GPT-4 AI Model. Your raw prompt is directly sent to the AI.
- <b>Image Generation with DALL-E:</b> Create images with textual descriptions using the ```!dall-e [prompt]``` command, harnessing the creative capabilities of the DALL-E AI Model.

## License
This project is under MIT License, see [LICENSE](LICENSE) for details.