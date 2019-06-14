import { constant, times, inRange, cloneDeep } from 'lodash';
import { Block, Matrix } from '../types';

const createEmptyArray = (length: number): number[] => times(length, constant(0));

export const getMatrixHeight = (matrix: Matrix): number => matrix.length;
export const getMatrixWidth = (matrix: Matrix): number => matrix[ 0 ].length;

export function createEmptyMatrix(width: number, height: number): Matrix {
  const matrix = createEmptyArray(height);
  const createRow = () => createEmptyArray(width);
  return matrix.map(createRow);
}

export function hasCollision(board: Matrix, block: Matrix, offsetX = 0, offsetY = 0): boolean {
  const blockHeight = getMatrixHeight(block);
  const blockWidth = getMatrixWidth(block);
  const boardHeight = getMatrixHeight(board);
  const boardWidth = getMatrixHeight(board);

  for (let blockRow = 0; blockRow < blockHeight; blockRow++) {
    for (let blockCol = 0; blockCol < blockWidth; blockCol++) {
      if (block[ blockRow ][ blockCol ] !== 0) {
        const boardCol = blockCol + offsetX;
        const boardRow = blockRow + offsetY;

        if (inRange(boardCol, 0, boardWidth) && inRange(boardRow, 0, boardHeight)) {
          if (board[ boardRow ][ boardCol ] !== 0) {
            return true;
          }
        } else {
          // out of board
          return true;
        }
      }
    }
  }

  return false;
}

export function mergeMatrices(board: Matrix, block: Matrix, offsetX: number, offsetY: number): Matrix {
  const lastColIndex = getMatrixWidth(block) + offsetX - 1;
  const lastRowIndex = getMatrixHeight(block) + offsetY - 1;

  return board.map((rows, y) => rows.map((val, x) => {
    if (inRange(x, offsetX, lastColIndex + 1) && inRange(y, offsetY, lastRowIndex + 1)) {
      if (!val) {
        return block[ y - offsetY ][ x - offsetX ];
      }
    }

    return val;
  }));
}

// Rotates matrix clockwise
export function rotate(sourceMatrix: Matrix, count: number = 1): Matrix {
  if (count === 0) {
    return sourceMatrix;
  }

  let rotatedMatrix: Matrix;

  for (let i = 0; i < count; i++) {
    rotatedMatrix = rotateMatrixClockwise(sourceMatrix);
  }

  return rotatedMatrix!;
}

export function validateRotation(rotatedBlock: Block, board: Matrix) {
  const blockWidth = getMatrixWidth(rotatedBlock.matrix);
  let offsetX = 1;

  while (hasCollision(board, rotatedBlock.matrix, rotatedBlock.x, rotatedBlock.y)) {
    rotatedBlock.x += offsetX;
    offsetX = offsetX > 0 ? -offsetX : -offsetX + 1;

    if (Math.abs(offsetX) > Math.ceil(blockWidth / 2)) {
      return false;
    }
  }

  return true;
}

export const getFullRowIndexes = (board: Matrix): number[] => board.reduce((acc, row, idx) => {
  if (row.every(el => el > 0)) {
    acc.push(idx);
  }

  return acc;
}, []);

export const removeRow = (board: Matrix, idx: number): Matrix => {
  const boardClone = cloneDeep(board);
  const newRowMatrix = [ createEmptyArray(getMatrixWidth(boardClone)) ];
  boardClone.splice(idx, 1);
  return newRowMatrix.concat(boardClone);
};

function rotateMatrixClockwise(sourceMatrix: Matrix): Matrix {
  const height = getMatrixHeight(sourceMatrix);
  const width = getMatrixWidth(sourceMatrix);

  // noinspection JSSuspiciousNameCombination
  const flippedMatrix = createEmptyMatrix(height, width);

  times(height, (row: number) => {
    times(width, (column: number) => {
      flippedMatrix[ column ][ row ] = sourceMatrix[ row ][ column ];
    });
  });

  return flippedMatrix.map(row => row.reverse());
}