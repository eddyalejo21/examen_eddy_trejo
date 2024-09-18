import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProyecto } from 'src/app/interfaces/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IProyectosEmpleados } from 'src/app/interfaces/proyectos-empleados';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.scss'
})
export class AsignacionComponent {

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  private proyectoService = inject(ProyectosService);
  private asignacionService = inject(AsignacionService);
  private ruta = inject(ActivatedRoute);
  private navegacion = inject(Router);

  existeProyecto = false;
  tituloPantalla = 'Consultar Empleados por Proyecto';
  listaProyectos: IProyecto[] = [];
  listaProyectosEmpleados: IProyectosEmpleados[] = [];
  proyecto: IProyecto;

  constructor() { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.proyectoService.todos().subscribe(data => this.listaProyectos = data);
  }

  seleccionarProyecto(event: any) {
    const id = event.target.value;

    if (id != '0') {
      this.existeProyecto = true;

      this.asignacionService.todosProyecto(id).subscribe(data => {
        this.listaProyectosEmpleados = data;
      });

      this.proyectoService.uno(id).subscribe(data => {
        this.proyecto = data;
        console.log(this.proyecto.nombre_proyecto);
      });

    }
  }

  generarPDF() {
    const DATA = this.pdfContent.nativeElement;

    // Usa html2canvas para capturar el contenido HTML
    html2canvas(DATA).then((canvas) => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Crear un PDF en formato A4
      const margin = 2;
      const position = margin;

      // Agregar la imagen capturada al PDF
      pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight);

      // Descargar el PDF con un nombre específico
      pdf.save('reporte_proyecto.pdf');
    });
  }
}
