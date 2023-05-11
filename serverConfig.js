const http = require("http");
const express = require("express");
const app = express();
//var home = require('./index.html')

app.get("/", function (req, res) {
    console.log(req.url);
    res.sendFile('index.html', {
        root: "./website"
    })
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"))