import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageAdmin from '../../components/layout/PageAdmin';

const MenuAdmin = () => {
    const [admin, setAdmin] = useState<any>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setAdmin(data))
            .catch(() => navigate('/login'));
    }, []);

    const cardStyle: React.CSSProperties = {
        backgroundColor: 'rgb(35,46,46)',
        borderColor: '#4a5f5f',
    };

    const btnStyle: React.CSSProperties = {
        backgroundColor: 'rgb(10,202,154)',
        color: '#080f15',
        fontWeight: 700,
    };

    const cards = [
        { icon: 'fa-building', titulo: 'Empresas Pendientes', desc: 'Autorizar empresas registradas', ruta: '/admin/empresas-pendientes', label: 'Ver empresas' },
        { icon: 'fa-users', titulo: 'Oferentes Pendientes', desc: 'Autorizar oferentes registrados', ruta: '/admin/oferentes-pendientes', label: 'Ver oferentes' },
        { icon: 'fa-list', titulo: 'Características', desc: 'Administrar características del sistema', ruta: '/admin/caracteristicas', label: 'Administrar' },
        { icon: 'fa-file-pdf', titulo: 'Reportes', desc: 'Generar reportes de puestos por mes', ruta: '/admin/reportes', label: 'Ver reportes' },
    ];

    return (
        <PageAdmin correoAdmin={admin?.usuario?.correo}>
            <div className="container-fluid px-3 mt-4">
                <h5 className="text-white mb-4">Administrador - Dashboard</h5>
                <div className="row g-3">
                    {cards.map(card => (
                        <div className="col-md-3" key={card.ruta}>
                            <div className="card h-100" style={cardStyle}>
                                <div className="card-body text-center">
                                    <i className={`fa-solid ${card.icon} fa-2x mb-3`} style={{ color: 'rgb(10,202,154)' }}></i>
                                    <h6 style={{ color: 'rgb(10,202,154)' }}>{card.titulo}</h6>
                                    <p style={{ color: '#8aa8a8', fontSize: '0.9rem' }}>{card.desc}</p>
                                    <button onClick={() => navigate(card.ruta)} className="btn" style={btnStyle}>
                                        {card.label}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageAdmin>
    );
};

export default MenuAdmin;
