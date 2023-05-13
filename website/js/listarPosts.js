async function buscarPosts() {

    await fetch('/listarPosts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json()).then(row => {
        console.log(row)
        if (row[0]) {
            listarPost(row)
        }

    }).catch(console.log);
}

function listarPost(lista) {
    resultado.innerHTML = '';
    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        console.log(element);
        resultado.innerHTML += `
        <li>${element.titulo}<br>
        ${element.descPost}<br>
        idAutor: ${element.fkAutor}<br>
        ${element.telefone}<br>
        <img src="${element.imgPost}" width="70"><br>
        </li>`

    }
}

buscarPosts();