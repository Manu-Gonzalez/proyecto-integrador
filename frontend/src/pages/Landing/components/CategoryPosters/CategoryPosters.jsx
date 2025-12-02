import { useNavigate } from 'react-router-dom';
import './CategoryPosters.css';

const CategoryPosters = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName) => {
        navigate(`/menu?category=${categoryName}`);
    };

    const categories = [
        { name: 'hamburguesas', image: '/poster_hamburguesas.png' },
        { name: 'bebidas', image: '/poster_bebidas.png' },
        { name: 'milanesa', image: '/poster_milanesas.png' },
        { name: 'postres', image: '/poster_postres.png' }
    ];

    return (
        <section className="category-posters">
            <div className="container">
                <h2 className="section-title"><b>Nuestras Especialidades</b></h2>
                <div className="posters-grid">
                    {categories.map((category, index) => (
                        <div 
                            key={index}
                            className="poster-card"
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <img src={category.image} alt={category.name} />
                            <div className="poster-overlay">
                                <h3>{category.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryPosters;