import Page from '../../components/layout/Page';
import { useState, useEffect } from "react";

const BuscarPuestos = () => {
    const [caracteristicas, setCaracteristicas] = useState<any[]>([]);
    const [tieneHijos, setTieneHijos] = useState<any>({});
    const [niveles, setNiveles] = useState<any>({});
    const [tipoCambio, setTipoCambio] = useState<number>(0);
    const [seleccionados, setSeleccionados] = useState<number[]>([]);
    const [resultados, setResultados] = useState<any[] | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/publico/buscarPuestos')
            .then(res => res.json())
            .then(data => {
                setCaracteristicas(data.caracteristicas);
                setTieneHijos(data.tieneHijos);
                setNiveles(data.niveles);
                setTipoCambio(data.tipoCambio);
            });
    }, []);

    const handleCheck = (id: number) => {
        setSeleccionados(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const buscar = () => {
        fetch('http://localhost:8080/api/publico/buscarPuestos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(seleccionados)
        })
            .then(res => res.json())
            .then(data => setResultados(data));
    };

    const limpiar = () => {
        setSeleccionados([]);
        setResultados(null);
    };

    return (
        <Page>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-header fw-bold text-white" style={{ backgroundColor: 'rgb(25,35,35)' }}>
                                Buscar puestos por características
                            </div>
                            <div className="card-body">
                                {caracteristicas.map((car, index) => (
                                    <div key={index}>
                                        {tieneHijos[car.id] ? (
                                            <div className="mt-2 mb-1 fw-bold"
                                                 style={{ color: 'rgb(10,202,154)', marginLeft: `${niveles[car.id] * 20}px` }}>
                                                {car.nombre}
                                            </div>
                                        ) : (
                                            <div className="form-check"
                                                 style={{ marginLeft: `${niveles[car.id] * 20}px` }}>
                                                <input className="form-check-input" type="checkbox"
                                                       id={`car${car.id}`}
                                                       checked={seleccionados.includes(car.id)}
                                                       onChange={() => handleCheck(car.id)} />
                                                <label className="form-check-label text-white" htmlFor={`car${car.id}`}>
                                                    {car.nombre}
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="card-footer" style={{ backgroundColor: 'rgb(25,35,35)', borderColor: '#4a5f5f' }}>
                                <button className="btn px-4 me-2"
                                        style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 600 }}
                                        onClick={buscar}>
                                    Buscar
                                </button>
                                <button className="btn px-4"
                                        style={{ backgroundColor: '#2e3e3e', color: '#cdd9d9', fontWeight: 600 }}
                                        onClick={limpiar}>
                                    Limpiar
                                </button>
                            </div>
                        </div>

                        <div className="card mt-4 mb-4" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                            <div className="card-header fw-bold text-white" style={{ backgroundColor: 'rgb(25,35,35)' }}>
                                Resultados de búsqueda
                            </div>
                            <div className="card-body">
                                {resultados === null && (
                                    <p style={{ color: '#8aa8a8' }}>Seleccioná características y presioná Buscar.</p>
                                )}
                                {resultados !== null && resultados.length === 0 && (
                                    <p style={{ color: '#8aa8a8' }}>No se encontraron puestos.</p>
                                )}
                                {resultados !== null && resultados.map((puesto, index) => (
                                    <div key={index} className="mb-3 pb-3" style={{ borderBottom: '1px solid #4a5f5f' }}>
                                        <h5 style={{ color: 'rgb(10,202,154)' }}>{puesto.empresa.nombre}</h5>
                                        <p style={{ color: '#cdd9d9', margin: 0 }}>{puesto.descripcion}</p>
                                        <p style={{ color: '#8aa8a8' }}>
                                            Salario: $ {puesto.salario} USD — ₡ {(puesto.salario * tipoCambio).toLocaleString('es-CR', { maximumFractionDigits: 0 })} CRC
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default BuscarPuestos;