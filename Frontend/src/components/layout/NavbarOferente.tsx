import { Link, useNavigate } from 'react-router-dom';

const NavbarOferente = () => {
    const navigate = useNavigate();
    const nombre = localStorage.getItem('nombre') || '';

    const salir = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('nombre');
        navigate('/');
    };

    return (
        <nav style={{ backgroundColor: 'rgb(35, 46, 46)' }}>
            <ul className="nav nav-tabs w-100">
                <li className="nav-item">
                    <Link className="nav-link" to="/oferente/dashboard">
                        <i className="fa-solid fa-briefcase" style={{ color: 'rgb(10, 202, 154)' }}></i>
                    </Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link fw-bold" style={{ color: 'rgb(10, 202, 154)' }}>Bolsa de Empleo</span>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/oferente/dashboard" style={{ color: 'rgb(10, 202, 154)' }}>Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/oferente/misHabilidades" style={{ color: 'rgb(10, 202, 154)' }}>Mis Habilidades</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/oferente/miCV" style={{ color: 'rgb(10, 202, 154)' }}>Mi CV</Link>
                </li>
                <li className="nav-item ms-auto">
                    <span className="nav-link" style={{ color: 'rgb(10, 202, 154)' }}>{nombre}</span>
                </li>
                <li className="nav-item">
                    <button className="nav-link" style={{ color: 'rgb(10, 202, 154)', background: 'none', border: 'none' }} onClick={salir}>Salir</button>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarOferente;