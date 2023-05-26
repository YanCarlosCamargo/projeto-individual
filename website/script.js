console.log(sessionStorage);
if (!sessionStorage.idUsuario) {
    console.log("Não tem idUsuario na sessão, redirecionando para o login");
    //window.location.href = '/';
} else {
    console.log("Tem idUsuario na sessão, redirecionando para o feed");
    divLogin.innerHTML = "Entrar";
    imgPerfil.src = sessionStorage.fotoUsuario ? "block" : "none";
    imgWrapper.style.backgroundImage = `url(${sessionStorage.fotoUsuario})`;
}



function montarLista(lista) {
    resultado.innerHTML = '';
    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        console.log(element);
        resultado.innerHTML += `
        <li>${element.nome}<br>
        ${element.email}<br>
        ${element.bio}<br>
        ${element.telefone}<br>
        <img src="${element.imgPerfil}" width="70"><br>
        </li>`

    }
}

function montarPosts(lista) {

    resultado.innerHTML = '';
    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        console.log(element);
        resultado.innerHTML += `
        <li>${element.titulo}<br>
        ${element.descPost}<br>
        ${element.dtPost}<br>
        ${element.idPost}<br>
       <br>
        </li>`
        console.log(element.imgPerfil);
    }

}

var lista = [];

async function listar(table = 'tbUsuario') {

    fetch('/listar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        montarLista(data[0]);
    });

}

async function listarPosts() {

    fetch('/listar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table: 'tbPosts' })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data[0]);
        //  montarPosts(data[0]);
    });

}

//listar();

async function cadastrar() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    fetch(`/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            table: 'tbUsuario',
            values: `'${nome}', '${email}', ${senha}`
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        console.log("Cadastrou! Agora vou listar de novo!");
        listar();
    }).catch(err => { console.log("Deu erro, ai ó: ", err) });
}
