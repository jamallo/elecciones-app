export interface Partido {
  id: number;
  nombre: string;
  siglas: string;
  logoUrl: string;
  color?: string;
  colorPrimario: string;
  colorSecundario: string;
  colorAcento?: string;
  colorFondo?: string;
  eleccionId?: number;
}

export interface PartidoDetalle extends Partido {
  informacion?: InformacionPartido;
}

export interface InformacionPartido {
  historiaResumen: string;
  historiaCompleta: string;
  programaResumen: string;
  programaCompleto: string;
  emailContacto: string;
  telefonoContacto: string;
  webUrl: string;
}
