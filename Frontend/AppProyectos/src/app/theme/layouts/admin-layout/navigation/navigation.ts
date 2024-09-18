export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'utilities',
    title: 'Gestión de Proyectos',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'empleados',
        title: 'Empleados',
        type: 'item',
        classes: 'nav-item',
        url: '/empleados',
        icon: 'font-size'
      },
      {
        id: 'proyectos',
        title: 'Proyectos',
        type: 'item',
        classes: 'nav-item',
        url: '/proyectos',
        icon: 'bg-colors'
      },
      {
        id: 'asignacion',
        title: 'Asignar Proyectos',
        type: 'item',
        classes: 'nav-item',
        url: '/asignacion',
        icon: 'ant-design'
      }
    ]
  }
];
