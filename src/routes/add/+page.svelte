<script lang="ts">
    import {enhance} from '$app/forms';

    let disableStatus = false


    // disable fields when no pinnie selected
    let hasPinnie = "1"                     // bound to select values
    let noPinnieStatus = false
    $: noPinnieStatus = hasPinnie === "0"; // Reactively update noPinnieStatus

    function handleAddForm() {
        return async ({result, update}) => {
            await update();
            if (result.type === 'success') {
                const success_element = document.getElementById('success-feedback')
                if (success_element) {
                    success_element.classList.remove('hidden')
                    setTimeout(() => {
                        success_element.classList.add('hidden')
                    }, 7000)
                }
            } else {
                const error_element = document.getElementById('error-feedback')
                if (error_element) {
                    error_element.classList.remove('hidden')
                    setTimeout(() => {
                        error_element.classList.add('hidden')
                    }, 7000)
                }
            }
        }
    }
</script>

<svelte:head>
    <title>Add</title>
</svelte:head>

<main class="addpage">
    <form id="full" class="inline-add" method="POST" action="?/add" use:enhance={handleAddForm}>
        <div class="form-group">
            <label for="jersey-number">Jersey Number:</label>
            <input type="number" id="jersey-number" name="jersey-number" maxlength="3" required>
            <label for="jersey-size">Jersey Size:</label>
            <select class="action" name="jersey-size" id="jersey-size" required>
                <option value="youth-small" selected>Youth-Small</option>
                <option value="youth-medium">Youth-Medium</option>
                <option value="youth-large">Youth-Large</option>
                <option value="youth-xtra-large">Youth-Xtra-Large</option>
                <option value="adult-xtra-small">Adult-Xtra-Small</option>
                <option value="adult-small">Adult-Small</option>
                <option value="adult-medium">Adult-Medium</option>
                <option value="adult-large">Adult-Large</option>
                <option value="adult-xtra-large">Adult-Xtra-Large</option>
            </select>
            <label for="has-shorts">Has Shorts:</label>
            <select class="action" name="has-shorts" id="has-shorts" required>
                <option value="1" selected>Yes</option>
                <option value="0">No</option>
            </select>
            <label for="has-pinnie">Has Pinnie:</label>
            <select class="action" name="has-pinnie" id="has-pinnie" required bind:value={hasPinnie}>
                <option value="1" selected>Yes</option>
                <option value="0">No</option>
            </select>
            <label for="pinnie-number">Pinnie Number:</label>
            <input type="number" id="pinnie-number" name="pinnie-number" maxlength="3" disabled="{noPinnieStatus}">
            <label for="pinnie-size">Pinnie Size:</label>
            <select class="action" name="pinnie-size" id="pinnie-size" disabled="{noPinnieStatus}">
                <option value="youth-small" selected>Youth-Small</option>
                <option value="youth-medium">Youth-Medium</option>
                <option value="youth-large">Youth-Large</option>
                <option value="youth-xtra-large">Youth-Xtra-Large</option>
                <option value="adult-xtra-small">Adult-Xtra-Small</option>
                <option value="adult-small">Adult-Small</option>
                <option value="adult-medium">Adult-Medium</option>
                <option value="adult-large">Adult-Large</option>
                <option value="adult-xtra-large">Adult-Xtra-Large</option>
            </select>
        </div>
        <div class="form-group">
            <button type="submit" disabled="{disableStatus}">Submit</button>
        </div>
    </form>
    <div class="feedback">
        <div id="success-feedback" class="success hidden">
            <span class="material-symbols-outlined">check_small</span>
        </div>
        <div id="error-feedback" class="error hidden">
            <span class="material-symbols-outlined">error</span>
        </div>
    </div>
</main>