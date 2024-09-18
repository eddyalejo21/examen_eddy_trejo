import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmpleado } from 'src/app/interfaces/empleados';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-empleado',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './nuevo-empleado.component.html',
  styleUrl: './nuevo-empleado.component.scss'
})
export class NuevoEmpleadoComponent {

  private empleadoService = inject(EmpleadosService);
  private ruta = inject(ActivatedRoute);
  private navegacion = inject(Router);

  tituloPantalla = 'Registrar Empleado';
  idEmpleado: number = 0;
  nombreBoton = 'Guardar';

  form_Empleado = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    rol: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    this.idEmpleado = parseInt(this.ruta.snapshot.paramMap.get('id'));

    if (this.idEmpleado > 0) {
      this.empleadoService.uno(this.idEmpleado).subscribe(data => {
        this.form_Empleado.controls['nombres'].setValue(data.nombres);
        this.form_Empleado.controls['apellidos'].setValue(data.apellidos);
        this.form_Empleado.controls['correo'].setValue(data.correo);
        this.form_Empleado.controls['rol'].setValue(data.rol);
      });

      this.tituloPantalla = 'Modificar Empleado';
      this.nombreBoton = 'Modificar';
    }
  }

  guardar() {
    let empleado: IEmpleado = {
      id_empleado: this.idEmpleado,
      nombres: this.form_Empleado.value.nombres,
      apellidos: this.form_Empleado.value.apellidos,
      correo: this.form_Empleado.value.correo,
      rol: this.form_Empleado.value.rol
    }

    Swal.fire({
      title: 'Empleados',
      text: '¿Está seguro que los datos ingresados son correctos?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idEmpleado > 0) {
          this.empleadoService.actualizar(empleado).subscribe(data => {
            Swal.fire({
              title: 'Empleados',
              text: 'Actualización exitosa',
              icon: 'success'
            });
            this.navegacion.navigate(['/empleados']);
          });
        } else {
          this.empleadoService.insertar(empleado).subscribe(data => {
            Swal.fire({
              title: 'Empleados',
              text: 'Guardado exitoso',
              icon: 'success'
            });
            this.navegacion.navigate(['/empleados']);
          });
        }
      }
    });
  }

}
