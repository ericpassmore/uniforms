<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";
    import ProcessButton from "$lib/ProcessButton.svelte";

    export let data;
</script>

<svelte:head>
    <title>Restock</title>
</svelte:head>

<main>
    <h2>Restock</h2>
    <div class="list_alt">
        {#each data.uniforms as item}
            <div class="restock">
                <Uniform item="{item}" style='all'/>
                <ProcessButton equipmentId={item.id} redirectPath="restock" textHelp="Return-OK"/>
            </div>
        {/each}
    </div>
</main>