

const clientId = '83f26f78f9124b6';

async function login() {

    var email = document.getElementById('inputEmail').value;
    var senha = Number(document.getElementById('inputSenha').value);

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
        console.log("A resposta é ", row[0])
        if (row[0]) {
            sessionStorage.usuario = row[0];
            console.log("O usuario é ", row[0]);
            alert('Login realizado com sucesso');
            sessionStorage.apelidoUsuario = row[0].apelido;
            definirStorage(row[0])
            window.location.href = '/blog';
        } else {
            alert('Email ou senha incorretos')
        }

    }).catch(console.log);

}
var phoneNumberInput = document.getElementById('inputTelefone');

phoneNumberInput.addEventListener('input', function (event) {
    var input = event.target;
    var cursorPosition = input.selectionStart;

    // Remove todos os caracteres não numéricos
    var phoneNumber = input.value.replace(/\D/g, '');

    // Aplica a máscara: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
    if (phoneNumber.length === 11) {
        phoneNumber = phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
        phoneNumber = phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    // Atualiza o valor do input com a máscara aplicada
    input.value = phoneNumber;

    // Restaura a posição do cursor após a formatação
    input.setSelectionRange(cursorPosition, cursorPosition);
});

function getNumericPhoneNumber(phoneNumber) {
    // Remove todos os caracteres não numéricos
    phoneNumber = phoneNumber.replace(/\D/g, '');

    return phoneNumber;
}



async function cadastro() {
    console.log("Logando");
    loadingOverlay.style.display = 'block';
    console.log(loadingOverlay.style.display);
    var email = document.getElementById('inputEmailCadastro').value;
    var senha = document.getElementById('inputSenhaCadastro').value;
    var senhaConfirm = document.getElementById('inputConfirm').value;
    var nome = document.getElementById('inputNomeCompleto').value;
    var telefone = getNumericPhoneNumber(document.getElementById('inputTelefone').value);
    var apelido = document.getElementById('inputApelido').value;
    var foto = document.getElementById('inputFoto').files[0];
    var data = document.getElementById('inputData').value;
    var inputBio = document.getElementById('inputBio').value;

    var validacao = false;
    if (nome == "") {
        validacao = true;
        alert('Preencha o campo nome');
    } else if (senha != senhaConfirm) {
        validacao = true;
        alert('As senhas não coincidem');
    } else if (foto == undefined) {
        validacao = true;
        alert('Selecione uma foto');
    } else if (foto.size > 1000000000) {
        validacao = true;
        alert('A foto deve ter no máximo 10MB');
    } else if (foto.type != 'image/jpeg' && foto.type != 'image/jpg') {
        validacao = true;
        alert('A foto deve ser JPG ou JPEG');
    } else if (telefone.length < 10) {
        validacao = true;
        alert('O telefone deve ter no mínimo 10 dígitos');
    } else if (telefone.length > 11) {
        validacao = true;
        alert('O telefone deve ter no máximo 11 dígitos');
    } else if (data.length != 10) {
        validacao = true;
        alert('A data deve estar no formato dd/mm/aaaa');
    }



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

    if (!validacao) {
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
                console.log("data ", data);
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
                    const data = response.json();
                    definirStorage(data[0]);
                    window.location.href = "/blog"
                } else {
                    alert('Erro ao cadastrar');
                }
            }).catch(err => {
                console.log("O erro foi ", err);

            });
        });
    } else {

        loadingOverlay.style.display = 'none';
    }

}

async function subirImagem(url, options) {
    console.log("subindo Imagem");
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
}

function definirStorage(data) {
    console.log("registrando Storage");
    console.log(data);
    sessionStorage.apelidoUsuario = data.apelido;
    sessionStorage.idUsuario = data.idUsuario;
    sessionStorage.nomeUsuario = data.nome;
    sessionStorage.emailUsuario = data.email;
    sessionStorage.fotoUsuario = data.imgPerfil;
    sessionStorage.telefoneUsuario = data.telefone;
    sessionStorage.bioUsuario = data.bio;
    sessionStorage.senhaUsuario = data.senha;
    sessionStorage.dtCadastroUsuario = data.dtCadastro;
    sessionStorage.dtNascUsuario = data.dtNasc;
    sessionStorage.setItem('usuario', JSON.stringify(data));

    console.log("Session Storage ", sessionStorage);
    return true
}
