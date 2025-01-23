<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "cadastro_corretores";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$sql = "SELECT * FROM corretores";
$result = $conn->query($sql);

$corretores = [];
if ($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $corretores[] = $row;
    }
}

echo json_encode($corretores);
$conn->close();

?>