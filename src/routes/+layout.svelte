<script lang="ts">
    import { page } from '$app/stores';
    import './styles.css';

    $: console.log($page);

    const links = [
        { title: 'Chat', href: '/' },
        { title: 'Image generation', href: '/image' }
    ];
</script>

<div class="app">
    <nav>
        {#each links as link}
            <a href={link.href} class:active={$page.route.id === link.href}>
                {link.title}
            </a>
        {/each}
    </nav>

    <main>
        <slot />
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 800px;
        max-width: 90%;
        margin: 0 auto;
    }

    nav {
        flex: 0 0 auto;
        display: flex;
        gap: 1rem;
        padding: 1rem;
    }

    nav a {
        text-decoration: none;
        color: inherit;
    }

    nav a.active {
        color: #2568c8;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 1rem 1rem 2rem;
        margin: 0 auto;
    }
</style>
