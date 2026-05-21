import Page from '../../components/layout/Page';
import { useState } from "react";

const RegistroEmpresa = () => {
    const [form, setForm] = useState({
        nombre: '', correo: '', localizacion: '', telefono: '', descripcion: ''
    });
    const [exito, setExito] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        fetch('http://localhost:8080/api/publico/registroEmpresa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(() => {
            setExito(true);
            setForm({ nombre: '', correo: '', localizacion: '', telefono: '', descripcion: '' });
        });
    };

    return (
        <Page>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div className="my-4" style={{ width: '350px' }}>
                    <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <i className="fa-solid fa-user-check" style={{ color: 'rgb(10,202,154)' }}></i>
                                <h4 className="mt-2" style={{ color: 'rgb(10,202,154)' }}>Registro Empresa</h4>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: 'rgb(10,202,154)' }}>Nombre Empresa</label>
                                <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: 'rgb(10,202,154)' }}>Correo Empresa</label>
                                <input type="email" className="form-control" name="correo" value={form.correo} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: 'rgb(10,202,154)' }}>Localización</label>
                                <input type="text" className="form-control" name="localizacion" value={form.localizacion} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: 'rgb(10,202,154)' }}>Teléfono/Celular</label>
                                <input type="number" className="form-control" name="telefono" value={form.telefono} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: 'rgb(10,202,154)' }}>Descripción</label>
                                <textarea className="form-control" name="descripcion" rows={3} value={form.descripcion} onChange={handleChange}></textarea>
                            </div>
                            <div className="text-center">
                                <button className="btn px-4"
                                        style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 600 }}
                                        onClick={handleSubmit}>
                                    Ingresar
                                </button>
                            </div>
                            {exito && (
                                <div className="mt-3 text-center p-2" style={{ backgroundColor: 'rgb(25,35,35)', borderRadius: '8px', border: '1px solid rgb(10,202,154)' }}>
                                    <i className="fa-solid fa-circle-check me-2" style={{ color: 'rgb(10,202,154)' }}></i>
                                    <span style={{ color: 'rgb(10,202,154)' }}>Registro exitoso, en espera de aprobación.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default RegistroEmpresa;