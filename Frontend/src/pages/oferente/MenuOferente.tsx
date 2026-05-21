import PageOferente from '../../components/layout/PageOferente';
import { Link } from 'react-router-dom';

const MenuOferente = () => {
    return (
        <PageOferente>
            <div className="my-4 text-center">
                <h3 className="text-white">Oferente - Dashboard</h3>
                <p className="text-white-50">Administra tus habilidades y tu CV</p>
                <div className="d-flex gap-3 justify-content-center">
                    <Link to="/oferente/misHabilidades" className="btn px-4"
                          style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 600 }}>
                        Mis Habilidades
                    </Link>
                    <Link to="/oferente/miCV" className="btn px-4"
                          style={{ backgroundColor: 'rgb(10,202,154)', color: '#080f15', fontWeight: 600 }}>
                        Mi CV
                    </Link>
                </div>
            </div>
        </PageOferente>
    );
}

export default MenuOferente;