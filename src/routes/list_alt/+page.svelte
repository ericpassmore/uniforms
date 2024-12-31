<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";
    import QRCode from "$lib/QRCode.svelte";

    export let data;
</script>
<svelte:head>
    <title>List</title>
</svelte:head>

<main>
    <h2>All Equipment</h2>
    <div class="list_alt">
        {#each data.uniforms as item}
            <div class="wide-equipment-listing">
                <Uniform item="{item}" style='all'/>
                <QRCode type="yuni" number="{item.jerseyNumber}" redir="home"/>
            </div>
        {/each}
    </div>
</main>