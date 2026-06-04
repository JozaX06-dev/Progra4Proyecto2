import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
// Público
import MenuPartePublica from './pages/menuPublico/MenuPartePublica';
import BuscarPuestos from './pages/menuPublico/BuscarPuestos';
import Login from './pages/menuPublico/Login';
import RegistroEmpresa from './pages/menuPublico/RegistroEmpresa';
import RegistroOferente from './pages/menuPublico/RegistroOferente';
// Oferente
import MenuOferente from './pages/oferente/MenuOferente';
import MisHabilidades from './pages/oferente/MisHabilidades';
import MiCV from './pages/oferente/MiCV';
// Empresa
import MenuEmpresa from './pages/empresa/MenuEmpresa';
import MisPuestos from './pages/empresa/MisPuestos';
import PublicarPuesto from './pages/empresa/PublicarPuesto';
import BuscarCandidatos from './pages/empresa/BuscarCandidatos';
import DetalleOferente from './pages/empresa/DetalleOferente';
// Admin
import MenuAdmin from './pages/admin/MenuAdmin';
import EmpresasPendientes from './pages/admin/EmpresasPendientes';
import OferentesPendientes from './pages/admin/OferentesPendientes';
import Caracteristicas from './pages/admin/Caracteristicas';
import Reportes from './pages/admin/Reportes';

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
                <Route path="/oferente/dashboard" element={<ProtectedRoute><MenuOferente /></ProtectedRoute>} />
                <Route path="/oferente/misHabilidades" element={<ProtectedRoute><MisHabilidades /></ProtectedRoute>} />
                <Route path="/oferente/miCV" element={<ProtectedRoute><MiCV /></ProtectedRoute>} />
                {/* Empresa */}
                <Route path="/empresa/dashboard" element={<ProtectedRoute><MenuEmpresa /></ProtectedRoute>} />
                <Route path="/empresa/mis-puestos" element={<ProtectedRoute><MisPuestos /></ProtectedRoute>} />
                <Route path="/empresa/publicar-puesto" element={<ProtectedRoute><PublicarPuesto /></ProtectedRoute>} />
                <Route path="/empresa/buscar-candidatos/:puestoId" element={<ProtectedRoute><BuscarCandidatos /></ProtectedRoute>} />
                <Route path="/empresa/detalle-oferente/:oferenteId" element={<ProtectedRoute><DetalleOferente /></ProtectedRoute>} />
                {/* Admin */}
                <Route path="/admin/dashboard" element={<ProtectedRoute><MenuAdmin /></ProtectedRoute>} />
                <Route path="/admin/empresas-pendientes" element={<ProtectedRoute><EmpresasPendientes /></ProtectedRoute>} />
                <Route path="/admin/oferentes-pendientes" element={<ProtectedRoute><OferentesPendientes /></ProtectedRoute>} />
                <Route path="/admin/caracteristicas" element={<ProtectedRoute><Caracteristicas /></ProtectedRoute>} />
                <Route path="/admin/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;