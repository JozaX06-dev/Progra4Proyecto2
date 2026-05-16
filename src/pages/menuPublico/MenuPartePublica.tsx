import { useEffect, useState } from 'react';
import NavbarPublico from '../../components/layout/NavbarPublico';

interface Puesto {
    id: number;
    empresa: { nombre: string };
    descripcion: string;
    salario: number;
    caracteristicas: {nombre: string; nivel: number }[];
}

const MenuPartePublica = () => {
    const [publico, setPublico] = useState<Puesto[]>([]);
    const [tipoCambio, setTipoCambio] = useState<number>(650);
    const [hoverId, setHoverId] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/puestos/recientes')
            .then(res => res.json())
            .then(data => setPuestos(data));

        fetch('https://api.hacienda.go.cr/indicadores/tc/dolar')
            .then(res => res.json())
            .then(data => setTipoCambio(parseFloat(data.venta.valor)))
            .catch(()=> setTipoCambio(650));
    }, []);

    return (
        <div style={{ backgroundColor: '#080f15', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavbarPublico />
            <main style={{ flexGrow: 1 }}>
                <div className="container mt-4">
                    <h3 className="text-white">Bolsa de Empleo</h3>
                    <h5 className="text-white-50">Últimos 5 puestos públicos</h5>
                    <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                        {puestos.map((puesto) => (
                            <div className="col" key={puesto.id}>
                                <div
                                    className="card h-100"
                                    style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f', position: 'relative' }}
                                    onMouseEnter={() => setHoverId(puesto.id)}
                                    onMouseLeave={() => setHoverId(null)}
                                >
                                    <div className="card-body">
                                        <h5 style={{ color: 'rgb(10,202,154)' }}>{puesto.empresa.nombre}</h5>
                                        <p className="card-text text-white">{puesto.descripcion}</p>
                                        <p className="card-text" style={{ color: '#cdd9d9' }}>$ {puesto.salario} USD</p>
                                        <p className="card-text" style={{ color: '#8aa8a8', fontSize: '0.9rem' }}>
                                            ₡ {(puesto.salario * tipoCambio).toLocaleString('es-CR', { maximumFractionDigits: 0 })} CRC
                                        </p>
                                        <button
                                            className="btn btn-sm"
                                            style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}
                                        >
                                            Ver Detalles
                                        </button>
                                    </div>

                                    {hoverId === puesto.id && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: '105%',
                                            backgroundColor: 'rgb(35,46,46)',
                                            border: '1px solid #4a5f5f',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            minWidth: '200px',
                                            zIndex: 100,
                                            color: 'white'
                                        }}>
                                            <p className="fw-bold mb-2" style={{ color: 'rgb(10,202,154)' }}>Requisitos</p>
                                            <ul className="mb-0 ps-3">
                                                {puesto.caracteristicas.map((c, i) => (
                                                    <li key={i} style={{ fontSize: '0.9rem' }}>{c.nombre} - Nivel {c.nivel}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MenuPartePublica;