import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProyecto } from '../interfaces/proyectos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  apiurl = 'http://localhost/examen_eddy_trejo/backend/controllers/proyectos.controller.php?op=';

  private http = inject(HttpClient);
  
  constructor() { }

  todos(){
    return this.http.get<IProyecto[]>(this.apiurl + 'todos');
  }

  uno(id_proyecto: number): Observable<IProyecto> {
    const formData = new FormData();
    formData.append('id_proyecto', id_proyecto.toString());
    return this.http.post<IProyecto>(this.apiurl + 'uno', formData);
  }

  insertar(proyecto: IProyecto): Observable<string> {
    const formData = new FormData();
    formData.append('nombre_proyecto', proyecto.nombre_proyecto);
    formData.append('descripcion', proyecto.descripcion);
    formData.append('fecha_inicio', proyecto.fecha_inicio);
    formData.append('fecha_fin', proyecto.fecha_fin);
    formData.append('estado_proyecto', proyecto.estado_proyecto)
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(proyecto: IProyecto): Observable<string> {
    const formData = new FormData();
    formData.append('id_proyecto', proyecto.id_proyecto.toString());
    formData.append('nombre_proyecto', proyecto.nombre_proyecto);
    formData.append('descripcion', proyecto.descripcion);
    formData.append('fecha_inicio', proyecto.fecha_inicio);
    formData.append('fecha_fin', proyecto.fecha_fin);
    formData.append('estado_proyecto', proyecto.estado_proyecto)
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }

  eliminar(id_proyecto: number): Observable<number> {
    const formData = new FormData();
    formData.append('id_proyecto', id_proyecto.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }
}
