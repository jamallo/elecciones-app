import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { SedeMapa } from '../model/sede.model';

@Component({
  selector: 'app-mapa-sedes',
  standalone: false,
  templateUrl: './mapa-sedes.component.html',
  styleUrls: ['./mapa-sedes.component.scss']
})
export class MapaSedesComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() sedes: SedeMapa[] = [];
  @Input() municipio: string = 'Oviedo';

  private map: any;
  private markers: L.Marker[] = [];
  private mapInitialized: boolean = false;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mapInitialized && changes['sedes']) {
      this.cargarMarcadores();
    }
  }

  initMap(): void {
    // Coordenadas de Oviedo por defecto
    let centro: L.LatLngExpression = [43.3619, -5.8494];

    // Intentar obtener coordenadas del municipio (simplificado)
    if (this.municipio === 'Oviedo') {
      centro = [43.3619, -5.8494];
    } else if (this.municipio === 'Asturias') {
      centro = [43.3619, -5.8494];
    } else if (this.municipio === 'España') {
      centro = [40.4168, -3.7038];
    }

    this.map = L.map('mapa-sedes').setView(centro, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.mapInitialized = true;
    this.cargarMarcadores();
  }

  cargarMarcadores(): void {
    if (!this.mapInitialized) return;

    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    if (this.sedes.length === 0) {
      // Datos de ejemplo
      const sedesEjemplo = [
        { nombre: 'Sede del Partido', direccion: 'Calle Principal', lat: 43.3625, lng: -5.8480, partidoNombre: 'Partido', partidoColorPrimario: '#1E88E5' }
      ];
      this.agregarMarcadores(sedesEjemplo);
    } else {
      this.agregarMarcadores(this.sedes);
    }
  }

  agregarMarcadores(sedes: any[]): void {
    sedes.forEach(sede => {
      const marker = L.marker([sede.latitud || sede.lat, sede.longitud || sede.lng]).addTo(this.map);
      marker.bindPopup(`
        <b>${sede.nombre}</b><br>
        ${sede.direccion}<br>
        <small style="color: ${sede.partidoColorPrimario}">${sede.partidoNombre || 'Sede electoral'}</small>
      `);
      this.markers.push(marker);
    });
  }
}
