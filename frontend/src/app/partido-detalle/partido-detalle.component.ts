import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../services/partido.service';
import { CandidatoService } from '../services/candidato.service';
import { EventoService } from '../services/evento.service';
import { SedeService } from '../services/sede.service';
import { TemaService } from '../services/tema.service';
import { PartidoEleccion } from '../model/partido-eleccion.model';
import { CandidatoDetalles } from '../model/candidato.model';
import { EventoDetalle } from '../model/evento.model';
import { SedeMapa } from '../model/sede.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partido-detalle',
  standalone: false,
  templateUrl: './partido-detalle.component.html',
  styleUrls: ['./partido-detalle.component.scss']
})
export class PartidoDetalleComponent implements OnInit {
  partidoEleccionId: number = 0;
  participacion: PartidoEleccion | null = null;
  candidatos: CandidatoDetalles[] = [];
  eventos: EventoDetalle[] = [];
  sedes: SedeMapa[] = [];

  loading: boolean = true;
  mostrarHistoriaCompleta: boolean = false;
  mostrarProgramaCompleto: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partidoService: PartidoService,
    private candidatoService: CandidatoService,
    private eventoService: EventoService,
    private sedeService: SedeService,
    private temaService: TemaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.partidoEleccionId = +params['id'];
      console.log('ID de participación recibido:', this.partidoEleccionId);
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    this.loading = true;

    // Cargar participación completa
    this.partidoService.getParticipacionCompleta(this.partidoEleccionId).subscribe({
      next: (participacion) => {
        console.log('Participación cargada:', participacion);
        console.log('Tipo de elección:', participacion.eleccionTipo);
        console.log('Ámbito:', participacion.eleccionAmbito);
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
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando participación:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarCandidatos(): void {
    this.candidatoService.getCandidatosPorParticipacion(this.partidoEleccionId).subscribe({
      next: (candidatos) => {
        this.candidatos = candidatos;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error cargando candidatos:', error)
    });
    this.cdr.detectChanges();
  }

  cargarEventos(): void {
    this.eventoService.getEventosPorParticipacion(this.partidoEleccionId).subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.loading = false;
        this.cdr.detectChanges();
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
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error cargando sedes:', error)
    });
  }

  verCandidato(id: number): void {
    // Navegar a detalle de candidato
    this.router.navigate(['/candidato', id]);
    console.log('Ver candidato:', id);
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
    this.temaService.resetToNeutral();
  }

  abrirHistoria(): void {
    this.mostrarHistoriaCompleta = true;
    this.cdr.detectChanges();
  }

  abrirPrograma(): void {
    this.mostrarProgramaCompleto = true;
    this.cdr.detectChanges();
  }

  cerrarModal(): void {
    this.mostrarHistoriaCompleta = false;
    this.mostrarProgramaCompleto = false;
    this.cdr.detectChanges();
  }

  handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/partidos/placeholder.png';
}
}
