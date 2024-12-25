import { error, redirect, json} from '@sveltejs/kit';
import { OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URL  } from '$env/static/private'

export const GET = async({ cookies, url }) => {

    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (!code) {
        error(500,{ message: 'No code provided' });
    }

    if (!state || state !== 'hamburger') {
        error(500,{ message: 'Unexpected state code' });
    }

    const token_exchange_url = OAUTH_TOKEN_URL +
        `?code=${code}` +
        `&client_id=${OAUTH_CLIENT_ID}` +
        `&client_secret=${OAUTH_CLIENT_SECRET}` +
        `&redirect_uri=${encodeURIComponent(OAUTH_REDIRECT_URI)}` +
        'grant_type=authorization_code';

    try {
        const response = await fetch(token_exchange_url, {
            method: 'POST'
        });

        if (!response.ok) {
            const errorData = await response.json();
            error(500, { message: `Token Exchange Failed with ${errorData}` });
        }

        const { access_token } = await response.json();

        // suggest add httpOnly: true  secure: true sameSite: 'strict'
            cookies.set('uni_auth', access_token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: true,
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            redirect(307, '/');

    } catch (error_obj) {
        error(500, { message: `Unexpected error:${error_obj}` });
    }
}
