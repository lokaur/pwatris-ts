import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fas,
  faPlay,
  faPause,
  faRedo,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faVolumeUp,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons';
import { isMobile } from 'react-device-detect';

import GameCanvas from './components/GameCanvas';
import NextBlock from './components/NextBlock';
import LevelCounter from './components/LevelCounter';
import ScoreCounter from './components/ScoreCounter';
import HighScoreCounter from './components/HighScoreCounter';
import SoundControls from './components/SoundControls';
import StartButton from './components/StartButton';
import ControlsHelp from './components/ControlsHelp';
import MobileControls from './components/MobileControls';

import './App.scss';

library.add(fas, faPlay, faPause, faRedo, faChevronRight, faChevronLeft, faChevronDown, faVolumeUp, faVolumeMute);

const App: React.FC = () => (
  <div className="App">
    <div className='main_container'>
      <div className='game_wrapper'>
        <GameCanvas/>
      </div>
      <div className='right_container'>
        <NextBlock/>
        <LevelCounter/>
        <ScoreCounter/>
        <HighScoreCounter/>
        <SoundControls/>
        {isMobile && (
          <div className='column'>
            <StartButton/>
          </div>)}
        {!isMobile && <ControlsHelp/>}
      </div>
    </div>
    { isMobile && <MobileControls/> }
  </div>
);

export default App;
