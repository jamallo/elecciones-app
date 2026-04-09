import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPartidos();
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  cargarPartidos(): void {
    this.loading = true;
    this.partidoServicio.getPartidos().subscribe({
      next: (partidos) => {
        this.dataSource.data = partidos;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando partidos: ', error);
        this.snackBar.open('Error al cargar partidos', 'Cerrar', {duration: 3000});
        this.loading = false;
      }
    });
    this.cdr.detectChanges();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();
  }

  eliminarPartido(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar el partido "${nombre}"?`)) {
      this.partidoServicio.eliminarPartido(id).subscribe({
        next: () => {
          this.cargarPartidos();
          this.snackBar.open('Partido eliminado correctamente', 'Cerrar', {duration: 3000});
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error eliminando partido: ', error);
          this.snackBar.open(error.error?.mensaje || 'Error al eliminar partido', 'Cerrar', {duration: 3000 });
        }
      });
    }
    this.cdr.detectChanges();
  }

}
