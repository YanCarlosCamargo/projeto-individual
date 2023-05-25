

async function buscarPosts() {

    await fetch('/listarPosts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(row => {
        //console.log(row.posts[0])
        if (row.posts[0]) {
            listarPost(row.posts[0], row.likes[0]);
            // ranking();
        }

    }).catch(console.log);
}



function listarPost(listaPosts, listaLikes) {
    listaPosts = listaPosts.reverse();
    resultado.innerHTML = '';
    var likes = 0;
    for (let i = 0; i < listaPosts.length; i++) {
        likes = 0;
        jaDeuLike = false;
        for (let l = 0; l < listaLikes.length; l++) {
            if (listaLikes[l].fkPost == listaPosts[i].idPost) {
                likes += listaLikes[l].qtdLikes;
            }
        }
        for (let l = 0; l < listaLikes.length; l++) {
            if (listaLikes[l].fkPost == listaPosts[i].idPost && listaLikes[l].fkUsuario == sessionStorage.idUsuario) {
                jaDeuLike = true;
            }
        }
        console.log(listaPosts[i].dtPost);
        var mes = listaPosts[i].dtPost.split('-')[1];
        console.log("mes ", mes);
        var dia = listaPosts[i].dtPost.split('-')[2].split('T')[0];
        console.log("dia ", dia);
        console.log(likes);
        const element = listaPosts[i];

        // data = element.dataPost.split('-');

        console.log(element, element.fkAutor, element.apelido);
        resultado.innerHTML += `
        
         <div class="containerPost">
                            <div class="wrapperImgPost">
                                <img class="imgPost" src="${element.imgPost}" alt="">
                            </div>
                            <div class="wrapperInfoPost">
                                <div class="wrapperDataTitulo">
                                    <div class="badgeData">
                                        ${mes}<br>
                                        ${dia}
                                    </div>
                                    <label class="tituloPost">${element.titulo}</label>
                                </div>
                                <label class="labelAutor" onclick="abrirUsuario(${element.fkAutor})">Ver mais de ${element.apelido}</label>
                                <label class="descricaoPost">${element.descPost}</label>
                                <div class="badgeLikesPost" onclick=${jaDeuLike ? ("removerLike(" + element.idPost + ")") : "inserirLike(" + element.idPost + ")"}>
                                ${!jaDeuLike ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/></svg>'
            }
                                    <label class="labelLikesPost">${likes}</label>
                                </div>
                            </div>
                        </div>
                        </div>
        
        `

    }
}







navName.innerHTML = sessionStorage['apelidoUsuario'];
const clientId = '83f26f78f9124b6';
imgProfile.style.backgroundImage = "url(" + sessionStorage['fotoUsuario'] + ")";
imgProfileLateral.style.backgroundImage = `url(${sessionStorage['fotoUsuario']})`;


var wrapperNovoPost = document.getElementById('wrapperNovoPost');

wrapperNovoPost.addEventListener('click', () => {
    wrapperNovoPost.style.display = 'none';
    document.querySelector('.containerPostExpandido').style.display = 'flex';
    location.href = '#containerPostExpandido';
})

idCloseNewPost.addEventListener('click', () => {
    wrapperNovoPost.style.display = 'flex';
    limparCampos();
    document.querySelector('.containerPostExpandido').style.display = 'none';
});


async function subirImagem(url, options) {
    console.log("subindo Imagem");
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
}
const input = document.getElementById('input-file');
const btn = document.querySelector('.btn-file');

btn.addEventListener('click', () => {
    input.click();
});

input.addEventListener('change', () => {
    var img = input.files[0];
    console.log(img);
    wrapperImg.innerHTML = `<img class="imgPostExpandido" src="${URL.createObjectURL(img)}" alt="">`
})

