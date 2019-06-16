import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { toggleMusic } from '../store/game';
import { IApplicationState } from '../store';

import './SoundControls.scss';

interface IPropsFromState {
  isMusicPlaying: boolean,
  toggleMusic: () => any
}

const SoundControls: React.FC<IPropsFromState> = (props: IPropsFromState) =>
  (<div className='column sound-controls'>
    <button className='btn-square' onClick={ props.toggleMusic }>
      <FontAwesomeIcon icon={ `volume-${ props.isMusicPlaying ? 'up' : 'mute' }` as IconProp }/>
    </button>
  </div>);

const mapStateToProps = ({ GameReducer: { isMusicPlaying } }: IApplicationState) => ({ isMusicPlaying });

const mapDispatchToProps = {
  toggleMusic
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundControls);