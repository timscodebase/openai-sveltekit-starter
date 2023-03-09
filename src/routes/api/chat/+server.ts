import { json, type RequestEvent } from '@sveltejs/kit';
import { openai } from '$lib/openAi';

export const POST = async (event: RequestEvent) => {
    const requestBody = await event.request.json();
    const { message } = requestBody;

    /*
        If you want the model to have context (know about previous messages)
        you will need to send them all, not just the most recent one.
        This might cause issues due to the 4000 (?) character limit.
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
