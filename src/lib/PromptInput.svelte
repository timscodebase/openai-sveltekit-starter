<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let value = '';

    $: lineCount = value?.split('\n').length || 1;
    $: height = lineCount * 24 + 'px';

    function emitValue() {
        if (value) {
            dispatch('send', value);
            value = '';
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            emitValue();
            event.preventDefault();
        }
    }
</script>

<form on:submit|preventDefault={emitValue} class="border rounded">
    <label for="prompt-input" class="visually-hidden">Enter prompt for the AI</label>
    <textarea
        id="prompt-input"
        bind:value
        on:keydown={handleKeydown}
        placeholder={$$restProps.placeholder}
        style:height
    />
    <button aria-label="Send" class="text-subdued">
        <!-- prettier-ignore -->
        <svg width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    </button>
</form>

<style>
    form {
        position: relative;
        display: flex;
        width: 100%;
        background: #fff;
        overflow: hidden;
    }

    textarea {
        flex: 1;
        resize: none;
        border: none;
        max-height: 20em;
        padding: 0.75rem 3rem 0.75rem 0.75rem;
        width: 100%;
        line-height: 24px;
        outline: none;
        box-sizing: content-box;
    }

    button {
        position: absolute;
        bottom: 0.75rem;
        right: 0.75rem;

        padding: 0;
        height: 20px;
        background: none;
        border: none;
    }
</style>
