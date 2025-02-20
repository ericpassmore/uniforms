import {fetchAll, getDatabase, getDatabaseLocation} from '$lib/db.js';
import {ownershipCheck} from "$lib/ownershipCheck";
import {error} from "@sveltejs/kit";

export const load = async ({cookies}) => {
    const db = getDatabase();
    if (!db) {
        console.log("Users database handle null or undefined")
    }
    let data = []

    const isAuthorized = await ownershipCheck(cookies.get("uni_auth"));
    if (!isAuthorized) {
        error(403, {message: 'Not Authorized'});
    }
    try {
        const users = await fetchAll(db, 'select id, firstName, lastName, email, isAdmin from users')

        if (users && users.length > 0) {
            console.log("looking through users")
            for (const user of users) {
                data.push({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin
                })
            }
        }
    }  catch (err) {
        console.log(`Error selecting users ${err}`);
    }
    return { users: data , sign: getDatabaseLocation() }
}