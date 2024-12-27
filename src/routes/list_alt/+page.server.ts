import {fetchAll, getDatabase, getDatabaseLocation} from '$lib/db.js';
import type {UniformsListInterface} from "$lib/common";


export const load = async () => {
    const db = getDatabase();
    if (!db) {
        console.log("Users database handle null or undefined")
    }
    let uniforms: UniformsListInterface[]
    try {
        uniforms = await fetchAll(db, "SELECT uniforms.id, jerseyNumber, jerseySize, hasShorts, "+
            "pinnieNumber, pinnieSize, hasPinnie, "+
            "users.firstName, users.lastName, users.email, checkedOutBy as userId, validateInStock "+
            "FROM uniforms LEFT JOIN users ON users.id = uniforms.checkedOutBy")
    }  catch (err) {
        console.log(`Error selecting uniforms ${err}`);
    }
    return { uniforms: uniforms }
}
