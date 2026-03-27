import React, { useState } from 'react';
import Atmosphere from './components/Atmosphere';
import LandingPage from './components/LandingPage';
import MurdleCasePage from './components/MurdleCasePage';
import MovieFinalGate from './components/MovieFinalGate';
import PuzzleArena from './components/PuzzleArena';
import { movieStages } from './components/PuzzleArena';
import SuccessPage from './components/SuccessPage';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('LANDING'); // LANDING, ARENA, MOVIE_FINAL, CASE_FILE, SUCCESS
  const finalMovieKey = 'JANISE';
  const movieNames = movieStages.map((stage) => stage.displayName);

  return (
    <div className="app-container">
      <Atmosphere />
      
      {gameState === 'LANDING' && (
        <LandingPage onEnter={() => setGameState('ARENA')} />
      )}
      
      {gameState === 'ARENA' && (
        <PuzzleArena onComplete={() => setGameState('MOVIE_FINAL')} />
      )}

      {gameState === 'MOVIE_FINAL' && (
        <MovieFinalGate
          movieNames={movieNames}
          expectedKey={finalMovieKey}
          onCorrect={() => setGameState('CASE_FILE')}
        />
      )}

      {gameState === 'CASE_FILE' && (
        <MurdleCasePage
          onSolved={() => setGameState('SUCCESS')}
        />
      )}
      
      {gameState === 'SUCCESS' && (
        <SuccessPage />
      )}

      <style>{`
        .app-container {
          min-height: 100vh;
          background: #000;
          color: var(--ash);
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

export default App;
