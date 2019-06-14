import React from 'react';

import GameCanvas from './components/GameCanvas';
import NextBlock from './components/NextBlock';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className='main_container'>
        <div className='game_wrapper'>
          <GameCanvas/>
        </div>
        <div className='right_container'>
          <NextBlock/>
        </div>
      </div>
    </div>
  );
};

export default App;
