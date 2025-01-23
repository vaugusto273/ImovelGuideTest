<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "cadastro_corretores";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
$id = $_POST['id'];

$sql = "DELETE FROM corretores WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => "Corretor Deletado com sucesso!"]);
} else {
    echo json_encode(['message' => "Erro: " . $sql . "<br>" . $conn->error]);
}
$conn->close();

?>