import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

export interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  partido: string;
}

@Component({
  selector: 'app-calendario-eventos',
  standalone: false,
  templateUrl: './calendario-eventos.html',
  styleUrl: './calendario-eventos.scss',
})
export class CalendarioEventos implements OnInit, OnChanges {
  @Input() fecha: string = '';
  @Input() municipio: string = 'Oviedo';

  eventos: Evento[] = [];

  ngOnInit(): void {
    this.cargarEventos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fecha'] || changes['municipio']) {
      this.cargarEventos();
    }
  }

  cargarEventos(): void {
    //Datos de ejemplo
    if (this.fecha) {
      this.eventos = [
        {
          id: 1,
          titulo: 'Mitin del Partido Popular',
          fecha: this.fecha,
          lugar: 'Plaza Mayor',
          partido: 'PP'
        },
        {
          id: 2,
          titulo: 'Rueda de prensa PSOE',
          fecha: this.fecha,
          lugar: 'Hotel de la Reconquista',
          partido: 'PSOE'
        }
      ];
    } else {
      this.eventos = [];
    }
  }

}
