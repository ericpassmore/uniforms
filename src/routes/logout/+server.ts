import {error, redirect} from '@sveltejs/kit';
import {OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_TOKEN_DESTROY_URL} from "$env/static/private";
import {Activity} from "$lib/Activity";
import type {CookieData} from "$lib/common";

export const GET = async ({cookies}) => {

    const uniAuth = cookies.get('uni_auth')
    if (uniAuth && uniAuth.length > 4) {
        const localStore: CookieData = JSON.parse(uniAuth)

        const client_id = `client_id=${OAUTH_CLIENT_ID}`
        const client_secret = `client_secret=${OAUTH_CLIENT_SECRET}`
        const token = `token=${localStore.token}`

        const deAuthorizationUrl = `${OAUTH_TOKEN_DESTROY_URL}?${client_id}&${client_secret}&${token}`;
        try {
            const response = await fetch(deAuthorizationUrl, {
                method: 'POST'
            });

            if (!response.ok) {
                const errorData = await response.json();
                error(500, {message: `Token Exchange Failed with error: ${errorData.error} error description: ${errorData.error_description}`});
            }
            // suggest add httpOnly: true  secure: true sameSite: 'strict'
            cookies.delete('uni_auth', {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: true
            });

            Activity.logout(localStore.id)

        } catch (error_obj) {
            error(500, {message: `Unexpected error:${JSON.stringify(error_obj)}`});
        }
    }

    throw redirect(302, '/');
};