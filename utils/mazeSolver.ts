
import { Maze, Point } from '../types';

export const solveMaze = (maze: Maze, start: Point, end: Point): Point[] => {
  const queue: Point[] = [start];
  const visited = new Set<string>([`${start.r},${start.c}`]);
  const parentMap = new Map<string, Point | null>();
  parentMap.set(`${start.r},${start.c}`, null);

  while (queue.length > 0) {
    const current = queue.shift() as Point;
    const { r, c } = current;

    if (r === end.r && c === end.c) {
      // Reconstruct path
      const path: Point[] = [];
      let curr: Point | null | undefined = end;
      while (curr) {
        path.unshift(curr);
        curr = parentMap.get(`${curr.r},${curr.c}`);
      }
      return path;
    }

    const cell = maze[r][c];
    const neighbors: Point[] = [];

    if (!cell.walls.top && r > 0) neighbors.push({ r: r - 1, c });
    if (!cell.walls.bottom && r < maze.length - 1) neighbors.push({ r: r + 1, c });
    if (!cell.walls.left && c > 0) neighbors.push({ r, c: c - 1 });
    if (!cell.walls.right && c < maze[0].length - 1) neighbors.push({ r, c: c + 1 });

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.r},${neighbor.c}`;
      if (!visited.has(neighborKey)) {
        visited.add(neighborKey);
        parentMap.set(neighborKey, current);
        queue.push(neighbor);
      }
    }
  }

  return []; // No path found
};
