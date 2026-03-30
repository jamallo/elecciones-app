import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PartidoDetalleComponent } from './partido-detalle/partido-detalle.component';
import { CandidatoDetalle } from './candidato-detalle/candidato-detalle';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'partido/:id', component: PartidoDetalleComponent},
  {path: 'candidato/:id', component: CandidatoDetalle},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
