import { Link, useLocation } from "react-router-dom";
import "../index.css";
import "./Nav.css";

function Nav() {
    const location = useLocation();

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
                <div className="carrito d-flex flex-col justify-center align-center cursor-pointer">
                    <div className="cantidad">
                        2
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
