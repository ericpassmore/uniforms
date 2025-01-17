import {getDatabase} from "$lib/db";

export class Activity {
    static addEntry(userId: number, action: string, eqipmentId?: number ) {
        const db = getDatabase()
        const now = new Date().toLocaleString('en', {timeZone: 'America/Los_Angeles'}).toString()
        if (eqipmentId === undefined) {
            const sql = "INSERT INTO activity (userId, date, action) VALUES ( ?, ?, ? )"
            db.run(sql, userId, now, action)
        } else {
            const sql = "INSERT INTO activity (userId, date, action, equipmentId) VALUES ( ?, ?, ?, ? )"
            db.run(sql, userId, now, action, eqipmentId)
        }
    }
    static login(userId: number) {
        Activity.addEntry(userId, "login")
    }
    static logout(userId: number) {
        Activity.addEntry(userId, "logout")
    }
    static checkout(userId: number, equipmentId: number) {
        Activity.addEntry(userId, "checkout", equipmentId)
    }
    static return(userId: number, equipmentId: number) {
        Activity.addEntry(userId, "return", equipmentId)
    }
    static restock(userId: number, equipmentId: number) {
        Activity.addEntry(userId, "restock", equipmentId)
    }
    static acceptTerms(userId: number) {
        Activity.addEntry(userId, "accept-terms")
    }
}