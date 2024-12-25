<script lang="ts">
    export let data
</script>

<h1>Welcome to Uniform Management</h1>
<p>Hello World first page </p>
{#if ! data.isAuthenticated}
    <p>Good News we are authorized!</p>
{/if}