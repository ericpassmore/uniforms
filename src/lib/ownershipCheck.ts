import {fetchFirst, getDatabase} from "$lib/db";
import type {CookieData} from "$lib/common";

export const ownershipCheck = async (cookieData: string | null) => {
    if (cookieData && cookieData.length > 4) {
        const localStore: CookieData = JSON.parse(cookieData)
        const sql = "SELECT isAdmin FROM users WHERE id = ?"
        const db = getDatabase()
        const results = await fetchFirst(db, sql, localStore.id)
        return results.isAdmin === 1
    }
    return false
}

export const ownershipCheckByUserId = async (userId: number) => {
    const sql = "SELECT isAdmin FROM users WHERE id = ?"
    const db = getDatabase()
    const results = await fetchFirst(db, sql, userId)
    return results.isAdmin === 1
}