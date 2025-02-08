<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";
    import QRCode from "$lib/QRCode.svelte";

    export let data;
</script>
<svelte:head>
    <title>List</title>
</svelte:head>

<main>
    <div class="titlewithnav">
        <h2>All Equipment</h2>
        <div class="sidenavbutton">
            <a href="/">
                <p class="navicon"><span class="material-symbols-outlined">home</span></p>
                <br/>
                <p class="subtext">Home</p>
            </a>
        </div>
    </div>
    <div class="list_alt">
        {#each data.uniforms as item}
            <div class="wide-equipment-listing">
                <Uniform item="{item}" style='all'/>
                <QRCode type="yuni" number="{item.id}" redir="home"/>
            </div>
        {/each}
    </div>
</main>