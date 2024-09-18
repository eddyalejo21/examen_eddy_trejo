<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// TODO: Controlador de Empleados

require_once('../models/empleados.model.php');
error_reporting(0);
$empleados = new Empleados;

switch ($_GET["op"]) {
        // TODO: Operaciones de productos

    case 'todos': // Procedimiento para cargar todos los empleados
        $datos = array();
        $datos = $empleados->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un empleado por ID
        if (!isset($_POST["id_empleado"])) {
            echo json_encode(["error" => "Empleado ID not specified."]);
            exit();
        }
        $id_empleado = intval($_POST["id_empleado"]);
        $datos = array();
        $datos = $empleados->uno($id_empleado);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo producto y actualizar el empleado
        if (!isset($_POST["nombres"]) || !isset($_POST["apellidos"]) || !isset($_POST["correo"]) || !isset($_POST["rol"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombres = $_POST["nombres"];
        $apellidos = $_POST["apellidos"];
        $correo = $_POST["correo"];
        $rol = $_POST["rol"];

        $datos = array();
        $datos = $empleados->insertar($nombres, $apellidos, $correo, $rol);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un empleado existente
        if (!isset($_POST["id_empleado"]) || !isset($_POST["nombres"]) || !isset($_POST["apellidos"]) || !isset($_POST["correo"]) || !isset($_POST["rol"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $id_empleado = intval($_POST["id_empleado"]);
        $nombres = $_POST["nombres"];
        $apellidos = $_POST["apellidos"];
        $correo = $_POST["correo"];
        $rol = $_POST["rol"];

        $datos = array();
        $datos = $empleados->actualizar($id_empleado, $nombres, $apellidos, $correo, $rol);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un empleado
        if (!isset($_POST["id_empleado"])) {
            echo json_encode(["error" => "Empleado ID not specified."]);
            exit();
        }
        $id_empleado = intval($_POST["id_empleado"]);
        $datos = array();
        $datos = $empleados->eliminar($id_empleado);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
