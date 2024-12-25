<script lang="ts">
    export let data
</script>

<svelte:head>
    <title>Uniform</title>
</svelte:head>

<h1>Welcome to Uniform Management</h1>
<p>Hello World first page </p>
{#if data.isAuthenticated}
    <p>Good News we are authorized!</p>
{/if}
<button on:click={() => { window.location.href = '/login' }}>
    Login with TeamSnap
</button>