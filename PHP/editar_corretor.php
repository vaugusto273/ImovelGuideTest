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
$id = $_POST['id'];

$sql = "UPDATE corretores SET name = $name, cpf = $cpf, creci = $creci WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => "Corretor Editado com sucesso!"]);
} else {
    echo json_encode(['message' => "Erro: " . $sql . "<br>" . $conn->error]);
}
$conn->close();

?>