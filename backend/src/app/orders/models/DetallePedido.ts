export class DetallePedido {
  constructor(
    public readonly id: number,
    public readonly pedidoId: number,
    public readonly productoId: number,
    public readonly cantidad: number,
    public readonly subtotal: number
  ) { }
}