const sqlite3 = require("sqlite3").verbose();

function initialize() {
    const db = new sqlite3.Database("notes.db");

    db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        notecontent TEXT NOT NULL,
        dateadded TEXT NOT NULL)`
    ,
        (error) => {
            if (error){
                console.log(`Error creating table: ${error.message}`);
                return false;
            } else{
                console.log('Table created or already exists.');
                return true;
            }
        });
    });

    db.close();
    return true;
}

function addNote(newContent, dataAdded) {
    const db = new sqlite3.Database("notes.db");

    db.run(
        `INSERT INTO notes (notecontent, dataadded) VALUES (?, ?)`,
        [newContent, dataAdded],
        (error) => {
            console.log(`Error inserting data: ${error.message}`)
            return false;
        }
    );

    db.close();
    return true;
}

function viewNotes() {
    const db = new sqlite3.Database("notes.db");
    let notes = []

    db.all(`SELECT * FROM notes`, (error, rows) => {
        if (error) {
          console.error(`Error selecting data: ${error.message}`);
          return null;
        }
      
        // Print each row
        rows.forEach((row) => {
            notes.push({ "ID": row.id, "Note": row.notecontent, "Date": row.dateadded });
        });
      });

      db.close();
      console.log(`notes: ${notes}`);
      return notes;

}

function deleteNote(id) {
    const db = new sqlite3.Database("notes.db");

    db.run(`DELETE FROM notes WHERE id = ?`, [id], (error) => {
        if (error) {
            console.error(`Error deleting note: ${error.message}`);
            return false;
        } else {
            console.log(`Note with ID ${id} deleted.`);
        }
    });

    db.close();
    return true;
    
}

module.exports = {initialize, addNote, viewNotes, deleteNote};