import PageOferente from '../../components/layout/PageOferente';
import { useState, useEffect } from "react";
import { fetchConAuth } from '../../services/api';

const MiCV = () => {
    const [tieneCV, setTieneCV] = useState(false);
    const [archivo, setArchivo] = useState<File | null>(null);
    const [exito, setExito] = useState(false);

    useEffect(() => {
        fetchConAuth('http://localhost:8080/api/oferente/miCV')
            .then(res => res.json())
            .then(data => setTieneCV(data.cv !== null))
            .catch(() => {});
    }, []);

    const subirCV = () => {
        if (!archivo) return;
        const formData = new FormData();
        formData.append('cv', archivo);
        fetchConAuth('http://localhost:8080/api/oferente/subirCV', {
            method: 'POST',
            body: formData
        })
            .then(() => {
                setExito(true);
                setTieneCV(true);
            })
            .catch(() => {});
    };

    const revisarCV = () => {
        fetchConAuth('http://localhost:8080/api/oferente/revisarCV')
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');
            })
            .catch(() => {});
    };

    return (
        <PageOferente>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div style={{ width: '550px' }}>
                    <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                        <div className="card-body">
                            <h5 className="text-center mb-4" style={{ color: 'rgb(10,202,154)' }}>Mi CV</h5>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#8aa8a8' }}>Seleccionar CV (PDF)</label>
                                <input className="form-control" type="file" accept=".pdf"
                                       style={{ backgroundColor: '#0e1a22', border: '1px solid #4a5f5f', color: '#cdd9d9' }}
                                       onChange={e => setArchivo(e.target.files?.[0] || null)} />
                            </div>
                            <button className="btn w-100 mb-2" onClick={subirCV}
                                    style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 700 }}>
                                <i className="fa-solid fa-upload me-1"></i> Subir CV
                            </button>
                            {tieneCV && (
                                <button className="btn w-100" onClick={revisarCV}
                                        style={{ backgroundColor: '#2e3e3e', color: '#cdd9d9', fontWeight: 700 }}>
                                    Revisar CV
                                </button>
                            )}
                            {exito && (
                                <div className="mt-3 text-center p-2" style={{ backgroundColor: 'rgb(25,35,35)', borderRadius: '8px', border: '1px solid rgb(10,202,154)' }}>
                                    <span style={{ color: 'rgb(10,202,154)' }}>CV subido correctamente.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PageOferente>
    );
}

export default MiCV;