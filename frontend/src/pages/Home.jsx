import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-between" id="hero">
            <img src="/wave1.svg" id="decoracion1"/>
            <div className="container d-flex flex-col justify-center gap-5 h-100" id="texto">
                <h1>¿CON <b>HAMBRE</b> DE QUERER <b>COMER</b> ALGO?</h1>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae egestas nulla. Integer tincidunt augue id lectus accumsan posuere et in metus. Proin sodales lectus turpis. Nulla tortor augue, malesuada vitae massa in, auctor efficitur nisl. Nam scelerisque consectetur </h4>
                <div className="d-flex my-6 gap-3">
                    <button className="btn btn-primary mx-2" onClick={() => navigate('/menu')}>Ver Menu</button>
                    <button className="btn btn-outline mx-2" onClick={() => navigate('/menu')}>Ordenar Ahora</button>
                </div>
            </div>
            <div className="d-flex align-center">
                <img src="/hamburguesa.png" alt="Hamburguesa"/>
            </div>
        </div>
    );
}

export default Home;