const ClassCard = ({ title, img }) => {
    return (
        <div style={{ position: 'relative', height: '400px', overflow: 'hidden', cursor: 'pointer' }} className="class-card">
            <img
                src={img}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.7)', transition: 'all 0.5s ease' }}
                className="class-image"
            />

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: '2rem',
                width: '100%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
            }}>
                <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--primary)', marginBottom: '1rem' }}></div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>{title}</h3>
            </div>

            <style>{`
        .class-card:hover .class-image { filter: grayscale(0%) brightness(1); transform: scale(1.05); }
      `}</style>
        </div>
    );
};

export default ClassCard;
