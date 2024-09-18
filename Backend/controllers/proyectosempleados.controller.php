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

require_once('../models/proyectosempleados.model.php');
error_reporting(0);
$proyectosempleados = new ProyectosEmpleados;

switch ($_GET["op"]) {
        // TODO: Operaciones de proyectos

    case 'todos': // Procedimiento para cargar todos los proyectos
        $datos = array();
        $datos = $proyectosempleados->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todosProyecto':
        $id_proyecto = intval($_POST["id_proyecto"]);
        $datos = array();
        $datos = $proyectosempleados->todosProyecto($id_proyecto);
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un empleado por ID
        if (!isset($_POST["$id_proyectos_empleados"])) {
            echo json_encode(["error" => "Proyecto ID not specified."]);
            exit();
        }
        $id_proyectos_empleados = intval($_POST["id_proyectos_empleados"]);
        $datos = array();
        $datos = $proyectosempleados->uno($id_proyectos_empleados);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar
        if (!isset($_POST["id_proyecto"]) || !isset($_POST["id_empleado"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $id_proyecto = $_POST["id_proyecto"];
        $id_empleado = $_POST["id_empleado"];

        $datos = array();
        $datos = $proyectosempleados->insertar($id_proyecto, $id_empleado);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un empleado existente
        if (!isset($_POST["id_proyectos_empleados"]) || !isset($_POST["id_proyecto"]) || !isset($_POST["id_empleado"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $id_proyectos_empleados = intval($_POST["id_proyectos_empleados"]);
        $id_proyecto = $_POST["id_proyecto"];
        $id_empleado = $_POST["id_empleado"];

        $datos = array();
        $datos = $proyectosempleados->actualizar($id_proyectos_empleados, $id_proyecto, $id_empleado);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar
        if (!isset($_POST["id_proyectos_empleados"])) {
            echo json_encode(["error" => "Empleado ID not specified."]);
            exit();
        }
        $id_proyectos_empleados = intval($_POST["id_proyectos_empleados"]);
        $datos = array();
        $datos = $proyectosempleados->eliminar($id_proyectos_empleados);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
