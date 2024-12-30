import {error, redirect} from '@sveltejs/kit';
import fs from 'node:fs';
import Login from "$lib/Login";

export const GET = async ({cookies}) => {

    const getTeamSnapMe = "/Users/eric/WebServiceProjects/side_projects/uniform/Examples/TeamSnapResponses/me.json"
    let  user: Login
    try {
        const response = fs.readFileSync(getTeamSnapMe, 'utf8');
        const userData = JSON.parse(response);

        user = new Login(userData.collection.items);

        // suggest add httpOnly: true  secure: true sameSite: 'strict'
        cookies.set('uni_auth', `{"id":${user.id || -1},"token":"fffff"}`, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

    } catch (error_obj) {
        error(500, {message: `Unexpected error:${(error_obj as Error).message}`});
    }
    // redirect must be outside of try/catch block
    redirect(307, '/');
}
