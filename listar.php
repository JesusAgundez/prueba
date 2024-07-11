<?php
$conn = new mysqli("localhost", "root", "", "6A");

if ($conn->connect_errno) {
    echo "Fallo al conectar a Mysql: " . $conn->connect_error;
}

$sql = "SELECT nombre, grupo FROM personas";
$resultado = $conn->query($sql);

$registros = array();
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $registros[] = $row;
    }
}

echo json_encode($registros);

$conn->close();
?>
