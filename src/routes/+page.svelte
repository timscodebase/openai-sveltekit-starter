<script lang="ts">
    import MessageInput from '$lib/PromptInput.svelte';

    let waitingForResponse = false;

    let messages: {
        role: 'user' | 'assistant';
        content: string;
    }[] = [];

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

<section class="chat-view">
    <h1>Chat</h1>

    <ul class="messages">
        {#each messages as message}
            <li class="message border rounded" class:user={message.role === 'user'}>
                {message.content}
            </li>
        {/each}

        {#if waitingForResponse}
            <li class="message border rounded">Assistant is typing...</li>
        {/if}
    </ul>

    <MessageInput on:send={sendMessage} placeholder="Message" />
</section>

<style>
    .chat-view {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    h1 {
        margin: 0 0 3rem;
    }

    ul.messages {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
        margin-bottom: auto;
        gap: 1rem;
    }

    .message {
        flex: 1;
        padding: 1rem;
        background: rgb(240 249 255);
        max-width: 40rem;
    }

    .message.user {
        background: #fff;
        margin-left: auto;
    }
</style>
