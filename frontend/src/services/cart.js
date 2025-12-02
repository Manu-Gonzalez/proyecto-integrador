import ApiService from './api';
import AuthService from './auth';

class CartService {
  async getCart() {
    const token = AuthService.getToken();
    if (!token) throw new Error('No authenticated');
    
    try {
      return await ApiService.getCart(token);
    } catch (error) {
      throw error;
    }
  }

  async addToCart(productoId, cantidad = 1) {
    const token = AuthService.getToken();
    if (!token) throw new Error('No authenticated');
    
    try {
      return await ApiService.addToCart({ productoId, cantidad }, token);
    } catch (error) {
      throw error;
    }
  }

  async updateCartItem(itemId, cantidad) {
    const token = AuthService.getToken();
    if (!token) throw new Error('No authenticated');
    
    try {
      return await ApiService.request(`/cart/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cantidad }),
      });
    } catch (error) {
      throw error;
    }
  }

  async removeFromCart(itemId) {
    const token = AuthService.getToken();
    if (!token) throw new Error('No authenticated');
    
    try {
      return await ApiService.request(`/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async clearCart() {
    const token = AuthService.getToken();
    if (!token) throw new Error('No authenticated');
    
    try {
      return await ApiService.request('/cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new CartService();