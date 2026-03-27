import React, { useState } from 'react';
import Carousel from './Carousel';
import KeyGate from './KeyGate';

export const movieStages = [
  {
    title: "GUESS THE MOVIE",
    displayName: "JAZBAA",
    expectedKey: "JAZBAA",
    images: [
      "/images/Stage1_1.jpeg",
      "/images/Stage1_2.jpeg",
      "/images/Stage1_3.jpeg",
      "/images/Stage1_4.jpeg",
      "/images/Stage1_5.jpeg"
    ]
  },
  {
    title: "GUESS THE MOVIE",
    displayName: "BADLAPUR",
    expectedKey: "BADLAPUR",
    images: [
      "/images/Stage2_1.jpeg",
      "/images/Stage2_2.jpeg",
      "/images/Stage2_3.jpeg",
      "/images/Stage2_4.jpeg",
      "/images/Stage2_5.jpeg"
    ]
  },
  {
    title: "GUESS THE MOVIE",
    displayName: "THE GIRL ON THE TRAIN",
    expectedKey: "THEGIRLONTHETRAIN",
    images: [
      "/images/stage3_1.png",
      "/images/stage3_2.png",
      "/images/stage3_3.png",
      "/images/stage3_4.png",
      "/images/stage3_5.png"
    ]
  },
  {
    title: "GUESS THE MOVIE",
    displayName: "DHRISHYAM",
    expectedKey: ["DHRISHYAM", "DRISHYAM"],
    images: [
      "/images/Stage4_1.jpeg",
      "/images/Stage4_2.jpeg",
      "/images/Stage4_3.jpeg",
      "/images/Stage4_4.jpeg",
      "/images/Stage4_5.jpeg"
    ]
  },
  {
    title: "GUESS THE MOVIE",
    displayName: "OM SHANTI OM",
    expectedKey: "OMSHANTIOM",
    images: [
      "/images/Stage5_1.jpeg",
      "/images/Stage5_2.jpeg",
      "/images/Stage5_3.jpeg",
      "/images/Stage5_4.jpeg",
      "/images/Stage5_5.jpeg"
    ]
  },
  {
    title: "GUESS THE MOVIE",
    displayName: "ITTEFAQ",
    expectedKey: "ITTEFAQ",
    images: [
      "/images/Stage6_1.jpeg",
      "/images/Stage6_2.jpeg",
      "/images/Stage6_3.jpeg",
      "/images/Stage6_4.jpeg",
      "/images/Stage6_5.jpeg"
    ]
  }
];

const PuzzleArena = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [unlocking, setUnlocking] = useState(false);

  const handleCorrectKey = () => {
    setUnlocking(true);
    setTimeout(() => {
      setUnlocking(false);
      if (currentStage < movieStages.length - 1) {
        setCurrentStage(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 1500);
  };

  const stage = movieStages[currentStage];

  return (
    <div className={`puzzle-arena ${unlocking ? 'unlocking' : ''}`} style={{
      minHeight: '100vh',
      width: '100%',
      padding: '0',
      position: 'relative',
      zIndex: 10,
      overflowX: 'hidden',
      overflowY: 'auto'
    }}>
      <div className="progress-bar special-font" style={{
        position: 'fixed',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--crimson)',
        fontSize: '0.9rem',
        letterSpacing: '0.3em'
      }}>
        LEVEL {currentStage + 1} / {movieStages.length}
      </div>

      <div key={currentStage} className="stage-screen" style={{
        minHeight: '100vh',
        width: '100%',
        padding: '5.5rem 1.25rem 2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '980px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1.25rem'
        }}>
          <Carousel images={stage.images} title={stage.title} />

          <KeyGate
            stageNumber={currentStage + 1}
            expectedKey={stage.expectedKey}
            onCorrect={handleCorrectKey}
          />
        </div>
      </div>

      {unlocking && (
        <div className="unlock-overlay" style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(255,0,0,0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'glitch-bg 0.3s infinite'
        }}>
          <h2 className="special-font" style={{
            color: '#fff',
            fontSize: '3rem',
            textShadow: '0 0 10px #f00',
            animation: 'glitch-text 0.1s infinite'
          }}>
            SYSTEM UNLOCKED
          </h2>
        </div>
      )}

      <style>{`
        .puzzle-arena { transition: opacity 0.5s; }
        .puzzle-arena.unlocking { opacity: 0; }

        @keyframes glitch-bg {
          0% { background: rgba(255,0,0,0.1); }
          50% { background: rgba(0,0,0,0.5); }
          100% { background: rgba(255,0,0,0.1); }
        }

        @keyframes glitch-text {
          0% { transform: translate(0); text-shadow: 2px 0 red, -2px 0 blue; }
          25% { transform: translate(5px, -2px); }
          50% { transform: translate(-5px, 2px); text-shadow: -2px 0 red, 2px 0 blue; }
          75% { transform: translate(2px, 5px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};

export default PuzzleArena;
