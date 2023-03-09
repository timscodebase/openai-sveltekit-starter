import { json, type RequestEvent } from '@sveltejs/kit';
import { openai } from '$lib/openAi';

export const POST = async (event: RequestEvent) => {
    const requestBody = await event.request.json();
    const { prompt } = requestBody;

    const res = await openai.createImage({
        prompt,
        n: 1,
        size: '512x512',
        response_format: 'b64_json'
    });

    return json(res?.data?.data?.[0] || {});
};
