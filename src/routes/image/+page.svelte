<script lang="ts">
    import MessageInput from '$lib/PromptInput.svelte';

    let waitingForResponse = false;

    let base64Data: string;

    async function generateImage(event: CustomEvent) {
        waitingForResponse = true;

        const res = await fetch('/api/image', {
            method: 'POST',
            body: JSON.stringify({ prompt: event.detail })
        });

        const data = await res.json();

        console.log('data', data);
        base64Data = data.b64_json;
        waitingForResponse = false;
    }
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="OpenAI SvelteKit starter" />
</svelte:head>

<section class="image-view">
    <h1>Image generation</h1>

    <MessageInput on:send={generateImage} placeholder="Prompt" />

    <div class="response">
        {#if waitingForResponse}
            Generating image...
        {:else if base64Data}
            <img src="data:image/png;base64, {base64Data}" alt="AI Generated" />
        {/if}
    </div>
</section>

<style>
    .image-view {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    h1 {
        margin: 0 0 3rem;
    }

    .response {
        margin-top: 2rem;
    }
</style>
