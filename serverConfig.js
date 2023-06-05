const http = require("http");
const express = require("express");
const app = express();
const Router = require('./routes');
const path = require("path");
const os = require('os');
const networkInfo = os.networkInterfaces();
//var home = require('./index.html')

app.use(express.json());
app.use(express.static('assets'));
app.use(express.static('website'));
app.use(Router);

http.createServer(app).listen(3000, () => {
    console.log(networkInfo);
    console.log("Servidor rodando local na porta 3000 \nAcesse em http://localhost:3000 ou melhor http://" + networkInfo['Wi-Fi'][1].address + ":3000\n Para parar o servidor, pressione Ctrl + C")
});

