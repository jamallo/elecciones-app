import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Partido } from '../../model/partido.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PartidoService } from '../../services/partido.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartidoDialogComponent } from './partido-dialog/partido-dialog.component';

@Component({
  selector: 'app-partidos-admin',
  standalone: false,
  templateUrl: './partidos-admin.component.html',
  styleUrl: './partidos-admin.component.scss',
})
export class PartidosAdminComponent implements OnInit{

  displayedColumns: string[] = ['logo', 'nombre', 'siglas', 'colorPrimario', 'elecciones', 'acciones'];
  dataSource = new MatTableDataSource<Partido>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private partidoServicio: PartidoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarPartidos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarPartidos(): void {
    this.loading = true;
    this.partidoServicio.getPartidos().subscribe({
      next: (partidos) => {
        this.dataSource.data = partidos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando partidos: ', error);
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialogo(partido?: Partido): void {
    const dialogRef = this.dialog.open(PartidoDialogComponent, {
      width: '600px',
      data: partido || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPartidos();
        this.snackBar.open(
          partido ? 'Partido actualizado correctamente' : 'Partido creado correctamente', 'Cerrar',
          {duration: 3000 }
        );
      }
    });
  }

  eliminarPartido(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar el partido "${nombre}"?`)) {
      //TODO: Implementar eliminación en backend
      this.snackBar.open('Funcionalidad en desarrollo', 'Cerrar', {duration: 2000});
    }
  }

}
