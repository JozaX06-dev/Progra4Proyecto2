import NavbarAdmin from './NavbarAdmin';
import Footer from './Footer';

const PageAdmin = ({ children, correoAdmin }: { children: React.ReactNode; correoAdmin?: string }) => {
    return (
        <div style={{ backgroundColor: '#080f15', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavbarAdmin correoAdmin={correoAdmin} />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageAdmin;
