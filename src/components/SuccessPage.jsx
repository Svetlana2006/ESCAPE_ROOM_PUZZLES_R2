import React from 'react';

const SuccessPage = () => {
  return (
    <div className="success-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
      zIndex: 10
    }}>
      <h1 className="creepy-title" data-text="VICTORY" style={{ marginBottom: '2rem', color: '#fff', textShadow: '0 0 20px #888' }}>
        THE EXIT IS OPEN
      </h1>
      <p className="special-font" style={{ fontSize: '1.2rem', color: 'var(--ash)', maxWidth: '600px', lineHeight: '1.6', marginBottom: '3rem' }}>
        You solved the full Guess the Movie sequence and closed the Janise case file. <br />
        Every gate is open and the final challenge is complete.
      </p>

      <button className="creepy-button" onClick={() => window.location.reload()}>
        RETURN TO START
      </button>

      <div className="warning-text special-font" style={{ marginTop: '3rem', fontSize: '0.8rem', color: 'var(--crimson)', opacity: 0.6 }}>
        Do not look back. The room is closing.
      </div>
    </div>
  );
};

export default SuccessPage;
