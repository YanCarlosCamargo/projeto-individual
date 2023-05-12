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

var lista = [];

async function listar() {
    fetch('/listar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table: 'tbUsuario' })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        montarLista(data[0]);
    });

}



listar();

async function cadastrar() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    fetch('bd/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            table: 'tbUsuario',
            values: `'${nome}', '${email}', ${senha}`
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        listar();
    }).catch(err => { console.log("Deu erro, ai ó: ", err) });
}