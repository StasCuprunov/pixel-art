const configuration = require("./configuration.json");

const express = require("express");
const app = express();
const resolve = require("path").resolve;
app.get("/", function (req, res) {
    res.sendFile(resolve(configuration.srcPath + "/" + configuration.fileDirectory));
});

app.use(express.static(configuration.srcPath));

app.listen(configuration.port, function () {
    console.log("Server is running on localhost:" + configuration.port);
});