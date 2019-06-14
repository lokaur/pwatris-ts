import { action } from 'typesafe-actions';

import config from '../../config';
import { GameActionTypes, IGameState } from './types';
import { GameState } from '../../enums/gameState';
import { Block } from '../../types';

export const resetBoard = () => action(GameActionTypes.RESET_BOARD);
export const setGameState = (gameState: GameState) => action(GameActionTypes.SET_GAME_STATE, gameState);
export const moveBlockDown = () => action(GameActionTypes.MOVE_BLOCK_DOWN);
export const moveBlockLeft = () => action(GameActionTypes.MOVE_BLOCK_LEFT);
export const moveBlockRight = () => action(GameActionTypes.MOVE_BLOCK_RIGHT);
export const rotateBlock = () => action(GameActionTypes.ROTATE_BLOCK);
export const mergeBlockToBoard = (block: Block) => action(GameActionTypes.MERGE_BLOCK_TO_BOARD, block);
export const removeLines = (lineIndexes: number[]) => action(GameActionTypes.REMOVE_LINES, lineIndexes);
export const addScore = (score: number) => action(GameActionTypes.ADD_SCORE, score);
export const resetScore = () => action(GameActionTypes.RESET_SCORE);
export const toggleMusic = () => action(GameActionTypes.TOGGLE_MUSIC);
export const changeBlocks = () => action(GameActionTypes.CHANGE_BLOCKS);
export const randomizeBlocks = () => action(GameActionTypes.RANDOMIZE_BLOCKS);

export const getGameState = ({ GameReducer }: { GameReducer: IGameState }) => GameReducer.gameState;
export const getCurrentBlock = ({ GameReducer }: { GameReducer: IGameState }) => GameReducer.currentBlock;
export const getBoard = ({ GameReducer }: { GameReducer: IGameState }) => GameReducer.board;
export const getFallRate = ({ GameReducer }: { GameReducer: IGameState }) =>
  config.baseFallRate + GameReducer.level * config.fallRateModifier;