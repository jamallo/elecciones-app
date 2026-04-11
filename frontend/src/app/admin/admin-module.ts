import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PartidosAdminComponent } from './partidos-admin/partidos-admin.component';
import { CandidatosAdminComponent } from './candidatos-admin/candidatos-admin.component';
import { EventosAdminComponent } from './eventos-admin/eventos-admin.component';
import { EleccionesAdminComponent } from './elecciones-admin/elecciones-admin.component';
import { SedesAdminComponent } from './sedes-admin/sedes-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PartidoDialogComponent } from './partidos-admin/partido-dialog/partido-dialog.component';
import { CandidatoDialogComponent } from './candidatos-admin/candidato-dialog/candidato-dialog.component';
import { EventoDialogComponent } from './eventos-admin/evento-dialog/evento-dialog.component';
import { EleccionDialogComponent } from './elecciones-admin/eleccion-dialog/eleccion-dialog.component';
import { SedeDialogComponent } from './sedes-admin/sede-dialog/sede-dialog.component';
import { Calendar, CalendarPlus, Edit, Edit2, LucideAngularModule, MapPin, Plus, PlusCircle, Search, Trash, Trash2, User, UserPlus, Users, Vote } from 'lucide-angular';




@NgModule({
  declarations: [
    AdminDashboardComponent,
    PartidosAdminComponent,
    CandidatosAdminComponent,
    EventosAdminComponent,
    EleccionesAdminComponent,
    SedesAdminComponent,
    PartidoDialogComponent,
    CandidatoDialogComponent,
    EventoDialogComponent,
    EleccionDialogComponent,
    SedeDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    LucideAngularModule.pick({
      Trash,
      Plus,
      Edit,
      Users,
      Vote,
      User,
      Calendar,
      MapPin,
      UserPlus,
      CalendarPlus,
      Search,
      PlusCircle,
      Edit2,
      Trash2
    })
  ]
})
export class AdminModule { }
