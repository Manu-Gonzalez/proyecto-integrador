import Footer from '../components/layout/Footer/Footer';
import './About.css';

function About() {
    return (
        <div className="about-container mobile-p-2">
            <div className="container">
                <h1 className="text-center my-4 mobile-text-center">Acerca de <b>nosotros</b></h1>
                <div className="d-flex flex-col gap-4 my-6">
                    
                    <div className="about-card">
                        <h2 className="text-center mb-4"><b>Integrantes del Proyecto</b></h2>
                        <div className="d-flex mobile-flex-col justify-center gap-6 mobile-gap-4">
                            <div className="team-member">
                                <div className="profile-circle">
                                    MG
                                </div>
                                <h3><b>Manuel González</b></h3>
                                <p className="role-text">Back-end</p>
                                <a 
                                    href="https://github.com/Manu-Gonzalez" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="github-btn"
                                >
                                    GitHub
                                </a>
                            </div>
                            <div className="team-member">
                                <div className="profile-circle">
                                    CC
                                </div>
                                <h3><b>Cristian Cabral</b></h3>
                                <p className="role-text">Front-end</p>
                                <a 
                                    href="https://github.com/criizzz" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="github-btn"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="about-card">
                        <h2 className="text-center mb-4"><b>Ubicación</b></h2>
                        <div className="map-container">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.426270016637!2d-58.75854102464995!3d-34.46670907300366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9895b70b2bd5%3A0x94a8fb89edd6f2e!2sEscuela%20de%20Educaci%C3%B3n%20Media%20N.%C2%BA%207%20Roberto%20Arlt!5e0!3m2!1ses!2sar!4v1764698147444!5m2!1ses!2sar"
                                width="100%" 
                                height="300" 
                                className="map-iframe"
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div className="map-link-container">
                                <a 
                                    href="https://maps.app.goo.gl/KFmGz6xNR2ey21vj8" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="map-btn"
                                >
                                    Ver en Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;