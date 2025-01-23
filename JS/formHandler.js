document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadas').addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        if (event.submitter && event.submitter.id === 'submit-btn') {
            // Lógica para cadastrar corretor
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
        } else if (event.submitter && event.submitter.id === 'edit-btn') {
            // Lógica para editar corretor
            var id = document.getElementById('edit-id').value; // Obter o ID do campo oculto
            formData.append('id', id);

            fetch('../PHP/editar_corretor.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                var Elemedit = document.getElementById('editColum');
                var Elemsubmit = document.getElementById('submitColum');
                var Elemeid = document.getElementById('edit-id');
                var aviso = document.getElementById('aviso');
                aviso.innerHTML = 'Corretor editado com sucesso.';
                aviso.classList.remove('disabled');
                aviso.classList.remove('alerta-erro');
                aviso.classList.add('alerta-sucesso');
                document.getElementById('cadas').reset();
                Elemedit.classList.add('disabled');
                Elemsubmit.classList.remove('disabled');
                Elemeid.value = '';
                loadCorretores();
            })
            .catch(error => {
                var aviso = document.getElementById('aviso');
                aviso.innerHTML = 'Erro ao editar corretor.';
                aviso.classList.remove('disabled');
                aviso.classList.remove('alerta-sucesso');
                aviso.classList.add('alerta-erro');
                console.error('Erro:', error);
            });
        }
    });
    loadCorretores();
});

function editCorretor(id) {
    console.log('Editar corretor com ID:', id);
    if (confirm('Tem certeza que deseja editar este corretor?')) {
        var row = document.getElementById('corretor-' + id);
        var cell = row.getElementsByTagName('td');
        var nome = cell[1].innerText;
        var CPF = cell[2].innerText;
        var CRECI = cell[3].innerText;
        var Elemnome = document.getElementById('name');
        var Elemcpf = document.getElementById('cpf');
        var Elemcreci = document.getElementById('creci');
        var Elemedit = document.getElementById('editColum');
        var Elemsubmit = document.getElementById('submitColum');
        var Elemeid = document.getElementById('edit-id');

        Elemnome.value = nome;
        Elemcpf.value = CPF;
        Elemcreci.value = CRECI;
        Elemsubmit.classList.add('disabled');
        Elemedit.classList.remove('disabled');
        Elemeid.value = id;
    }
}

function deleteCorretor(id) {
    console.log('Excluir corretor com ID:', id);
    if (confirm('Tem certeza que deseja excluir este corretor?')) {
        fetch('../PHP/excluir_corretor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + id
        })
        .then(response => response.json())
        .then(data => {
            var aviso = document.getElementById('aviso');
            aviso.innerHTML = 'Corretor excluído com sucesso.';
            loadCorretores();
        })
        .catch(error => console.error('Erro ao excluir corretor:', error));
    }
}

function loadCorretores(){
    fetch('../PHP/listar_corretores.php')
    .then(response => response.json())
    .then(data => {
        var table = document.querySelector('#CorretoresTable table');
        var rows = table.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => row.remove());
        
        data.forEach(corretor => {
            var row = table.insertRow();
            row.insertCell(0).innerText = corretor.id;
            row.id = 'corretor-' + corretor.id;
            row.insertCell(1).innerText = corretor.name;
            row.insertCell(2).innerText = corretor.cpf;
            row.insertCell(3).innerText = corretor.creci;
            var cell4 = row.insertCell(4);

            var editButton = document.createElement('button');
            editButton.innerText = 'Editar';
            editButton.onclick = function() {
                editCorretor(corretor.id);
            };
            cell4.appendChild(editButton);

            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'Excluir';
            deleteButton.onclick = function() {
                deleteCorretor(corretor.id);
            };
            cell4.appendChild(deleteButton);
        });
    })
    .catch(error => console.error('Erro ao carregar corretores:', error));
}