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
            loadCorretores();
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

    function loadCorretores(){
        fetch('../PHP/listar_corretores.php')
        .then(response => response.json())
        .then(data =>{
            var table = document.querySelector('#CorretoresTable table')
            var rows = table.querySelectorAll('tr:not(:first-child)');
            rows.forEach(row => row.remove());
            
            data.forEach(corretor => {var row = table.insertRow();
            row.insertCell(0).innerText = corretor.id;
            row.insertCell(1).innerText = corretor.name;
            row.insertCell(2).innerText = corretor.cpf;
            row.insertCell(3).innerText = corretor.creci;
            })
        })
        .catch(error => console.error('Erro ao carregar corretores:', error));
    }
    loadCorretores();
});