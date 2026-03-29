import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-sedes',
  standalone: false,
  templateUrl: './mapa-sedes.html',
  styleUrl: './mapa-sedes.scss',
})
export class MapaSedes implements OnInit, AfterViewInit, OnChanges {
  @Input() municipio: string= 'Oviedo';
  @Input() sedes: any[] = [];

  private map: any;
  private Markers: L.Marker[] = [];

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && (changes['municipio'] || changes['sedes'])) {
      this.cargarMarcadores();
    }
  }

  initMap(): void {
    // Coordenadas de Oviedo
    const oviedoCoords: L.LatLngExpression = [43.3619, -5.8494];

    this.map = L.map('mapa-sedes').setView(oviedoCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.cargarMarcadores();
  }

  cargarMarcadores(): void {
    // Limpiar marcadores existentes
    this.Markers.forEach(marker => marker.remove());
    this.Markers = [];

    // Datos de ejemplo - sedes de partidos
    const sedesEjemplo = [
      { nombre: 'Sede del PP', direccion: 'Calle Uría 12', lat: 43.3625, lng: -5.8480, tipo: 'PP' },
      { nombre: 'Sede del PSOE', direccion: 'Calle Independencia 5', lat: 43.3610, lng: -5.8510, tipo: 'PSOE' },
      { nombre: 'Colegio La Corredoria', direccion: 'Calle de los Prados', lat: 43.3720, lng: -5.8380, tipo: 'colegio' }
    ];

    const datosMostrar = this.sedes.length > 0 ? this.sedes : sedesEjemplo;

    datosMostrar.forEach((sede: any) => {
      const marker = L.marker([sede.lat, sede.lng]).addTo(this.map);
      marker.bindPopup(`<b>${sede.nombre}</b><br>${sede.direccion}`);
      this.Markers.push(marker);
    });
  }
}
