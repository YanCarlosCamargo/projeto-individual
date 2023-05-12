var botao = document.getElementById('botao');

botao.addEventListener('click', async function () {
    console.log("Clicou no botão!");
    await cadastrar();
})

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
        </li>`

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
        montarPosts(data[0]);
    });

}

listar();

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
