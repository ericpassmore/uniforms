<script lang="ts">
    export let equipmentId
    export let redirectPath
    export let textHelp = "Checkout"
</script>
<div class="form-group">
    <form action="/api/process" method="GET">
        <input type="hidden" id="number" name="number" value="{equipmentId}">
        <input type="hidden" id="type" name ="type" value="yuni" >
        <input type="hidden" id="redir" name ="redir" value="{redirectPath}" >
        <button type="submit" class="actionbutton">
            <span class="material-symbols-outlined">keyboard_return</span>
            <span class="subtext">{textHelp}</span>
        </button>
    </form>
</div>