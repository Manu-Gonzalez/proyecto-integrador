import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import "./index.css";

import Landing from "./pages/Landing";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Menu from "./pages/Menu";
import Nav from "./components/Nav";
import { CartProvider } from "./context/CartContext";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster position="bottom-right" />
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
