import {fetchAll, getDatabase} from "$lib/db";
import type {CookieData, UniformsListInterface} from "$lib/common";


export const load = async ({cookies}) => {

    const uniAuth = cookies.get('uni_auth')
    if (uniAuth && uniAuth.length > 4) {
        const localStore: CookieData = JSON.parse(uniAuth)

        const db = getDatabase();
        if (!db) {
            console.log("Users database handle null or undefined")
        }
        let uniforms: UniformsListInterface[]

        try {
            uniforms = await fetchAll(db, "SELECT uniforms.id, jerseyNumber, jerseySize, hasShorts, " +
                "pinnieNumber, pinnieSize, hasPinnie, " +
                "users.firstName, users.lastName, users.email, checkedOutBy as userId, validateInStock " +
                "FROM uniforms LEFT JOIN users ON users.id = uniforms.checkedOutBy " +
                "WHERE validateInStock <= 0 and checkedOutBy = ?",localStore.id)
        } catch (err) {
            console.log(`Error selecting uniforms ${err}`);
        }

        return {uniforms: uniforms}
    }
}