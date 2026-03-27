const About = () => {
    return (
        <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem', lineHeight: 0.9 }}>
                    Forged In <br /><span className="text-neon">The Iron.</span>
                </h1>

                <p style={{ fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '2rem', color: '#e0e0e0' }}>
                    Gym Warehouse wasn't born in a boardroom. It started in a garage with one squat rack and a vision: to create gear that withstands the absolute worst you can throw at it.
                </p>

                <div style={{ height: '2px', width: '100px', backgroundColor: 'var(--primary)', margin: '3rem auto' }}></div>

                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-gray)', marginBottom: '3rem' }}>
                    We believe fitness isn't a hobby—it's a discipline. Our mission is to equip the dedicated
                    with premium apparel and training tools that enhance performance. We don't chase trends.
                    We chase PBs. We build for the athletes who are the first to arrive and the last to leave.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                    {[
                        { title: "Quality", desc: "Military-grade materials suited for elite performance." },
                        { title: "Design", desc: "Minimalist aesthetics that focus on function first." },
                        { title: "Community", desc: "A global network of athletes pushing boundaries." }
                    ].map((item, i) => (
                        <div key={i} style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '5px' }}>
                            <h3 style={{ color: 'var(--primary)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
