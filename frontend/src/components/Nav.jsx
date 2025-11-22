import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/about">Acerca de nosotros</Link></li>
                <li><Link to="/menu">Menu</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;
