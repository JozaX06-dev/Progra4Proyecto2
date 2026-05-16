import { Link } from 'react-router-dom';

const NavbarPublico = () => {
    return (
        <nav style={{ backgroundColor: 'rgb(35,46,46)'}}>
            <ul className="nav nav-tabs w-100">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="fa-solid fa-briefcase" style={{ color: 'rgb(10, 202, 154)' }}></i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={{ color: 'rgb(10, 202, 154)' }}>Bolsa de Empleo</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/buscar" style={{ color: 'rgb(10, 202, 154)' }}>Buscar Puestos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/registro/empresa" style={{ color: 'rgb(10, 202, 154)' }}>Registro Empresa</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/registro/oferente" style={{ color: 'rgb(10, 202, 154)' }}>Registro Oferente</Link>
                </li>
                <li className="nav-item ms-auto">
                    <Link className="nav-link" to="/login" style={{ color: 'rgb(10, 202, 154)' }}>Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarPublico;