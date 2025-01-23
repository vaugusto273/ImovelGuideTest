<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "cadastro_corretores";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
$cpf = $_POST['cpf'];
$creci = $_POST['creci'];
$name = $_POST['name'];

$sql = "INSERT INTO corretores (cpf, creci, name) VALUES ('$cpf', '$creci', '$name')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => "Corretor cadastrado com sucesso!"]);
} else {
    echo json_encode(['message' => "Erro: " . $sql . "<br>" . $conn->error]);
}
$conn->close();

?>