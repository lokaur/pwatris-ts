import React from 'react';

import GameCanvas from './components/GameCanvas';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className='main_container'>
        <div className='game_wrapper'>
          <GameCanvas/>
        </div>
        <div className='right_container'>
        </div>
      </div>
    </div>
  );
};

export default App;
