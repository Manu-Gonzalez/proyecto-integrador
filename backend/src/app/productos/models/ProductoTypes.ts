export type ProductoCreate = {
  nombre: string;
  precio: number;
  imagen?: string;
  categoriaId: number;
};

export type ProductoUpdate = {
  nombre?: string;
  precio?: number;
  imagen?: string;
  categoriaId?: number;
};