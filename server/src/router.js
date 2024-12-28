const express = require("express");

const server_router = express.Router();
const db_op = require("./db.js");

//get: view, post: "addnote", post: "deletenote"

//test
server_router.get("/", (req, res) => {
    res.status(200).send("backend works fine");
},
);


//view
server_router.get("/getNotes", (req, res) => {
    let notes = db_op.viewNotes();

    if (notes) {
        return res.status(200).json({"msg": "successful operation", "notes": notes});
    }
    return res.status(404).json({"msg": "operation failed"})
});


//add
server_router.post("/addNote", (req, res) => {
    let newContent = req.body.newContent;
    let dataAdded = req.body.dataAdded;

    if (db_op.addNote(newContent, dataAdded)) {
        return res.status(200).json({"msg": "successful operation"});
    }
    return res.status(404).json({"msg": "operation failed"});
});


//delete
server_router.post("/deleteNote", (req, res) => {
    let id = req.body.id;
    
    if (db_op.deleteNote(id)) {
        return res.status(200).json({"msg": "successful operation"});
    }
    return res.status(404).json({"msg": "operation failed"});
})

module.exports.router = server_router;
