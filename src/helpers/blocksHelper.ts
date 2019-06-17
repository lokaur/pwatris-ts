import { rotate } from './matrixHelper';
import { blocks } from '../blocksLibrary';
import config from '../config';
import { cloneDeep } from 'lodash';
import { Block } from '../types';

export function getRandomBlock(): Block {
  const block = blocks[ random(blocks.length) ];
  const rotationCount = random(4);
  block.matrix = rotate(block.matrix, rotationCount);
  return block;
}

export function getCenterizedBlock(block: Block): Block {
  const blockClone = cloneDeep(block);
  blockClone.x = Math.floor((config.boardSize[ 0 ] - blockClone.matrix[ 0 ].length) / 2);
  return blockClone;
}

function random(max: number, low = 0): number {
  return Math.floor(Math.random() * (max - low) + low);
}