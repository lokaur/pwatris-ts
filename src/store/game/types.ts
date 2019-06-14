import { Block, Matrix } from '../../types';
import { GameState } from '../../enums/gameState';

export enum GameActionTypes {
  RESET_BOARD = 'BOARD@RESET_BOARD',
  SET_GAME_STATE = 'GAME@SET_GAME_STATE',
  MOVE_BLOCK_DOWN = 'GAME@MOVE_BLOCK_DOWN',
  MOVE_BLOCK_LEFT = 'GAME@MOVE_BLOCK_LEFT',
  MOVE_BLOCK_RIGHT = 'GAME@MOVE_BLOCK_RIGHT',
  ROTATE_BLOCK = 'GAME@ROTATE_BLOCK',
  MERGE_BLOCK_TO_BOARD = 'GAME@MERGE_BLOCK_TO_BOARD',
  REMOVE_LINES = 'GAME@REMOVE_LINES',
  ADD_SCORE = 'GAME@ADD_SCORE',
  RESET_SCORE = 'GAME@RESET_SCORE',
  TOGGLE_MUSIC = 'GAME@TOGGLE_MUSIC',
  CHANGE_BLOCKS = 'GAME@CHANGE_BLOCKS',
  RANDOMIZE_BLOCKS = 'GAME@RANDOMIZE_BLOCKS',
}

export interface IGameState {
  board: Matrix,
  nextBlock: Block,
  currentBlock: Block,
  gameState: GameState,
  score: number,
  highScore: number,
  level: number,
  lines: number,
  isMusicPlaying: boolean
}