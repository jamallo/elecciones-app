import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PartidoService } from '../../services/partido.service';
import { EleccionService } from '../../services/eleccion.service';
import { CandidatoService } from '../../services/candidato.service';
import { EventoService } from '../../services/evento.service';
import { SedeService } from '../../services/sede.service';

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
    private eleccionService: EleccionService,
    private candidatoService: CandidatoService,
    private eventoService: EventoService,
    private sedeService: SedeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
    this.cdr.detectChanges();
  }

  cargarEstadisticas(): void {
    // Cargar partidos
    this.partidoService.getPartidos().subscribe({
      next: (partidos) => {
        this.stats.partidos = partidos.length;
        this.verificarCarga();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => console.log('Error cargando estadísticas: ', error)
    });

    // Cargar elecciones
    this.eleccionService.getElecciones().subscribe({
      next: (elecciones) => {
        this.stats.elecciones = elecciones.length
        this.verificarCarga();
        this.cdr.detectChanges();
      }
    });

    // Cargar candidatos
    this.candidatoService.listarTodos().subscribe({
      next: (candidatos) => {
        this.stats.candidatos = candidatos.length;
        this.verificarCarga();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando candidatos:', error);
        this.verificarCarga();
        this.cdr.detectChanges();
      }
    });

    // Cargar eventos
    this.eventoService.listartodos().subscribe({
      next: (eventos) => {
        this.stats.eventos = eventos.length;
        this.verificarCarga();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando eventos:', error);
        this.verificarCarga();
        this.cdr.detectChanges();
      }
    });

    // Cargar sedes
    this.sedeService.listarTodas().subscribe({
      next: (sedes) => {
        this.stats.sedes = sedes.length;
        this.verificarCarga();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando sedes:', error);
        this.verificarCarga();
        this.cdr.detectChanges();
      }
    });
  }

  private contadorCargas = 0;

  private verificarCarga(): void {
    this.contadorCargas++;
    if (this.contadorCargas === 5) {
      this.loading = false;
    }
  }

}
