<script lang="ts">
    const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URI;
    const authorizationUrl = import.meta.env.VITE_OAUTH_PROVIDER_URL;

    const loginUrl = `${authorizationUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
</script>

<a href="{loginUrl}">Authorize with TeamSnap</a>