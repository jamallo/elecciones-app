import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PartidosAdminComponent } from './partidos-admin/partidos-admin.component';
import { CandidatosAdminComponent } from './candidatos-admin/candidatos-admin.component';
import { EventosAdminComponent } from './eventos-admin/eventos-admin.component';
import { EleccionesAdminComponent } from './elecciones-admin/elecciones-admin.component';
import { SedesAdminComponent } from './sedes-admin/sedes-admin.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'partidos', component: PartidosAdminComponent },
  { path: 'candidatos', component: CandidatosAdminComponent },
  { path: 'eventos', component: EventosAdminComponent },
  { path: 'elecciones', component: EleccionesAdminComponent },
  { path: 'sedes', component: SedesAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
