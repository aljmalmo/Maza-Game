
import React from 'react';
import { Maze, Point, Difficulty } from '../types';
import MazeGrid from './MazeGrid';

interface GameScreenProps {
  maze: Maze;
  playerPos: Point;
  timer: number;
  difficulty: Difficulty;
  showSolution: boolean;
  solutionPath: Point[];
  onToggleSolution: () => void;
  onNewGame: () => void;
  onReset: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  maze,
  playerPos,
  timer,
  difficulty,
  showSolution,
  solutionPath,
  onToggleSolution,
  onNewGame,
  onReset,
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 p-4">
      <div className="flex-grow flex items-center justify-center">
        <MazeGrid maze={maze} playerPos={playerPos} showSolution={showSolution} solutionPath={solutionPath} />
      </div>

      <div className="w-full lg:w-64 flex-shrink-0 bg-slate-800 p-6 rounded-lg shadow-xl">
        <div className="text-center mb-6">
          <div className="text-slate-400 text-sm">TIME</div>
          <div className="text-4xl font-mono text-cyan-400">{formatTime(timer)}</div>
        </div>
        <div className="text-center mb-6">
          <div className="text-slate-400 text-sm">DIFFICULTY</div>
          <div className="text-2xl font-bold text-white">{difficulty}</div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onToggleSolution}
            className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          <button
            onClick={onNewGame}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            New Game
          </button>
          <button
            onClick={onReset}
            className="w-full px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition"
          >
            Change Difficulty
          </button>
        </div>
        <div className="text-center mt-6 text-slate-400 text-sm">
          Use Arrow Keys or WASD to move.
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
