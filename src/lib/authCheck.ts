import {fetchFirst, getDatabase} from "$lib/db";
import type {CookieData} from "$lib/common";

export const authCheck = async (cookieData:string | null) => {
    if (cookieData && cookieData.length > 4) {
        const localStore: CookieData = JSON.parse(cookieData)
        const sql = "SELECT isLeagueOwner FROM users WHERE id = ?"
        const db = getDatabase()
        const results = await fetchFirst(db, sql, localStore.id)
        return results.isLeagueOwner === 1
    }
    return false
}