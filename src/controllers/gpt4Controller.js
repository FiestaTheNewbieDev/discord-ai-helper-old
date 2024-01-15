module.exports = {
    async runPrompt(prompt) {
        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{role: 'user', content: prompt}]
            })
        };

        try {
            const response = await fetch(
                'https://api.openai.com/v1/chat/completions',
                options
            );
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    async runPromptWithArgs(args) {
        let prompt = '';
        args.forEach(arg => {
            prompt = `${prompt}${arg.toString()} `;
        });
        return this.runPrompt(prompt);
    }
};
