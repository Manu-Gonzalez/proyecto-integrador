export type AddItemToCart = {
  productoId: number;
  cantidad: number;
};

export type UpdateCartItem = {
  cantidad: number;
};

export type CartWithItems = {
  id: number;
  usuarioId: number;
  items: CartItemWithProduct[];
  createdAt: Date;
  updatedAt: Date;
};

export type CartItemWithProduct = {
  id: number;
  carritoId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imagen: string | null;
  };
};