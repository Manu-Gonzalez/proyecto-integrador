import { CategoriaRepository } from "./repositories/CategoriaRepository";
import { CategoriaCreate } from "./models/CategoriaTypes";

export class CategoriaService {
    constructor(private readonly categoriaRepository: CategoriaRepository) {}

    async getAll() {
        return await this.categoriaRepository.getAll();
    }

    async getById(id: number) {
        return await this.categoriaRepository.getById(id);
    }

    async create(data: CategoriaCreate) {
        return await this.categoriaRepository.create(data);
    }

    async update(id: number, data: CategoriaCreate) {
        return await this.categoriaRepository.update(id, data);
    }

    async delete(id: number) {
        return await this.categoriaRepository.delete(id);
    }
}