import ApiService from './api';

class CategoriasService {
  async getAll() {
    return ApiService.getCategorias();
  }

  async create(categoriaData, token) {
    return ApiService.request('/categorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(categoriaData),
    });
  }

  async update(id, categoriaData, token) {
    return ApiService.request(`/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(categoriaData),
    });
  }

  async delete(id, token) {
    const response = await fetch(`http://localhost:3000/v1/categorias/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Handle both JSON and empty responses
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }
}

export default new CategoriasService();