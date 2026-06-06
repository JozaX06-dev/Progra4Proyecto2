import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageAdmin from '../../components/layout/PageAdmin';

const Caracteristicas = () => {
    const [admin, setAdmin] = useState<any>(null);
    const [caracteristicas, setCaracteristicas] = useState<any[]>([]);
    const [tieneHijos, setTieneHijos] = useState<{ [id: number]: boolean }>({});
    const [todasRaices, setTodasRaices] = useState<any[]>([]);
    const [padre, setPadre] = useState<any>(null);
    const [historial, setHistorial] = useState<{ id: number; nombre: string }[]>([]);
    const [nombre, setNombre] = useState('');
    const [padreId, setPadreId] = useState<string>('');
    const [errorForm, setErrorForm] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const cargarRaices = () => {
        fetch('http://localhost:8080/api/admin/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setAdmin(data));

        fetch('http://localhost:8080/api/admin/caracteristicas', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setCaracteristicas(data.caracteristicas);
                setTieneHijos(data.tieneHijos);
                setTodasRaices(data.caracteristicas);
                setPadre(null);
                setHistorial([]);
            })
            .catch(() => navigate('/login'));
    };

    const cargarHijos = (id: number, nodoPadre: { id: number; nombre: string }) => {
        fetch(`http://localhost:8080/api/admin/caracteristicas/hijos/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setCaracteristicas(data.caracteristicas);
                setTieneHijos(data.tieneHijos);
                setPadre(data.padre);
                setHistorial(prev => [...prev, nodoPadre]);
            });
    };

    // Navegar a un nodo del historial (incluyendo raíces)
    const navegarA = (index: number) => {
        if (index === -1) {
            // Raíces
            cargarRaices();
        } else {
            // Reconstruir: ir al nodo del historial en esa posición
            const nodo = historial[index];
            // Limpiar el historial hasta ese punto y cargar sus hijos
            const nuevoHistorial = historial.slice(0, index);
            fetch(`http://localhost:8080/api/admin/caracteristicas/hijos/${nodo.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    setCaracteristicas(data.caracteristicas);
                    setTieneHijos(data.tieneHijos);
                    setPadre(data.padre);
                    setHistorial(nuevoHistorial);
                });
        }
    };

    useEffect(() => { cargarRaices(); }, []);

    const crearCaracteristica = () => {
        if (!nombre.trim()) {
            setErrorForm('El nombre de la característica es obligatorio.');
            return;
        }
        setErrorForm(null);
        fetch('http://localhost:8080/api/admin/crearCaracteristica', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre.trim(), padreId: padreId ? parseInt(padreId) : null })
        })
            .then(() => {
                setNombre('');
                setPadreId('');
                if (padre) {
                    cargarHijos(padre.id, historial[historial.length - 1] ?? padre);
                } else {
                    cargarRaices();
                }
            });
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: '#0e1a22',
        border: '1px solid #4a5f5f',
        color: '#cdd9d9',
    };

    const breadcrumbBtn = (onClick: () => void, label: string, isLast: boolean): React.ReactNode => (
        <button
            onClick={onClick}
            style={{
                backgroundColor: 'rgba(10,202,154,0.18)',
                color: 'rgb(10,202,154)',
                border: '1px solid rgba(10,202,154,0.35)',
                padding: '2px 10px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: isLast ? 'default' : 'pointer',
                opacity: isLast ? 0.6 : 1,
            }}>
            {label}
        </button>
    );

    return (
        <PageAdmin correoAdmin={admin?.usuario?.correo}>
            <div className="container-fluid px-3 mt-4">
                <h5 className="text-white mb-3">Características</h5>
                <div className="row g-3">
                    {/* Lista */}
                    <div className="col-md-7">
                        <div className="card h-100" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-body">
                                {/* Breadcrumb navegable */}
                                <span style={{ color: '#8aa8a8', fontSize: '0.8rem' }}>Ruta:</span>
                                <div className="mt-1 mb-3" style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                                    {breadcrumbBtn(() => navegarA(-1), 'Raíces', historial.length === 0 && !padre)}
                                    {historial.map((h, i) => (
                                        <span key={h.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ color: '#8aa8a8' }}>/</span>
                                            {breadcrumbBtn(() => navegarA(i), h.nombre, i === historial.length - 1 && !padre)}
                                        </span>
                                    ))}
                                    {padre && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ color: '#8aa8a8' }}>/</span>
                                            {breadcrumbBtn(() => {}, padre.nombre, true)}
                                        </span>
                                    )}
                                </div>

                                <div style={{ color: '#8aa8a8', fontSize: '0.8rem' }} className="mb-2">Categorías</div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {caracteristicas.length === 0 && (
                                        <li style={{ color: '#8aa8a8', padding: '8px 0' }}>Sin subcategorías.</li>
                                    )}
                                    {caracteristicas.map((car: any) => (
                                        <li key={car.id}
                                            className="d-flex justify-content-between align-items-center py-2"
                                            style={{ borderBottom: '1px solid #2e3e3e', color: '#cdd9d9' }}>
                                            <span>{car.nombre}</span>
                                            {tieneHijos[car.id] && (
                                                <button
                                                    onClick={() => cargarHijos(car.id, car)}
                                                    style={{ background: 'transparent', border: '1px solid #4a5f5f', color: '#8aa8a8', padding: '2px 10px', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>
                                                    Entrar
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="col-md-5">
                        <div className="card h-100" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-body">
                                <h6 style={{ color: 'rgb(10,202,154)' }} className="mb-3">Agregar Característica</h6>

                                {errorForm && (
                                    <div className="mb-3" style={{ backgroundColor: 'rgba(180,50,50,0.2)', border: '1px solid #7a2f2f', color: '#f5a0a0', padding: '8px 12px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                        <i className="fa-solid fa-circle-exclamation me-2"></i>{errorForm}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="mb-1 d-block" style={{ color: '#8aa8a8', fontSize: '0.8rem' }}>
                                        Nombre <span style={{ color: '#f5a0a0' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ ...inputStyle, borderColor: errorForm ? '#7a2f2f' : '#4a5f5f' }}
                                        value={nombre}
                                        onChange={e => { setNombre(e.target.value); setErrorForm(null); }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1 d-block" style={{ color: '#8aa8a8', fontSize: '0.8rem' }}>Padre</label>
                                    <select
                                        className="form-select"
                                        style={inputStyle}
                                        value={padreId}
                                        onChange={e => setPadreId(e.target.value)}>
                                        <option value="">Sin padre (raíz)</option>
                                        {todasRaices.map((car: any) => (
                                            <option key={car.id} value={car.id}>{car.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={crearCaracteristica}
                                    className="btn"
                                    style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}>
                                    <i className="fa-solid fa-plus me-1"></i> Crear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageAdmin>
    );
};

export default Caracteristicas;
