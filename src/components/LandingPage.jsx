import React from 'react';

const LandingPage = ({ onEnter }) => {
  return (
    <div className="landing-page" style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="eyebrow special-font" style={{ color: 'var(--crimson)', letterSpacing: '0.3em', marginBottom: '1rem' }}>
        CONVOKE 8.0 PRESENTS
      </div>
      <h1 className="creepy-title" data-text="PUZZLE ARENA" style={{ marginBottom: '2rem' }}>
        PUZZLE ARENA
      </h1>
      <p className="special-font" style={{ fontSize: '1.2rem', color: 'var(--faint)', maxWidth: '600px', lineHeight: '1.6', marginBottom: '3rem' }}>
        The walls are breathing. The shadows are hungry. <br />
        Are you ready to enter the playground of the lost?
      </p>
      
      <button className="creepy-button" onClick={onEnter}>
        ENTER THE RIFT
      </button>
      
      <div className="warning-text special-font" style={{ marginTop: '3rem', fontSize: '0.8rem', color: 'var(--blood)', opacity: 0.6 }}>
        Two steps in. The room locks once. No way out.
      </div>
    </div>
  );
};

export default LandingPage;
