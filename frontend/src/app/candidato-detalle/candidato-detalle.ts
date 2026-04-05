import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from '../services/candidato.service';
import { TemaService } from '../services/tema.service';
import { CandidatoDetalles } from '../model/candidato.model';

@Component({
  selector: 'app-candidato-detalle',
  standalone: false,
  templateUrl: './candidato-detalle.html',
  styleUrl: './candidato-detalle.scss',
})
export class CandidatoDetalle implements OnInit {
  candidatoId: number = 0;
  candidato: CandidatoDetalles | null = null;
  loading: boolean = true;
  mostrarBiografiaCompleta: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatoService: CandidatoService,
    private temaService: TemaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.candidatoId = +params['id'];
      this.cargarCandidato();
      console.log('Candidato ID: ', this.candidatoId);
    });
  }

  cargarCandidato(): void {
    this.loading = true;
    this.candidatoService.getCandidato(this.candidatoId).subscribe({
      next: (candidato) => {
        this.candidato = candidato;
        this.loading = false;
        this.cdr.detectChanges();

        //Cambiar tema según el partido del candidato
        if (candidato.partidoColorPrimario) {
          this.temaService.setTema({
            colorPrincipal: candidato.partidoColorPrimario,
            colorSecundario: candidato.partidoColorPrimario,
            colorAcento: candidato.partidoColorPrimario,
            colorFondo: '#FFFFFF',
            tipo: 'CANDIDATO',
            nombre: candidato.partidoNombre,
            siglas: candidato.partidoSiglas
          });
        }
      },
      error: (error) => {
        console.error('Error cargando candidato: ', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  volverAlPartido(): void {
    if (this.candidato?.partidoId) {
      this.router.navigate(['/partido', this.candidato.partidoId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
    this.temaService.resetToNeutral;
  }

  abrirBiografiaCompleta(): void {
    this.mostrarBiografiaCompleta = true;
    this.cdr.detectChanges();
  }

  cerrarModal(): void {
    this.mostrarBiografiaCompleta = false;
    this.cdr.detectChanges();
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/candidatos/placeholder.png'
  }

}
