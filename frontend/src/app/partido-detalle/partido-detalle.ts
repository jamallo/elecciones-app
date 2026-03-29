import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PartidoService } from '../services/partido.service';

@Component({
  selector: 'app-partido-detalle',
  standalone: false,
  templateUrl: './partido-detalle.html',
  styleUrl: './partido-detalle.scss',
})
export class PartidoDetalle implements OnInit{

  partidoId: number | null = null;
  partido: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private partidoService: PartidoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.partidoId = +params['id'];
      this.cargarPartido();
    });
  }

  cargarPartido(): void {
    if (this.partidoId) {
      this.partidoService.getPartido(this.partidoId).subscribe({
        next: (data) => {
          this.partido = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando partido: ', error);
        }
      });
    }
  }

}
