
import {ownershipCheck} from "$lib/ownershipCheck";
import {error} from "@sveltejs/kit";
import {fetchAll, getDatabase} from "$lib/db";

export const load = async ({cookies}) => {
    let results
    const isAuthorized = await ownershipCheck(cookies.get('uni_auth'))
    if (!isAuthorized) {
            error(403, {message: 'Not Authorized'});
    } else {
        const sql = "SELECT userId, users.firstName, users.lastName, date, action, equipmentId FROM activity " +
            "INNER JOIN users ON users.id = activity.userId " +
            "ORDER BY activity.date DESC LIMIT 500"
        const db = getDatabase()
        results = await fetchAll(db, sql)
    }
    return {results}
}