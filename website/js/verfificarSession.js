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

function loading(preferencia) {
    var state = loadingOverlay.style.display;

    if (!preferencia) {
        if (state == 'flex') {
            loadingOverlay.style.display = 'none';
            loadingOverlay.style.opacity = '0';
            console.log('fechando');
        } else {
            loadingOverlay.style.display = 'flex';
            loadingOverlay.style.opacity = '1';

        }
    } else {
        if (preferencia == true) {
            loadingOverlay.style.display = 'flex';
            loadingOverlay.style.opacity = '1';
        } else {
            console.log('fechando');
            loadingOverlay.style.display = 'none';
            loadingOverlay.style.opacity = '0';
        }
    }
}