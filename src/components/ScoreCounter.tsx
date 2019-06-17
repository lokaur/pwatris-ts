import React from 'react';
import { connect } from 'react-redux';

import './ScoreCounter.scss';
import { IApplicationState } from '../store';

interface IPropsFromState {
  score: number,
  highScore: number
}

const ScoreCounter = (props: IPropsFromState) =>
  (<div className='column score_counter'>
    <span className='column_title'>Score</span>
    <span className={ `counter${props.score > 0 && props.score >= props.highScore ? ' rainbow' : ''}` }>
      { props.score }
      </span>
  </div>);

const mapStateToProps = ({ GameReducer: { score, highScore } }: IApplicationState) => ({ score, highScore });

export default connect(mapStateToProps)(ScoreCounter);