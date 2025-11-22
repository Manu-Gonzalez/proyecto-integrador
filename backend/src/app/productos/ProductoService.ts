import { ProductoRepository } from "./repositories/ProductoRepository";
import { ProductoCreate, ProductoUpdate } from "./models/ProductoTypes";

export class ProductoService {
    constructor(private readonly productoRepository: ProductoRepository) {}

    async getAll() {
        return await this.productoRepository.getAll();
    }

    async getById(id: number) {
        return await this.productoRepository.getById(id);
    }

    async getByCategoria(categoriaId: number) {
        return await this.productoRepository.getByCategoria(categoriaId);
    }

    async create(data: ProductoCreate) {
        return await this.productoRepository.create(data);
    }

    async update(id: number, data: ProductoUpdate) {
        return await this.productoRepository.update(id, data);
    }

    async delete(id: number) {
        return await this.productoRepository.delete(id);
    }
}