async function newPost() {
    loading(true);
    const titulo = document.querySelector('.tituloPostExpandido').value;
    const descricao = document.querySelector('.descricaoPostExpandido').value;
    const img = document.querySelector('.imgPostExpandido').src;

    valTitulo = titulo.length < 30;
    validacao = titulo == '' || descricao == '' || img == '';

    if (!valTitulo) {
        alert('O título deve ter no máximo 30 caracteres');
    } else if (validacao) {
        var varFoto = new FormData();
        varFoto.append('image', document.getElementById('input-file').files[0]);

        const body = {
            idUsuario: sessionStorage.idUsuario,
            titulo,
            descricao,
            img
        }

        await subirImagem('https://api.imgur.com/3/upload', {
            method: 'POST',
            body: varFoto,
            headers: {
                'Authorization': `Client-ID ${clientId}`,
            }
        }).then(data => {
            if (data.success) {
                console.log("data Sucess??? ", data.success);
                body.img = data.data.link;
            } else {
                loading();
                alert("erro, não subiu a imagem");
                console.log("erro, não subiu a imagem", data);
                return false
            }
        }).then(() => {

            if (body.img != '' && body.img != null && body.img != undefined) {
                fetch('/inserirPost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                }).then(response => {
                    console.log(response);
                    if (response.status == 200) {
                        console.log("post inserido com sucesso");
                        loading(false);
                        wrapperNovoPost.style.display = 'flex';
                        document.querySelector('.containerPostExpandido').style.display = 'none';
                        limparCampos();
                        buscarPosts()
                    } else {
                        loading(false);
                        console.log("erro ao inserir post");
                    }
                })
            } else {
                console.log("ultimo else");
            }
        })
    }
}

function limparCampos() {

    document.querySelector('.tituloPostExpandido').value = '';
    document.querySelector('.descricaoPostExpandido').value = '';
    wrapperImg.innerHTML = ``

}

function inserirLike(idPost) {
    const idUsuario = sessionStorage.idUsuario;
    const body = {
        idUsuario,
        idPost
    }
    fetch('/inserirLike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).then(response => {
        console.log(response);
        if (response.status == 200) {
            console.log("like inserido com sucesso");
            buscarPosts();
            ranking();
        } else {
            console.log("erro ao inserir like");
        }
    })
}

function removerLike(idPost) {
    const idUsuario = sessionStorage.idUsuario;
    const body = {
        idUsuario,
        idPost
    }
    fetch('/removerLike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).then(response => {
        console.log(response);
        if (response.status == 200) {
            console.log("like removido com sucesso");
            buscarPosts();
            ranking();
        } else {
            console.log("erro ao remover like");
        }
    })
}


function ranking() {
    fetch('/buscarRankLikes')
        .then(response => response.json())
        .then(data => {
            console.log("Bora ver o ranking", data);
            const usuarios = data.map(item => item.apelido);
            const likes = data.map(item => item.total_likes);
            console.log(usuarios, likes);

            graficoGerado.data.labels = usuarios;;
            graficoGerado.data.datasets[0].data = likes;
            graficoGerado.update();
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

var ultimoId;
async function abrirUsuario(idUsuario) {
    console.log("idUsuario", idUsuario);
    fetch(`/blog/buscarUsuario/${idUsuario}`)
        .then(response => response.json()).then(data => {
            if (ultimoId != idUsuario) {
                ultimoId = data[0].idUsuario;
                console.log("Perfil Recebido", data[0]);
                labelNome.innerHTML = data[0].apelido; imgProfileLateral.style.backgroundImage = `url(${data[0].imgPerfil})`;
                containerAbaLateral.classList.remove('containerAbaLateral');
                containerAbaLateral.classList.add('containerAbaLateralAberto');
                wrapperConteudoLateral.classList.remove('wrapperConteudoLateral');
                wrapperConteudoLateral.classList.add('wrapperConteudoLateralAberto');
                setTimeout(() => {
                    wrapperConteudoLateral.classList.remove('wrapperConteudoLateralAberto');
                    wrapperConteudoLateral.classList.add('wrapperConteudoLateral');
                    containerAbaLateral.classList.remove('containerAbaLateralAberto');
                    containerAbaLateral.classList.add('containerAbaLateral');

                }, 2000);
            } else {
                containerAbaLateral.classList.remove('containerAbaLateral');
                containerAbaLateral.classList.add('containerAbaLateralAberto');
                wrapperConteudoLateral.classList.remove('wrapperConteudoLateral');
                wrapperConteudoLateral.classList.add('wrapperConteudoLateralAberto');
                setTimeout(() => {
                    wrapperConteudoLateral.classList.remove('wrapperConteudoLateralAberto');
                    wrapperConteudoLateral.classList.add('wrapperConteudoLateral');
                    containerAbaLateral.classList.remove('containerAbaLateralAberto');
                    containerAbaLateral.classList.add('containerAbaLateral');

                }, 2000);
            }
        }).catch(console.log)

}