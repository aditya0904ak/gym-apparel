import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState('');
    const [added, setAdded] = useState(false);

    if (!product) {
        return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Product not found</h2><Link to="/shop" className="btn btn-outline">Back to Shop</Link></div>;
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addToCart(product, selectedSize);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', width: '100%' }}>

                {/* Image Section */}
                <div style={{ position: 'relative' }}>
                    <Link to="/shop" style={{ position: 'absolute', top: '20px', left: '20px', color: '#000', backgroundColor: 'rgba(255,255,255,0.7)', padding: '5px 10px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700, zIndex: 10 }}>
                        <ArrowLeft size={16} /> Back
                    </Link>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', borderRadius: '5px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    />
                </div>

                {/* Details Section */}
                <div>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>{product.category}</h4>
                    <h1 style={{ fontSize: '3rem', lineHeight: '1', marginBottom: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>{product.name}</h1>
                    <p style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>${product.price}</p>

                    <p style={{ color: 'var(--text-gray)', marginBottom: '3rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
                        {product.description}
                    </p>

                    <div style={{ marginBottom: '3rem' }}>
                        <h5 style={{ marginBottom: '1rem', textTransform: 'uppercase', color: 'var(--text-gray)' }}>Select Size</h5>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '5px',
                                        border: selectedSize === size ? '2px solid var(--primary)' : '1px solid #333',
                                        backgroundColor: selectedSize === size ? 'rgba(180, 240, 0, 0.1)' : 'transparent',
                                        color: selectedSize === size ? 'var(--primary)' : 'var(--text-gray)',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleAddToCart}
                        style={{ width: '100%', maxWidth: '300px', display: 'flex', justifyContent: 'center', gap: '1rem' }}
                    >
                        {added ? (
                            <>Added to Cart <Check size={20} /></>
                        ) : (
                            <>Add to Cart <ShoppingBag size={20} /></>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;
