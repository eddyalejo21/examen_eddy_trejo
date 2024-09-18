import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmpleado } from 'src/app/interfaces/empleados';
import { IProyecto } from 'src/app/interfaces/proyectos';
import { IProyectosEmpleados } from 'src/app/interfaces/proyectos-empleados';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-asignacion',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './nueva-asignacion.component.html',
  styleUrl: './nueva-asignacion.component.scss'
})
export class NuevaAsignacionComponent {

  private proyectoService = inject(ProyectosService);
  private empleadoService = inject(EmpleadosService);
  private proyectoEmpleadoService = inject(AsignacionService);
  private ruta = inject(ActivatedRoute);
  private navegacion = inject(Router);

  tituloPantalla = 'Registrar Asignación';
  idProyectoEmpleado: number = 0;
  nombreBoton = 'Guardar';

  listaProyectos : IProyecto[] = [];
  listaEmpleados : IEmpleado[] = [];

  form_ProyectosEmpleados = new FormGroup({
    id_proyecto: new FormControl('', Validators.required),
    id_empleado: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    this.idProyectoEmpleado = parseInt(this.ruta.snapshot.paramMap.get('id'));

    this.cargarProyectos();
    this.cargarEmpleados();

    if (this.idProyectoEmpleado > 0) {
      this.proyectoEmpleadoService.uno(this.idProyectoEmpleado).subscribe(data => {
        this.form_ProyectosEmpleados.controls['id_proyecto'].setValue(data.id_proyecto.toString());
        this.form_ProyectosEmpleados.controls['id_empleado'].setValue(data.id_empleado.toString());
      });

      this.tituloPantalla = 'Modificar';
      this.nombreBoton = 'Modificar';
    }
  }

  cargarProyectos() {
    return this.proyectoService.todos().subscribe(data => {
      this.listaProyectos = data;
    });
  }

  cargarEmpleados() {
    return this.empleadoService.todos().subscribe(data => {
      this.listaEmpleados = data;
    });
  }

  guardar() {
    let proyectosempleados: IProyectosEmpleados= {
      id_proyectos_empleados: this.idProyectoEmpleado,
      id_empleado: parseInt(this.form_ProyectosEmpleados.value.id_empleado),
      id_proyecto: parseInt(this.form_ProyectosEmpleados.value.id_proyecto),
    }

    Swal.fire({
      title: 'Proyecto Empleados',
      text: '¿Está seguro que los datos ingresados son correctos?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idProyectoEmpleado > 0) {
          this.proyectoEmpleadoService.actualizar(proyectosempleados).subscribe(data => {
            Swal.fire({
              title: 'Proyecto Empleados',
              text: 'Actualización exitosa',
              icon: 'success'
            });
            this.navegacion.navigate(['/empleados']);
          });
        } else {
          this.proyectoEmpleadoService.insertar(proyectosempleados).subscribe(data => {
            console.log(data);
            Swal.fire({
              title: 'Proyecto Empleados',
              text: 'Guardado exitoso',
              icon: 'success'
            });
            this.navegacion.navigate(['/asignacion']);
          });
        }
      }
    });
  }

  seleccionarProyecto(event : any) {
    this.form_ProyectosEmpleados.controls['id_proyecto'].setValue(event.target.value);
  }

  seleccionarEmpleado(event : any) {
    this.form_ProyectosEmpleados.controls['id_empleado'].setValue(event.target.value);
  }

}
