import { Reducer } from 'redux';
import { cloneDeep } from 'lodash';

import { IGameState, GameActionTypes } from './types';
import { GameState } from '../../enums/gameState';
import {
  createEmptyMatrix,
  hasCollision,
  mergeMatrices,
  removeRow,
  rotate,
  validateRotation
} from '../../helpers/matrixHelper';
import { getCenterizedBlock, getRandomBlock } from '../../helpers/blocksHelper';
import config from '../../config';
import { Matrix } from '../../types';

export const initialState: IGameState = {
  board: createEmptyMatrix(config.boardSize[ 0 ], config.boardSize[ 1 ]),
  nextBlock: getRandomBlock(),
  currentBlock: getCenterizedBlock(getRandomBlock()),
  gameState: GameState.GAME_STATE_INIT,
  score: 0,
  highScore: 0,
  level: 0,
  lines: 0,
  isMusicPlaying: false
};

const reducer: Reducer<IGameState> = (curState = initialState, action) => {
  switch (action.type) {
    case GameActionTypes.RESET_BOARD: {
      return { ...curState, board: createEmptyMatrix(config.boardSize[ 0 ], config.boardSize[ 1 ]) };
    }
    case GameActionTypes.SET_GAME_STATE: {
      return { ...curState, gameState: action.payload };
    }
    case GameActionTypes.MOVE_BLOCK_DOWN: {
      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.y += 1;
      return { ...curState, currentBlock: blockClone };
    }
    case GameActionTypes.MOVE_BLOCK_LEFT: {
      const currentBlock = curState.currentBlock;

      if (hasCollision(curState.board, currentBlock.matrix, currentBlock.x - 1, currentBlock.y)) {
        return curState;
      }

      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.x -= 1;
      return { ...curState, currentBlock: blockClone };
    }
    case GameActionTypes.MOVE_BLOCK_RIGHT: {
      const currentBlock = curState.currentBlock;

      if (hasCollision(curState.board, currentBlock.matrix, currentBlock.x + 1, currentBlock.y)) {
        return curState;
      }

      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.x += 1;
      return { ...curState, currentBlock: blockClone };
    }
    case GameActionTypes.ROTATE_BLOCK: {
      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.matrix = rotate(blockClone.matrix);
      if (!validateRotation(blockClone, curState.board)) {
        return curState;
      }

      return { ...curState, currentBlock: blockClone };
    }
    case GameActionTypes.MERGE_BLOCK_TO_BOARD: {
      const { matrix, x, y } = action.payload;
      return { ...curState, board: mergeMatrices(curState.board, matrix, x, y) };
    }
    case GameActionTypes.REMOVE_LINES: {
      const lines = action.payload.length + curState.lines;
      const level = Math.floor(lines / 10);
      return {
        ...curState,
        board: action.payload.reduce((board: Matrix, lineIndex: number) =>
          removeRow(board, lineIndex), cloneDeep(curState.board)),
        lines,
        level
      };
    }
    case GameActionTypes.ADD_SCORE: {
      return {
        ...curState,
        score: curState.score + action.payload,
        highScore: curState.score + action.payload > curState.highScore
          ? curState.score + action.payload
          : curState.highScore
      };
    }
    case GameActionTypes.RESET_SCORE: {
      return { ...curState, score: 0, level: 0, lines: 0 };
    }
    case GameActionTypes.TOGGLE_MUSIC: {
      return { ...curState, isMusicPlaying: !curState.isMusicPlaying };
    }
    case GameActionTypes.CHANGE_BLOCKS: {
      return { ...curState, currentBlock: getCenterizedBlock(curState.nextBlock), nextBlock: getRandomBlock() };
    }
    case GameActionTypes.RANDOMIZE_BLOCKS: {
      return { ...curState, currentBlock: getCenterizedBlock(getRandomBlock()), nextBlock: getRandomBlock() };
    }
    default: {
      return curState;
    }
  }
};

export { reducer as GameReducer };