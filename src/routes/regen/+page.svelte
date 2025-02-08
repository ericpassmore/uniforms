<script lang="ts">
    export let data;
    let disableStatus = !data.isAuthenticated
</script>

<svelte:head>
    <title>Add</title>
</svelte:head>

<main class="addpage">
    <form id="full" class="inline-add" method="POST" action="?/regen">
        <div class="form-group">
            <button type="submit" disabled="{disableStatus}">Submit</button>
        </div>
    </form>
</main>