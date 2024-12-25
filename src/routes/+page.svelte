<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";

    export let data

    const item = {
        number: 96,
        uniform_size: 'small',
        has_short: true,
        pinny_number: 3,
        pinny_size: 'small'
    }

</script>

<svelte:head>
    <title>Uniform</title>
</svelte:head>

<h1>BWGL Uniform</h1>

<main class="maincontent">
    {#if !data.isAuthenticated}
        <p class="top-message"> Please log in first </p>
        <div class="actionbutton">
            <a href="/login/">
                <p class="navicon">
                    <span class="material-symbols-outlined">login</span></p>
                <br/>
                <p class="subtext">Login</p>
            </a>
        </div>
    {:else}
        <div class="actionbutton">
            <a href="/add/">
                <p class="navicon">
                    <span class="material-symbols-outlined">add</span></p>
                <br/>
                <p class="subtext">Add</p>
            </a>
        </div>
    {/if}
    <Uniform item="{item}" />
</main>
