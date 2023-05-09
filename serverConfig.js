const http = require("http");
const express = require("express");
const app = express();

app.get("/", function (req, res) {
    console.log(req.url);
    res.sendFile("/index.html");
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));;