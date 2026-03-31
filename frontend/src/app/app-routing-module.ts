import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PartidoDetalleComponent } from './partido-detalle/partido-detalle.component';
import { CandidatoDetalle } from './candidato-detalle/candidato-detalle';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'partido/:id', component: PartidoDetalleComponent},
  {path: 'login', component: LoginComponent},
  //{path: 'registro', component: RegistroComponet},
  {path: 'candidato/:id', component: CandidatoDetalle},
  //{path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [adminGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
