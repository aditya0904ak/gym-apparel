import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#000', padding: '4rem 0', marginTop: 'auto', borderTop: '1px solid #222' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                            Gym <span className="text-neon">Warehouse</span>
                        </h3>
                        <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                            Elevating performance since 1994. Premium gear for the dedicated athlete.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Instagram size={20} className="text-neon" />
                            <Twitter size={20} className="text-neon" />
                            <Youtube size={20} className="text-neon" />
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Shop</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-gray)' }}>
                            <Link to="/shop">New Arrivals</Link>
                            <Link to="/shop">Best Sellers</Link>
                            <Link to="/shop">Accessories</Link>
                            <Link to="/shop">Sale</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Support</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-gray)' }}>
                            <Link to="/about">About Us</Link>
                            <Link to="#">Contact</Link>
                            <Link to="#">Shipping & Returns</Link>
                            <Link to="#">Privacy Policy</Link>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #222', textAlign: 'center', color: '#444', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} Gym Warehouse. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
