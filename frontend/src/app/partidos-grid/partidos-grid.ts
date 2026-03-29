import { Component, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

interface Partido {
  id: number;
  nombre: string;
  siglas: string;
  logoUrl: string;
  color: string;
}

@Component({
  selector: 'app-partidos-grid',
  standalone: false,
  templateUrl: './partidos-grid.html',
  styleUrls: ['./partidos-grid.scss']
})
export class PartidosGrid implements OnInit, OnDestroy {
  @Input() partidos: Partido[] = [];

  gridCols: number = 4;
  private resizeObserver: ResizeObserver | null = null;

  ngOnInit() {
    this.updateGridCols();
    // Usar ResizeObserver en lugar de HostListener
    this.resizeObserver = new ResizeObserver(() => {
      this.updateGridCols();
    });
    this.resizeObserver.observe(document.body);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  updateGridCols() {
    const width = window.innerWidth;
    if (width < 768) {
      this.gridCols = 2;
    } else if (width < 1024) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
  }

  getProgressColor(color: string): ThemePalette {
    const colorMap: { [key: string]: ThemePalette } = {
      '#1E88E5': 'primary',
      '#E63946': 'warn',
      '#2E7D32': 'accent',
      '#FF9800': 'accent'
    };
    return colorMap[color] || 'primary';
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder-party.png';
  }
}
