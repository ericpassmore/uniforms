<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";

    export let data;
</script>
<svelte:head>
    <title>List</title>
</svelte:head>

<main>
    <h2>All Equipment</h2>
    <div class="list_alt">
        {#each data.uniforms as item}
            <Uniform item="{item}" style='all'/>
        {/each}
    </div>
</main>