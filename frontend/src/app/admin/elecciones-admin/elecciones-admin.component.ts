import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Eleccion } from '../../model/eleccion.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EleccionService } from '../../services/eleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EleccionDialogComponent } from './eleccion-dialog/eleccion-dialog.component';

@Component({
  selector: 'app-elecciones-admin',
  standalone: false,
  templateUrl: './elecciones-admin.component.html',
  styleUrl: './elecciones-admin.component.scss',
})
export class EleccionesAdminComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'ambito', 'anio', 'partidos', 'acciones'];
  dataSource = new MatTableDataSource<Eleccion>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eleccionService: EleccionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarElecciones();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarElecciones(): void {
    this.loading = true;
    this.eleccionService.getElecciones().subscribe({
      next: (elecciones) => {
        this.dataSource.data = elecciones;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando elecciones: ', error);
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialogo(eleccion?: Eleccion): void {
    const dialogoRef = this.dialog.open(EleccionDialogComponent, {
      width: '500px',
      data: eleccion || null
    });

    dialogoRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarElecciones();
        this.snackBar.open(
          eleccion ? 'Elección actualizada correctamente' : 'Elección creada correctamente', 'Cerrar', {duration: 3000}
        );
      }
    });
  }

  eliminarEleccion(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar la elección "${nombre}"?`)) {
      this.eleccionService.eliminarEleccion(id).subscribe({
        next: () => {
          this.cargarElecciones();
          this.snackBar.open('Elección eliminada correctamente', 'Cerrar', {duration: 3000});
        },
        error: (error) => {
          console.error('Error eliminando elección: ', error);
          this.snackBar.open('Error al eliminar elección', 'Cerrar', {duration: 3000});
        }
      });
    }
  }

}
