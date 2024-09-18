<?php
//TODO: Clase de Empleados
require_once('../config/config.php');
class Empleados
{
    //TODO: Implementar los metodos de la clase

    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `empleados`";

        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($id_empleado)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `empleados` WHERE `id_empleado`= $id_empleado";

        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombres, $apellidos, $correo, $rol)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `empleados` ( `nombres`, `apellidos`, `correo`, `rol`) VALUES ('$nombres', '$apellidos', '$correo', '$rol')";
            
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
    public function actualizar($id_empleado, $nombres, $apellidos, $correo, $rol)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `empleados` SET `nombres`='$nombres',`apellidos`='$apellidos',`correo`='$correo',`rol`='$rol' WHERE `id_empleado` = $id_empleado";

            if (mysqli_query($con, $cadena)) {
                return $id_empleado;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($id_empleado)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `empleados` WHERE `id_empleado`= $id_empleado";
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
