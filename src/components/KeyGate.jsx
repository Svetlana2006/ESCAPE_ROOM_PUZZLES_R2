import React, { useState } from 'react';

const KeyGate = ({ onCorrect, expectedKey, stageNumber }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const normalizeKey = (value) => value.toUpperCase().replace(/\s+/g, '').trim();
  const validKeys = Array.isArray(expectedKey) ? expectedKey : [expectedKey];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validKeys.some((key) => normalizeKey(input) === normalizeKey(key))) {
      onCorrect();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className={`key-gate ${shaking ? 'shake' : ''}`} style={{ 
      margin: '2rem auto', 
      maxWidth: '400px',
      padding: '2rem',
      background: 'rgba(20, 2, 2, 0.8)',
      border: `1px solid ${error ? 'var(--hot-red)' : 'rgba(180, 0, 0, 0.3)'}`,
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      boxShadow: error ? '0 0 20px var(--hot-red)' : '0 10px 30px rgba(0,0,0,0.5)',
      transition: 'all 0.3s'
    }}>
      <div className="special-font" style={{ 
        color: 'var(--crimson)', 
        fontSize: '0.8rem', 
        letterSpacing: '0.2em',
        marginBottom: '1rem',
        textTransform: 'uppercase'
      }}>
        GATE {stageNumber} SECURITY PROTOCOL
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="ENTER THE KEY..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="special-font"
          style={{ 
            background: '#000', 
            border: '1px solid var(--blood)', 
            padding: '1rem', 
            color: 'var(--hot-red)',
            fontSize: '1.1rem',
            textAlign: 'center',
            outline: 'none',
            letterSpacing: '0.1em'
          }}
        />
        <button 
          className="creepy-button" 
          type="submit"
          style={{ padding: '0.8rem', fontSize: '1rem' }}
        >
          UNLOCK
        </button>
      </form>
      
      {error && (
        <div className="special-font" style={{ 
          marginTop: '1rem', 
          color: 'var(--hot-red)', 
          fontSize: '0.9rem',
          animation: 'flicker 0.2s infinite'
        }}>
          INVALID KEY. SIGNAL REJECTED.
        </div>
      )}

      <style>{`
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default KeyGate;
