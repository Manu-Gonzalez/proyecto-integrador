const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '2rem 1rem',
            textAlign: 'center',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div className="d-flex mobile-flex-col justify-center align-center gap-4">
                    <div>
                        <h3 style={{color: 'var(--color-primario)', marginBottom: '0.5rem'}}>Sabor Express</h3>
                        <p style={{color: 'white'}}>© 2025 Todos los derechos reservados</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;