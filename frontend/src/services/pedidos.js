import ApiService from './api';

class PedidosService {
  async create(pedidoData, token) {
    return ApiService.createPedido(pedidoData, token);
  }

  async getAll(token) {
    return ApiService.request('/pedidos', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

export default new PedidosService();