import {error, redirect} from '@sveltejs/kit';
import {
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URL
} from '$env/static/private'
import Login from "$lib/Login";

export const GET = async ({cookies, url}) => {

    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    let access_token = null;

    if (!code) {
        error(500, {message: 'No code provided'});
    }

    if (!state || state !== 'hamburger') {
        error(500, {message: 'Unexpected state code'});
    }

    const tokenExchangeUrl = OAUTH_TOKEN_URL +
        `?code=${code}` +
        `&client_id=${OAUTH_CLIENT_ID}` +
        `&client_secret=${OAUTH_CLIENT_SECRET}` +
        `&redirect_uri=${encodeURIComponent(OAUTH_REDIRECT_URI)}` +
        '&grant_type=authorization_code';

    try {
        const response = await fetch(tokenExchangeUrl, {
            method: 'POST'
        });

        if (!response.ok) {
            const errorData = await response.json();
            error(500, {message: `Token Exchange Failed with error: ${errorData.error} error description: ${errorData.error_description}`});
        }

        const data = await response.json();
        access_token = data.access_token;

    } catch (error_obj) {
        error(500, {message: `Unexpected error:${JSON.stringify(error_obj)}`});
    }

    const getTeamSnapMe = "https://api.teamsnap.com/v3/me"
    try {
        const response = await fetch(getTeamSnapMe, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })

        const userData = await response.json();
        const user = new Login(userData.collection.items);

        // suggest add httpOnly: true  secure: true sameSite: 'strict'
        cookies.set('uni_auth', `{"id":${user.id || -1},"token":"${access_token}"}`, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

    } catch (error_obj) {
        error(500, {message: `Unexpected error:${JSON.stringify(error_obj)}`});
    }

    // redirect must be outside of try/catch block
    redirect(307, '/');
}
