import {redirect} from '@sveltejs/kit';
import {OAUTH_CLIENT_ID, OAUTH_REDIRECT_URI, OAUTH_SCOPE, OAUTH_PROVIDER_URL} from "$env/static/private";

export const GET = async () => {

    const state = 'hamburger' // Optional: for CSRF protection

    const authorizationUrl = `${OAUTH_PROVIDER_URL}?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        OAUTH_REDIRECT_URI
    )}&scope=${encodeURIComponent(OAUTH_SCOPE)}&state=${state}`;

    throw redirect(302, authorizationUrl);
};