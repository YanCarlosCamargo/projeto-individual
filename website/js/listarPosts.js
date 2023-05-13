
async function buscarPosts() {

    await fetch('/listarPosts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json()).then(row => {
        console.log(row.posts[0])
        if (row.posts[0]) {
            listarPost(row.posts[0], row.likes[0])
        }

    }).catch(console.log);
}

function listarPost(listaPosts, listaLikes) {
    resultado.innerHTML = '';
    for (let i = 0; i < listaPosts.length; i++) {
        var likes = 0;
        for (let l = 0; l < listaLikes.length; l++) {
            if (listaLikes[l].fkPost == listaPosts[i].idPost) {
                likes += listaLikes[l].qtdLikes;
            }
        }
        console.log(likes);
        const element = listaPosts[i];

        console.log(element);
        resultado.innerHTML += `
        <li>${element.titulo}<br>
        ${element.descPost}<br>
        idAutor: ${element.fkAutor}<br>
        ${element.telefone}<br>
        Data: ${element.dtPost}<br>
        <img src="${element.imgPost}" width="70"><br>
        Likes: ${likes}<br>
        <button id="like" onclick="like(${element.idPost})">Like</button>

        </li>`

    }
}

buscarPosts();