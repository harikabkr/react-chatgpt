import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';


const OPENAI_CHAT_COMPLETION_URL = 'https://api.openai.com/v1/chat/completions'

export const chatService = {
    getChatResponse(chatMessage) {
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAPI_KEY,
        });
        const openai = new OpenAIApi(configuration);
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: chatMessage}],
        }).then((response) => {
            const { message, finish_reason } = response.choices[0];
            const { role, content } = message;
            return content;
        }).catch((error)=>{
            console.error(error);
            return 'Error retrieving data !!'
        });
    }, 

    async getMessageReplyFromOpenAi(chatMessage) {
        const requestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": chatMessage}]
        }
        const response = await axios.post(
            OPENAI_CHAT_COMPLETION_URL, 
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAPI_KEY}`,
                },
            }
        );
        console.log('Returned response - ', response);
        const { data, status } = response;
        if ( status !== 200) return 'ERROR FETCHING FROM API';
        const { message, finish_reason } = data.choices[0];
        const { role, content } = message;
        return content;
    }
}   
