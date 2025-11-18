import { Link, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useCart } from "../context/CartContext";
import "../index.css";
import "./Nav.css";

function Nav() {
    const location = useLocation();
    const { getTotalItems, items, getTotalPrice, clearCart } = useCart();

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
                        <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 8px;">
                            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
                            <div style="flex: 1;">
                                <div style="font-weight: bold; margin-bottom: 5px;">${item.name}</div>
                                <div>Cantidad: ${item.quantity}</div>
                                <div style="color: #666;">$${item.price} c/u</div>
                            </div>
                            <div style="font-weight: bold; color: #2563eb;">$${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    `).join('')}
                    <hr style="margin: 15px 0;">
                    <div style="font-size: 18px; font-weight: bold; text-align: center;">
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

    return (
        <nav className="d-flex flex-row justify-around align-center p-4">
            <div>
                <div>
                    
                </div>
            </div>
            <ul className="d-flex flex-row gap-6 list-none">
                <li>
                    <Link to="/" className={location.pathname === "/" ? "seleccionado" : ""}>
                        <b>
                            Inicio
                        </b>
                    </Link>
                </li>
                <li>
                    <Link to="/about" className={location.pathname === "/about" ? "seleccionado" : ""}>
                        <b>
                            Acerca de nosotros
                        </b>
                    </Link>
                </li>
                <li>
                    <Link to="/menu" className={location.pathname === "/menu" ? "seleccionado" : ""}>
                        <b>
                            Menu
                        </b>
                    </Link>
                </li>
            </ul>
            <div>
                <div className="carrito d-flex flex-col justify-center align-center cursor-pointer" onClick={handleCheckout}>
                    <div className="cantidad">
                        {getTotalItems()}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
