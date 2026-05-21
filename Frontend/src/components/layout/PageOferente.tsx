import NavbarOferente from './NavbarOferente';
import Footer from './Footer';

const PageOferente = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ backgroundColor: '#080f15', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavbarOferente />
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default PageOferente;