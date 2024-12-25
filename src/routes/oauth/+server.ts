import { redirect, json  } from '@sveltejs/kit';
import { OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URL  } from '$env/static/private'

export async function GET({ cookies, request }) {
    const { code, state } = await request.json();

    if (!code) {
        return json({ error: 'No code provided' }, { status: 400 });
    }

    if (!state || state !== 'hamburger') {
        console.error('Bad State on Authorization:');
        return json({ error: 'Unexpected state code' }, { status: 500 });
    }
    console.log("Got Token and state")
    try {

        const response = await fetch(OAUTH_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                code: code,
                client_id: OAUTH_CLIENT_ID,
                client_secret: OAUTH_CLIENT_SECRET,
                redirect_uri: OAUTH_REDIRECT_URI,
                grant_type: 'authorization_code',
            }).toString(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error exchanging code for token:', errorData);
            return json({ error: 'Token Exchange Failed' }, { status: 500 });
        }

        console.log("fetching access token")
        const { access_token } = await response.json();

        // suggest add httpOnly: true  secure: true sameSite: 'strict'
            cookies.set('uni_auth', access_token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: true,
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            redirect(307, '/admin');

    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
