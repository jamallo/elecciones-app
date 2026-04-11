import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './home/home.component';

import { PartidosGrid } from './partidos-grid/partidos-grid';
import { CandidatoDetalle } from './candidato-detalle/candidato-detalle';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartidoDetalleComponent } from './partido-detalle/partido-detalle.component';
import { MapaSedesComponent } from './mapa-sedes/mapa-sedes.component';
import { ResultadosGraficoComponent } from './resultados-grafico/resultados-grafico.component';
import { CalendarioEventosComponent } from './calendario-eventos/calendario-eventos.component';
import { LoginComponent } from './login/login.component';
import { MapaEspaniaComponent } from './mapa-espania/mapa-espania.component';

//Anguar Material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Servicios
import { EleccionService } from './services/eleccion.service';
import { PartidoService } from './services/partido.service';
import { AuthService } from './services/auth.service';
import { TemaService } from './services/tema.service';
import { CandidatoService } from './services/candidato.service';
import { EventoService } from './services/evento.service';
import { SedeService } from './services/sede.service';

//Interceptor
import { authInterceptor } from './core/interceptors/auth-interceptor';
//Iconos Lucide
import {
  LucideAngularModule,
  Home,
  Map,
  BarChart3,
  Calendar,
  Users,
  Vote,
  Globe,
  Building2,
  Building,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Search,
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  Shield,
  Settings,
  AlertCircle,
  RefreshCw,
  CalendarX,
  MapPin,
  Mic2,
  ArrowLeft,
  History,
  FileText, CalendarDays,
  BookOpen,
  FileCheck,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Flag,
  MessageSquare,
  Table,
  TrendingUp,
  Sun,
  Moon,
  SearchX,
  Edit,
  Trash,
  FileSpreadsheet,
  GitCompare,

 } from 'lucide-angular';
import { CalendarioCompletoComponent } from './calendario-completo/calendario-completo.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { BusquedaService } from './services/busqueda.service';
import { ResultadoService } from './services/resultado.service';
import { EventoDetalleComponent } from './evento-detalle/evento-detalle.component';
import { MunicipioDetalleComponent } from './municipio-detalle/municipio-detalle.component';
import { AdminModule } from './admin/admin-module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment.prod';
import { MatTableModule } from '@angular/material/table';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SkeletonLoaderComponent } from './shared/skeleton-loader/skeleton-loader.component';


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
    LoginComponent,
    MapaEspaniaComponent,
    CalendarioCompletoComponent,
    ResultadosComponent,
    BuscadorComponent,
    EventoDetalleComponent,
    MunicipioDetalleComponent,
    LoadingSpinnerComponent,
    SkeletonLoaderComponent,
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
    MatMenuModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    AdminModule,
    MatTableModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: false//environment.production,
      //registrationStrategy: 'registerWhenStable: 30000'
    }),
    LucideAngularModule.pick({
      Home,
      Map,
      BarChart3,
      Calendar,
      Users,
      Vote,
      Globe,
      Building2,
      Building,
      Phone,
      Mail,
      ExternalLink,
      ChevronDown,
      ChevronUp,
      Plus,
      Minus,
      Search,
      Menu,
      X,
      User,
      LogIn,
      LogOut,
      Shield,
      Settings,
      AlertCircle,
      RefreshCw,
      CalendarX,
      MapPin,
      Mic2,
      ArrowLeft,
      History,
      FileText,
      CalendarDays,
      BookOpen,
      FileCheck,
      CalendarClock,
      ChevronLeft,
      ChevronRight,
      Flag,
      MessageSquare,
      Table,
      TrendingUp,
      Sun,
      Moon,
      SearchX,
      Edit,
      Trash,
      FileSpreadsheet,
      GitCompare
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    //provideAnimationsAsync(),
    EleccionService,
    PartidoService,
    AuthService,
    TemaService,
    CandidatoService,
    EventoService,
    SedeService,
    BusquedaService,
    ResultadoService

  ],
  bootstrap: [App]
})
export class AppModule { }
