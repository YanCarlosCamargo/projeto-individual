
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
    var likes = 0;
    for (let i = 0; i < listaPosts.length; i++) {
        likes = 0
        for (let l = 0; l < listaLikes.length; l++) {
            if (listaLikes[l].fkPost == listaPosts[i].idPost) {
                likes += listaLikes[l].qtdLikes;
            }
        }
        console.log(likes);
        const element = listaPosts[i];

        console.log(element);
        resultado.innerHTML += `
        
         <div class="containerPost">
                            <div class="wrapperImgPost">
                                <img class="imgPost" src="${element.imgPost}" alt="">
                            </div>
                            <div class="wrapperInfoPost">
                                <div class="wrapperDataTitulo">
                                    <div class="badgeData">
                                        05<br>
                                        06
                                    </div>
                                    <label class="tituloPost">${element.titulo}</label>
                                </div>
                                <label class="labelAutor">Por: zézin</label>
                                <label class="descricaoPost">${element.descPost}</label>
                                <div class="badgeLikesPost">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="red"
                                            d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" />
                                    </svg>
                                    <label class="labelLikesPost">${likes}</label>
                                </div>
                            </div>
                        </div>
                        </div>
        
        `

    }
}

buscarPosts();