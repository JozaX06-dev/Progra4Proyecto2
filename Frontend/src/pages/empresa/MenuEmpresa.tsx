import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageEmpresa from '../../components/layout/PageEmpresa';

const MenuEmpresa = () => {
    const [empresa, setEmpresa] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/empresa/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setEmpresa(data))
            .catch(() => navigate('/login'));
    }, []);

    return (
        <PageEmpresa nombreEmpresa={empresa?.nombre}>
            <main className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
                <div className="my-4 text-center">
                    <h3 className="text-white">Empresa - Dashboard</h3>
                    <p className="text-white-50">Desde aquí podés administrar tus puestos y buscar candidatos.</p>
                    <div className="d-flex gap-3 justify-content-center">
                        <button
                            onClick={() => navigate('/empresa/mis-puestos')}
                            className="btn px-4"
                            style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 600 }}>
                            Ver mis puestos
                        </button>
                        <button
                            onClick={() => navigate('/empresa/publicar-puesto')}
                            className="btn px-4"
                            style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 600 }}>
                            Publicar nuevo puesto
                        </button>
                    </div>
                </div>
            </main>
        </PageEmpresa>
    );
};

export default MenuEmpresa;
