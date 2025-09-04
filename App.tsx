
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Difficulty, Maze, Point } from './types';
import { generateMaze } from './utils/mazeGenerator';
import { solveMaze } from './utils/mazeSolver';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import WinModal from './components/WinModal';

const difficultySettings = {
  [Difficulty.Easy]: { width: 10, height: 10 },
  [Difficulty.Medium]: { width: 15, height: 15 },
  [Difficulty.Hard]: { width: 20, height: 20 },
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.StartScreen);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [maze, setMaze] = useState<Maze | null>(null);
  const [playerPos, setPlayerPos] = useState<Point>({ r: 0, c: 0 });
  const [timer, setTimer] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [solutionPath, setSolutionPath] = useState<Point[]>([]);

  const timerIntervalRef = useRef<number | null>(null);
  const winAudioRef = useRef<HTMLAudioElement>(null);
  const moveAudioRef = useRef<HTMLAudioElement>(null);

  const startTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimer(0);
    timerIntervalRef.current = window.setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const startGame = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    const { width, height } = difficultySettings[newDifficulty];
    const newMaze = generateMaze(width, height);
    setMaze(newMaze);
    setPlayerPos({ r: 0, c: 0 });
    setGameState(GameState.Playing);
    setShowSolution(false);
    setSolutionPath([]);
    startTimer();
  }, []);

  const handleWin = useCallback(() => {
    stopTimer();
    setGameState(GameState.Won);
    winAudioRef.current?.play();
  }, []);

  const movePlayer = useCallback((dr: number, dc: number) => {
    if (gameState !== GameState.Playing || !maze) return;

    const newPos = { r: playerPos.r + dr, c: playerPos.c + dc };
    const { r, c } = playerPos;

    if (dr === -1 && !maze[r][c].walls.top) setPlayerPos(newPos);
    if (dr === 1 && !maze[r][c].walls.bottom) setPlayerPos(newPos);
    if (dc === -1 && !maze[r][c].walls.left) setPlayerPos(newPos);
    if (dc === 1 && !maze[r][c].walls.right) setPlayerPos(newPos);
    
    if (newPos.r !== playerPos.r || newPos.c !== playerPos.c) {
        moveAudioRef.current?.play();
    }
  }, [gameState, maze, playerPos]);
  
  useEffect(() => {
    if (maze && playerPos.r === maze.length - 1 && playerPos.c === maze[0].length - 1) {
      handleWin();
    }
  }, [playerPos, maze, handleWin]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          movePlayer(-1, 0);
          break;
        case 'ArrowDown':
        case 's':
          movePlayer(1, 0);
          break;
        case 'ArrowLeft':
        case 'a':
          movePlayer(0, -1);
          break;
        case 'ArrowRight':
        case 'd':
          movePlayer(0, 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movePlayer]);

  const resetToStartScreen = () => {
    stopTimer();
    setGameState(GameState.StartScreen);
  };

  const toggleSolution = () => {
    if (maze && solutionPath.length === 0) {
      const path = solveMaze(maze, { r: 0, c: 0 }, { r: maze.length - 1, c: maze[0].length - 1 });
      setSolutionPath(path);
    }
    setShowSolution(prev => !prev);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900 font-sans">
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 tracking-wider">
        MAZE RUNNER
      </h1>

      {gameState === GameState.StartScreen && <StartScreen onStart={startGame} />}

      {gameState === GameState.Playing && maze && (
        <GameScreen
          maze={maze}
          playerPos={playerPos}
          timer={timer}
          difficulty={difficulty}
          showSolution={showSolution}
          solutionPath={solutionPath}
          onToggleSolution={toggleSolution}
          onNewGame={() => startGame(difficulty)}
          onReset={resetToStartScreen}
        />
      )}
      
      {gameState === GameState.Won && (
        <WinModal
          time={timer}
          difficulty={difficulty}
          onPlayAgain={() => startGame(difficulty)}
          onChangeDifficulty={resetToStartScreen}
        />
      )}
      
      <audio ref={winAudioRef} src="https://actions.google.com/sounds/v1/emergency/beeper_confirmation.ogg" preload="auto" />
      <audio ref={moveAudioRef} src="https://actions.google.com/sounds/v1/weapons/blaster_fire.ogg" preload="auto" />
    </div>
  );
};

export default App;
