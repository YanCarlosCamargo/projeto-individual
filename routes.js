const express = require('express');
var router = express.Router();
const path = require('path');
const controller = require('./controller.js');

router.get('/', function (req, res, next) {
    res.sendFile('website/home.html', { root: __dirname })
});

router.get('/blog', function (req, res, next) {
    res.sendFile('blog/index.html')
});

router.get('/perfil', function (req, res, next) {
    console.log(__dirname);
    res.sendFile('website/perfil/conta.html', { root: __dirname })
    // res.redirect('../')
});


router.get('/dashboard', function (req, res, next) {
    res.sendFile('/website/perfil/dashboard.html', { root: __dirname });
});

router.get('/listarPosts', function (req, res, next) {
    controller.listarPosts(req, res);
});



router.post('/listar', function (req, res, next) {
    // console.log("A requisição no routes listar é a seguinte ", req.body)
    controller.listar(req, res);
});

router.post('/login', function (req, res, next) {
    console.log("A requisição no routes login é a seguinte ", req.body)
    controller.login(req, res);
});

router.post('/cadastrar', (req, res, next) => {
    console.log("A requisição do CADASTRAR é a seguinte ", req);

    if (req.body != {}) { controller.inserirUsuario(req, res); } else {
        console.log("Deu errado no routes");
    }

    //controller.executarInsert(req, res);
    // res.status(200).send({ messageBody: req.body, messageParams: req.params, messageQuery: req.query });
});


module.exports = router;