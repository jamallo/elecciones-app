export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora?: string;
  lugar: string;
  tipo: string; //NACIONAL, AUTONÓMICA, MUNICIPAL
  partidoNombre?: string;
  partidoSiglas?: string;
  imagenUrl?: string;
  partidoEleccionId?: number;
}

export interface EventoDetalle extends Evento {
  partidoId: number;
  partidoNombre: string;
  partidoSiglas: string;
  partidoLogoUrl: string;
  eleccionTipo: string; //NACIONAL, AUTONÓMICA, MUNICIPAL
  eleccionAmbito: string; //España, Asturias, Oviedo
}

export type EventoCalendario = EventoDetalle;
