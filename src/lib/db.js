import fs from 'node:fs';
import sqlite3 from "sqlite3";

const DATABASE_FILE = process.env.DATABASE_FILE || 'database.sqlite';
let database;

initializeDb()

export function initializeDb() {
    database =  openDb();
    console.log("Database initialized...")
    createTables(database);
    console.log("created tables...")
}

export function getDatabase() {
    return database;
}

export function getDatabaseLocation() {
    return `${fs.realpathSync('.')}/${DATABASE_FILE}`
}

function openDb() {
    return new sqlite3.Database(
        `${fs.realpathSync('.')}/${DATABASE_FILE}`,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX
    );
}

function closeDb(db) {
    return db.close()
}

function createTables(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          isLeagueOwner INTEGER DEFAULT FALSE
        );
  `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_log (
          id INTEGER KEY,
          date TEXT NOT NULL,
          action TEXT NOT NULL,
          equipment_id INTEGER NULL
        );
  `);
    db.exec(`
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

export const fetchFirst = async (db, sql, params) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

export const fetchAll = async (db, sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
