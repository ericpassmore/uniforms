<script lang="ts">
    import Uniform from "$lib/Uniform.svelte";
    import ProcessButton from "$lib/ProcessButton.svelte";
    import { fade } from "svelte/transition";
    import { page } from "$app/state"
    export let data
    let errorVisible  = false
    let errorMessage = ""

    function prettyErrorMessage(errorCode:string): string {
        switch (errorCode) {
            case 'not_authorized':
                return 'Not authorized. Please login and try again'
            case 'uniform_not_found':
                return 'Uniform with that number not found.'
            case 'not_owner':
                return 'Not Allowed: Someone else has checked out that item.'
            case 'not_admin':
                return 'Not Allowed: Commissioner level permissions required to restock items.'
            default:
                return errorCode
        }
    }

    const errorCode = page.url.searchParams.get('error');
    if (errorCode) {
        errorMessage = prettyErrorMessage(errorCode)
        errorVisible = true;
    }
</script>

<svelte:head>
    <title>Uniform</title>
</svelte:head>

<h1>BWGL Uniform</h1>

<main class="maincontent">
    {#if errorVisible}
        <div id="error" class="errorBox" transition:fade>
            <span class="material-symbols-outlined">error</span>
            <span class="error-text">{errorMessage}</span>
        </div>
    {/if}
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
                <ProcessButton jerseyNumber={item.jerseyNumber} redirectPath="home"/>
            </div>
        {/each}
    </div>
</main>
