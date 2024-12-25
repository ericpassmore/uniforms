import {redirect} from '@sveltejs/kit';
import {OAUTH_CLIENT_ID, OAUTH_REDIRECT_URI, OAUTH_SCOPE, OAUTH_PROVIDER_URL} from "$env/static/private";

export const GET = async ({cookies}) => {

    const state = 'hamburger' // Optional: for CSRF protection

    const client_id = `client_id=${OAUTH_CLIENT_ID}`
    const redirect_uri = `redirect_uri=${OAUTH_REDIRECT_URI}`
    const scope = `scope=${OAUTH_SCOPE}`
    const type = 'response_type=code'
    const authorizationUrl = `${OAUTH_PROVIDER_URL}?${client_id}&${redirect_uri}&${type}&${scope}&state=${state}`;

    throw redirect(302, authorizationUrl);
};