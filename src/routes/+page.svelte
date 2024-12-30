<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";
    import ProcessButton from "$lib/ProcessButton.svelte";

    export let data
</script>

<svelte:head>
    <title>Uniform</title>
</svelte:head>

<h1>BWGL Uniform</h1>

<main class="maincontent">
    {#if !data.isAuthenticated}
        <p class="top-message"> Please log in first</p>
        <div class="actionbutton">
            <a href="/login/">
                <p class="navicon">
                    <span class="material-symbols-outlined">login</span></p>
                <br/>
                <p class="subtext">Login</p>
            </a>
        </div>
    {:else}
        <p>Hello {data.user ? data.user.firstName : ""}! Use your phone and scan a QR code to add a uniform</p>
        <button popovertarget="add-uniform" class="actionbutton">
            <span class="material-symbols-outlined">add</span>
            <span class="subtext">Add</span>
        </button>
        <div popover id="add-uniform">
            <form id="full" class="inline-add" action="/api/process" method="GET">
                <div class="form-group">
                    <label for="number">Jersey Number:</label>
                    <input type="number" id="number" name="number" maxlength="3" required>
                    <input type="hidden" id="type" name ="type" value="yuni" >
                    <input type="hidden" id="redir" name ="redir" value="home" >
                </div>
                <div class="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    {/if}
    <div class="list_alt">
        {#each data.uniforms as item}
            <div class="restock">
                <Uniform item="{item}"/>
                <ProcessButton jerseyNumber={item.jerseyNumber}/>
            </div>
        {/each}
    </div>
</main>
