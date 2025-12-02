import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import PedidosService from '../services/pedidos';
import AuthService from '../services/auth';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [tableInfo, setTableInfo] = useState({
    tableNumber: null,
    diners: 1
  });

  const addToCart = (product) => {
    const currentTotal = items.reduce((total, item) => total + item.quantity, 0);
    const maxItems = getMaxItems();
    
    if (currentTotal >= maxItems) {
      toast.error(`Máximo ${maxItems} productos para ${tableInfo.diners} comensal${tableInfo.diners > 1 ? 'es' : ''}`);
      return;
    }
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    toast.success(`${product.nombre} agregado al carrito`);
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const setTable = (tableNumber, diners) => {
    setTableInfo({ tableNumber, diners });
  };

  const getMaxItems = () => {
    return tableInfo.diners * 4; // 4 items per diner
  };

  const canAddMore = () => {
    return getTotalItems() < getMaxItems();
  };

  const checkout = async () => {
    if (!tableInfo.tableNumber || items.length === 0) {
      toast.error('Selecciona una mesa y agrega productos');
      return false;
    }

    try {
      const orderData = {
        items: items,
        mesaId: tableInfo.tableNumber,
        total: getTotalPrice()
      };

      console.log('Sending order data:', orderData);
      const response = await fetch('http://localhost:3000/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Order created:', result);
      
      // Clear cart after successful order
      setItems([]);
      setTableInfo({ tableNumber: null, diners: 1 });
      
      toast.success('¡Pedido realizado con éxito!');
      return true;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error al realizar el pedido: ' + error.message);
      return false;
    }
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    tableInfo,
    setTable,
    getMaxItems,
    canAddMore,
    checkout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};