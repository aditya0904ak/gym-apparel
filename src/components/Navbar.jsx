import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Mic } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '1rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    GYM <span className="text-neon">WAREHOUSE</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/shop" className="nav-link">Shop</Link>

                    {/* About → Transcriber */}
                    <Link
                        to="/transcriber"
                        className="nav-link"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                        <Mic size={15} />
                        About
                    </Link>

                    <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'var(--primary)',
                                color: 'var(--bg-dark)',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'inherit',
                        display: 'none'
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <div className="mobile-menu" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    gap: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    <Link
                        to="/transcriber"
                        className="nav-link"
                        onClick={() => setIsMenuOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                        <Mic size={15} />
                        About
                    </Link>
                    <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <ShoppingCart size={16} />
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </Link>
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-menu-btn { display: flex !important; }
                }
                @media (min-width: 769px) {
                    .mobile-menu { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;