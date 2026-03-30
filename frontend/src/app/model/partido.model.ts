export interface Partido {
  id: number;
  nombre: string;
  siglas: string;
  logoUrl: string;
  colorPrimario: string;
  colorSecundario: string;
  colorAcento?: string;
  colorFondo?: string;
}

export interface PartidoDetalle extends Partido {
  informacion?: InformacionPartido;
}

export interface PartidoResumen {
  id: number;
  nombre: string;
  siglas: string;
  logoUrl: string;
  colorPrimario: string;
  colorSecundario: string;
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
