/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init car and driver tables if they don't exist */
let init = function () {
    db.run("CREATE TABLE if not exists user (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    " firstName TEXT," +
    " lastName TEXT," +
    " alias TEXT," +
    " photoPath TEXT" +
    ")");
};

module.exports = {
    init: init,
    db: db
};

