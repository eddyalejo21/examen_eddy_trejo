import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProyectosEmpleados } from '../interfaces/proyectos-empleados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  apiurl = 'http://localhost/examen_eddy_trejo/backend/controllers/proyectosempleados.controller.php?op=';

  private http = inject(HttpClient);
  
  constructor() { }

  todos(){
    return this.http.get<IProyectosEmpleados[]>(this.apiurl + 'todos');
  }

  todosProyecto(id_proyecto: number){
    const formData = new FormData();
    console.log('Se recibe el id', id_proyecto);
    formData.append('id_proyecto', id_proyecto.toString());
    return this.http.post<IProyectosEmpleados[]>(this.apiurl + 'todosProyecto', formData);
  }

  uno(id_empleados_proyectos: number): Observable<IProyectosEmpleados> {
    const formData = new FormData();
    formData.append('id_empleados_proyectos', id_empleados_proyectos.toString());
    return this.http.post<IProyectosEmpleados>(this.apiurl + 'uno', formData);
  }

  insertar(empleadosproyectos: IProyectosEmpleados): Observable<string> {
    const formData = new FormData();
    formData.append('id_proyecto', empleadosproyectos.id_proyecto.toString());
    formData.append('id_empleado', empleadosproyectos.id_empleado.toString());
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(empleadosproyectos: IProyectosEmpleados): Observable<string> {
    const formData = new FormData();
    formData.append('id_proyectos_empleados', empleadosproyectos.id_proyectos_empleados.toString());
    formData.append('id_proyecto', empleadosproyectos.id_proyecto.toString());
    formData.append('id_empleado', empleadosproyectos.id_empleado.toString());
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }

  eliminar(id_proyectos_empleados: number): Observable<number> {
    const formData = new FormData();
    formData.append('id_proyectos_empleados', id_proyectos_empleados.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }
}
