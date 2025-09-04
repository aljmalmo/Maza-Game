
import { Maze, Cell, Point } from '../types';

export const generateMaze = (width: number, height: number): Maze => {
  const maze: Maze = Array.from({ length: height }, (_, r) =>
    Array.from({ length: width }, (_, c) => ({
      r,
      c,
      walls: { top: true, right: true, bottom: true, left: true },
      visited: false,
    }))
  );

  const stack: Point[] = [];
  const start: Point = { r: 0, c: 0 };
  maze[start.r][start.c].visited = true;
  stack.push(start);

  while (stack.length > 0) {
    const current = stack.pop() as Point;
    const { r, c } = current;

    const neighbors = getUnvisitedNeighbors(r, c, maze);

    if (neighbors.length > 0) {
      stack.push(current);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      removeWall(maze[r][c], randomNeighbor);
      randomNeighbor.visited = true;
      stack.push({ r: randomNeighbor.r, c: randomNeighbor.c });
    }
  }
  return maze;
};

const getUnvisitedNeighbors = (r: number, c: number, maze: Maze): Cell[] => {
  const neighbors: Cell[] = [];
  const height = maze.length;
  const width = maze[0].length;

  // Top
  if (r > 0 && !maze[r - 1][c].visited) neighbors.push(maze[r - 1][c]);
  // Right
  if (c < width - 1 && !maze[r][c + 1].visited) neighbors.push(maze[r][c + 1]);
  // Bottom
  if (r < height - 1 && !maze[r + 1][c].visited) neighbors.push(maze[r + 1][c]);
  // Left
  if (c > 0 && !maze[r][c - 1].visited) neighbors.push(maze[r][c - 1]);

  return neighbors;
};

const removeWall = (a: Cell, b: Cell) => {
  const dr = a.r - b.r;
  const dc = a.c - b.c;

  if (dr === 1) { // a is below b
    a.walls.top = false;
    b.walls.bottom = false;
  } else if (dr === -1) { // a is above b
    a.walls.bottom = false;
    b.walls.top = false;
  }

  if (dc === 1) { // a is right of b
    a.walls.left = false;
    b.walls.right = false;
  } else if (dc === -1) { // a is left of b
    a.walls.right = false;
    b.walls.left = false;
  }
};
