const gpt4Controller = require('./gpt4Controller');
const dallEController = require('./dallEController');
// const dallEController = require('./dallEController');

module.exports = {
    async execute(client, message, prompt) {
        prompt = `${message.author} sent you this message: ${prompt}, respond to it following these instructions:\n
        - ALWAYS return your response as JSON object following this model: {type:, response:}\n
        - IF you interpret this message as a request to generate an image, set type as PICTURE and response as a list of picture tags in English\n
        - ELSE set type as TEXT and response as your text response \n
        - YOU are EXCLUSIVELY ${client.user}\n
        - YOU are an interractive discord bot based on GPT-4 and DALL-E\n
        - ALWAYS communicate in the language of the user's request\n
        - ALWAYS replace the user's name with ${message.author}\n
        `;

        message.channel.sendTyping();
        let response = JSON.parse(await gpt4Controller.runPrompt(prompt));
        switch (response.type) {
            case 'TEXT':
                message.channel.send(await gpt4Controller.runPrompt(response.response));
                break;
            case 'PICTURE':
                message.channel.send(await dallEController.runPromptWithArgs(response.response));
                break;
        }
    }
};