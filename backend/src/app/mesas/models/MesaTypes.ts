export interface MesaCreate {
  numero: number;
  capacidad: number;
}

export interface MesaUpdate {
  numero?: number;
  capacidad?: number;
  estado?: string;
}