export type ProductoCreate = {
  nombre: string;
  precio: number;
  imagen?: string;
  tipo?: string;
  categoriaId: number;
};

export type ProductoUpdate = {
  nombre?: string;
  precio?: number;
  imagen?: string;
  tipo?: string;
  categoriaId?: number;
};