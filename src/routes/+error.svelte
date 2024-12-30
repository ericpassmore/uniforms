<script lang="ts">
    import {page} from '$app/state';
</script>

<svelte:head>
    <title>{page.status}</title>
</svelte:head>

<main class="maincontent">
    <div>
        {#if page.status === 404}
            <h2>Not found!</h2>
        {:else}
            <h2>Internal Error</h2>
            <h3 class="error-message">{page.error?.message || 'Something Went Wrong'}</h3>
        {/if}
    </div>
</main>