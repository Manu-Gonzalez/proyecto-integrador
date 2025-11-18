import { useNavigate } from 'react-router-dom';
import { categories } from '../data/menuData';

function ProductoMenu() {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId) => {
        navigate(`/menu?category=${categoryId}`);
    };

    return (
        <div className="container py-6" id="producto">
            <h1 className="text-center text-3xl my-4">Nuestras <b>Categorías</b></h1>
            <div className="d-flex justify-center gap-4 my-12" style={{marginTop: '150px'}}>
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="card text-center cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        <div className="text-6xl mb-4">{category.icon}</div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{category.name}</h3>
                        <button className="btn btn-primary">Ver Productos</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductoMenu;