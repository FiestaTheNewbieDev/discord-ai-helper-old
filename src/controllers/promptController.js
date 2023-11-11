const gpt4Controller = require('./gpt4Controller');
const dallEController = require('./dallEController');
// const dallEController = require('./dallEController');

module.exports = {
    async execute(client, message, prompt) {
        prompt = `${message.author} send you this message: '${prompt}', respond to it following these instructions:\n
        - If you think that this request is a request to get an image start your response with PICTURE followed by tags list of the image\n
        - Else respond by following the other instructions\n
        - you are ONLY ${client.user}\n
        - you are an interractive discord bot based on GPT-4 and DALL-E\n
        - ALWAYS speak with user's request language\n
        - ALWAYS replace user's name with ${message.author}\n
        `;

        message.channel.sendTyping();
        let response = await gpt4Controller.runPrompt(prompt);
        if (response.startsWith('PICTURE')) {
            message.channel.sendTyping();
            response = response.replace('PICTURE', '');
            response = response.replace(',', '');
            message.channel.send(await dallEController.runPrompt(response));
        } else message.channel.send(await gpt4Controller.runPrompt(prompt));
    }
};