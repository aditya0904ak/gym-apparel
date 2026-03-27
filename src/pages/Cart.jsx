import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const handleCheckout = () => {
        alert('Demo Checkout Successful! Thank you for your specific non-existent purchase.');
        clearCart();
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 900 }}>YOUR CART IS EMPTY</h2>
                <p style={{ color: 'var(--text-gray)', marginBottom: '2rem' }}>Looks like you haven't added any gear yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '3rem' }}>Your <span className="text-neon">Gear</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {cart.map(item => (
                        <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '1.5rem', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '5px' }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase' }}>{item.name}</h3>
                                    <button onClick={() => removeFromCart(item.id, item.size)} style={{ color: '#ff4444', backgroundColor: 'transparent' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    Size: {item.size} | <span className="text-neon">${item.price}</span>
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #333', borderRadius: '4px' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, -1)}
                                            style={{ padding: '5px 10px', backgroundColor: 'transparent', color: '#fff' }}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span style={{ padding: '0 10px', fontWeight: 700 }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, 1)}
                                            style={{ padding: '5px 10px', backgroundColor: 'transparent', color: '#fff' }}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div>
                    <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '5px', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem' }}>Order Summary</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-gray)' }}>
                            <span>Subtotal</span>
                            <span>${cartTotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-gray)' }}>
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <div style={{ height: '1px', backgroundColor: '#333', marginBottom: '2rem' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 700 }}>
                            <span>Total</span>
                            <span className="text-neon">${cartTotal}</span>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCheckout}>
                            Checkout <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;
