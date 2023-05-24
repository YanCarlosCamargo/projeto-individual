if (sessionStorage.idUsuario == null) {
    window.location.href = "/";
}

btnPerfil.addEventListener('click', () => {
    console.log("abrir login");
    window.location.href = '/perfil';
});

btnLogout.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '/';
});