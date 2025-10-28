
function Menu() {
    return (
        <div className="container py-6">
            <h1 className="text-center text-3xl my-4">Menu de nuestra <b>aplicacion</b></h1>
            <div className="grid grid-cols-3 gap-4 my-6">
                <div className="card text-center">
                    <h3 className="text-xl font-semibold text-primary mb-2">Plato 1</h3>
                    <p className="text-base mb-3">Descripción del plato</p>
                    <button className="btn btn-primary">Ordenar</button>
                </div>
                <div className="card text-center">
                    <h3 className="text-xl font-semibold text-primary mb-2">Plato 2</h3>
                    <p className="text-base mb-3">Descripción del plato</p>
                    <button className="btn btn-primary">Ordenar</button>
                </div>
                <div className="card text-center">
                    <h3 className="text-xl font-semibold text-primary mb-2">Plato 3</h3>
                    <p className="text-base mb-3">Descripción del plato</p>
                    <button className="btn btn-primary">Ordenar</button>
                </div>
            </div>
        </div>
    );
}

export default Menu;