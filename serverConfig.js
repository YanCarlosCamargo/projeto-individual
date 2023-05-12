const http = require("http");
const express = require("express");
const app = express();
const Router = require('./routes');
var cors = require("cors");
const path = require("path");
//var home = require('./index.html')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.static('website'));
app.use(Router);

http.createServer(app).listen(3000, () => {
    console.log("Servidor rodando local na porta 8080 \nAcesse em http://localhost:3000\n Para parar o servidor, pressione Ctrl + C")
});
