import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../services/partido.service';
import { CandidatoService } from '../services/candidato.service';
import { EventoService } from '../services/evento.service';
import { SedeService } from '../services/sede.service';
import { TemaService } from '../services/tema.service';
import { PartidoEleccion } from '../model/partido-eleccion.model';
import { CandidatoDetalle } from '../model/candidato.model';
import { EventoDetalle } from '../model/evento.model';
import { SedeMapa } from '../model/sede.model';

@Component({
  selector: 'app-partido-detalle',
  standalone: false,
  templateUrl: './partido-detalle.component.html',
  styleUrls: ['./partido-detalle.component.scss']
})
export class PartidoDetalleComponent implements OnInit {
  partidoEleccionId: number = 0;
  participacion: PartidoEleccion | null = null;
  candidatos: CandidatoDetalle[] = [];
  eventos: EventoDetalle[] = [];
  sedes: SedeMapa[] = [];

  loading: boolean = true;
  mostrarHistoriaCompleta: boolean = false;
  mostrarProgramaCompleto: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private partidoService: PartidoService,
    private candidatoService: CandidatoService,
    private eventoService: EventoService,
    private sedeService: SedeService,
    private temaService: TemaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.partidoEleccionId = +params['id'];
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    this.loading = true;

    // Cargar participación completa
    this.partidoService.getParticipacionCompleta(this.partidoEleccionId).subscribe({
      next: (participacion) => {
        this.participacion = participacion;

        // Cambiar tema según el partido
        this.temaService.setTema({
          colorPrincipal: participacion.partidoColorPrimario,
          colorSecundario: participacion.partidoColorPrimario,
          colorAcento: participacion.partidoColorPrimario,
          colorFondo: '#FFFFFF',
          tipo: 'PARTIDO',
          nombre: participacion.partidoNombre,
          siglas: participacion.partidoSiglas
        });

        this.cargarCandidatos();
        this.cargarEventos();
        this.cargarSedes();
      },
      error: (error) => {
        console.error('Error cargando participación:', error);
        this.loading = false;
      }
    });
  }

  cargarCandidatos(): void {
    this.candidatoService.getCandidatosPorParticipacion(this.partidoEleccionId).subscribe({
      next: (candidatos) => {
        this.candidatos = candidatos;
      },
      error: (error) => console.error('Error cargando candidatos:', error)
    });
  }

  cargarEventos(): void {
    this.eventoService.getEventosPorParticipacion(this.partidoEleccionId).subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando eventos:', error);
        this.loading = false;
      }
    });
  }

  cargarSedes(): void {
    this.sedeService.getSedesPorParticipacion(this.partidoEleccionId).subscribe({
      next: (sedes) => {
        this.sedes = sedes;
      },
      error: (error) => console.error('Error cargando sedes:', error)
    });
  }

  verCandidato(id: number): void {
    // Navegar a detalle de candidato
    console.log('Ver candidato:', id);
  }

  volverAlInicio(): void {
    this.temaService.resetToNeutral();
  }
}
