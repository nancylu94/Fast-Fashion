export type PageView = 'home' | 'pledge' | 'game';

export interface PledgeItem {
  id: number;
  text: string;
  icon: string;
}

// Game Types
export interface Position {
  x: number;
  y: number;
}

export interface Entity extends Position {
  dir: Position;
  nextDir: Position;
}