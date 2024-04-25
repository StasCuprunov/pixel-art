const configuration = require("./configuration.json");
const routing = configuration.routing;

const express = require("express");
const app = express();
const resolve = require("path").resolve;

// implement routing
app.get(routing.default, function (req, res) {
    res.sendFile(resolve(configuration.srcPath + "/" + configuration.fileDirectory));
});

// access to bundle-min.js + bundle-min.css
app.use(express.static(configuration.srcPath));

// make website available on port
app.listen(configuration.port, function () {
    console.log("Server is running on localhost:" + configuration.port);
});