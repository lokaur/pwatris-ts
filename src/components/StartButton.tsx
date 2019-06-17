import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GameState } from '../enums/gameState';
import keysWatcher from '../keysWatcher';

import './Button.scss';
import { IApplicationState } from '../store';

const startAction = 'mstart';
const onTouchStart = () => keysWatcher.add(startAction);
const onTouchEnd = () => keysWatcher.remove(startAction);

interface IPropsFromState {
  gameState: string
}

const StartButton: React.FC<IPropsFromState> = (props) => (
  <button className='btn-circle' onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    {props.gameState === GameState.GAME_STATE_PLAYING
      ? <FontAwesomeIcon className='btn-icon' icon='pause'/>
      : <FontAwesomeIcon className='btn-icon' icon='play'/>}
  </button>);

const mapStateToProps = ({ GameReducer: { gameState } }: IApplicationState) => ({ gameState });

export default connect(mapStateToProps)(StartButton);