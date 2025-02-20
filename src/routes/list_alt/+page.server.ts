import {fetchAll, getDatabase, getDatabaseLocation} from '$lib/db.js';
import type {UniformsListInterface} from "$lib/common";
import {ownershipCheck} from "$lib/ownershipCheck";

export const load = async ({cookies}) => {
    const db = getDatabase();
    if (!db) {
        console.log("Users database handle null or undefined")
    }
    let uniforms: UniformsListInterface[]

    const isAuthorized = await ownershipCheck(cookies.get("uni_auth"));

    // default SQL for all users
    let sql = "SELECT uniforms.id, jerseyNumber, jerseySize, hasShorts, "+
        "pinnieNumber, pinnieSize, hasPinnie, checkedOutBy "+
        "FROM uniforms WHERE checkedOutBy <= 0 "+
        "  AND id not in (3,8,9,11,14,18,23,24,27,31,41,44,45,50,56,57,59,63,65,66,70,76,78,83,86,87,88,90,91)"

    if (isAuthorized) {
        sql = "SELECT uniforms.id, jerseyNumber, jerseySize, hasShorts, "+
            "pinnieNumber, pinnieSize, hasPinnie, "+
            "users.firstName, users.lastName, users.email, checkedOutBy as userId, validateInStock "+
            "FROM uniforms LEFT JOIN users ON users.id = uniforms.checkedOutBy"
    }

    try {
        uniforms = await fetchAll(db, sql)
    }  catch (err) {
        console.log(`Error selecting uniforms ${err}`);
    }
    return { uniforms: uniforms }
}
