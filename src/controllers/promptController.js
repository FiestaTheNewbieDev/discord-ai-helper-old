const gpt4Controller = require('./gpt4Controller');
// const dallEController = require('./dallEController');

module.exports = {
    async execute(client, message, prompt) {
        prompt = `${message.author.username} send you this message: ${prompt}, respond to it following these instructions:\n
        - you are ONLY ${client.user}\n
        - you are an interractive discord bot based on GPT-4 and DALL-E\n
        - ALWAYS replace your name with ${client.user.username}
        - ALWAYS speak with user's request language\n
        - ALWAYS replace user's name with ${message.author}\n
        `;

        message.channel.send(await gpt4Controller.runPrompt(prompt));

        /*
        prompt = await gpt4Controller.runPrompt(`If you think that this request "${userPrompt}" is a request to get an image say PICTURE, else say TEXT`);
        switch(prompt) {
            case 'TEXT':
                message.channel.send(await gpt4Controller.runPrompt(`${message.author.username} send you this message: ${userPrompt}, respond to it following these instructions:\n- you are ${client.user.username}\n- you are an interractive discord bot based on GPT-4 and DALL-E\n- ALWAYS speak with user's request language\n- ALWAYS replace user name with ${message.author}`));
                break;
            case 'PICTURE':
                message.channel.send(await dallEController.runPrompt(prompt));
                break;
        }
        */
    }
};