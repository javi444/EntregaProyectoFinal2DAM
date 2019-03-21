import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListaPistasComponent } from './lista-pistas/lista-pistas.component';

export const DashboardRoutes: Routes = [{
  path: 'inicio',
  component: DashboardComponent
},
{
  path: 'lista-pistas',
  component: ListaPistasComponent
}];
