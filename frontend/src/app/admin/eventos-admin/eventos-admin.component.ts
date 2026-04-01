import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventoDetalle } from '../../model/evento.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventoService } from '../../services/evento.service';
import { PartidoService } from '../../services/partido.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventoDialogComponent } from './evento-dialog/evento-dialog.component';

@Component({
  selector: 'app-eventos-admin',
  standalone: false,
  templateUrl: './eventos-admin.component.html',
  styleUrl: './eventos-admin.component.scss',
})
export class EventosAdminComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'fecha', 'lugar', 'partido', 'tipo', 'acciones'];
  dataSource = new MatTableDataSource<EventoDetalle>([]);
  loading = true;
  partidos: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eventoService: EventoService,
    private partidoService: PartidoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarPartidos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarEventos(): void {
    this.loading = true;
    //TODO: Endpoint para listar todos los eventos
    this.dataSource.data = [];
    this.loading = false;
  }

  cargarPartidos(): void {
    this.partidoService.getPartidos().subscribe({
      next: (partidos) => this.partidos = partidos
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialogo(evento?: EventoDetalle): void {
    const dialogoRef = this.dialog.open(EventoDialogComponent, {
      width: '600px',
      data: {evento: evento || null, partidos: this.partidos}
    });

    dialogoRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarEventos();
        this.snackBar.open(
          evento ? 'Evento actualizado correctamente' : 'Evento creado correctamente', 'Cerrar',
          {duration: 3000}
        );
      }
    })
  }

  eliminarEvento(id: number, titulo: string): void {
    if (confirm(`¿Estás seguro de eliminar el evento "${titulo}"?`)) {
      this.eventoService.eleminarEvento(id).subscribe({
        next: () => {
          this.cargarEventos();
          this.snackBar.open('Evento eliminado correctamente', 'Cerrar', {duration: 3000});
        },
        error: (error) => {
          console.error('Error eliminando evento: ', error);
          this.snackBar.open('Error al eliminar evento', 'Cerrar', {duration: 3000});
        }
      });
    }
  }

}
