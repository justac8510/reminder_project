const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('notes.db');
const server_router = express.Router();
const db_op = require("./db.js")

//get: view, post: "addnote", post: "deletenote"


module.exports.router = server_router;
