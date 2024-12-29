const express = require("express");

const server_router = express.Router();
const db_op = require("./database.js");

//get: view, post: "addnote", post: "deletenote"

//test
server_router.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send("backend works fine");
},
);


//view
server_router.get("/getNotes", async (req, res) => {
    let notes = await db_op.viewNotes();
    res.header("Access-Control-Allow-Origin", "*");
    //console.log(notes); for debugging purpose

    if (notes) {
        return res.status(200).json({msg: "successful operation", notes: notes});
    }
    return res.status(404).json({msg: "operation failed"})
});


//add
server_router.post("/addNote", async (req, res) => {
    let newContent = req.body.newContent;
    res.header("Access-Control-Allow-Origin", "*");

    let op = await db_op.addNote(newContent);
    if (op) {
        return res.status(200).json({msg: "successful operation"});
    }
    return res.status(404).json({msg: "operation failed"});
});


//delete
server_router.post("/deleteNote", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = req.body.id;

    let op = await db_op.deleteNote(id)
    
    if (op) {
        return res.status(200).json({msg: "successful operation"});
    }
    return res.status(404).json({msg: "operation failed"});
})

module.exports.router = server_router;
