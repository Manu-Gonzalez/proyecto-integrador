const API_BASE_URL = 'http://localhost:3000/v1';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Generic CRUD methods
  async get(endpoint, headers = {}) {
    return this.request(endpoint, { headers });
  }

  async post(endpoint, data, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, headers = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      headers,
    });
  }

  // Productos
  async getProductos() {
    return this.request('/productos');
  }

  // Categorías
  async getCategorias() {
    return this.request('/categorias');
  }

  // Mesas
  async getMesas() {
    return this.request('/mesas');
  }

  // Pedidos
  async createPedido(pedidoData, token) {
    return this.request('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(pedidoData),
    });
  }

  // Usuarios
  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Carrito
  async getCart(token) {
    return this.request('/cart', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async addToCart(productData, token) {
    return this.request('/cart/items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
  }

  // Pedidos
  async createOrder(orderData, token) {
    return this.request('/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
  }
}

export default new ApiService();