import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageAdmin from '../../components/layout/PageAdmin';

const Reportes = () => {
    const [admin, setAdmin] = useState<any>(null);
    const anioActual = new Date().getFullYear();
    const [anioSeleccionado, setAnioSeleccionado] = useState<number>(anioActual);
    const [porMes, setPorMes] = useState<{ [mes: string]: number } | null>(null);
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

    const verReporte = () => {
        fetch(`http://localhost:8080/api/admin/reportes/${anioSeleccionado}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setPorMes(data.porMes));
    };

    const descargarPDF = () => {
        fetch(`http://localhost:8080/api/admin/generarReporte/${anioSeleccionado}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `reporte_${anioSeleccionado}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
            });
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: '#0e1a22',
        border: '1px solid #4a5f5f',
        color: '#cdd9d9',
    };

    return (
        <PageAdmin correoAdmin={admin?.usuario?.correo}>
            <div className="container-fluid px-3 mt-4">
                <h5 className="text-white mb-3">Reportes</h5>
                <div className="row g-3">
                    {/* Panel de selección */}
                    <div className="col-md-4">
                        <div className="card h-100" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-body">
                                <h6 style={{ color: 'rgb(10,202,154)' }} className="mb-3">Generar Reporte</h6>
                                <div className="mb-3">
                                    <label className="mb-1 d-block" style={{ color: '#8aa8a8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Año</label>
                                    <select
                                        className="form-select"
                                        style={inputStyle}
                                        value={anioSeleccionado}
                                        onChange={e => setAnioSeleccionado(Number(e.target.value))}>
                                        <option value={anioActual}>{anioActual}</option>
                                        <option value={anioActual - 1}>{anioActual - 1}</option>
                                        <option value={anioActual - 2}>{anioActual - 2}</option>
                                    </select>
                                </div>
                                <button
                                    onClick={verReporte}
                                    className="btn w-100 mb-2"
                                    style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}>
                                    <i className="fa-solid fa-eye me-1"></i> Ver reporte
                                </button>
                                {porMes && (
                                    <button
                                        onClick={descargarPDF}
                                        className="btn w-100"
                                        style={{ backgroundColor: '#2e3e3e', color: '#cdd9d9', fontWeight: 700 }}>
                                        <i className="fa-solid fa-file-pdf me-1"></i> Descargar PDF
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tabla de resultados */}
                    <div className="col-md-8">
                        <div className="card h-100" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-body">
                                <h6 style={{ color: 'rgb(10,202,154)' }} className="mb-3">
                                    Puestos publicados — {porMes ? anioSeleccionado : 'seleccioná un año'}
                                </h6>
                                {!porMes ? (
                                    <p style={{ color: '#8aa8a8' }}>Seleccioná un año y presioná "Ver reporte".</p>
                                ) : (
                                    <table className="table table-borderless" style={{ color: '#cdd9d9', fontSize: '0.9rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #4a5f5f' }}>
                                                <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Mes</th>
                                                <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Cantidad de puestos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(porMes).map(([mes, cantidad]) => (
                                                <tr key={mes} style={{ borderBottom: '1px solid #2e3e3e' }}>
                                                    <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{mes}</td>
                                                    <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{cantidad}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageAdmin>
    );
};

export default Reportes;
