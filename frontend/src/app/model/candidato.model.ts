export interface Candidato {
  id: number;
  nombre: string;
  cargo: string;
  fotoUrl: string;
  biografia: string;
  posicionLista: number;
  partidoEleccionId?: number;
}

export interface CandidatoDetalle extends Candidato {
  partidoId: number;
  partidoNombre: string;
  partidoSiglas: string;
  partidoLogoUrl: string;
  partidoColorPrimario: string;
  eleccionId: number;
  eleccionTipo: string;
  eleccionAmbito: string;
  eleccionAnio: number;
}
