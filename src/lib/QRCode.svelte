<script lang="ts">
    import {PUBLIC_QR_IMAGE_URI} from "$env/static/public";
    import fs from "node:fs";

    export let type
    export let number
    export let redir
    const baseImagePath: string = PUBLIC_QR_IMAGE_URI!=='default' ?
        PUBLIC_QR_IMAGE_URI : `./src/lib/qrcodes`
</script>
<div class="qr-code">
    <img
            src="{baseImagePath}/equipment-{type}-{number}-{redir}.png"
            alt="qrcode-equipment-{type}-{number}-{redir}"
    />
</div>