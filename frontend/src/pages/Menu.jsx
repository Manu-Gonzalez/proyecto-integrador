import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { menuData, categories } from '../data/menuData';
import { useCart } from '../context/CartContext';

function Menu() {
    const [searchParams] = useSearchParams();
    const [filteredItems, setFilteredItems] = useState(menuData);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { addToCart, items, getTotalPrice, clearCart } = useCart();

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setSelectedCategory(category);
            setFilteredItems(menuData.filter(item => item.category === category));
        } else {
            setFilteredItems(menuData);
        }
    }, [searchParams]);

    const handleAddToCart = (item) => {
        addToCart(item);
        toast.success('¡Producto añadido al carrito!');
    };

    const handleCategoryFilter = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === '') {
            setFilteredItems(menuData);
        } else {
            setFilteredItems(menuData.filter(item => item.category === categoryId));
        }
    };

    const handleCheckout = () => {
        if (items.length === 0) {
            toast.error('El carrito está vacío');
            return;
        }

        Swal.fire({
            title: '¿Confirmar compra?',
            html: `
                <div style="text-align: left;">
                    ${items.map(item => `
                        <div style="margin-bottom: 10px;">
                            <strong>${item.name}</strong> x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
                        </div>
                    `).join('')}
                    <hr style="margin: 15px 0;">
                    <div style="font-size: 18px; font-weight: bold;">
                        Total: $${getTotalPrice().toFixed(2)}
                    </div>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire('¡Compra realizada!', 'Gracias por tu pedido', 'success');
            }
        });
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Todos los productos';
    };

    return (
        <div className="container py-6">
            <h1 className="text-center text-3xl my-4">
                {selectedCategory ? getCategoryName(selectedCategory) : 'Menú Completo'}
            </h1>
            
            <div className="d-flex justify-center gap-3 mb-6">
                <button 
                    className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleCategoryFilter('')}
                >
                    Todos
                </button>
                {categories.map(category => (
                    <button 
                        key={category.id}
                        className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleCategoryFilter(category.id)}
                    >
                        {category.icon} {category.name}
                    </button>
                ))}
            </div>



            <div className="d-flex flex-wrap justify-center gap-4 my-6">
                {filteredItems.map(item => (
                    <div key={item.id} className="card text-center" style={{width: '300px', height: '400px'}}>
                        <img src={item.image} alt={item.name} style={{width: '250px', height: '150px', objectFit: 'cover'}} className="mb-3" />
                        <h3 className="text-lg font-semibold text-primary mb-2">{item.name}</h3>
                        <p className="text-sm mb-2">{item.description}</p>
                        <p className="text-lg font-bold mb-3">${item.price}</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => handleAddToCart(item)}
                        >
                            Añadir al Carrito
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;