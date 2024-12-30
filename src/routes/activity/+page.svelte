<script lang="ts">
    export let data;
</script>

<svelte:head>
    <title>Activity</title>
</svelte:head>
<main class="maincontent">
    <div class="activitylog">
        {#each data.results as log}
            <div class="logrow">
                <span>Id: {log.userId}</span>
                <span>First: {log.firstName}</span>
                <span>Last: {log.lastName}</span>
                <span>Activity: {log.action}</span>
                <span class="datetime">Date: {log.date}</span>
                <span>{log.equipementId ? log.equipmentId : 'NA'}</span>
            </div>
        {/each}
    </div>
</main>