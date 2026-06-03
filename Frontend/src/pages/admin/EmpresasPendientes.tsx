import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageAdmin from '../../components/layout/PageAdmin';

const EmpresasPendientes = () => {
    const [admin, setAdmin] = useState<any>(null);
    const [empresas, setEmpresas] = useState<any[]>([]);
    const [claveGenerada, setClaveGenerada] = useState<string | null>(null);
    const [nombreAprobado, setNombreAprobado] = useState<string>('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const cargarDatos = () => {
        fetch('http://localhost:8080/api/admin/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setAdmin(data));

        fetch('http://localhost:8080/api/admin/empresasPendientes', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setEmpresas(data))
            .catch(() => navigate('/login'));
    };

    useEffect(() => { cargarDatos(); }, []);

    const aprobar = (usuarioId: number, nombre: string) => {
        fetch(`http://localhost:8080/api/admin/aprobarEmpresa/${usuarioId}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setClaveGenerada(data.clave);
                setNombreAprobado(nombre);
                cargarDatos();
            });
    };

    const thStyle: React.CSSProperties = { color: 'rgb(10,202,154)', backgroundColor: 'transparent' };
    const tdStyle: React.CSSProperties = { color: '#cdd9d9', backgroundColor: 'transparent' };

    return (
        <PageAdmin correoAdmin={admin?.usuario?.correo}>
            <div className="container-fluid px-3 mt-4">
                <h5 className="text-white mb-3">Empresas Pendientes</h5>
                <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                    <div className="card-body">

                        {/* Alerta clave generada */}
                        {claveGenerada && (
                            <div className="alert d-flex align-items-center justify-content-between mb-3"
                                style={{ backgroundColor: 'rgba(10,202,154,0.15)', border: '1px solid rgb(10,202,154)', color: '#cdd9d9' }}>
                                <div>
                                    <i className="fa-solid fa-key me-2" style={{ color: 'rgb(10,202,154)' }}></i>
                                    <strong>Empresa</strong> {nombreAprobado} aprobada.{' '}
                                    Contraseña generada:{' '}
                                    <code style={{ backgroundColor: '#0e1a22', padding: '2px 8px', borderRadius: '4px', color: 'rgb(10,202,154)', fontSize: '1rem', letterSpacing: '1px' }}>
                                        {claveGenerada}
                                    </code>
                                </div>
                                <small style={{ color: '#8aa8a8' }}>Copiá esta clave antes de salir, no se volverá a mostrar.</small>
                            </div>
                        )}

                        {empresas.length === 0 ? (
                            <p style={{ color: '#8aa8a8' }}>No hay empresas pendientes de aprobación.</p>
                        ) : (
                            <table className="table table-borderless" style={{ color: '#cdd9d9', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #4a5f5f' }}>
                                        <th style={thStyle}>Nombre</th>
                                        <th style={thStyle}>Correo</th>
                                        <th style={thStyle}>Teléfono</th>
                                        <th style={thStyle}>Localización</th>
                                        <th className="text-center" style={thStyle}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empresas.map((e: any) => (
                                        <tr key={e.usuario.id} style={{ borderBottom: '1px solid #2e3e3e' }}>
                                            <td style={tdStyle}>{e.nombre}</td>
                                            <td style={tdStyle}>{e.usuario.correo}</td>
                                            <td style={tdStyle}>{e.telefono}</td>
                                            <td style={tdStyle}>{e.localizacion}</td>
                                            <td className="text-center" style={{ backgroundColor: 'transparent' }}>
                                                <button
                                                    onClick={() => aprobar(e.usuario.id, e.nombre)}
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}>
                                                    Aprobar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </PageAdmin>
    );
};

export default EmpresasPendientes;
