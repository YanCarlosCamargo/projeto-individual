let heart = ` <svg style="display: inline;"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="red"
                                d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" />
                        </svg>`

var antes = Date.now();
fetch(`/buscarLikes/${sessionStorage.idUsuario}`).then((res) => {
    res.json().then((data) => {
        console.log("Total likes", data[0][0].total_likes);
        let likes = document.getElementById('labelLikesUsuario');
        likes.innerHTML = data[0][0].total_likes + heart;
        var depois = Date.now();
        console.log("Tempo de execução: ", depois - antes, "ms");
    });
}).catch(console.log);

function editarPerfil() {
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let telefone = document.getElementById('telefone').value;
    let bio = document.getElementById('bio').value;
    let apelido = document.getElementById('apelido').value;
}   