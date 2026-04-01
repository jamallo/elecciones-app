import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sede } from '../../model/sede.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SedeService } from '../../services/sede.service';
import { PartidoService } from '../../services/partido.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SedeDialogComponent } from './sede-dialog/sede-dialog.component';

@Component({
  selector: 'app-sedes-admin',
  standalone: false,
  templateUrl: './sedes-admin.component.html',
  styleUrl: './sedes-admin.component.scss',
})
export class SedesAdminComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'direccion', 'tipo', 'municipio', 'partido', 'acciones'];
  dataSource = new MatTableDataSource<Sede>([]);
  loading = true;
  partidos: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sedeService: SedeService,
    private partidoService: PartidoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarSedes();
    this.cargarPartidos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarSedes(): void {
    this.loading = true;
    //todo: endpoint para listar todas las sedes
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

  abrirDialogo(sede?: Sede): void {
    const dialogoRef = this.dialog.open(SedeDialogComponent, {
      width: '600px',
      data: {sede: sede || null, partidos: this.partidos}
    });

    dialogoRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarSedes();
        this.snackBar.open(
          sede ? 'Sede actualizada correctamente' : 'Sede creada correctamente', 'Cerrar', {duration: 3000}
        );
      }
    });
  }

  eliminarSede(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar la sede "${nombre}"?`)) {
      this.sedeService.eliminarSede(id).subscribe({
        next: () => {
          this.cargarSedes();
          this.snackBar.open('Sede eliminada correctamente', 'Cerrar', {duration: 3000});
        },
        error: (error) => {
          console.error('Error eliminando sede: ', error);
          this.snackBar.open('Error al eliminar sede ', 'Cerrar', {duration: 3000});
        }
      });
    }
  }

}
