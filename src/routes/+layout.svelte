<script lang="ts">
    export let data;
</script>

{#if !data.isAuthenticated}
    <div class="topbar"><a href="/login" class="link">
        <p>Login</p>
        <span class="material-symbols-outlined">account_circle</span></a>
    </div>
{:else}
    <div class="topbar active">
        <p class="user">{data.user ? data.user.firstName : ""}</p>
        <a href="/logout" class="link">
            <p>Logout</p>
            <span class="material-symbols-outlined">account_circle</span>
        </a>
    </div>
{/if}

<slot></slot>

<div class="navbar">
    <div class="row">
        <div class="navbutton">
            <a href="/">
                <p class="navicon"><span class="material-symbols-outlined">home</span></p>
                <br/>
                <p class="subtext">Home</p>
            </a>
        </div>
        <div class="navbutton">
            <a href="/about">
                <p class="navicon"><span class="material-symbols-outlined">info</span></p>
                <br/>
                <p class="subtext">About</p>
            </a>
        </div>
        <div class="navbutton">
            <a href="/list_alt/">
                <p class="navicon"><span class="material-symbols-outlined">list_alt</span></p>
                <br/>
                <p class="subtext">List Eqip</p>
            </a>
        </div>
        {#if data.user && data.user.isAdmin}
            <div class="navbutton">
                <a href="/restock/">
                    <p class="navicon"><span class="material-symbols-outlined">inventory</span></p>
                    <br/>
                    <p class="subtext">Restock</p>
                </a>
            </div>
            <div class="navbutton">
                <a href="/add/">
                    <p class="navicon"><span class="material-symbols-outlined">add_box</span></p>
                    <br/>
                    <p class="subtext">Add Eqip</p>
                </a>
            </div>
            <div class="navbutton">
                <a href="/activity/">
                    <p class="navicon"><span class="material-symbols-outlined">history</span></p>
                    <br/>
                    <p class="subtext">Activity</p>
                </a>
            </div>
            <div class="navbutton">
                <a href="/users/">
                    <p class="navicon"><span class="material-symbols-outlined">person</span></p>
                    <br/>
                    <p class="subtext">Users</p>
                </a>
            </div>
        {/if}
    </div>
</div>