export class Carrito {
  constructor(
    public readonly id: number,
    public readonly usuarioId: number,
    public readonly items: ItemCarrito[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.subtotal, 0);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.cantidad, 0);
  }
}

export class ItemCarrito {
  constructor(
    public readonly id: number,
    public readonly carritoId: number,
    public readonly productoId: number,
    public readonly cantidad: number,
    public readonly precioUnitario: number,
    public readonly subtotal: number
  ) {}

  actualizarCantidad(nuevaCantidad: number): ItemCarrito {
    const nuevoSubtotal = nuevaCantidad * this.precioUnitario;
    return new ItemCarrito(
      this.id,
      this.carritoId,
      this.productoId,
      nuevaCantidad,
      this.precioUnitario,
      nuevoSubtotal
    );
  }
}