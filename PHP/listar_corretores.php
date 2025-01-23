<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "cadastro_corretores";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['message' => "Conexão falhou: " . $conn->connect_error]);
    exit();
}

$cpf = $_POST['cpf'];
$creci = $_POST['creci'];
$name = $_POST['name'];
$id = $_POST['id'];

// Validação dos campos
if (strlen($cpf) != 11) {
    echo json_encode(['message' => "Erro: CPF deve ter 11 caracteres."]);
    exit();
}
if (strlen($creci) < 2) {
    echo json_encode(['message' => "Erro: CRECI deve ter pelo menos 2 caracteres."]);
    exit();
}
if (strlen($name) < 2) {
    echo json_encode(['message' => "Erro: Nome deve ter pelo menos 2 caracteres."]);
    exit();
}

$sql = "UPDATE corretores SET name = '$name', cpf = '$cpf', creci = '$creci' WHERE id = $id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => "Corretor editado com sucesso!"]);
} else {
    echo json_encode(['message' => "Erro: " . $conn->error]);
}

$conn->close();

?>