import {error, redirect} from '@sveltejs/kit';
import {
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URL
} from '$env/static/private'
import Login from "$lib/Login";

export const GET = async ({cookies, url}) => {

    // 8888888888
    // 35335443 Olivia
    // 29782163 Admin
    // suggest add httpOnly: true  secure: true sameSite: 'strict'
    cookies.set('uni_auth', `{"id":35335443,"token":"ffff"}`, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    // redirect must be outside of try/catch block
    redirect(307, '/about');
}
