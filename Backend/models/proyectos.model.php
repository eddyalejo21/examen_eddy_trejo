<?php
//TODO: Clase de Empleados
require_once('../config/config.php');
class Proyectos
{
    //TODO: Implementar los metodos de la clase

    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `proyectos`";

        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($id_proyecto)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `proyectos` WHERE `id_proyecto`= $id_proyecto";

        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre_proyecto, $descripcion, $fecha_inicio, $fecha_fin, $estado_proyecto)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `proyectos` ( `nombre_proyecto`, `descripcion`, `fecha_inicio`, `fecha_fin`, `estado_proyecto`) VALUES ('$nombre_proyecto', '$descripcion', '$fecha_inicio', '$fecha_fin', '$estado_proyecto')";

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
    public function actualizar($id_proyecto, $nombre_proyecto, $descripcion, $fecha_inicio, $fecha_fin, $estado_proyecto)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `proyectos` SET `nombre_proyecto`='$nombre_proyecto',`descripcion`='$descripcion',`fecha_inicio`='$fecha_inicio',`fecha_fin`='$fecha_fin', `estado_proyecto`='$estado_proyecto' WHERE `id_proyecto` = $id_proyecto";

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
    public function eliminar($id_proyecto)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `proyectos` WHERE `id_proyecto`= $id_proyecto";
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
