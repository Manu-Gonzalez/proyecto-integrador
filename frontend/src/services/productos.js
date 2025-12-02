import ApiService from './api';

class ProductosService {
  async getAll() {
    return ApiService.getProductos();
  }

  async create(productData, token) {
    return ApiService.request('/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
  }

  async update(id, productData, token) {
    return ApiService.request(`/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
  }

  async delete(id, token) {
    const response = await fetch(`http://localhost:3000/v1/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }
}

export default new ProductosService();