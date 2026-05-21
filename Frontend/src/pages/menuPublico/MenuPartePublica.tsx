import Page from '../../components/layout/Page';
import PuestoCards from '../../components/cards/PuestoCards';
import { useState, useEffect } from "react";

const MenuPartePublica = () => {
    const [puestos, setPuestos] = useState<any[]>([]);
    const [tipoCambio, setTipoCambio] = useState<number>(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/publico/')
            .then(res => res.json())
            .then(data => {
                setPuestos(data.puestos);
                setTipoCambio(data.tipoCambio);
            });
    }, []);

    useEffect(() => {
        const bootstrap = (window as any).bootstrap;
        if (bootstrap) {
            const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
            popoverTriggerList.forEach(el => new bootstrap.Popover(el));
        }
    }, [puestos]);

    return (
        <Page>
            <div className="container mt-4">
                <h3 className="text-white">Bolsa de Empleo</h3>
                <h5 className="text-white-50">Últimos 5 puestos públicos</h5>
                <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                    {puestos.map((puesto, index) => (
                        <PuestoCards key={index} puesto={puesto} tipoCambio={tipoCambio} />
                    ))}
                </div>
            </div>
        </Page>
    );
}

export default MenuPartePublica;