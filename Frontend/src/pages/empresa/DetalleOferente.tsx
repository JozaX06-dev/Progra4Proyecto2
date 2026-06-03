import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageEmpresa from '../../components/layout/PageEmpresa';

const DetalleOferente = () => {
    const { oferenteId } = useParams();
    const [searchParams] = useSearchParams();
    const puestoId = searchParams.get('puestoId');
    const [empresa, setEmpresa] = useState<any>(null);
    const [oferente, setOferente] = useState<any>(null);
    const [habilidades, setHabilidades] = useState<any[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:8080/api/empresa/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setEmpresa(data));

        fetch(`http://localhost:8080/api/empresa/detalleOferente/${oferenteId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setOferente(data.oferente);
                setHabilidades(data.habilidades);
            });
    }, [oferenteId]);

    const verCV = () => {
        window.open(`http://localhost:8080/api/empresa/verCV/${oferenteId}?token=${token}`, '_blank');
    };

    return (
        <PageEmpresa nombreEmpresa={empresa?.nombre}>
            <div className="container-fluid px-3 mt-4">
                <div className="d-flex align-items-center mb-3">
                    <h5 className="text-white mb-0">Detalle de oferente</h5>
                    <button
                        onClick={() => navigate(`/empresa/buscar-candidatos/${puestoId}`)}
                        className="btn ms-auto"
                        style={{ backgroundColor: '#2e3e3e', color: 'white' }}>
                        <i className="fa-solid fa-arrow-left me-1"></i> Volver
                    </button>
                </div>

                {/* Datos del oferente */}
                <div className="card mb-3" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                    <div className="card-body">
                        <h6 style={{ color: 'rgb(10,202,154)' }}>
                            {oferente?.nombre} {oferente?.apellido}
                        </h6>
                        <p style={{ color: '#cdd9d9', margin: 0 }}>
                            <strong style={{ color: '#8aa8a8' }}>Identificación:</strong> {oferente?.identificacion}
                        </p>
                        <p style={{ color: '#cdd9d9', margin: 0 }}>
                            <strong style={{ color: '#8aa8a8' }}>Email:</strong> {oferente?.usuario?.correo}
                        </p>
                        <p style={{ color: '#cdd9d9', margin: 0 }}>
                            <strong style={{ color: '#8aa8a8' }}>Teléfono:</strong> {oferente?.telefono}
                        </p>
                        <p style={{ color: '#cdd9d9', margin: 0 }}>
                            <strong style={{ color: '#8aa8a8' }}>Residencia:</strong> {oferente?.lugarResidencia}
                        </p>
                        <div className="mt-3">
                            {oferente?.cv ? (
                                <button
                                    onClick={verCV}
                                    className="btn btn-sm"
                                    style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}>
                                    <i className="fa-solid fa-file-pdf me-1"></i> Ver CV
                                </button>
                            ) : (
                                <span style={{ color: '#8aa8a8', fontSize: '0.85rem' }}>
                                    Este oferente no ha subido su CV.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Habilidades */}
                <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                    <div className="card-body">
                        <h6 style={{ color: 'rgb(10,202,154)' }} className="mb-3">Habilidades</h6>
                        <table className="table table-borderless mb-0" style={{ color: '#cdd9d9', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #4a5f5f' }}>
                                    <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Característica</th>
                                    <th className="text-center" style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Nivel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {habilidades.map((h: any, i: number) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #2e3e3e' }}>
                                        <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{h.caracteristica.nombre}</td>
                                        <td className="text-center" style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{h.nivel}</td>
                                    </tr>
                                ))}
                                {habilidades.length === 0 && (
                                    <tr>
                                        <td colSpan={2} style={{ color: '#8aa8a8', textAlign: 'center', backgroundColor: 'transparent' }}>
                                            Sin habilidades registradas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageEmpresa>
    );
};

export default DetalleOferente;
