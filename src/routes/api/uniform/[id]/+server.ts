import {fetchAll, fetchFirst, getDatabase} from "$lib/db";
import {ownershipCheck, ownershipCheckByUserId} from "$lib/ownershipCheck";
import {error} from "@sveltejs/kit";
import type {UniformsListInterface} from "$lib/common";


export const GET = async({params}) => {
    const db = getDatabase();

    if (!db) {
        console.log("API Error: Users database handle null or undefined")
        return new Response("Database Not Found",{status: 500, statusText:"ERROR"})
    }

    let uniform: UniformsListInterface
    try {
        const sql = "SELECT uniforms.id, jerseyNumber, jerseySize, hasShorts, " +
            "pinnieNumber, pinnieSize, hasPinnie, " +
            "checkedOutBy as userId, validateInStock " +
            "FROM uniforms WHERE uniforms.id = ?"

        uniform = await fetchFirst(db, sql, params.id)
    } catch (err) {
        console.log(`GET API Error selecting uniform ${err}`);
        return new Response("DB SELECT FAILED",{status: 500, statusText:"ERROR"})
    }
    if (uniform) {
        return new Response(JSON.stringify(uniform), {status: 200, statusText: "OK"})
    }
    return new Response("No Uniform Found", {status: 500, statusText: "ERROR"})
}

export const DELETE = async({request, params, cookies}) => {
    const authHeader = request.headers.get('Authorization')
    if (authHeader) {
        const token = Number(authHeader.replace('Bearer ',''))
        const isAdmin = await ownershipCheckByUserId(token)

        if (!isAdmin) {
            return new Response("Not Authorized",{status: 403, statusText:"Not Authorized"})
        }
        const db = getDatabase();
        if (!db) {
            console.log("API Error: User database handle null or undefined")
            return new Response("deleted",{status: 200, statusText:"OK"})
        }

        try {
            db.run("DELETE FROM uniforms where id = ?", params.id)
        } catch (err) {
            console.log(`DELETE API Error selecting uniforms ${err}`);
            return new Response("DELETE FAILED",{status: 500, statusText:"ERROR"})
        }
        return new Response("deleted",{status: 200, statusText:"OK"})
    }
    return new Response("Not Authorized",{status: 403, statusText:"Not Authorized"})
}
