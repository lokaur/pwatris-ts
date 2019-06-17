import React from 'react';
import { connect } from 'react-redux';

import { GameState as GameStates } from '../enums/gameState';

import './GameState.scss';
import { IApplicationState } from '../store';

interface IPropsFromState {
  gameState: GameStates
}

const getGameStateText = (state: GameStates): string => {
  let text;
  switch (state) {
    case GameStates.GAME_STATE_INIT:
      text = 'Press Start';
      break;
    case GameStates.GAME_STATE_LOSE:
      text = 'Game Over';
      break;
    case GameStates.GAME_STATE_PAUSE:
      text = 'Pause';
      break;
    default:
      text = '';
      break;
  }

  return text;
};

const GameState: React.FC<IPropsFromState> = (props: IPropsFromState) =>
  (props.gameState === GameStates.GAME_STATE_PLAYING
    ? <div/>
    : <div id='game_state'>
      <span>{getGameStateText(props.gameState)}</span>
    </div>);

const mapStateToProps = ({ GameReducer: { gameState } }: IApplicationState) => ({ gameState });

export default connect(mapStateToProps)(GameState);