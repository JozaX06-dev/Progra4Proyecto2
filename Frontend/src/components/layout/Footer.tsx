import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-2" style={{ backgroundColor: 'rgb(36,47,47)' }}>
            <div className="d-flex align-items-center px-3">
                <div className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-briefcase text-white"></i>
                    <span className="text-white fw-bold">Bolsa de Empleo</span>
                </div>
                <div className="ms-auto text-end">
                    <div className="text-white-50" style={{ fontSize: '0.85rem' }}>jozabad.mejia.esquivel@est.una.ac.cr</div>
                    <div className="text-white-50" style={{ fontSize: '0.85rem' }}>hernan.sanchez.chavez@est.una.ac.cr</div>
                    <div className="text-white-50" style={{ fontSize: '0.85rem' }}>Créditos: Jozabad Mejía y Hernán Sánchez</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;