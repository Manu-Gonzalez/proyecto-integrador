import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }]
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case 'CLEAR_CART':
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const addToCart = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getTotalPrice = () => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            items: state.items,
            addToCart,
            removeFromCart,
            clearCart,
            getTotalPrice,
            getTotalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};