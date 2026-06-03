import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageEmpresa from '../../components/layout/PageEmpresa';

const BuscarCandidatos = () => {
    const { puestoId } = useParams();
    const [empresa, setEmpresa] = useState<any>(null);
    const [puesto, setPuesto] = useState<any>(null);
    const [candidatos, setCandidatos] = useState<any[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:8080/api/empresa/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setEmpresa(data));

        fetch(`http://localhost:8080/api/empresa/buscarCandidatos/${puestoId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setPuesto(data.puesto);
                setCandidatos(data.candidatos);
            });
    }, [puestoId]);

    return (
        <PageEmpresa nombreEmpresa={empresa?.nombre}>
            <div className="container-fluid px-3 mt-4">
                <div className="d-flex align-items-center mb-3">
                    <div>
                        <h5 className="text-white mb-0">Candidatos para el puesto</h5>
                        <small style={{ color: '#8aa8a8' }}>Puesto: {puesto?.descripcion}</small>
                    </div>
                    <button
                        onClick={() => navigate('/empresa/mis-puestos')}
                        className="btn ms-auto"
                        style={{ backgroundColor: '#2e3e3e', color: 'white' }}>
                        <i className="fa-solid fa-arrow-left me-1"></i> Volver
                    </button>
                </div>
                <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                    <div className="card-body">
                        {candidatos.length === 0 ? (
                            <p style={{ color: '#8aa8a8' }}>No se encontraron candidatos con habilidades coincidentes.</p>
                        ) : (
                            <table className="table table-borderless mb-0" style={{ color: '#cdd9d9', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #4a5f5f' }}>
                                        <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Oferente</th>
                                        <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Requisitos cumplidos</th>
                                        <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>% Similitud</th>
                                        <th className="text-center" style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidatos.map((c: any, i: number) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #2e3e3e' }}>
                                            <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>
                                                {c.oferente.nombre} {c.oferente.apellido}
                                            </td>
                                            <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>
                                                {c.cumplidos} / {c.total}
                                            </td>
                                            <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>
                                                {c.similitud}%
                                            </td>
                                            <td className="text-center" style={{ backgroundColor: 'transparent' }}>
                                                <button
                                                    onClick={() => navigate(`/empresa/detalle-oferente/${c.oferente.usuario.id}?puestoId=${puestoId}`)}
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: '#1c6e5a', color: 'white' }}>
                                                    Ver detalle
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
        </PageEmpresa>
    );
};

export default BuscarCandidatos;
