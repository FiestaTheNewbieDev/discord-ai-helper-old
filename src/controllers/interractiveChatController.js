const gpt4Controller = require('./gpt4Controller');
const gpt4VisionController = require('./gpt4VisionController');
const dallEController = require('./dallEController');

module.exports = {
    async execute(client, message, prompt) {
        prompt = `Respond to this prompt:\n${prompt} following these instructions:\n
        - ALWAYS return your response as JSON object following this model: {type:, content:}\n
        - IF you interpret this message as a request to generate an image, set type as PICTURE and content as a list of picture tags in English\n
        - ELSE set type as TEXT and content as ${prompt} \n
        `;
    
        let data = JSON.parse(await gpt4Controller.runPrompt(prompt));

        if (message.attachments.size > 0 && data.type == 'TEXT') {
            data.attachments = [];
            message.attachments.forEach(attachment => {
                if (attachment.contentType.startsWith('image/')) {
                    data.type = 'VISION';
                    data.attachments.push(attachment.url);
                }
            });
        }

        switch (data.type) {
            case 'TEXT':
                prompt = `${message.author} sent you this message: ${data.content}, respond to it following these instructions:\n
                - YOUR name is EXCLUSIVELY ${client.user}\n
                - YOU are an interractive discord bot based on GPT-4 and DALL-E\n
                - ALWAYS communicate in the language of the user's request\n
                - ALWAYS replace the user's name with ${message.author}\n
                `;
                message.channel.sendTyping();
                message.channel.send(await gpt4Controller.runPrompt(prompt));
                break;
            case 'PICTURE':
                message.channel.sendTyping();
                message.channel.send(await dallEController.runPromptWithArgs(data.content));
                break;
            case 'VISION':
                message.channel.sendTyping();
                message.channel.send(await gpt4VisionController.runPrompt(data.content, data.attachments));
                break;
        }
    }
};