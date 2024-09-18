import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmpleado } from '../interfaces/empleados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  apiurl = 'http://localhost/examen_eddy_trejo/backend/controllers/empleados.controller.php?op=';

  private http = inject(HttpClient);
  
  constructor() { }

  todos(){
    return this.http.get<IEmpleado[]>(this.apiurl + 'todos');
  }

  uno(id_empleado: number): Observable<IEmpleado> {
    const formData = new FormData();
    formData.append('id_empleado', id_empleado.toString());
    return this.http.post<IEmpleado>(this.apiurl + 'uno', formData);
  }

  insertar(empleado: IEmpleado): Observable<string> {
    const formData = new FormData();
    formData.append('nombres', empleado.nombres);
    formData.append('apellidos', empleado.apellidos);
    formData.append('correo', empleado.correo);
    formData.append('rol', empleado.rol);
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(empleado: IEmpleado): Observable<string> {
    const formData = new FormData();
    formData.append('id_empleado', empleado.id_empleado.toString());
    formData.append('nombres', empleado.nombres);
    formData.append('apellidos', empleado.apellidos);
    formData.append('correo', empleado.correo);
    formData.append('rol', empleado.rol);
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }

  eliminar(id_empleado: number): Observable<number> {
    const formData = new FormData();
    formData.append('id_empleado', id_empleado.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }
}
