<script lang="ts">
    const month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    // Oct, Nov, Dec its the next year's spring season
    if (month > 10) {
        year = year + 1;
    }
</script>

<svelte:head>
    <title>About</title>
</svelte:head>

<main class="maincontent">
    <h1>About</h1>
    <p>This app is a self server tool to checkout uniforms for Bellevue Girls Lacrosse.</p>
    <p>Login with your TeamSnap username and password. You will be charged $150 for every uniform not returned by the
        end of the {year} Spring Season. $150 charge does not include payment processing fees and service fees charged
        by the payment processor.</p>
    <p>Payment by check or venmo. Contact email@bellevuegirlslax.com with any questions or requests.</p>
</main>