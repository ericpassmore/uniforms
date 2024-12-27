import {ownershipCheck} from "$lib/ownershipCheck";
import {error} from "@sveltejs/kit";
import {getDatabase} from "$lib/db";

export const actions = {
    add: async ({request, cookies}) => {
        const formData = await request.formData();
        const jerseyNumber = formData.get("jersey-number")
        const jerseySize = formData.get("jersey-size")
        let hasShorts = formData.get("has-shorts")
        let hasPinnie = formData.get("has-pinnie")
        let pinnieNumber = -1
        let pinnieSize = "youth-small"
        if (hasPinnie > 0) {
            pinnieNumber = formData.get("pinnie-number")
            pinnieSize = formData.get("pinnie-size")
        }

        const isAuthorized = await ownershipCheck(cookies.get('uni_auth'))
        if (!isAuthorized) {
            error(403, {message: 'Not Authorized'});
        } else {
            const sql = "INSERT OR REPLACE INTO uniforms " +
                "(jerseyNumber, jerseySize, hasShorts, pinnieNumber, pinnieSize, hasPinnie) " +
                "VALUES (?, ?, ?, ?, ?, ?)"
            const db = getDatabase()
            try {
                db.run(sql, jerseyNumber, jerseySize, hasShorts, pinnieNumber, pinnieSize, hasPinnie)

            } catch (err) {
                error(500, {message: `Error while creating uniform ${(err as Error).message}`})
            }
        }
    }
}