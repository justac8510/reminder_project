const express = require("express");
const app = express();

const server_routes = require("./src/router.js").router;
app.use("/", server_routes);

app.listen(8080, () => {
    console.log("server started on port 8080")
})