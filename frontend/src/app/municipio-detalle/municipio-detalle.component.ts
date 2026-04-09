import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Municipio } from '../model/municipio.model';
import { PartidoEleccionResumen } from '../model/partido-eleccion.model';
import { EventoDetalle } from '../model/evento.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EleccionService } from '../services/eleccion.service';
import { PartidoService } from '../services/partido.service';
import { EventoService } from '../services/evento.service';
import { TemaService } from '../services/tema.service';

@Component({
  selector: 'app-municipio-detalle',
  standalone: false,
  templateUrl: './municipio-detalle.component.html',
  styleUrl: './municipio-detalle.component.scss',
})
export class MunicipioDetalleComponent implements OnInit {
  municipioId: number = 0;
  municipio: Municipio | null = null;
  partidos: PartidoEleccionResumen[] = [];
  eventos: EventoDetalle[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eleccionService: EleccionService,
    private partidoService: PartidoService,
    private eventoService: EventoService,
    private temaService: TemaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.municipioId = +params['id'];
      this.cargarMunicipio();
    });
  }

  cargarMunicipio(): void {
    this.loading = true;
    this.eleccionService.gerMunicipio(this.municipioId).subscribe({
      next: (municipio) => {
        this.municipio = municipio;

        //Camiar tema al color del municipio
        this.temaService.setTema({
          colorPrincipal: municipio.colorPrimario,
          colorSecundario: municipio.colorSecundario,
          colorAcento: municipio.colorAcento || municipio.colorSecundario,
          colorFondo: municipio.colorFondo || '#FFFDF7',
          tipo: 'MUNICIPIO',
          nombre: municipio.nombre
        });

        this.cargarPartidos();
        this.cargarEventos();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando municipios: ', error);
        this.loading = false;
      }
    });
  }

  cargarPartidos(): void {
    if (!this.municipio) return;

    this.partidoService.getParticipacionesPorTipoAmbito('MUNICIPAL', this.municipio.nombre).subscribe({
      next: (partidos) => {
        this.partidos = partidos;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error cargando partidos:', error)
    });
  }

  cargarEventos(): void {
    if (!this.municipio) return;

    this.eventoService.getEventosByEleccion('MUNICIPAL', this.municipio.nombre).subscribe({
      next: (eventos) => {
        this.eventos = eventos.slice(0, 5);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error cargando eventos:', error)
    });
  }

  verPartido(partidoId: number): void {
    this.router.navigate(['/partido', partidoId]);
  }

  verEvento(eventoId: number): void {
    this.router.navigate(['/evento', eventoId]);
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
    this.temaService.resetToNeutral();
  }

  getColorPartido(siglas: string): string {
    const colores: { [key: string]: string } = {
      'PP': '#1E88E5',
      'PSOE': '#E63946',
      'VOX': '#2E7D32',
      'SUMAR': '#FF9800',
      'PODEMOS': '#7B1FA2'
    };
    return colores[siglas] || '#6c757d';
  }

}
