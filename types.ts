
export interface Cell {
  r: number;
  c: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
}

export type Maze = Cell[][];

export interface Point {
  r: number;
  c: number;
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum GameState {
  StartScreen = 'StartScreen',
  Playing = 'Playing',
  Won = 'Won',
}
