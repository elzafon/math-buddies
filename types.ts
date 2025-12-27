
export type MathOperator = '+' | '-';

export type ObjectType = 'fingers' | 'cake' | 'toy' | 'apple' | 'star';

export interface Problem {
  id: string;
  num1: number;
  operator: MathOperator;
  num2: number;
  answer: number;
  objectType: ObjectType;
  bgColor: string;
}

export enum GameStatus {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER'
}
