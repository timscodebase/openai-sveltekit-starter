<script lang="ts">
    import MessageInput from '$lib/MessageInput.svelte';

    let waitingForResponse = false;

    let messages: {
        role: 'user' | 'assistant';
        content: string;
    }[] = [
        {
            role: 'user',
            content: 'Hello, how are you doing?'
        },
        {
            role: 'assistant',
            content: `\n\nAs an AI language model, I don't experience emotions or physical sensations, but I'm functioning properly and ready to assist you. How about you? How can I be of help today?`
        }
    ];

    let input = '';

    async function sendMessage(event: CustomEvent) {
        messages = [...messages, { role: 'user', content: event.detail }];

        waitingForResponse = true;

        const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message: event.detail })
        });

        if (!res.ok) {
            console.error('Error sending message', await res.text());
        }

        const data = (await res.json()) || [];

        messages = [...messages, ...data];
        waitingForResponse = false;
    }
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="OpenAI SvelteKit starter" />
</svelte:head>

<section>
    <ul class="messages border rounded">
        {#each messages as message}
            <li class="message" class:user={message.role === 'user'}>
                {message.content}
            </li>
        {/each}

        {#if waitingForResponse}
            <li class="message">Assistant is typing...</li>
        {/if}
    </ul>

    <MessageInput on:send={sendMessage} />
</section>

<style>
    ul.messages {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
        margin-bottom: 2rem;
    }

    li + li {
        border-top: 1px solid var(--border-color);
    }

    .message {
        padding: 1rem;
        background: rgb(240 249 255);
    }

    .message.user {
        background: #fff;
    }
</style>
