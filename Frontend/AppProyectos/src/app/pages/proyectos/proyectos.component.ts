import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProyecto } from 'src/app/interfaces/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent {
 
  private proyectoService = inject(ProyectosService);

  title = 'Lista de Proyectos';
  listaProyectos: IProyecto[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.proyectoService.todos().subscribe({
      next: (data) => {
        this.listaProyectos = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  eliminar(id_empleado: number) {
    Swal.fire({
      title: 'Proyectos',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3053d6',
      cancelButtonColor: '#e41d1d',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoService.eliminar(id_empleado).subscribe((data) => {
          Swal.fire('Proyectos', 'El registro ha sido eliminado.', 'success');
          this.cargarDatos();
        });
      }
    });
  }

}
