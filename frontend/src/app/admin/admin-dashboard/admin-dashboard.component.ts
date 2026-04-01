import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../../services/partido.service';
import { EleccionService } from '../../services/eleccion.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {

  stats = {
    partidos: 0,
    elecciones: 0,
    candidatos: 0,
    eventos: 0,
    sedes: 0
  };

  loading = true;

  constructor(
    private partidoService: PartidoService,
    private eleccionService: EleccionService
  ) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.partidoService.getPartidos().subscribe({
      next: (partidos) => {
        this.stats.partidos = partidos.length;
        this.loading = false;
      },
      error: (error) => console.log('Error cargando estadísticas: ', error)
    });

    this.eleccionService.getElecciones().subscribe({
      next: (elecciones) => this.stats.elecciones = elecciones.length
    });
  }
}
