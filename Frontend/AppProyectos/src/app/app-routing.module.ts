// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'empleados',
        loadComponent: () => import('./pages/empleados/empleados.component').then((m) => m.EmpleadosComponent)
      },
      {
        path: 'nuevoempleado',
        loadComponent: () => import('./pages/empleados/nuevo-empleado/nuevo-empleado.component').then((m) => m.NuevoEmpleadoComponent),
      },
      {
        path: 'editar-empleado/:id',
        loadComponent: () => import('./pages/empleados/nuevo-empleado/nuevo-empleado.component').then((m) => m.NuevoEmpleadoComponent),
      },
      {
        path: 'proyectos',
        loadComponent: () => import('./pages/proyectos/proyectos.component').then((m) => m.ProyectosComponent)
      },
      {
        path: 'nuevoproyecto',
        loadComponent: () => import('./pages/proyectos/nuevo-proyecto/nuevo-proyecto.component').then((m) => m.NuevoProyectoComponent),
      },
      {
        path: 'editar-proyecto/:id',
        loadComponent: () => import('./pages/proyectos/nuevo-proyecto/nuevo-proyecto.component').then((m) => m.NuevoProyectoComponent),
      },
      {
        path: 'asignacion',
        loadComponent: () => import('./pages/asignacion/asignacion.component').then((m) => m.AsignacionComponent)
      },
      {
        path: 'nuevaasignacion',
        loadComponent: () => import('./pages/asignacion/nueva-asignacion/nueva-asignacion.component').then((m) => m.NuevaAsignacionComponent),
      },
      {
        path: 'editar-asignacion/:id',
        loadComponent: () => import('./pages/asignacion/nueva-asignacion/nueva-asignacion.component').then((m) => m.NuevaAsignacionComponent),
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
