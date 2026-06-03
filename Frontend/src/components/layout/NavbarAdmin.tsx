import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavbarAdmin = ({ correoAdmin }: { correoAdmin?: string }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    const handleSalir = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        navigate('/');
    };

    const linkStyle = (path: string): React.CSSProperties => ({
        color: 'rgb(10,202,154)',
        textDecoration: 'none',
        padding: '8px 12px',
        borderBottom: isActive(path) ? '2px solid rgb(10,202,154)' : '2px solid transparent',
        fontWeight: isActive(path) ? 700 : 400,
        fontSize: '0.9rem',
        transition: 'border-color 0.2s',
        display: 'inline-block',
    });

    return (
        <nav style={{ backgroundColor: 'rgb(35,46,46)' }}>
            <ul className="nav nav-tabs w-100" style={{ listStyle: 'none', margin: 0, padding: '0 8px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <li>
                    <Link to="/admin/dashboard" style={{ padding: '8px 12px', display: 'inline-block' }}>
                        <i className="fa-solid fa-briefcase" style={{ color: 'rgb(10,202,154)' }}></i>
                    </Link>
                </li>
                <li>
                    <span style={{ color: 'rgb(10,202,154)', fontWeight: 700, padding: '8px 12px', fontSize: '0.9rem' }}>
                        Bolsa de Empleo
                    </span>
                </li>
                <li><Link to="/admin/dashboard" style={linkStyle('/admin/dashboard')}>Dashboard</Link></li>
                <li><Link to="/admin/empresas-pendientes" style={linkStyle('/admin/empresas-pendientes')}>Empresas Pendientes</Link></li>
                <li><Link to="/admin/oferentes-pendientes" style={linkStyle('/admin/oferentes-pendientes')}>Oferentes Pendientes</Link></li>
                <li><Link to="/admin/caracteristicas" style={linkStyle('/admin/caracteristicas')}>Características</Link></li>
                <li><Link to="/admin/reportes" style={linkStyle('/admin/reportes')}>Reportes</Link></li>
                <li style={{ marginLeft: 'auto' }}>
                    <span style={{ color: 'rgb(10,202,154)', padding: '8px 12px', fontSize: '0.9rem' }}>
                        {correoAdmin}
                    </span>
                </li>
                <li>
                    <button onClick={handleSalir} style={{ background: 'none', border: 'none', color: 'rgb(10,202,154)', cursor: 'pointer', padding: '8px 12px', fontSize: '0.9rem' }}>
                        Salir
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarAdmin;
