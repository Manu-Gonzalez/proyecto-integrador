export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado'
}

export class Pedido {
  constructor(
    public readonly id: number,
    public readonly fecha: Date,
    public readonly estado: EstadoPedido,
    public readonly total: number,
    public readonly usuarioId: number
  ) { }

  isPendiente(): boolean {
    return this.estado === EstadoPedido.PENDIENTE;
  }

  isEntregado(): boolean {
    return this.estado === EstadoPedido.ENTREGADO;
  }
}
