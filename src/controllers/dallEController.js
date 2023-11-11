module.exports = {
    async runPrompt(prompt) {
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'prompt': prompt
            })
        };
        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', options);
            const data = await response.json();

            let message = '';
            data?.data.forEach(imageObject => {
                message = message + imageObject.url + '\n';
            });

            return message;
        } catch(error) {
            console.error(error);
        }
    },
    async runPromptWithArgs(args) {
        let prompt = '';
        args.forEach(arg => {
            prompt = prompt + arg.toString() + ' ';
        });
        return await this.runPrompt(prompt);
    }
};