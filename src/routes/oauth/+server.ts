import { redirect } from '@sveltejs/kit';

export async function POST({ cookies, request }) {
    const { code } = await request.json();

    const clientId = process.env.OAUTH_CLIENT_ID;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET;
    const redirectUri = process.env.OAUTH_REDIRECT_URI;
    const tokenUrl = process.env.OAUTH_TOKEN_URL;

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }).toString(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error exchanging code for token:', errorData);
            return new Response(JSON.stringify({ error: 'Token exchange failed' }), { status: 500 });
        }

        const data = await response.json();

        // suggest add httpOnly: true  secure: true sameSite: 'strict'
            cookies.set('uni_auth', data.access_token, { path: '/', httpOnly: true, secure: true, sameSite: true });
            redirect(307, '/admin');

    } catch (error) {
        console.error('Unexpected error:', error);
        return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), { status: 500 });
    }
}
