
function Home() {
    return (
        <div className="d-flex justify-between" id="hero">
            <img src="/wave1.svg" id="decoracion1"/>
            <div className="container d-flex flex-col justify-center gap-5 h-100" id="texto">
                <h1>¿CON <b>HAMBRE</b> DE QUERER <b>COMER</b> ALGO?</h1>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae egestas nulla. Integer tincidunt augue id lectus accumsan posuere et in metus. Proin sodales lectus turpis. Nulla tortor augue, malesuada vitae massa in, auctor efficitur nisl. Nam scelerisque consectetur </h4>
                <div className="d-flex my-6 gap-3">
                    <button className="btn btn-primary mx-2">Ver Menu</button>
                    <button className="btn btn-outline mx-2">Ordenar Ahora</button>
                </div>
            </div>
            <div className="d-flex align-center" id="producto">
                <img src="/trueno.svg" id="trueno"/>
                <img src="/hamburguesa.png" alt="Hamburguesa"/>
                <img src="/trueno.svg" id="trueno2"/>
            </div>
            <img src="/wave2.svg" id="decoracion2"/>
        </div>
    );
}

export default Home;