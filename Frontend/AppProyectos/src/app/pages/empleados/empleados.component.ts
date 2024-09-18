import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IEmpleado } from 'src/app/interfaces/empleados';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent {

  private empleadoService = inject(EmpleadosService);

  title = 'Lista de Empleados';
  listaEmpleados: IEmpleado[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.empleadoService.todos().subscribe({
      next: (data) => {
        this.listaEmpleados = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  eliminar(id_empleado: number) {
    Swal.fire({
      title: 'Empleados',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3053d6',
      cancelButtonColor: '#e41d1d',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminar(id_empleado).subscribe((data) => {
          Swal.fire('Empleados', 'El registro ha sido eliminado.', 'success');
          this.cargarDatos();
        });
      }
    });
  }

}
