import React, { useState, useEffect } from 'react';

const Carousel = ({ images, title }) => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="carousel" style={{ 
      width: '100%', 
      maxWidth: '800px', 
      height: 'clamp(260px, 48vh, 450px)', 
      position: 'relative', 
      margin: '0 auto', 
      overflow: 'hidden',
      borderRadius: '1rem',
      border: '1px solid var(--crimson)',
      boxShadow: 'var(--shadow)',
      background: '#000'
    }}>
      <div className="carousel-inner" style={{ 
        display: 'flex', 
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: `translateX(-${index * 100}%)`,
        height: '100%'
      }}>
        {images.map((img, i) => {
          const imgSrc = img.startsWith('/') ? import.meta.env.BASE_URL + img.slice(1) : img;
          return (
          <div key={i} style={{ 
            minWidth: '100%', 
            height: '100%', 
            position: 'relative'
          }}>
            <img src={imgSrc} alt={`Slide ${i}`} style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              background: '#000',
              opacity: 0.9
            }} />
          </div>
        )})}
      </div>
      
      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="nav-btn prev" style={{
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid var(--blood)',
        color: 'var(--ash)',
        padding: '1rem',
        cursor: 'pointer',
        zIndex: 10,
        borderRadius: '50%',
        transition: 'all 0.3s'
      }}>
        &#10094;
      </button>
      <button onClick={nextSlide} className="nav-btn next" style={{
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid var(--blood)',
        color: 'var(--ash)',
        padding: '1rem',
        cursor: 'pointer',
        zIndex: 10,
        borderRadius: '50%',
        transition: 'all 0.3s'
      }}>
        &#10095;
      </button>

      <div className="carousel-overlay" style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        pointerEvents: 'none'
      }}></div>
      
      <h3 className="special-font" style={{ 
        position: 'absolute', 
        bottom: '1.5rem', 
        left: '2rem', 
        color: 'var(--ash)', 
        fontSize: '1.4rem',
        textShadow: '0 2px 4px #000',
        letterSpacing: '0.1em'
      }}>
        {title}
      </h3>
      
      <div className="carousel-indicators" style={{ 
        position: 'absolute', 
        bottom: '1.5rem', 
        right: '2rem', 
        display: 'flex', 
        gap: '0.6rem' 
      }}>
        {images.map((_, i) => (
          <div key={i} style={{ 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%', 
            background: i === index ? 'var(--hot-red)' : 'rgba(255,255,255,0.2)',
            boxShadow: i === index ? '0 0 15px var(--hot-red)' : 'none',
            transition: 'all 0.3s'
          }} />
        ))}
      </div>

      <style>{`
        .nav-btn:hover {
          background: var(--blood);
          box-shadow: 0 0 15px var(--hot-red);
          transform: translateY(-50%) scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Carousel;
