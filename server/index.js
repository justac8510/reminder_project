const express = require("express");
const app = express();
const cors = require("cors");

// Middleware for JSON parsing
app.use(express.json());
app.use(cors());

const server_routes = require("./src/router.js").router;
const db_op = require("./src/database.js");

app.use("/", server_routes);

//initialize the database
db_op.initialize()


app.listen(8080, () => {
    console.log("server started on port 8080")
})