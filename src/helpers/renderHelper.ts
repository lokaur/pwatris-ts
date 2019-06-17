import { blocks } from '../blocksLibrary';
import config from '../config';
import { Block, Colors, Matrix } from '../types';
import { getMatrixHeight, getMatrixWidth } from './matrixHelper';

export function drawGame(context: any, board: Matrix, currentBlock: Block, blockSize: number) {
  clearCanvas(context);
  drawBoardSubstrate(context, blockSize);
  drawBoard(context, board, blockSize);
  drawBlock(context, currentBlock, blockSize);
}

export function clearCanvas(context: any) {
  const { width, height } = context.canvas;
  context.fillStyle = config.gridColor2;
  context.fillRect(0, 0, width, height);
}

export function drawBoard(context: any, board: Matrix, blockSize: number) {
  drawMatrix(context, board, blockSize);
}

export function drawBlock(context: any, currentBlock: Block, blockSize: number) {
  drawMatrix(context, currentBlock.matrix, blockSize, currentBlock.x, currentBlock.y);
}

export function drawMatrix(context: any, matrix: Matrix, blockSize: number, offsetX = 0, offsetY = 0) {
  const matrixHeight = getMatrixHeight(matrix);
  const matrixWidth = getMatrixWidth(matrix);

  for (let i = 0; i < matrixHeight; i++) {
    for (let j = 0; j < matrixWidth; j++) {
      const val = matrix[ i ][ j ];
      if (val !== 0) {
        drawRect(context, j + offsetX, i + offsetY, val, blockSize);
      }
    }
  }
}

function drawRect(context: any, row: number, col: number, id: number, blockSize: number) {
  const colors = getColorsByBlockId(id);
  const x = row * blockSize;
  const y = col * blockSize;
  const outlineWidth = blockSize * config.outlineThickness;
  const doubleOutlineWidth = outlineWidth * 2;

  drawOutlineTop(context, colors.top, x, y, blockSize, outlineWidth);
  drawOutlineRight(context, colors.right, x, y, blockSize, outlineWidth);
  drawOutlineBottom(context, colors.bottom, x, y, blockSize, outlineWidth);
  drawOutlineLeft(context, colors.left, x, y, blockSize, outlineWidth);

  // Drawing center rectangle
  context.fillStyle = colors.center;
  context.fillRect(x + outlineWidth, y + outlineWidth, blockSize - doubleOutlineWidth, blockSize - doubleOutlineWidth);
}

function drawOutlineTop(context: any, color: string, x: number, y: number, blockSize: number, outlineWidth: number) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + blockSize, y);
  context.lineTo(x + blockSize - outlineWidth, y + outlineWidth);
  context.lineTo(x + outlineWidth, y + outlineWidth);
  context.lineTo(x, y);
  context.fill();
}

function drawOutlineRight(context: any, color: string, x: number, y: number, blockSize: number, outlineWidth: number) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x + blockSize, y);
  context.lineTo(x + blockSize, y + blockSize);
  context.lineTo(x + blockSize - outlineWidth, y + blockSize - outlineWidth);
  context.lineTo(x + blockSize - outlineWidth, y + outlineWidth);
  context.lineTo(x + blockSize, y);
  context.fill();
}

function drawOutlineBottom(context: any, color: string, x: number, y: number, blockSize: number, outlineWidth: number) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y + blockSize);
  context.lineTo(x + outlineWidth, y + blockSize - outlineWidth);
  context.lineTo(x + blockSize - outlineWidth, y + blockSize - outlineWidth);
  context.lineTo(x + blockSize, y + blockSize);
  context.lineTo(x, y + blockSize);
  context.fill();
}

function drawOutlineLeft(context: any, color: string, x: number, y: number, blockSize: number, outlineWidth: number) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + blockSize);
  context.lineTo(x + outlineWidth, y + blockSize - outlineWidth);
  context.lineTo(x + outlineWidth, y + outlineWidth);
  context.lineTo(x, y);
  context.fill();
}

function drawBoardSubstrate(context: any, blockSize: number) {
  const [ boardWidth, boardHeight ] = config.boardSize;
  context.globalAlpha = config.boardSubstrateAlpha;

  // Draw vertical lines
  context.strokeStyle = config.boardSubstrateColor;
  context.lineWidth = 1;

  for (let i = 1; i < boardWidth; i++) {
    context.beginPath();
    context.moveTo(i * blockSize, 0);
    context.lineTo(i * blockSize, boardHeight * blockSize);
    context.stroke();
  }

  for (let i = 1; i < boardHeight; i++) {
    context.beginPath();
    context.moveTo(0, i * blockSize);
    context.lineTo(boardHeight * blockSize, i * blockSize);
    context.stroke();
  }

  context.globalAlpha = 1;
}

// TODO: use memorized selector
function getColorsByBlockId(id: number): Colors {
  return blocks.find(block => block.id === id)!.colors;
}