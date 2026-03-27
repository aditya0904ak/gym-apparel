import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import ClassCard from '../components/ClassCard';

const Home = () => {
    const classes = [
        { id: 1, title: 'POWER YOGA', img: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=600' },
        { id: 2, title: 'BATTLEBOX', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600' },
        { id: 3, title: 'BOXING', img: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=600' },
        { id: 4, title: 'CARDIO', img: 'https://images.unsplash.com/photo-1538805060512-e2828135b963?auto=format&fit=crop&q=80&w=600' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section style={{
                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '85vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
            }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <h1 style={{ fontSize: '5rem', lineHeight: '0.9', fontWeight: 900, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                            Start Your <br />
                            <span className="text-neon">Fitness</span> <br />
                            Journey Today
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', color: '#e0e0e0' }}>
                            Elite performance gear and world-class training environments designed to push your limits.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/shop" className="btn btn-primary">
                                Shop Collection <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <button className="btn btn-outline" onClick={() => document.getElementById('classes').scrollIntoView({ behavior: 'smooth' })}>
                                View Classes
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section style={{ padding: '8rem 0', backgroundColor: '#111' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <div style={{
                                backgroundColor: 'var(--primary)',
                                color: '#000',
                                fontWeight: 900,
                                padding: '0.5rem 1rem',
                                display: 'inline-block',
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '0.875rem'
                            }}>
                                Our Philosophy
                            </div>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '2rem', textTransform: 'uppercase' }}>
                                We Believe In <br /><span className="text-neon">Pure Potential.</span>
                            </h2>
                            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                Since our inception, Gym Warehouse has been at the forefront of the fitness revolution. We don't just provide equipment; we provide the foundation for your evolution. Our gear is tested by champions and built for everyone.
                            </p>
                            <Link to="/about" style={{ textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: 700, textTransform: 'uppercase' }}>
                                Learn more about our mission
                            </Link>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <img
                                src="https://images.unsplash.com/photo-1517963879466-e9b5ce382d69?auto=format&fit=crop&q=80&w=800"
                                alt="Gym Philosophy"
                                style={{ width: '100%', filter: 'grayscale(100%)', boxShadow: '20px 20px 0 var(--bg-card)' }}
                            />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Play fill="white" size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ padding: '4rem 0', borderTop: '1px solid #222', borderBottom: '1px solid #222', backgroundColor: '#0f0f0f' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                        {[
                            { label: 'Active Members', value: '45k+' },
                            { label: 'Global Facilities', value: '120+' },
                            { label: 'Expert Trainers', value: '300+' }
                        ].map((stat, i) => (
                            <div key={i} style={{ flex: 1, minWidth: '200px' }}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>{stat.label}</h4>
                                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{stat.value}</div>
                                <div style={{ width: '50px', height: '3px', backgroundColor: '#333', marginTop: '1rem' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Classes Section */}
            <section id="classes" style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>Our Classes</h2>
                            <p style={{ color: 'var(--text-gray)', maxWidth: '400px' }}>Dynamic sessions designed to challenge your body and sharpen your mind.</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => alert("Booking functionality coming soon!")}>
                            Book A Class
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {classes.map(cls => (
                            <ClassCard key={cls.id} {...cls} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
