<?php

$valores = file_get_contents('php://input');
$data = json_decode($valores, true);
//print_r($data);

$conn = new mysqli("localhost","root","","6A");

if($conn->connect_errno){
    echo "Fallo al conectar a Mysql: ". $conn->connect_error;
}

$sql = "insert into personas(nombre, grupo) values('$data[nombre]','$data[grupo]')";

$resultado = $conn->query($sql);

echo $resultado;

$conn->close();
?>