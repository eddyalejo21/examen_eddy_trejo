<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// TODO: Controlador de Proyectos

require_once('../models/proyectos.model.php');
error_reporting(0);
$proyectos = new Proyectos;

switch ($_GET["op"]) {
        // TODO: Operaciones de proyectos

    case 'todos': // Procedimiento para cargar todos los proyectos
        $datos = array();
        $datos = $proyectos->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un empleado por ID
        if (!isset($_POST["id_proyecto"])) {
            echo json_encode(["error" => "Proyecto ID not specified."]);
            exit();
        }
        $id_proyecto = intval($_POST["id_proyecto"]);
        $datos = array();
        $datos = $proyectos->uno($id_proyecto);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo proyecto
        if (!isset($_POST["nombre_proyecto"]) || !isset($_POST["descripcion"]) || !isset($_POST["fecha_inicio"]) || !isset($_POST["fecha_fin"]) || !isset($_POST["estado_proyecto"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre_proyecto = $_POST["nombre_proyecto"];
        $descripcion = $_POST["descripcion"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];
        $estado_proyecto = $_POST["estado_proyecto"];

        $datos = array();
        $datos = $proyectos->insertar($nombre_proyecto, $descripcion, $fecha_inicio, $fecha_fin, $estado_proyecto);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un empleado existente
        if (!isset($_POST["id_proyecto"]) || !isset($_POST["nombre_proyecto"]) || !isset($_POST["descripcion"]) || !isset($_POST["fecha_inicio"]) || !isset($_POST["fecha_fin"]) || !isset($_POST["estado_proyecto"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $id_proyecto = intval($_POST["id_proyecto"]);
        $nombre_proyecto = $_POST["nombre_proyecto"];
        $descripcion = $_POST["descripcion"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];
        $estado_proyecto = $_POST["estado_proyecto"];

        $datos = array();
        $datos = $proyectos->actualizar($id_proyecto, $nombre_proyecto, $descripcion, $fecha_inicio, $fecha_fin, $estado_proyecto);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un empleado
        if (!isset($_POST["id_proyecto"])) {
            echo json_encode(["error" => "Empleado ID not specified."]);
            exit();
        }
        $id_proyecto = intval($_POST["id_proyecto"]);
        $datos = array();
        $datos = $proyectos->eliminar($id_proyecto);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
