import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-resultados-grafico',
  standalone: false,
  templateUrl: './resultados-grafico.html',
  styleUrl: './resultados-grafico.scss',
})
export class ResultadosGrafico implements OnInit, OnChanges {
  @Input() anio: number = 2023;
  @Input() municipio: string = 'Oviedo';

  resultados: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cargarResultados();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anio'] || changes['municipio']) {
      this.cargarResultados();
    }
  }

  cargarResultados(): void {
    //Datos de ejemplo - luego se conectarán con el backend
    if (this.anio === 2023) {
      this.resultados = [
        { partido: 'PP', votos: 35000, porcentaje: 32.5 },
        { partido: 'PSOE', votos: 28000, porcentaje: 26.0 },
        { partido: 'FORO', votos: 15000, porcentaje: 14.0 },
        { partido: 'PODEMOS', votos: 12000, porcentaje: 11.0 },
        { partido: 'VOX', votos: 5000, porcentaje: 4.5 }
      ];
    } else if (this.anio === 2019) {
      this.resultados = [
        { partido: 'PP', votos: 38000, porcentaje: 35.2 },
        { partido: 'PSOE', votos: 26000, porcentaje: 24.0 },
        { partido: 'FORO', votos: 18000, porcentaje: 16.7 },
        { partido: 'PODEMOS', votos: 15000, porcentaje: 13.9 }
      ];
    }
  }
}
