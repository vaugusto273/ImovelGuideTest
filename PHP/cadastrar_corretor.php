<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "cadastro_corretores";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['message' => "Conexão falhou: " . $conn->connect_error]));
}

$cpf = $_POST['cpf'];
$creci = $_POST['creci'];
$name = $_POST['name'];

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

$sql = "INSERT INTO corretores (cpf, creci, name) VALUES ('$cpf', '$creci', '$name')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => "Corretor cadastrado com sucesso!"]);
} else {
    echo json_encode(['message' => "Erro: " . $conn->error]);
}
$conn->close();

?>