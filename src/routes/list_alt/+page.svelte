<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";
    import QRCode from "$lib/QRCode.svelte";
    import ProcessButton from "$lib/ProcessButton.svelte";

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
                {#if data.user && data.user.isAdmin}
                    <Uniform item="{item}" style='all' />
                    <QRCode type="yuni" number="{item.id}" redir="home"/>
                {:else}
                    <div class="restock">
                        <Uniform item="{item}" style='short' />
                        <ProcessButton equipmentId={item.id} redirectPath="home" textHelp="Checkout"/>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</main>