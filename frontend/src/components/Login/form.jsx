import './form.css';


function Form() {
    return (
        <div className="form-container d-flex flex-col gap-3">
            <div className='d-flex flex-col gap-3'>
                <h1 className='text-center'><b>INICIAR SESION</b></h1>
                <h5 className='text-center'>INICIA SESION ASI PODES REALIZAR PEDIDOS</h5>
            </div>
            <form className='d-flex flex-col' method='POST'>
                <input type='text' placeholder='Dierrcion de correo'/>
                <input type='password' placeholder='Contraseña'/>
                <button type='submit' />
            </form>
        </div>
    );
}

export default Form;