<script>
    export let item;
</script>

<div class="uniform">
    <div class="card">
        <p class="top-message">Number</p>
        <div class="number">
            <p>{item.number}</p>
        </div>
    </div>
    <div class="attributes">
        <div class="detail">
            Uniform Size: {item.uniform_size}
        </div>
        <div class="detail">
            {#if (item.has_shorts) }
                Includes Shorts
            {:else}
                No Shorts
            {/if}
        </div>
        <div class="detail">
            Pinny Number: {item.pinny_number}
        </div>
        <div class="detail">
            Pinney Size: {item.pinny_size}
        </div>
    </div>
</div>