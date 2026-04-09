import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CandidatoDetalles } from '../../model/candidato.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CandidatoService } from '../../services/candidato.service';
import { PartidoService } from '../../services/partido.service';
import { EleccionService } from '../../services/eleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidatoDialogComponent } from './candidato-dialog/candidato-dialog.component';

@Component({
  selector: 'app-candidatos-admin',
  standalone: false,
  templateUrl: './candidatos-admin.component.html',
  styleUrl: './candidatos-admin.component.scss',
})
export class CandidatosAdminComponent implements OnInit {
  displayedColumns: string [] = ['foto', 'nombre', 'cargo', 'partido', 'eleccion', 'posicion', 'acciones'];
  dataSource = new MatTableDataSource<CandidatoDetalles>([]);
  loading = true;
  partidos: any[] = [];
  elecciones: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private candidatoService: CandidatoService,
    private partidoService: PartidoService,
    private eleccionService: EleccionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCandidatos();
    this.cargarPartidos();
    this.cargarElecciones();
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  cargarCandidatos(): void {
    this.loading = true;
    this.candidatoService.listarTodos().subscribe({
      next: (candidatos) => {
        this.dataSource.data = candidatos;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando candidatos: ', error);
        this.loading = false;
      }
    });
  }

  cargarPartidos(): void {
    this.partidoService.getPartidos().subscribe({
      next: (partidos) => this.partidos = partidos
    });
  }

  cargarElecciones(): void {
    this.eleccionService.getElecciones().subscribe({
      next: (elecciones) => this.elecciones = elecciones
    });
    this.cdr.detectChanges();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.cdr.detectChanges();
  }

  abrirDialogo(candidato?: CandidatoDetalles): void {
    const dialogoRef = this.dialog.open(CandidatoDialogComponent, {
      width: '600px',
      data: {candidato: candidato || null, partidos: this.partidos, elecciones: this.elecciones}
    });

    dialogoRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarCandidatos();
        this.snackBar.open(
          candidato ? 'Candidato actualizado correctamente': 'Candidato creado correctamente', 'Cerrar',
          {duration: 3000}
        );
        this.cdr.detectChanges();
      }
    });
  }

  eliminarCandidato(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar al candidato "${nombre}"?`)) {
      this.candidatoService.eliminarCandidato(id).subscribe({
        next: () => {
          this.cargarCandidatos();
          this.snackBar.open('Candidato eliminado correctamente', 'Cerrar', {duration: 3000});
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error eliminando candidato: ', error);
          this.snackBar.open('Error al eliminar candidato', 'Cerrar', {duration: 3000});
        }
      });
    }
  }

}
