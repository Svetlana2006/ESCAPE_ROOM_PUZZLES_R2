import React, { useState } from 'react';

const normalizeKey = (value) => value.toUpperCase().replace(/\s+/g, '').trim();

const MovieFinalGate = ({ movieNames, expectedKey, onCorrect }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (normalizeKey(input) === normalizeKey(expectedKey)) {
      onCorrect();
      return;
    }

    setError(true);
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
    setTimeout(() => setError(false), 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '6rem 1.25rem 3rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'relative',
      zIndex: 10
    }}>
      <div className={`movie-final-gate ${shaking ? 'shake' : ''}`} style={{
        width: '100%',
        maxWidth: '920px',
        padding: '2rem',
        borderRadius: '20px',
        border: `1px solid ${error ? 'var(--hot-red)' : 'rgba(180, 0, 0, 0.35)'}`,
        background: 'rgba(10, 0, 0, 0.82)',
        backdropFilter: 'blur(14px)',
        boxShadow: error ? '0 0 24px rgba(255, 26, 26, 0.45)' : 'var(--shadow)'
      }}>
        <div className="special-font" style={{
          color: 'var(--crimson)',
          fontSize: '0.9rem',
          letterSpacing: '0.3em',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          FINAL MOVIE GATE
        </div>

        <h1 className="creepy-title" style={{
          fontSize: 'clamp(2.1rem, 5vw, 4.2rem)',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          COMPLETE THE PUZZLE
        </h1>

        <p className="special-font" style={{
          textAlign: 'center',
          color: 'var(--faint)',
          lineHeight: 1.6,
          maxWidth: '720px',
          margin: '0 auto 2rem'
        }}>
          You identified all six movies. Confirm the sequence, then enter the final key to fully solve Guess the Movie.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '0.9rem',
          marginBottom: '2rem'
        }}>
          {movieNames.map((movie, index) => (
            <div key={movie} style={{
              padding: '1rem 1.1rem',
              border: '1px solid rgba(204, 0, 0, 0.35)',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)'
            }}>
              <div className="special-font" style={{
                color: 'var(--crimson)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                marginBottom: '0.45rem'
              }}>
                MOVIE {index + 1}
              </div>
              <div className="cinzel-font" style={{
                color: '#fff',
                fontSize: '1.2rem',
                letterSpacing: '0.04em'
              }}>
                {movie}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <input
            type="text"
            placeholder="ENTER THE FINAL KEY..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="special-font"
            style={{
              background: '#000',
              border: '1px solid var(--blood)',
              padding: '1rem',
              color: 'var(--hot-red)',
              fontSize: '1.05rem',
              textAlign: 'center',
              outline: 'none',
              letterSpacing: '0.12em'
            }}
          />

          <button className="creepy-button" type="submit">
            SOLVE THE GAME
          </button>
        </form>

        {error && (
          <div className="special-font" style={{
            marginTop: '1rem',
            color: 'var(--hot-red)',
            fontSize: '0.9rem',
            textAlign: 'center',
            animation: 'flicker 0.2s infinite'
          }}>
            INVALID FINAL KEY. ACCESS DENIED.
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
    </div>
  );
};

export default MovieFinalGate;
