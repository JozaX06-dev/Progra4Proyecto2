import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageEmpresa from '../../components/layout/PageEmpresa';

const PublicarPuesto = () => {
    const [empresa, setEmpresa] = useState<any>(null);
    const [caracteristicas, setCaracteristicas] = useState<any[]>([]);
    const [descripcion, setDescripcion] = useState('');
    const [salario, setSalario] = useState('');
    const [esPublico, setEsPublico] = useState(1);
    const [niveles, setNiveles] = useState<{ [id: number]: number }>({});
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Cargar empresa y características al mismo tiempo
        fetch('http://localhost:8080/api/empresa/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setEmpresa(data));

        fetch('http://localhost:8080/api/empresa/publicarPuesto', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setCaracteristicas(data.caracteristicas);
                // Inicializar todos los niveles en 0
                const init: { [id: number]: number } = {};
                data.caracteristicas.forEach((c: any) => { init[c.id] = 0; });
                setNiveles(init);
            });
    }, []);

    const handleNivel = (id: number, valor: number) => {
        setNiveles(prev => ({ ...prev, [id]: valor }));
    };

    const handleSubmit = () => {
        setEnviando(true);
        const caracteristicaIds = caracteristicas.map(c => c.id);
        const nivelesArray = caracteristicas.map(c => niveles[c.id] ?? 0);

        fetch('http://localhost:8080/api/empresa/publicarPuesto', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descripcion, salario: parseFloat(salario), esPublico, caracteristicaIds, niveles: nivelesArray })
        })
            .then(() => navigate('/empresa/mis-puestos'))
            .finally(() => setEnviando(false));
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: '#0e1a22',
        border: '1px solid #4a5f5f',
        color: '#cdd9d9',
    };

    return (
        <PageEmpresa nombreEmpresa={empresa?.nombre}>
            <div className="container-fluid px-3 mt-4">
                <div className="d-flex align-items-center mb-3">
                    <h5 className="text-white">Publicar Puesto</h5>
                    <button
                        onClick={() => navigate('/empresa/mis-puestos')}
                        className="btn ms-auto"
                        style={{ backgroundColor: '#2e3e3e', color: 'white' }}>
                        <i className="fa-solid fa-arrow-left me-1"></i> Volver
                    </button>
                </div>
                <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="mb-1 d-block" style={{ color: '#8aa8a8', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                                Descripción del puesto
                            </label>
                            <textarea
                                className="form-control"
                                rows={3}
                                style={inputStyle}
                                value={descripcion}
                                onChange={e => setDescripcion(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1 d-block" style={{ color: '#8aa8a8', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                                Salario ofrecido (USD)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                style={inputStyle}
                                value={salario}
                                onChange={e => setSalario(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="mb-1 d-block" style={{ color: '#8aa8a8', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                                Tipo de publicación
                            </label>
                            <select
                                className="form-select"
                                style={inputStyle}
                                value={esPublico}
                                onChange={e => setEsPublico(Number(e.target.value))}>
                                <option value={1}>Público</option>
                                <option value={0}>Privado</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <h6 style={{ color: 'rgb(10,202,154)' }}>Características requeridas</h6>
                            <p style={{ color: '#8aa8a8', fontSize: '0.8rem' }}>
                                Ingresá el nivel deseado (1-5) para cada característica que aplique. Dejá en 0 las que no apliquen.
                            </p>
                            <table className="table table-borderless mb-0" style={{ color: '#cdd9d9', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #4a5f5f' }}>
                                        <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent' }}>Característica</th>
                                        <th style={{ color: 'rgb(10,202,154)', backgroundColor: 'transparent', width: '180px' }}>Nivel deseado (0 = no aplica)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {caracteristicas.map(car => (
                                        <tr key={car.id} style={{ borderBottom: '1px solid #2e3e3e' }}>
                                            <td style={{ color: '#cdd9d9', backgroundColor: 'transparent' }}>{car.nombre}</td>
                                            <td style={{ backgroundColor: 'transparent' }}>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={5}
                                                    className="form-control form-control-sm"
                                                    style={{ ...inputStyle, width: '80px' }}
                                                    value={niveles[car.id] ?? 0}
                                                    onChange={e => handleNivel(car.id, Number(e.target.value))}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-end">
                            <button
                                onClick={handleSubmit}
                                disabled={enviando}
                                className="btn"
                                style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}>
                                <i className="fa-solid fa-check me-1"></i>
                                {enviando ? 'Publicando...' : 'Publicar Puesto'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageEmpresa>
    );
};

export default PublicarPuesto;
