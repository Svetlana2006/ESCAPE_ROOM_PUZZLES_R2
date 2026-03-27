import React from 'react';

const Atmosphere = () => {
  return (
    <>
      <div className="scanlines" aria-hidden="true"></div>
      <div className="grain" aria-hidden="true"></div>
      <div className="lava-floor" aria-hidden="true"></div>
      <div className="spores" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
          <span 
            key={i} 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDuration: `${15 + Math.random() * 15}s`,
              animationDelay: `-${Math.random() * 20}s`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          ></span>
        ))}
      </div>
    </>
  );
};

export default Atmosphere;
