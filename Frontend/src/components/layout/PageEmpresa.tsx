import NavbarEmpresa from './NavbarEmpresa';
import Footer from './Footer';

const PageEmpresa = ({ children, nombreEmpresa }: { children: React.ReactNode; nombreEmpresa?: string }) => {
    return (
        <div style={{ backgroundColor: '#080f15', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavbarEmpresa nombreEmpresa={nombreEmpresa} />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageEmpresa;
