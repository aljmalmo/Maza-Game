import React from 'react';
import { Maze, Point } from '../types';

interface MazeGridProps {
  maze: Maze;
  playerPos: Point;
  showSolution: boolean;
  solutionPath: Point[];
}

const MazeGrid: React.FC<MazeGridProps> = ({ maze, playerPos, showSolution, solutionPath }) => {
  const height = maze.length;
  const width = maze[0].length;
  
  const isSolutionPath = (r: number, c: number) => {
    return solutionPath.some(p => p.r === r && p.c === c);
  }

  return (
    <div
      className="relative bg-slate-700 grid border-2 border-cyan-500 shadow-lg shadow-cyan-500/20"
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
        width: 'min(90vw, 90vh, 700px)',
        aspectRatio: `${width} / ${height}`,
      }}
    >
      {maze.flat().map((cell) => (
        <div
          key={`${cell.r}-${cell.c}`}
          className="relative"
          style={{
            borderTop: cell.walls.top ? '2px solid #0891b2' : 'none',
            borderRight: cell.walls.right ? '2px solid #0891b2' : 'none',
            borderBottom: cell.walls.bottom ? '2px solid #0891b2' : 'none',
            borderLeft: cell.walls.left ? '2px solid #0891b2' : 'none',
          }}
        >
          {showSolution && isSolutionPath(cell.r, cell.c) && (
             <div className="absolute inset-0 bg-purple-500 opacity-30"></div>
          )}
        </div>
      ))}

      {/* Start Point */}
      <div
        className="absolute flex items-center justify-center text-xs font-bold text-green-300 bg-green-500/30 rounded-full"
        style={{
          width: `calc(100% / ${width} * 0.6)`,
          height: `calc(100% / ${height} * 0.6)`,
          top: `calc(100% / ${height} * 0.2)`,
          left: `calc(100% / ${width} * 0.2)`,
        }}
      >
        S
      </div>

      {/* End Point */}
      <div
        className="absolute flex items-center justify-center text-xs font-bold text-red-300 bg-red-500/30 rounded-full"
        style={{
          width: `calc(100% / ${width} * 0.6)`,
          height: `calc(100% / ${height} * 0.6)`,
          top: `calc(100% / ${height} * (${height - 1} + 0.2))`,
          left: `calc(100% / ${width} * (${width - 1} + 0.2))`,
        }}
      >
        E
      </div>

      {/* Player */}
      <div
        className="absolute bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
        style={{
          width: `calc(100% / ${width} * 0.5)`,
          height: `calc(100% / ${height} * 0.5)`,
          top: `calc(100% / ${height} * ${playerPos.r + 0.25})`,
          left: `calc(100% / ${width} * ${playerPos.c + 0.25})`,
          transition: 'top 0.1s linear, left 0.1s linear',
        }}
      />
    </div>
  );
};

export default React.memo(MazeGrid);