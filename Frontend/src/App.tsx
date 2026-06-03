import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPartePublica from './pages/menuPublico/MenuPartePublica';
import BuscarPuestos from './pages/menuPublico/BuscarPuestos';
import Login from './pages/menuPublico/Login';
import RegistroEmpresa from './pages/menuPublico/RegistroEmpresa';
import RegistroOferente from './pages/menuPublico/RegistroOferente';
import MenuOferente from './pages/oferente/MenuOferente';
// Empresa
import MenuEmpresa from './pages/empresa/MenuEmpresa';
import MisPuestos from './pages/empresa/MisPuestos';
import PublicarPuesto from './pages/empresa/PublicarPuesto';
import BuscarCandidatos from './pages/empresa/BuscarCandidatos';
import DetalleOferente from './pages/empresa/DetalleOferente';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Público */}
                <Route path="/" element={<MenuPartePublica />} />
                <Route path="/buscar" element={<BuscarPuestos />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro/empresa" element={<RegistroEmpresa />} />
                <Route path="/registro/oferente" element={<RegistroOferente />} />
                {/* Oferente */}
                <Route path="/oferente/dashboard" element={<MenuOferente />} />
                {/* Empresa */}
                <Route path="/empresa/dashboard" element={<MenuEmpresa />} />
                <Route path="/empresa/mis-puestos" element={<MisPuestos />} />
                <Route path="/empresa/publicar-puesto" element={<PublicarPuesto />} />
                <Route path="/empresa/buscar-candidatos/:puestoId" element={<BuscarCandidatos />} />
                <Route path="/empresa/detalle-oferente/:oferenteId" element={<DetalleOferente />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
