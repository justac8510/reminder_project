const sqlite3 = require("sqlite3").verbose();

//wrapper function to execute query, copy from sqlite documentation
const execute = async (db, sql, params = []) => {
    if (params && params.length > 0) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            err ? reject(err) : resolve();
        });
    });
};

//wrapper function to execute select qurey
const fetchAll = async (db, sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};

//we only need to use fetchall function for this project
const fetchFirst = async (db, sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            err ? reject(err) : resolve(row);
        });
    });
};

//initialize
const initialize = async () => {
    const db = new sqlite3.Database("notes.db");
    try {
        //drop table if notes exists
        await execute(
            db,
            'DROP TABLE IF EXISTS notes'
        )

        //create table
        await execute(
            db,
            `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        notecontent TEXT NOT NULL)`
        );

        //insert default data
        const notes = ["taking out trash", "launching laptop"];

        await execute(
            db,
            `INSERT INTO notes (notecontent) VALUES (?)`,
            [notes[0]]
        );

        await execute(
            db,
            `INSERT INTO notes (notecontent) VALUES (?)`,
            [notes[1]]
        );
        //console.log("pass the function, it works fine"); for testing

    } catch (error) {
        console.log(error);
    } finally {
        db.close();
    }
}

//view
const viewNotes = async () => {
    const db = new sqlite3.Database("notes.db");
    let results = "";

    try {
        results = await fetchAll(
            db,
            `SELECT * FROM notes`
        );
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        db.close();
        return results;
    }
}

//add
const addNote = async (newContent) => {
    const db = new sqlite3.Database("notes.db");

    try {
        await execute(
            db, 
            `INSERT INTO notes (notecontent) VALUES (?)`,
            [newContent]
        );
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        db.close();
        return true;
    }
}


//delete
const deleteNote = async (id) => {
    const db = new sqlite3.Database("notes.db");

    try {
        await execute(
            db, 
            `DELETE FROM notes WHERE id = (?)`,
            [id]
        );
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        db.close();
        return true;
    }
}

module.exports = { initialize, viewNotes, addNote, deleteNote };

