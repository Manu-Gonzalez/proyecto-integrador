import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth';
import Input from '../../components/ui/Input';
import BtnPrimary from '../../components/ui/Btn-primary';
import Card from '../../components/ui/Card';

const Register = () => {
    const [formData, setFormData] = useState({ 
        nombre: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await AuthService.register({
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password
            });
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            if (error.message === 'Failed to fetch') {
                setError('No se puede conectar al servidor. Verifica que esté corriendo.');
            } else {
                setError(error.message || 'Error al registrar usuario');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='d-flex mobile-flex-col' style={{height: '100vh', overflow: 'hidden'}}>
            <div className="mobile-hidden" style={{width: '60vw', height: '100vh'}}>
                <img src='/fondo.png' alt='Fondo' style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="bg-primary p-5 mobile-p-3 d-flex justify-center align-center vh100 mobile-w-full" style={{width: '40vw', position: 'relative'}}>
                <svg 
                    width="433" 
                    height="1000px" 
                    viewBox="0 0 433 1024" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="mobile-hidden"
                    style={{
                        position: 'absolute',
                        left: '-423px',
                        top: 0,
                        zIndex: 10,
                        transform: 'scaleX(-1)'
                    }}
                >
                    <path d="M382.871 972.08C405.136 988.639 433 1024 433 1024H0V0H63.4282V2.25737C63.4282 2.25737 64.4815 11.5176 62.4052 16.3659C60.3781 21.0993 58.5045 23.7566 54.4767 26.5241C49.3195 30.0676 45.1325 30.3892 39.1311 29.3458C33.5273 28.3715 26.0874 22.2915 26.0874 22.2915L9.20732 31.6032L8.18429 38.3753L5.11518 47.4048C5.11518 47.4048 12.6515 46.6123 17.3916 47.4048C26.711 48.963 32.5612 51.5169 39.1311 58.9738C45.2969 65.972 46.889 72.0308 48.85 81.5475C50.8427 91.2183 52.1571 97.721 48.85 106.943C45.9563 115.012 35.8063 123.873 35.8063 123.873H41.6887C41.6887 123.873 60.0946 132.951 70.5895 141.086C80.0307 148.403 86.6279 151.804 92.8405 162.531C100.29 175.393 100.49 185.364 100.769 200.624C101.012 213.9 99.5512 221.545 95.9096 234.202C93.4058 242.905 87.4696 255.647 87.4696 255.647C87.4696 255.647 90.7823 255.201 92.8405 255.647C97.9228 256.748 101.281 259.597 103.071 264.959C104.858 270.314 104.423 275.311 100.769 279.35C96.2531 284.341 89.3422 283.823 84.4005 279.35C80.2495 275.592 80.0526 264.959 80.0526 264.959C80.0526 264.959 74.5063 270.444 70.5895 273.424C62.8296 279.327 48.85 284.993 48.85 284.993C48.85 284.993 68.6125 291.707 80.0526 298.82C90.9991 305.625 96.6097 310.63 105.884 319.982C116.336 330.522 129.67 350.175 129.67 350.175C129.67 350.175 131.475 346.877 132.995 345.096C137.75 339.522 142.44 337.982 149.363 337.477C157.59 336.877 163.174 339.023 169.312 345.096C174.571 350.297 177.013 354.876 178.008 362.59C179.019 370.424 177.949 375.799 173.916 382.342C169.788 389.039 165.283 391.364 158.315 393.911C152.039 396.205 141.435 395.322 141.435 395.322V417.614V447.806C141.435 447.806 154.246 448.241 160.361 450.628C170.739 454.677 176.145 459.577 183.123 468.969C189.155 477.087 192.201 482.672 194.121 492.953C196.267 504.445 185.452 513.262 191.563 522.864C193.842 526.444 195.318 529.532 199.236 530.2C205.543 531.275 205.289 521.438 209.722 516.374C216.821 508.265 220.206 501.506 229.927 498.033C238.099 495.113 245.779 491.409 251.923 498.033C258.209 504.81 254.515 513.598 251.923 522.864C247.459 538.814 228.833 536.118 223.278 551.645C220.854 558.42 218.952 562.836 220.208 569.986C223.173 586.854 244.998 574.883 257.805 584.659C270.153 594.084 276.184 601.993 282.869 616.827C290.117 632.907 281.308 647.383 290.798 661.974C300.571 677.001 316.393 671.917 328.395 684.83C339.029 696.272 345.385 704.384 348.6 720.384C350.675 730.712 349.918 736.994 348.6 747.472C347.001 760.175 345.548 767.743 339.648 778.793C333.874 789.607 328.723 794.571 319.699 802.213C311.787 808.913 297.448 816.04 297.448 816.04V836.92C297.448 836.92 301.102 834.471 305.12 833.252C309.539 831.912 313.098 833.385 316.374 836.92C319.925 840.752 320.947 845.16 319.699 850.465C318.313 856.355 314.695 860.231 309.213 860.905C304.107 861.532 297.448 858.5 297.448 858.5C297.448 858.5 297.025 874.136 294.123 885.454C288.675 906.701 275.708 938.22 275.708 938.22H297.192C297.192 938.22 295.772 923.528 300.261 916.775C305.888 908.31 311.941 907.254 320.466 908.31C329.663 909.448 334.358 913.709 336.835 923.547C339.392 933.705 334.277 944.992 334.277 944.992C334.277 944.992 366.129 959.629 382.871 972.08Z" fill="#6147E8"/>
                </svg>
                <Card className="form-container d-flex flex-col gap-5 mobile-gap-3" style={{position: 'relative', zIndex: 20}}>
                    <h1 className="text-center mb-4 mobile-text-center"><b>REGISTRARME</b></h1>
                    <h5 className="mobile-text-center">CREA TU CUENTA PARA REALIZAR PEDIDOS</h5>
                    <form onSubmit={handleSubmit} className="d-flex flex-col gap-3">
                        <div className="mb-3">
                            <Input
                                type="text"
                                name="nombre"
                                placeholder="Nombre completo"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmar contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p style={{color: 'red'}} className="mb-3">{error}</p>}
                        <BtnPrimary type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Registrarme'}
                        </BtnPrimary>
                    </form>
                    <div className="text-center mt-3">
                        <p>¿Ya tienes cuenta? <a href="/login" style={{color: 'var(--color-primario)', textDecoration: 'none', fontWeight: 'bold'}}>Iniciar sesión</a></p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Register;