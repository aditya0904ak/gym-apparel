import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        // Default to first size if not specified, simpler for grid view
        addToCart(product, product.sizes[0]);
    };

    return (
        <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', transition: 'transform 0.3s ease', height: '100%', position: 'relative', overflow: 'hidden', group: 'card' }} className="product-card">
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="product-image"
                    />
                    <button
                        onClick={handleAddToCart}
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--bg-dark)',
                            padding: '10px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <ShoppingBag size={20} />
                    </button>
                </div>

                <div style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                        {product.category}
                    </p>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-light)' }}>
                        {product.name}
                    </h3>
                    <p style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        ${product.price}
                    </p>
                </div>
            </div>
            <style>{`
        .product-card:hover { transform: translateY(-5px); }
        .product-card:hover .product-image { transform: scale(1.05); }
      `}</style>
        </Link>
    );
};

export default ProductCard;
