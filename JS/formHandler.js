document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadas').addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        fetch('../PHP/cadastrar_corretor.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            var aviso = document.getElementById('aviso');
            aviso.innerText = data.message;
            if (data.message.includes('sucesso')) {
                aviso.classList.remove('disabled');
                aviso.classList.remove('alerta-erro');
                aviso.classList.add('alerta-sucesso');
            } else {
                aviso.classList.remove('disabled');
                aviso.classList.remove('alerta-sucesso');
                aviso.classList.add('alerta-erro');
            }
            document.getElementById('cadas').reset();
        })
        .catch(error => {
            var aviso = document.getElementById('aviso');
            aviso.innerText = 'Erro ao cadastrar corretor.';
            aviso.classList.remove('disabled');
            aviso.classList.remove('alerta-sucesso');
            aviso.classList.add('alerta-erro');
            console.error('Erro:', error);
        });
    });
});