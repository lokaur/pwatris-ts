import React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../store';

interface IPropsFromState {
  highScore: number
}

const HighScoreCounter = (props: IPropsFromState) => (
  <div className='column high_score_counter'>
    <span className='column_title high_score_title'>High Score</span>
    <span className='counter'>{ props.highScore }</span>
  </div>);

const mapStateToProps = ({ GameReducer: { highScore } }: IApplicationState) => ({ highScore });

export default connect(mapStateToProps)(HighScoreCounter);