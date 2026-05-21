import NavbarPublico from './NavbarPublico';
import Footer from './Footer';

const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ backgroundColor: '#080f15', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavbarPublico />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Page;