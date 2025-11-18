import Home from "./Home";
import ProductoMenu from "./ProductoMenu";

function Landing() {
    return (
        <div className="d-flex flex-col">
            <Home />
            <ProductoMenu />
        </div>
    );
}

export default Landing;