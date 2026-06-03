import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageEmpresa from '../../components/layout/PageEmpresa';

const MisPuestos = () => {
    const [empresa, setEmpresa] = useState<any>(null);
    const [puestos, setPuestos] = useState<any[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const cargarDatos = () => {
        fetch('http://localhost:8080/api/empresa/misPuestos', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setEmpresa(data.empresa);
                setPuestos(data.puestos);
            })
            .catch(() => navigate('/login'));
    };

    useEffect(() => { cargarDatos(); }, []);

    const desactivar = (puestoId: number) => {
        fetch(`http://localhost:8080/api/empresa/desactivarPuesto/${puestoId}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => cargarDatos());
    };

    return (
        <PageEmpresa nombreEmpresa={empresa?.nombre}>
            <div className="container-fluid px-3 mt-4">
                <div className="d-flex align-items-center mb-3">
                    <h5 className="text-white">Mis Puestos</h5>
                    <button
                        onClick={() => navigate('/empresa/publicar-puesto')}
                        className="btn ms-auto"
                        style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}>
                        <i className="fa-solid fa-plus me-1"></i> Publicar Puesto
                    </button>
                </div>
                <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                    <div className="card-body">
                        <table className="table table-borderless mb-0" style={{ color: '#cdd9d9', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #4a5f5f' }}>
                                    <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>ID</th>
                                    <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Descripción</th>
                                    <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Salario</th>
                                    <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Tipo</th>
                                    <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Activo</th>
                                    <th className="text-center" style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {puestos.map(puesto => (
                                    <tr key={puesto.id} style={{ borderBottom: '1px solid #2e3e3e' }}>
                                        <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{puesto.id}</td>
                                        <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{puesto.descripcion}</td>
                                        <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>${puesto.salario}</td>
                                        <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{puesto.esPublico === 1 ? 'Público' : 'Privado'}</td>
                                        <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{puesto.activo === 1 ? 'Sí' : 'No'}</td>
                                        <td className="text-center" style={{ backgroundColor: 'transparent' }}>
                                            <button
                                                onClick={() => navigate(`/empresa/buscar-candidatos/${puesto.id}`)}
                                                className="btn btn-sm me-2"
                                                style={{ backgroundColor: '#1c6e5a', color: 'white' }}>
                                                Buscar candidatos
                                            </button>
                                            <button
                                                onClick={() => desactivar(puesto.id)}
                                                disabled={puesto.activo === 0}
                                                className="btn btn-sm"
                                                style={{ backgroundColor: puesto.activo === 0 ? '#444' : '#7a2f2f', color: 'white' }}>
                                                Desactivar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {puestos.length === 0 && (
                                    <tr>
                                        <td colSpan={6} style={{ color: '#8aa8a8', textAlign: 'center', padding: '2rem', backgroundColor: 'transparent' }}>
                                            No tenés puestos publicados aún.
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

export default MisPuestos;
