import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-resultados-grafico',
  standalone: false,
  templateUrl: './resultados-grafico.component.html',
  styleUrl: './resultados-grafico.component.scss',
})
export class ResultadosGraficoComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() anio: number = 2023;
  @Input() municipio: string = 'Oviedo';
  @Input() resultados: any[] = [];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | null = null;

  datosEjemplo: { [key: number]: any[] } = {
    2023: [
      { partido: 'PP', votos: 42000, porcentaje: 38, color: '#1E88E5' },
      { partido: 'PSOE', votos: 35000, porcentaje: 32, color: '#E63946' },
      { partido: 'VOX', votos: 16000, porcentaje: 15, color: '#2E7D32' },
      { partido: 'SUMAR', votos: 11000, porcentaje: 10, color: '#FF9800' },
      { partido: 'OTROS', votos: 5000, porcentaje: 5, color: '#9E9E9E' }
    ],
    2019: [
      { partido: 'PP', votos: 38000, porcentaje: 35, color: '#1E88E5' },
      { partido: 'PSOE', votos: 32000, porcentaje: 30, color: '#E63946' },
      { partido: 'VOX', votos: 19000, porcentaje: 18, color: '#2E7D32' },
      { partido: 'SUMAR', votos: 13000, porcentaje: 12, color: '#FF9800' },
      { partido: 'OTROS', votos: 5000, porcentaje: 5, color: '#9E9E9E' }
    ],
    2015: [
      { partido: 'PP', votos: 43000, porcentaje: 40, color: '#1E88E5' },
      { partido: 'PSOE', votos: 37000, porcentaje: 35, color: '#E63946' },
      { partido: 'VOX', votos: 10000, porcentaje: 10, color: '#2E7D32' },
      { partido: 'SUMAR', votos: 10000, porcentaje: 10, color: '#FF9800' },
      { partido: 'OTROS', votos: 5000, porcentaje: 5, color: '#9E9E9E' }
    ]
  };

  ngOnInit(): void {
    if (!this.resultados || this.resultados.length === 0) {
      this.resultados = this.datosEjemplo[this.anio] || this.datosEjemplo[2023];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anio'] && !changes['anio'].firstChange) {
      this.resultados = this.datosEjemplo[this.anio] || this.datosEjemplo[2023];
      this.actualizarGrafico();
    }
  }

  ngAfterViewInit(): void {
    this.inicializarGrafico();
  }

  inicializarGrafico(): void {
    if (!this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.resultados.map(r => r.partido),
        datasets: [{
          label: 'Porcentaje de votos (%)',
          data: this.resultados.map(r => r.porcentaje),
          backgroundColor: this.resultados.map(r => r.color),
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 8,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { family: 'Murecho', size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw}% (${context.dataset.data[context.dataIndex]}%)`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            title: {
              display: true,
              text: 'Porcentaje (%)',
              font: { family: 'Murecho', size: 12 }
            },
            grid: { color: '#e0e0e0' }
          },
          x: {
            title: {
              display: true,
              text: 'Partidos',
              font: { family: 'Murecho', size: 12 }
            },
            grid: { display: false }
          }
        }
      }
    });
  }

  actualizarGrafico(): void {
    if (this.chart) {
      this.chart.data.labels = this.resultados.map(r => r.partido);
      this.chart.data.datasets[0].data = this.resultados.map(r => r.porcentaje);
      this.chart.data.datasets[0].backgroundColor = this.resultados.map(r => r.color);
      this.chart.update();
    }
  }
}
