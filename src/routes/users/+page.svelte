<script lang="ts">

    export let data

</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<h1>Users</h1>

<main class="maincontent">
    {#each data.users as user}
        <div class="logrow">
            <span>Id: {user.id}|</span>
            <span>First: {user.firstName}|</span>
            <span>Last: {user.lastName}|</span>
            <span>Email: {user.email}|</span>
            <span>IsAdmin: {!!user.isAdmin}</span>
        </div>
    {/each}
</main>