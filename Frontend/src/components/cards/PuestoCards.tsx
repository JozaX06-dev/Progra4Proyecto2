import { useState } from 'react';

interface PuestoCardProps {
    puesto: any;
    tipoCambio: number;
}

const PuestoCards = ({ puesto, tipoCambio }: PuestoCardProps) => {
    const [hover, setHover] = useState(false);

    return (
        <div className="col">
            <div className="card h-100" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                <div className="card-body">
                    <h5 style={{ color: 'rgb(10,202,154)' }}>{puesto.empresa.nombre}</h5>
                    <p className="card-text text-white">{puesto.descripcion}</p>
                    <p className="card-text" style={{ color: '#cdd9d9' }}>$ {puesto.salario} USD</p>
                    <p className="card-text" style={{ color: '#8aa8a8', fontSize: '0.9rem' }}>
                        ₡ {(puesto.salario * tipoCambio).toLocaleString('es-CR', { maximumFractionDigits: 0 })} CRC
                    </p>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button type="button" className="btn btn-sm"
                                style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}>
                            Ver Detalles
                        </button>
                        {hover && (
                            <div style={{
                                position: 'absolute', top: 0, left: '105%',
                                backgroundColor: 'rgb(35,46,46)', border: '1px solid #4a5f5f',
                                borderRadius: '8px', padding: '12px', zIndex: 999,
                                minWidth: '200px', color: 'white', whiteSpace: 'nowrap'
                            }}>
                                <h6 style={{ color: 'rgb(10,202,154)' }}>Detalles</h6>
                                <p className="mb-1">{puesto.descripcion}</p>
                                <p className="mb-0" style={{ color: '#cdd9d9' }}>$ {puesto.salario} USD</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PuestoCards;