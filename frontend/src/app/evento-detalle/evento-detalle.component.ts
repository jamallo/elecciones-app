import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventoDetalle } from '../model/evento.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../services/evento.service';
import { TemaService } from '../services/tema.service';
import { PartidoService } from '../services/partido.service';

@Component({
  selector: 'app-evento-detalle',
  standalone: false,
  templateUrl: './evento-detalle.component.html',
  styleUrl: './evento-detalle.component.scss',
})
export class EventoDetalleComponent implements OnInit {

  eventoId: number = 0;
  evento: EventoDetalle | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private partidoService: PartidoService,
    private temaService: TemaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventoId = +params['id'];
      this.cargarEvento();
    });
  }

  cargarEvento(): void {
    this.loading = true;
    this.eventoService.getEventoById(this.eventoId).subscribe({
      next: (evento) => {
        this.evento = evento;
        this.loading = false;
        this.cdr.detectChanges();

        // Cambiar tema según el partido del evento
        if (evento.partidoId) {
          this.partidoService.getPartido(evento.partidoId).subscribe({
            next: (partido) => {
              this.temaService.setTema({
              colorPrincipal: partido.colorPrimario,
              colorSecundario: partido.colorSecundario,
              colorAcento: partido.colorAcento || partido.colorPrimario,
              colorFondo: '#FFFFFF',
              tipo: 'PARTIDO',
              nombre: partido.nombre,
              siglas: partido.siglas
            });
          },
          error: (error) => console.error('Error cargando tema del partido:', error)
          });
        }
      },
      error: (error) => {
        console.error('Error cargando evento:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
    this.temaService.resetToNeutral;
  }

}
