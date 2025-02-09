<script lang="ts">
    import type {UniformsListInterface} from "$lib/common";

    export let item: UniformsListInterface;
    export let style: string = "short";
</script>

<div class="uniform">
    <div class="card">
        <p class="top-message">Jersey Num.</p>
        <div class="number">
            <p>{item.jerseyNumber}
                <span class="tinynum">{item.id}</span>
            </p>
        </div>
    </div>
    <div class="attributes">
        <div class="detail">
            Uniform Size: {item.jerseySize}
        </div>
        <div class="detail">
            {item.hasShorts ? "Includes Shorts" : "No Shorts" }
        </div>
        {#if item.hasPinnie}
            <div class="detail">
                Pinny Number: {item.pinnieNumber}
            </div>
            <div class="detail">
                Pinney Size: {item.pinnieSize}
            </div>
        {:else}
            <div class="detail">
                No Pinney
            </div>
        {/if}
        {#if (item.userId > 0 && style === "all") }
            <div class="detail">
                Checked Out: {item.firstName + " " + item.lastName}
                <br/>{item.email}
                <br/>User Id: {item.id}
            </div>
        {/if}
        {#if (style === "all")}
            <div class="detail">
                Reconcile: {item.validateInStock ? "Ready" : "Not Available"}
            </div>
        {/if}
    </div>
</div>