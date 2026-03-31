import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './home/home.component';

import { PartidosGrid } from './partidos-grid/partidos-grid';
import { CandidatoDetalle } from './candidato-detalle/candidato-detalle';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//Anguar Material
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { PartidoDetalleComponent } from './partido-detalle/partido-detalle.component';
import { MapaSedesComponent } from './mapa-sedes/mapa-sedes.component';
import { ResultadosGraficoComponent } from './resultados-grafico/resultados-grafico.component';
import { CalendarioEventosComponent } from './calendario-eventos/calendario-eventos.component';
import { EleccionService } from './services/eleccion.service';
import { PartidoService } from './services/partido.service';
import { AuthService } from './services/auth.service';
import { TemaService } from './services/tema.service';
import { CandidatoService } from './services/candidato.service';
import { EventoService } from './services/evento.service';
import { SedeService } from './services/sede.service';
import { LoginComponent } from './login/login.component';
import { authInterceptor } from './core/interceptors/auth-interceptor';


@NgModule({
  declarations: [
    App,
    HomeComponent,
    PartidosGrid,
    CandidatoDetalle,
    PartidoDetalleComponent,
    MapaSedesComponent,
    ResultadosGraficoComponent,
    CalendarioEventosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //Angular Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    EleccionService,
    PartidoService,
    AuthService,
    TemaService,
    CandidatoService,
    EventoService,
    SedeService
  ],
  bootstrap: [App]
})
export class AppModule { }
