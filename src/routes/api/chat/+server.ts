import { json, type RequestEvent } from '@sveltejs/kit';
import { openai } from '$lib/openAi';

export const POST = async (event: RequestEvent) => {
    const requestBody = await event.request.json();
    const { message } = requestBody;

    /*
        If you want the AI to have context you will need to send previous
        messages as well, not just the most recent one.
        Keep in mind there is a limit of 4096 tokens (~3000 words) per request currently.
    */
    const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
    });

    const responseMessages = res.data?.choices?.map((item: any) => ({
        role: item.message?.role,
        content: item.message?.content
    }));

    return json(responseMessages);
};
