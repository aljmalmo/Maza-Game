
import React from 'react';
import { Difficulty } from '../types';

interface WinModalProps {
  time: number;
  difficulty: Difficulty;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ time, difficulty, onPlayAgain, onChangeDifficulty }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-8 rounded-lg shadow-2xl text-center border border-cyan-500 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-cyan-400 mb-2">Congratulations!</h2>
        <p className="text-slate-300 mb-4">You solved the {difficulty} maze.</p>
        <div className="mb-6">
          <p className="text-slate-400">Your Time:</p>
          <p className="text-5xl font-mono text-yellow-400">{formatTime(time)}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Play Again
          </button>
          <button
            onClick={onChangeDifficulty}
            className="px-6 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 transition-transform transform hover:scale-105"
          >
            Change Difficulty
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
