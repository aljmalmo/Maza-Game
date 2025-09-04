
import React from 'react';
import { Difficulty } from '../types';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center p-8 bg-slate-800 rounded-lg shadow-2xl animate-fade-in">
      <h2 className="text-2xl text-slate-300 mb-6">Select Difficulty</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onStart(Difficulty.Easy)}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          Easy
        </button>
        <button
          onClick={() => onStart(Difficulty.Medium)}
          className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
        >
          Medium
        </button>
        <button
          onClick={() => onStart(Difficulty.Hard)}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
