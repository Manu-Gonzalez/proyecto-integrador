import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/global.css";

import Landing from "./pages/Landing/Landing";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Nav from "./components/layout/Nav/Nav";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
