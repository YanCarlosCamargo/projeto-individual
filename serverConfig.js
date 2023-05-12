const http = require("http");
const express = require("express");
const app = express();
const indexRouter = require('./routes');
const bd = require('./BD.js');
//var home = require('./index.html')

app.use(express.static('website'));
app.use(express.static('public'));

app.use(indexRouter);

http.createServer(app).listen(3000, () => {
    console.log("Servidor rodando local na porta 3000 \nAcesse em http://localhost:3000\n Para parar o servidor, pressione Ctrl + C")
});
