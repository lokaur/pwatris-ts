import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { cloneDeep } from 'lodash';
import * as serviceWorker from './serviceWorker';

import config from './config';
import keysWatcher from './keysWatcher';
import App from './App';
import { store } from './configureStore';
import { getFullRowIndexes, hasCollision } from './helpers/matrixHelper';
import { GameState } from './enums/gameState';
import * as GameActions from './store/game';

import './index.css';
import { Block } from './types';

let holdKeyMovementThreshold = 0;
let startKeyRepeatThreshold = 0;
let downKeyMovementThreshold = 0;
let beforeRepeatDelay = 0;

let lastFrameTime = 0;
let lastPieceFallTime = 0;
let lastDownMove = 0;
let lastLeftMove = 0;
let lastRightMove = 0;
let lastStart = 0;

let isRotating = false;
let isMovingRight = false;
let isMovingLeft = false;

const onKeyDown = ({ code }: { code: string }) => {
  keysWatcher.add(code);
};

const onKeyUp = ({ code }: { code: string }) => {
  keysWatcher.remove(code);
};

const onBlur = () => {
  keysWatcher.reset();
  pauseGame();
};

function main() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);
  window.onbeforeunload = onBlur;

  holdKeyMovementThreshold = Math.ceil(1000 / config.holdKeyRepeatSpeed);
  startKeyRepeatThreshold = Math.ceil(1000 / config.startRepeatSpeed);
  downKeyMovementThreshold = Math.ceil(1000 / config.downMovementSpeed);
  beforeRepeatDelay = Math.ceil(config.beforeRepeatDelay * 1000);

  ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
  serviceWorker.register();

  // Start main update loop
  window.requestAnimationFrame(onAnimationFrame);
}

function onAnimationFrame(currentTime: number) {
  update(currentTime);
  window.requestAnimationFrame(onAnimationFrame);
}

function update(currentTime: number) {
  const deltaTime = currentTime - lastFrameTime;
  lastFrameTime = currentTime;
  handleStartInput(currentTime);
  if (getGameState() !== GameState.GAME_STATE_PLAYING) {
    return;
  }

  handleInGameInput(currentTime);
  updateBlockPosition(deltaTime);
  checkBoard();
}

function checkBoard() {
  if (checkCollision()) {
    placeCurrentBlockToBoard();
    collapseCompletedLines();
    changeBlocks();

    if (checkCollision()) {
      endGame();
    }
  }
}

const checkCollision = () => {
  const { matrix, x, y } = getCurrentBlock();
  return hasCollision(getBoard(), matrix, x, y);
};

function collapseCompletedLines() {
  const linesToRemove = getFullRowIndexes(getBoard());
  if (linesToRemove.length > 0) {
    removeLines(linesToRemove);
    addScore(Math.pow(linesToRemove.length, 2) * 100);
  }
}

function placeCurrentBlockToBoard() {
  const blockClone = cloneDeep(getCurrentBlock());
  blockClone.y -= 1;
  mergeBlockToBoard(blockClone);
}

function handleStartInput(currentTime: number) {
  if (keysWatcher.isPressed(...config.controls.start)) {
    if (currentTime - lastStart > startKeyRepeatThreshold) {
      lastStart = currentTime;
      switch (getGameState()) {
        case GameState.GAME_STATE_INIT:
        case GameState.GAME_STATE_PAUSE:
          startGame();
          break;
        case GameState.GAME_STATE_PLAYING:
          pauseGame();
          break;
        case GameState.GAME_STATE_LOSE:
          resetBoard();
          resetScore();
          randomizeBlocks();
          startGame();
          break;
        default:
          break;
      }
    }
  } else {
    lastStart = 0;
  }
}

function handleInGameInput(currentTime: number) {
  handleInputDown(currentTime);
  handleInputLeft(currentTime);
  handleInputRight(currentTime);
  handleInputRotate();
}

function handleInputLeft(currentTime: number) {
  if (keysWatcher.isPressed(...config.controls.left)) {
    const moveLeft = () => {
      moveBlockLeft();
      lastLeftMove = currentTime;
    };

    const deltaTime = currentTime - lastLeftMove;
    if (deltaTime > holdKeyMovementThreshold) {
      if (lastLeftMove === 0) { // No delay on first press
        moveLeft();
      } else if (isMovingLeft || deltaTime > beforeRepeatDelay) { // Delay after first move
        isMovingLeft = true;
        moveLeft();
      }
    }
  } else {
    isMovingLeft = false;
    lastLeftMove = 0;
  }
}

function handleInputRight(currentTime: number) {
  if (keysWatcher.isPressed(...config.controls.right)) {
    const moveRight = () => {
      moveBlockRight();
      lastRightMove = currentTime;
    };

    const deltaTime = currentTime - lastRightMove;
    if (deltaTime > holdKeyMovementThreshold) {
      if (lastRightMove === 0) { // No delay on first press
        moveRight();
      } else if (isMovingRight || deltaTime > beforeRepeatDelay) { // Delay after first move
        isMovingRight = true;
        moveRight();
      }
    }
  } else {
    isMovingRight = false;
    lastRightMove = 0;
  }
}

function handleInputRotate() {
  if (keysWatcher.isPressed(...config.controls.rotate)) {
    if (!isRotating) {
      isRotating = true;
      rotateBlock();
    }
  } else {
    isRotating = false;
  }
}

function handleInputDown(currentTime: number) {
  if (keysWatcher.isPressed(...config.controls.down)) {
    if (currentTime - lastDownMove > downKeyMovementThreshold) {
      lastDownMove = currentTime;
      lastPieceFallTime = 0;
      moveBlockDown();
    }
  } else {
    lastDownMove = 0;
  }
}

function updateBlockPosition(deltaTime: number) {
  lastPieceFallTime += deltaTime;
  if (lastPieceFallTime > Math.ceil(1000 / getFallRate())) {
    lastPieceFallTime = 0;
    moveBlockDown();
  }
}

// Getters
const getterWrapper = (getter: (param: any) => any) => getter(store.getState());
const getGameState = () => getterWrapper(GameActions.getGameState);
const getCurrentBlock = () => getterWrapper(GameActions.getCurrentBlock);
const getBoard = () => getterWrapper(GameActions.getBoard);
const getFallRate = () => getterWrapper(GameActions.getFallRate);

// Methods
const moveBlockDown = () => store.dispatch(GameActions.moveBlockDown());
const moveBlockLeft = () => store.dispatch(GameActions.moveBlockLeft());
const moveBlockRight = () => store.dispatch(GameActions.moveBlockRight());
const rotateBlock = () => store.dispatch(GameActions.rotateBlock());
const startGame = () => store.dispatch(GameActions.setGameState(GameState.GAME_STATE_PLAYING));
const pauseGame = () => store.dispatch(GameActions.setGameState(GameState.GAME_STATE_PAUSE));
const endGame = () => store.dispatch(GameActions.setGameState(GameState.GAME_STATE_LOSE));
const resetBoard = () => store.dispatch(GameActions.resetBoard());
const mergeBlockToBoard = (block: Block) => store.dispatch(GameActions.mergeBlockToBoard(block));
const removeLines = (lineIndexes: number[]) => store.dispatch(GameActions.removeLines(lineIndexes));
const addScore = (score: number) => store.dispatch(GameActions.addScore(score));
const resetScore = () => store.dispatch(GameActions.resetScore());
const changeBlocks = () => store.dispatch(GameActions.changeBlocks());
const randomizeBlocks = () => store.dispatch(GameActions.randomizeBlocks());

main();