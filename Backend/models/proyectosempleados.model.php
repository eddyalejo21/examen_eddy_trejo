<?php
//TODO: Clase de Empleados
require_once('../config/config.php');
class ProyectosEmpleados
{
    //TODO: Implementar los metodos de la clase

    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `proyectos_empleados`";

        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function todosProyecto($id_proyecto)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        // $cadena = "SELECT * FROM `proyectos_empleados` WHERE `id_proyecto`= $id_proyecto";
        $cadena = "SELECT pe.id_proyectos_empleados, e.nombres, e.apellidos, e.rol, p.nombre_proyecto
                    FROM proyectos_empleados pe
                    INNER JOIN empleados e
                    ON pe.id_empleado = e.id_empleado
                    INNER JOIN proyectos p
                    ON pe.id_proyecto = p.id_proyecto
                    WHERE pe.id_proyecto = $id_proyecto";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($id_proyectosempleado)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `proyectos_empleados` WHERE `id_proyectosempleado`= $id_proyectosempleado";

        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($id_proyecto, $id_empleado)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `proyectos_empleados` ( `id_proyecto`, `id_empleado`) VALUES ('$id_proyecto', '$id_empleado')";

            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($id_proyectos_empleados, $id_proyecto, $id_empleado)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `proyectos_empleados` SET `id_proyecto`='$id_proyecto',`id_empleado`='$id_empleado' WHERE `id_proyectos_empleados` = $id_proyectos_empleados";

            if (mysqli_query($con, $cadena)) {
                return $id_proyecto;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($id_proyectos_empleados)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `proyectos_empleados` WHERE `id_proyectos_empleados`= $id_proyectos_empleados";
            // echo $cadena;
            if (mysqli_query($con, $cadena)) {
                return 1;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
