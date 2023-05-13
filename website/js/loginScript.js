

const clientId = '83f26f78f9124b6';

async function login() {
    var email = document.getElementById('inputEmail').value;
    var senha = document.getElementById('inputSenha').value;

    var body = {
        email: email,
        senha: senha
    };
    console.log(body);

    await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => response.json()).then(row => {
        console.log(row[0])
        if (row[0]) {
            alert('Login realizado com sucesso')
        } else {
            alert('Email ou senha incorretos')
        }

    }).catch(console.log);
}



async function cadastro() {
    console.log("Logando");
    var email = document.getElementById('inputEmailCadastro').value;
    var senha = document.getElementById('inputSenhaCadastro').value;
    var senhaConfirm = document.getElementById('inputConfirm').value;
    var nome = document.getElementById('inputNomeCompleto').value;
    var telefone = document.getElementById('inputTelefone').value;
    var apelido = document.getElementById('inputApelido').value;
    var foto = document.getElementById('inputFoto').files[0];
    var data = document.getElementById('inputData').value;
    var inputBio = document.getElementById('inputBio').value;

    var validacao = email == '' || senha == '' || nome == '' || telefone == '' || apelido == '' || data == '' || senhaConfirm == '' || inputBio == ''

    var body = {
        email: email,
        senha: senha,
        nome: nome,
        telefone: telefone,
        apelido: apelido,
        foto: foto,
        data: data,
        bio: inputBio
    }

    var formData = new FormData();
    formData.append('foto', foto);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('nome', nome);
    formData.append('telefone', telefone);
    formData.append('apelido', apelido);
    formData.append('data', data);
    formData.append('bio', inputBio);

    varFoto = new FormData();
    varFoto.append('image', foto);

    console.log("file ", foto);

    await subirImagem('https://api.imgur.com/3/upload', {
        method: 'POST',
        body: varFoto,
        headers: {
            'Authorization': `Client-ID ${clientId}`,
        }
    }).then(data => {
        if (data.success) {
            console.log("data Sucess??? ", data.success);
            body.foto = data.data.link;
        } else {
            console.log("erro, não subiu a imagem", data);
        }
    }).then(() => {
        console.log("Cadastrando");
        fetch('/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.status == 200) {
                alert('Cadastro realizado com sucesso');
                listar();
            } else {
                alert('Erro ao cadastrar');
            }
        }).catch(err => {
            console.log("O erro foi ", err);

        });
    });



    async function subirImagem(url, options) {
        console.log("subindo Imagem");
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data;
    }
}