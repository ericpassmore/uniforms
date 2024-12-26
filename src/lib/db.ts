import type {Database} from "sqlite3";
import dotenv from 'dotenv';
import type {UserInterface} from "$lib/User";
import fs from 'node:fs';
import sqlite3 from "sqlite3";

dotenv.config();
const DATABASE_FILE = process.env.DATABASE_FILE || 'database.sqlite';
let database: Database;

export async function initializeDb() {
    database = await openDb();
    await createTables(database);
}

export function getDatabase() {
    return database;
}

export function getSign() {
    return `${fs.realpathSync('.')}/${DATABASE_FILE}`
}

async function openDb(): Promise<Database> {
    return new sqlite3.Database(
        '/Users/eric/WebServiceProjects/side_projects/database.sqlight',
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX
    );
}

async function closeDb(db: Database): Promise<void> {
    return db.close()
}

async function createTables(db: Database): Promise<void> {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          isLeagueOwner INTEGER DEFAULT FALSE
        );
  `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS user_log (
          id INTEGER KEY,
          date TEXT NOT NULL,
          action TEXT NOT NULL,
          equipment_id INTEGER NULL
        );
  `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS uniforms (
          id INTEGER PRIMARY KEY,
          jersey_number INTEGER NOT NULL,
          jersey_size TEXT NOT NULL,
          has_shorts INTEGER NOT NULL,
          pinnie_number INTEGER NOT NULL,
          pinnie_size TEXT NOT NULL,
          has_pinnie INTEGER NOT NULL DEFAULT TRUE,
          checked_out_by INTEGER NOT NULL DEFAULT -1
        );
  `);
}

export async function getUserFromDb(db: Database, id: number): Promise<UserInterface | undefined> {
    const query = `SELECT id, firstName, lastName, isLeagueOwner FROM users WHERE id = ?`;
    const result: UserInterface | undefined = await db.get<UserInterface>(query, id);
    return result;
}

export async function getAllUserFromDb(db: Database): Promise<UserInterface[] | undefined> {
    const query = `SELECT id, firstName, lastName, isLeagueOwner FROM users`;
    return await db.get<UserInterface[] | undefined>(query);
}
