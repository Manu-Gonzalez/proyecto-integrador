import { Link } from "react-router-dom";
import "../index.css";
import "./Nav.css";

function Nav() {
    return (
        <nav className="nav p-4">
            <ul className="nav-lits d-flex flex-row gap-6">
                <li><Link to="/" className="text-primary font-bold">Inicio</Link></li>
                <li><Link to="/about" className="text-primary font-bold">Acerca de nosotros</Link></li>
                <li><Link to="/menu" className="text-primary font-bold">Menu</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;
