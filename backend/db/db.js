const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/money-tracker.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the money-tracker database.');
});

// db.run('CREATE TABLE users(email TEXT PRIMARY KEY, name TEXT NOT NULL, password TEXT NOT NULL)');
// db.run('CREATE TABLE transactions(email TEXT, amount TEXT NOT NULL, category TEXT NOT NULL)');

module.exports = db
