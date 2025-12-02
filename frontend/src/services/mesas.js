import ApiService from './api';

class MesasService {
    static async getAll() {
        return await ApiService.get('/mesas');
    }

    static async create(mesaData, token) {
        return await ApiService.post('/mesas', mesaData, {
            'Authorization': `Bearer ${token}`
        });
    }

    static async update(id, mesaData, token) {
        return await ApiService.put(`/mesas/${id}`, mesaData, {
            'Authorization': `Bearer ${token}`
        });
    }

    static async delete(id, token) {
        return await ApiService.delete(`/mesas/${id}`, {
            'Authorization': `Bearer ${token}`
        });
    }
}

export default MesasService;