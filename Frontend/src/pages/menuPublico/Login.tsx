import Page from '../../components/layout/Page';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ correo: '', clave: '' });
    const [error, setError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => {
                if (!res.ok) { setError(true); return null; }
                return res.json();
            })
            .then(data => {
                if (!data) return;
                localStorage.setItem('token', data.token);
                localStorage.setItem('rol', data.rol);
                localStorage.setItem('nombre', data.nombre);
                if (data.rol === 'admin') navigate('/admin/dashboard');
                else if (data.rol === 'oferente') navigate('/oferente/dashboard');
                else if (data.rol === 'empresa') navigate('/empresa/dashboard');
            });
    };

    return (
        <Page>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div style={{ width: '350px' }}>
                    <div className="card" style={{ backgroundColor: 'rgb(35,46,46)', borderColor: '#4a5f5f' }}>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <i className="fa-solid fa-user-check" style={{ color: 'rgb(10,202,154)' }}></i>
                                <h4 className="mt-2" style={{ color: 'rgb(10,202,154)' }}>Login</h4>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: 'rgb(10,202,154)' }}>Correo Usuario</label>
                                <input type="email" className="form-control" name="correo" value={form.correo} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: 'rgb(10,202,154)' }}>Contraseña</label>
                                <input type="password" className="form-control" name="clave" value={form.clave} onChange={handleChange} />
                            </div>
                            <div className="text-center">
                                <button className="btn px-4"
                                        style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 600 }}
                                        onClick={handleSubmit}>
                                    Ingresar
                                </button>
                            </div>
                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    Correo o contraseña incorrectos.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default Login;