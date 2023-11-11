module.exports = {
    async runPrompt(prompt, attachments) {
        let content = [
            {type: 'text', text: prompt}
        ];
        attachments.forEach(attachment => {
            content.push({
                type: 'image_url',
                image_url: {
                    url: attachment
                }
            });
        });

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4-vision-preview',
                messages: [{role: 'user', content: content}],
                max_tokens: 300
            })
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', options);
            const data = await response.json();
            console.log(data.choices);
            return data.choices[0].message.content;
        } catch(error) {
            console.error(error);
        }
    }
};