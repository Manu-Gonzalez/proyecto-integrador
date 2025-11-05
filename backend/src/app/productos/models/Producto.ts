export class Producto {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly precio: number,
    public readonly imagen: string | null,
    public readonly categoriaId: number
  ) { }

  calcularSubtotal(cantidad: number): number {
    return this.precio * cantidad;
  }

  tieneImagen(): boolean {
    return this.imagen !== null && this.imagen.length > 0;
  }
}