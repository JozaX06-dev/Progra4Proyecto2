import PageOferente from '../../components/layout/PageOferente';
import { useState, useEffect } from "react";
import { fetchConAuth } from '../../services/api';

const MisHabilidades = () => {
    const [habilidades, setHabilidades] = useState<any[]>([]);
    const [caracteristicas, setCaracteristicas] = useState<any[]>([]);
    const [tieneHijos, setTieneHijos] = useState<any>({});
    const [nodosFinales, setNodosFinales] = useState<any[]>([]);
    const [padre, setPadre] = useState<any>(null);
    const [form, setForm] = useState({ caracteristicaId: '', nivel: '' });
    const [exito, setExito] = useState(false);
    const [errorVacio, setErrorVacio] = useState(false);

    const fetchDatos = (id?: number) => {
        const url = id
            ? `http://localhost:8080/api/oferente/misHabilidades/${id}`
            : `http://localhost:8080/api/oferente/misHabilidades`;
        fetchConAuth(url)
            .then(res => res.json())
            .then(data => {
                setHabilidades(data.habilidades);
                setCaracteristicas(data.caracteristicas);
                setTieneHijos(data.tieneHijos);
                setNodosFinales(data.nodosFinales);
                setPadre(data.padre || null);
            })
            .catch(() => {});
    };

    useEffect(() => { fetchDatos(); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const agregarHabilidad = () => {
        if (!form.caracteristicaId || !form.nivel) {
            setExito(false);
            setErrorVacio(true);
            return;
        }
        setErrorVacio(false);
        fetchConAuth('http://localhost:8080/api/oferente/agregarHabilidad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                caracteristicaId: parseInt(form.caracteristicaId),
                nivel: parseInt(form.nivel)
            })
        }).then(() => {
            setExito(true);
            setForm({ caracteristicaId: '', nivel: '' });
            fetchDatos(padre?.id);
        }).catch(() => {});
    };

    return (
        <PageOferente>
            <div className="container-fluid px-3 mt-4">
                <h5 className="text-white mb-3">Mis Habilidades</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="card h-100" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-body">
                                <h6 style={{ color: 'rgb(10,202,154)' }} className="mb-3">Mis habilidades actuales</h6>
                                <table className="table table-borderless mb-0" style={{ fontSize: '0.88rem' }}>
                                    <thead>
                                    <tr style={{ borderBottom: '1px solid #4a5f5f', backgroundColor: '#2e3e3e' }}>
                                        <th style={{ color: 'rgb(10,202,154)', fontSize: '0.8rem', textTransform: 'uppercase', backgroundColor: '#2e3e3e' }}>Característica</th>
                                        <th className="text-center" style={{ color: 'rgb(10,202,154)', fontSize: '0.8rem', textTransform: 'uppercase', backgroundColor: '#2e3e3e' }}>Nivel</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {habilidades.map((h, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #2e3e3e', backgroundColor: '#2e3e3e' }}>
                                            <td style={{ color: '#cdd9d9', backgroundColor: '#2e3e3e' }}>{h.caracteristica.nombre}</td>
                                            <td className="text-center" style={{ color: '#cdd9d9', backgroundColor: '#2e3e3e' }}>{h.nivel}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card h-100" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-body">
                                <h6 style={{ color: 'rgb(10,202,154)' }} className="mb-3">Características</h6>
                                <span style={{ color: '#8aa8a8', fontSize: '0.78rem', textTransform: 'uppercase' }}>Ruta:</span>
                                <div className="d-flex flex-wrap gap-1 mt-1 mb-2">
                                    <span onClick={() => fetchDatos()}
                                          style={{ backgroundColor: 'rgba(10,202,154,0.18)', color: 'rgb(10,202,154)', border: '1px solid rgba(10,202,154,0.35)', padding: '1px 10px', borderRadius: '4px', fontSize: '0.78rem', cursor: 'pointer' }}>
                                        Raíces
                                    </span>
                                    {padre && (
                                        <>
                                            <span style={{ color: '#8aa8a8' }}> / </span>
                                            <span style={{ backgroundColor: 'rgba(10,202,154,0.18)', color: 'rgb(10,202,154)', border: '1px solid rgba(10,202,154,0.35)', padding: '1px 10px', borderRadius: '4px', fontSize: '0.78rem' }}>
                                                {padre.nombre}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <hr style={{ borderColor: '#2e3e3e', margin: '8px 0' }} />
                                <div style={{ color: '#8aa8a8', fontSize: '0.78rem', textTransform: 'uppercase' }} className="mb-1">Categorías</div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {caracteristicas.map((car, i) => (
                                        <li key={i} className="d-flex justify-content-between align-items-center py-1" style={{ borderBottom: '1px solid #2e3e3e', color: '#cdd9d9', fontSize: '0.87rem' }}>
                                            <span>{car.nombre}</span>
                                            {tieneHijos[car.id] && (
                                                <button onClick={() => fetchDatos(car.id)}
                                                        style={{ background: 'transparent', border: '1px solid #4a5f5f', color: '#8aa8a8', padding: '1px 10px', fontSize: '0.75rem', borderRadius: '4px', cursor: 'pointer' }}>
                                                    Entrar
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card h-100" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-body">
                                <h6 style={{ color: 'rgb(10,202,154)' }} className="mb-3">Agregar Habilidad</h6>
                                <div className="mb-3">
                                    <label style={{ color: '#8aa8a8', fontSize: '0.8rem', textTransform: 'uppercase' }} className="mb-1 d-block">Característica</label>
                                    <select className="form-select" name="caracteristicaId" value={form.caracteristicaId} onChange={handleChange}
                                            style={{ backgroundColor: '#0e1a22', border: '1px solid #4a5f5f', color: '#cdd9d9', fontSize: '0.87rem' }}>
                                        <option value="">-- Seleccione --</option>
                                        {nodosFinales.map((nodo, i) => (
                                            <option key={i} value={nodo.id}>{nodo.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label style={{ color: '#8aa8a8', fontSize: '0.8rem', textTransform: 'uppercase' }} className="mb-1 d-block">Nivel (1-5)</label>
                                    <input type="number" min="1" max="5" name="nivel" value={form.nivel} onChange={handleChange}
                                           className="form-control" style={{ backgroundColor: '#0e1a22', border: '1px solid #4a5f5f', color: '#cdd9d9', fontSize: '0.87rem' }} placeholder="1 – 5" />
                                </div>
                                <button className="btn w-100" onClick={agregarHabilidad}
                                        style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}>
                                    <i className="fa-solid fa-plus me-1"></i> Agregar
                                </button>
                                {exito && (
                                    <div className="mt-3 text-center p-2" style={{ backgroundColor: 'rgb(25,35,35)', borderRadius: '8px', border: '1px solid rgb(10,202,154)' }}>
                                        <span style={{ color: 'rgb(10,202,154)' }}>Habilidad agregada correctamente.</span>
                                    </div>
                                )}
                                {errorVacio && (
                                    <div className="mt-3 text-center p-2" style={{ backgroundColor: 'rgb(25,35,35)', borderRadius: '8px', border: '1px solid #dc3545' }}>
                                        <span style={{ color: '#dc3545' }}>Por favor seleccioná una característica y un nivel.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageOferente>
    );
}

export default MisHabilidades;