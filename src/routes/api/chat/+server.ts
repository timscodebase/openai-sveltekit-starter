import { json, type RequestEvent } from '@sveltejs/kit';
import { SECRET_OPENAI_API_KEY } from '$env/static/private';

export const POST = async (event: RequestEvent) => {
    const requestBody = await event.request.json();
    const { message } = requestBody;

    // Setting context for the chat
    // const initialMessage = {
    //     role: 'system',
    //     content: 'You are a Alfred, a most helpful and loyal fictional butler to Batman. Your responses should be directed directly to Batman, as if he were asking you himself.'
    // };

    const body = {
        model: 'gpt-3.5-turbo',
        messages: [
            // initialMessage,
            { role: 'user', content: message }
        ]
    };

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SECRET_OPENAI_API_KEY}`
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const data = await res.json();

    const responseMessages = (data?.choices || []).map((item: any) => ({
        role: item.message?.role,
        content: item.message?.content
    }));

    return json(responseMessages);
};
