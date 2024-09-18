import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProyecto } from 'src/app/interfaces/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-proyecto',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './nuevo-proyecto.component.html',
  styleUrl: './nuevo-proyecto.component.scss'
})
export class NuevoProyectoComponent {

  private proyectoService = inject(ProyectosService);
  private ruta = inject(ActivatedRoute);
  private navegacion = inject(Router);

  tituloPantalla = 'Registrar Proyecto';
  idProyecto: number = 0;
  nombreBoton = 'Guardar';

  form_Proyecto = new FormGroup({
    nombre_proyecto: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    fecha_inicio: new FormControl('', Validators.required),
    fecha_fin: new FormControl('', Validators.required),
    estado_proyecto: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    this.idProyecto = parseInt(this.ruta.snapshot.paramMap.get('id'));

    if (this.idProyecto > 0) {
      this.proyectoService.uno(this.idProyecto).subscribe(data => {
        this.form_Proyecto.controls['nombre_proyecto'].setValue(data.nombre_proyecto);
        this.form_Proyecto.controls['descripcion'].setValue(data.descripcion);
        this.form_Proyecto.controls['fecha_inicio'].setValue(data.fecha_inicio);
        this.form_Proyecto.controls['fecha_fin'].setValue(data.fecha_fin);
        this.form_Proyecto.controls['estado_proyecto'].setValue(data.estado_proyecto);
      });

      this.tituloPantalla = 'Modificar Proyecto';
      this.nombreBoton = 'Modificar';
    }
  }

  guardar() {
    let proyecto: IProyecto = {
      id_proyecto: this.idProyecto,
      nombre_proyecto: this.form_Proyecto.value.nombre_proyecto,
      descripcion: this.form_Proyecto.value.descripcion,
      fecha_inicio: this.form_Proyecto.value.fecha_inicio,
      fecha_fin: this.form_Proyecto.value.fecha_fin,
      estado_proyecto: this.form_Proyecto.value.estado_proyecto
    }

    Swal.fire({
      title: 'Proyectos',
      text: '¿Está seguro que los datos ingresados son correctos?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idProyecto > 0) {
          this.proyectoService.actualizar(proyecto).subscribe(data => {
            Swal.fire({
              title: 'Proyectos',
              text: 'Actualización exitosa',
              icon: 'success'
            });
            this.navegacion.navigate(['/proyectos']);
          });
        } else {
          this.proyectoService.insertar(proyecto).subscribe(data => {
            Swal.fire({
              title: 'Proyectos',
              text: 'Guardado exitoso',
              icon: 'success'
            });
            this.navegacion.navigate(['/proyectos']);
          });
        }
      }
    });
  }
}
