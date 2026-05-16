import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<div>MenuPartePublicar</div>} />
            <Route path="/buscar" element={<div>BuscarPuestos</div>} />
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/registro/empresa" element={<div>RegistroEmpresa</div>} />
            <Route path="/registro/oferente" element={<div>RegistroOferente</div>} />
            <Route path="/oferente/dashboard" element={<div>Dashboard Oferente</div>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
