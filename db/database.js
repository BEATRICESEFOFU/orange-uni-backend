const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'orangeuni.db'))

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT    NOT NULL UNIQUE,
    email       TEXT    NOT NULL UNIQUE,
    password    Text    NOT NULL,
    role        TEXT    NOT NULL DEFAULT 'staff',
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS students (
    id          TEXT    PRIMARY KEY,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL UNIQUE,
    dept        TEXT    NOT NULL,
    year        TEXT    NOT NULL,
    gpa         REAL    NOT NULL,
    phone       TEXT,
    status      TEXT    NOT NULL DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)
    
module.exports = db
