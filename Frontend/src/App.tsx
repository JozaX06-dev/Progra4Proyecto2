import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPartePublica from './pages/menuPublico/MenuPartePublica';
import BuscarPuestos from './pages/menuPublico/BuscarPuestos';
import Login from './pages/menuPublico/Login';
import RegistroEmpresa from './pages/menuPublico/RegistroEmpresa';
import RegistroOferente from './pages/menuPublico/RegistroOferente';
import MenuOferente from './pages/oferente/MenuOferente';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuPartePublica />} />
                <Route path="/buscar" element={<BuscarPuestos />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro/empresa" element={<RegistroEmpresa />} />
                <Route path="/registro/oferente" element={<RegistroOferente />} />
                <Route path="/oferente/dashboard" element={<MenuOferente />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;