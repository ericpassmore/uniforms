<script lang="ts">
    const month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    // Oct, Nov, Dec its the next year's spring season
    if (month > 10) {
        year = year + 1;
    }
</script>

<svelte:head>
    <title>Terms</title>
</svelte:head>

<main class="maincontent">
    <h1>About</h1>
    <p>This app is a self server tool to checkout uniforms for Bellevue Girls Lacrosse.</p>
    <p>Using this application you agree to be charged $150 for failing to return uniforms by the
        end of the {year} Spring Season. Returning damaged, incomplete, or uniforms that do not
        match the size and jersey number originally checked out may result in fines up to $150 for each uniform.
        $150 charge does not include payment processing fees and service fees charged
        by the payment processor.</p>
    <p>Payment by check or venmo. Contact email@bellevuegirlslax.com with any questions or requests.</p>
    <form id="full" class="inline-add" action="?/acceptTerms" method="POST">
        <div class="form-group">
            <button type="submit">Accept</button>
        </div>
    </form>
</main>