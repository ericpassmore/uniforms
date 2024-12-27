<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";

    export let data;
</script>

<div class="list_alt">
    {#each data.uniforms as item}
        <Uniform item="{item}" style='all' />
    {/each}
</div>