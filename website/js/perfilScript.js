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

async function abrirUsuario(idUsuario) {
    console.log("idUsuario", idUsuario);
    fetch(`/blog/buscarUsuario/${idUsuario}`)
        .then(response => response.json()).then(data => {
            console.log("Dados do usuário: ", data);
            sessionStorage.nomeUsuario = data[0].nome;
            sessionStorage.apelidoUsuario = data[0].apelido;
            sessionStorage.emailUsuario = data[0].email;
            sessionStorage.telefoneUsuario = data[0].telefone;
            nomeUsuario.innerHTML = sessionStorage.nomeUsuario;
            inputNomeCompleto.placeholder = sessionStorage.nomeUsuario;
            inputApelido.placeholder = sessionStorage.apelidoUsuario;
            navName.innerHTML = sessionStorage.apelidoUsuario;
            inputTelefone.placeholder = sessionStorage.telefoneUsuario;
            inputEmail.placeholder = sessionStorage.emailUsuario;

            inputApelido.value = "";
            inputApelido.placeholder = sessionStorage.apelidoUsuario;
            inputEmail;
            inputTelefone;
            inputNomeCompleto;

            return true
        }).catch(console.log)

}

function habilitarEdicao(opcao) {


    if (opcao) {
        inputApelido.disabled = false;
        inputApelido.classList.remove('inputDisable');
        inputApelido.classList.add('inputEnable');
        inputEmail.disabled = false;
        inputEmail.classList.remove('inputDisable');
        inputEmail.classList.add('inputEnable');
        inputTelefone.disabled = false;
        inputTelefone.classList.remove('inputDisable');
        inputTelefone.classList.add('inputEnable');
        inputNomeCompleto.disabled = false;
        inputNomeCompleto.classList.remove('inputDisable');
        inputNomeCompleto.classList.add('inputEnable');
    } else {
        inputApelido.disabled = true;
        inputApelido.classList.remove('inputEnable');
        inputApelido.classList.add('inputDisable');
        inputEmail.disabled = true;
        inputEmail.classList.remove('inputEnable');
        inputEmail.classList.add('inputDisable');
        inputTelefone.disabled = true;
        inputTelefone.classList.remove('inputEnable');
        inputTelefone.classList.add('inputDisable');
        inputNomeCompleto.disabled = true;
        inputNomeCompleto.classList.remove('inputEnable');
        inputNomeCompleto.classList.add('inputDisable');
    }

}

async function atualizarPerfil() {
    console.log("Atualizando perfil");
    let nome = document.getElementById('inputNomeCompleto').value;
    let email = document.getElementById('inputEmail').value;
    let telefone = document.getElementById('inputTelefone').value;
    let apelido = document.getElementById('inputApelido').value;

    if (nome == "" && email == "" && telefone == "" && apelido == "") {
        console.log("Não atualizou");
        return false;
    }

    if (nome == "") {
        nome = document.getElementById('inputNomeCompleto').placeholder;
    }
    if (email == "") {
        email = document.getElementById('inputEmail').placeholder;
    }
    if (telefone == "") {
        telefone = document.getElementById('inputTelefone').placeholder;
    }
    if (apelido == "") {
        apelido = document.getElementById('inputApelido').placeholder;
    }


    let dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        apelido: apelido
    }

    await fetch(`/atualizarPerfil/${sessionStorage.idUsuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });
    console.log("Atualizou");
    await abrirUsuario(sessionStorage.idUsuario);
}

btnEdicao.addEventListener('click', async () => {
    console.log("Clicou");
    if (inputApelido.disabled) {
        console.log("Editando");
        habilitarEdicao(true);
        btnEdicao.innerHTML = "Salvar Edições";
    } else {
        console.log("Salvando");
        habilitarEdicao(false);
        await atualizarPerfil();
        btnEdicao.innerHTML = "Editar Perfil";
    }
});

function abrirModal() {
    if (modalDecisao.style.display == 'flex') {
        containerMain.style.filter = 'blur(0px)';
        modalDecisao.style.display = 'none';
    } else {
        containerMain.style.filter = 'blur(5px)';
        modalDecisao.style.display = 'flex';
    }
}

btnDel.addEventListener('click', () => {
    modalDecisao.innerHTML = `
     <h3 class="tituloModal">Excluir Conta?</h3>
        <p class="descricaoModal">
            Você tem certeza que deseja excluir sua conta? Todos os seus posts serão excluidos e não poderão ser
            recuperados.
        </p>
        <div class="wrapperBtnModal">
            <button class="btnModal" onclick="abrirModal()" id="btnCancelar">Cancelar</button>
            <button class="btnModal" onclick="excluirUsuario()" id="btnConfirmar">Confirmar</button>
        </div>
    `;
    abrirModal();
});

function modalRemoverPost(id) {
    modalDecisao.innerHTML = `
     <h3 class="tituloModal">Excluir Post?</h3>
        <p class="descricaoModal">
            Você tem certeza que deseja excluir este post? Ele não poderá ser recuperado.
        </p>
        <div class="wrapperBtnModal">
            <button class="btnModal" onclick="abrirModal()" id="btnCancelar">Cancelar</button>
            <button class="btnModal" onclick="removerPost(${id}); abrirModal()" id="btnConfirmar">Confirmar</button>
        </div>
    `;
    abrirModal();
}

function excluirUsuario() {
    fetch(`/deletarUsuario/${sessionStorage.idUsuario}`, {
        method: 'DELETE'
    }).then(() => {
        alert("Conta excluída com sucesso!");
        sessionStorage.clear();
        window.location.href = "../";
    }).catch((err) => { console.log(err); alert("Erro ao excluir conta!") });
}