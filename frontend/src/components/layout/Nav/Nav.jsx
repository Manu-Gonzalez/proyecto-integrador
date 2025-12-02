import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../../services/auth";
import { useCart } from "../../../context/CartContext";
import CartSidebar from "../../ui/CartSidebar";
import "../../../styles/global.css";
import "./Nav.css";
import BtnPrimary from "../../ui/Btn-primary";

function Nav() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { getTotalItems } = useCart();

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = AuthService.isAuthenticated();
            const userData = AuthService.getUser();
            setIsAuthenticated(authenticated);
            setUser(userData);
        };

        checkAuth();
        
        // Listen for storage changes to update auth state
        window.addEventListener('storage', checkAuth);
        
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (!event.target.closest('[data-user-dropdown]')) {
                setShowDropdown(false);
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        setUser(null);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="d-flex flex-row justify-between align-center p-4 mobile-p-2" style={{maxWidth: 'calc(-50px + 100vw)', overflow: 'visible', position: 'relative'}}>
            {/* Logo */}
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primario)'}}>Sabor Express</div>
            
            {/* Desktop Navigation */}
            <ul className="d-flex flex-row gap-6 list-none mobile-hidden">
                <li>
                    <Link to="/" className={location.pathname === "/" ? "seleccionado" : ""}>
                        <b>Inicio</b>
                    </Link>
                </li>
                <li>
                    <Link to="/about" className={location.pathname === "/about" ? "seleccionado" : ""}>
                        <b>Acerca de nosotros</b>
                    </Link>
                </li>
                <li>
                    <Link to="/menu" className={location.pathname === "/menu" ? "seleccionado" : ""}>
                        <b>Menu</b>
                    </Link>
                </li>
                {user && user.rol === 'admin' && (
                    <li>
                        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "seleccionado" : ""}>
                            <b>Dashboard</b>
                        </Link>
                    </li>
                )}
            </ul>
            
            {/* Right side - Cart, User, Mobile Menu */}
            <div className="d-flex gap-3 align-center">
                <div 
                    className="carrito d-flex flex-col justify-center align-center cursor-pointer"
                    onClick={() => setShowCart(true)}
                >
                    <div className="cantidad">
                        {getTotalItems()}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </div>
                
                {isAuthenticated && user ? (
                    <div style={{position: 'relative'}} data-user-dropdown>
                        <div 
                            className="d-flex flex-row justify-center gap-2 align-center cursor-pointer" 
                            style={{color: 'var(--color-primario)'}}
                            onClick={toggleDropdown}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-primario)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="20" height="20" fill="white" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                            </div>
                            <span className="mobile-hidden" style={{fontSize: '16px'}}><b>{user.nombre}</b></span>
                        </div>
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: '0',
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                padding: '0.5rem',
                                minWidth: '150px',
                                zIndex: 9999
                            }}>
                                <div className="mobile-only p-2 border-b" style={{borderColor: '#e5e7eb'}}>
                                    <b>{user.nombre}</b>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-primario)',
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                        textAlign: 'left',
                                        borderRadius: '0.25rem'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login">
                        <BtnPrimary>Iniciar Sesion</BtnPrimary>
                    </Link>
                )}
                
                {/* Mobile Menu Button */}
                <button 
                    className="mobile-only"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        display: 'none'
                    }}
                >
                    ☰
                </button>
            </div>
            
            {/* Mobile Navigation Menu */}
            {showMobileMenu && (
                <ul className="mobile-only d-flex flex-col gap-3 list-none w-100" style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    backgroundColor: 'white',
                    padding: '1rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    display: 'none'
                }}>
                    <li>
                        <Link to="/" className={location.pathname === "/" ? "seleccionado" : ""} onClick={() => setShowMobileMenu(false)}>
                            <b>Inicio</b>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={location.pathname === "/about" ? "seleccionado" : ""} onClick={() => setShowMobileMenu(false)}>
                            <b>Acerca de nosotros</b>
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu" className={location.pathname === "/menu" ? "seleccionado" : ""} onClick={() => setShowMobileMenu(false)}>
                            <b>Menu</b>
                        </Link>
                    </li>
                    {user && user.rol === 'admin' && (
                        <li>
                            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "seleccionado" : ""} onClick={() => setShowMobileMenu(false)}>
                                <b>Dashboard</b>
                            </Link>
                        </li>
                    )}
                </ul>
            )}
            <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
        </nav>
    );
}

export default Nav;
