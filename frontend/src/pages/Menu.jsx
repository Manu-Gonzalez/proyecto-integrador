import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ApiService from '../services/api';
import { useCart } from '../context/CartContext';
import AuthService from '../services/auth';
import Footer from '../components/layout/Footer/Footer';


function Menu() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productosData, categoriasData] = await Promise.all([
                    ApiService.getProductos(),
                    ApiService.getCategorias()
                ]);
                setProductos(productosData);
                setCategorias(categoriasData);
                setFilteredItems(productosData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const category = searchParams.get('category');
        console.log('URL category:', category);
        console.log('Categories:', categorias);
        
        if (category && categorias.length > 0) {
            const foundCategory = categorias.find(cat => cat.nombre === category);
            console.log('Found category:', foundCategory);
            
            if (foundCategory) {
                setSelectedCategory(foundCategory.id);
                const filtered = productos.filter(item => item.categoriaId === foundCategory.id);
                console.log('Filtered products:', filtered);
                setFilteredItems(filtered);
            } else {
                setSelectedCategory('');
                setFilteredItems(productos);
            }
        } else {
            setSelectedCategory('');
            setFilteredItems(productos);
        }
    }, [searchParams, categorias, productos]);



    const handleCategoryFilter = (categoryName) => {
        setCurrentPage(1);
        if (categoryName === '') {
            navigate('/menu');
        } else {
            navigate(`/menu?category=${categoryName}`);
        }
    };

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleAddToCart = (item) => {
        if (!AuthService.isAuthenticated()) {
            navigate('/login');
            return;
        }
        addToCart(item);
    };

    if (loading) {
        return <div className="container py-6 text-center">Cargando...</div>;
    }

    return (
        <>
            <div className="p-4 mobile-p-2">
                <h1 className="text-center my-4 mobile-text-center">Menú de nuestra <b>aplicación</b></h1>
            
            <div className="d-flex justify-center gap-3 mobile-gap-2 mb-6 flex-wrap">
                <button 
                    onClick={() => handleCategoryFilter('')}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: !searchParams.get('category') ? 'var(--color-primario)' : 'transparent',
                        color: !searchParams.get('category') ? 'white' : 'var(--color-primario)',
                        border: '2px solid var(--color-primario)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        width: 'auto'
                    }}
                >
                    Todos
                </button>
                {categorias.map(category => (
                    <button 
                        key={category.id}
                        onClick={() => handleCategoryFilter(category.nombre)}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: searchParams.get('category') === category.nombre ? 'var(--color-primario)' : 'transparent',
                            color: searchParams.get('category') === category.nombre ? 'white' : 'var(--color-primario)',
                            border: '2px solid var(--color-primario)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            width: 'auto'
                        }}
                    >
                        {category.nombre}
                    </button>
                ))}
            </div>

            <div className="d-flex flex-wrap justify-center mobile-justify-center gap-4 mobile-gap-3 my-6">
                {currentItems.map(item => (
                    <div 
                        key={item.id} 
                        className="text-center p-4" 
                        style={{
                            width: window.innerWidth <= 768 ? '100%' : '300px', 
                            maxWidth: window.innerWidth <= 768 ? '350px' : '300px',
                            height: 'fit-content',
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        {item.imagen && (
                            <img 
                                src={item.imagen} 
                                alt={item.nombre} 
                                style={{
                                    width: '100%', 
                                    height: window.innerWidth <= 768 ? '120px' : '150px', 
                                    objectFit: 'contain',
                                    marginBottom: '1rem'
                                }} 
                            />
                        )}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{ color: 'var(--color-primario)', marginBottom: '0.5rem' }}><b>{item.nombre}</b></h3>
                                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>${item.precio}</p>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(item)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: 'var(--color-primario)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    width: '100%'
                                }}
                            >
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="d-flex justify-center gap-2 my-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: currentPage === 1 ? '#f3f4f6' : 'var(--color-primario)',
                            color: currentPage === 1 ? '#9ca3af' : 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Anterior
                    </button>
                    <span style={{ padding: '0.5rem 1rem', alignSelf: 'center' }}>
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'var(--color-primario)',
                            color: currentPage === totalPages ? '#9ca3af' : 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Siguiente
                    </button>
                </div>
            )}
            </div>
            <Footer />
        </>
    );
}

export default Menu;