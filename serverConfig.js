const http = require("http");
const express = require("express");
const app = express();
const Router = require('./routes');
var cors = require("cors");
//var home = require('./index.html')

app.use(cors());
app.use(express.static('website'));
app.use(express.static('public'));

app.use(Router);

http.createServer(app).listen(8080, () => {
    console.log("Servidor rodando local na porta 8080 \nAcesse em http://localhost:8080\n Para parar o servidor, pressione Ctrl + C")
});
