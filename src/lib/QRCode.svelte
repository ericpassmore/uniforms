<script lang="ts">
    export let type
    export let number
    export let redir
</script>
<div class="qr-code">
    <img
            src="./src/lib/qrcodes/equipment-{type}-{number}-{redir}.png"
            alt="qrcode-equipment-{type}-{number}-{redir}"
    />
</div>