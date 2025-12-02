import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import BtnPrimary from './Btn-primary';
import BtnSecondary from './Btn-secondary';
import TableModal from './TableModal';
import styles from './CartSidebar.module.css';

const CartSidebar = ({ isOpen, onClose }) => {
    const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, tableInfo, getMaxItems, checkout } = useCart();
    const [showTableModal, setShowTableModal] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleIncrement = (productId, currentQuantity) => {
        const maxItems = getMaxItems();
        if (getTotalItems() < maxItems) {
            updateQuantity(productId, currentQuantity + 1);
        } else {
            toast.error(`Máximo ${maxItems} productos para ${tableInfo.diners} comensal${tableInfo.diners > 1 ? 'es' : ''}`);
        }
    };

    const handleDecrement = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateQuantity(productId, currentQuantity - 1);
        } else {
            removeFromCart(productId);
        }
    };

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        const success = await checkout();
        if (success) {
            onClose();
        }
        setIsCheckingOut(false);
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999
                    }}
                    onClick={onClose}
                />
            )}
            
            {/* Sidebar */}
            <div className={`${styles['cart-sidebar']} ${isOpen ? styles.open : ''}`}>
                {/* Header */}
                <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2><b>Carrito ({getTotalItems()}/{getMaxItems()})</b></h2>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Table Info */}
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    {tableInfo.tableNumber ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p><b>Mesa {tableInfo.tableNumber}</b></p>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                    {tableInfo.diners} comensal{tableInfo.diners > 1 ? 'es' : ''}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowTableModal(true)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'var(--color-primario)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Cambiar
                            </button>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>Configura tu mesa</p>
                            <button
                                onClick={() => setShowTableModal(true)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'var(--color-primario)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Seleccionar Mesa
                            </button>
                        </div>
                    )}
                </div>

                {/* Items */}
                <div style={{
                    flex: 1,
                    padding: '1rem',
                    overflowY: 'auto'
                }}>
                    {items.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#6b7280' }}>
                            Tu carrito está vacío
                        </p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem 0',
                                borderBottom: '1px solid #f3f4f6'
                            }}>
                                {item.imagen && (
                                    <img 
                                        src={item.imagen} 
                                        alt={item.nombre}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            objectFit: 'contain',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                )}
                                <div style={{ flex: 1 }}>
                                    <h4><b>{item.nombre}</b></h4>
                                    <p style={{ color: 'var(--color-primario)' }}>
                                        <b>${item.precio}</b>
                                    </p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <button
                                        onClick={() => handleDecrement(item.id, item.quantity)}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            border: '1px solid var(--color-primario)',
                                            backgroundColor: 'white',
                                            color: 'var(--color-primario)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        -
                                    </button>
                                    <span style={{ minWidth: '20px', textAlign: 'center' }}>
                                        <b>{item.quantity}</b>
                                    </span>
                                    <button
                                        onClick={() => handleIncrement(item.id, item.quantity)}
                                        disabled={getTotalItems() >= getMaxItems()}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            border: '1px solid var(--color-primario)',
                                            backgroundColor: getTotalItems() >= getMaxItems() ? '#f3f4f6' : 'var(--color-primario)',
                                            color: getTotalItems() >= getMaxItems() ? '#9ca3af' : 'white',
                                            cursor: getTotalItems() >= getMaxItems() ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div style={{
                        padding: '1rem',
                        borderTop: '1px solid #e5e7eb'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                        }}>
                            <span><b>Total:</b></span>
                            <span><b>${getTotalPrice().toFixed(2)}</b></span>
                        </div>
                        <BtnPrimary 
                            onClick={handleCheckout}
                            disabled={!tableInfo.tableNumber || isCheckingOut}
                            style={{ 
                                width: '100%',
                                opacity: (!tableInfo.tableNumber || isCheckingOut) ? 0.5 : 1
                            }}
                        >
                            {isCheckingOut ? 'Procesando...' : 'Realizar Pedido'}
                        </BtnPrimary>
                    </div>
                )}
            </div>
            <TableModal 
                isOpen={showTableModal} 
                onClose={() => setShowTableModal(false)} 
            />
        </>
    );
};

export default CartSidebar;