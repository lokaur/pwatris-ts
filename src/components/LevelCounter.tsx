import React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../store';

interface IPropsFromState {
  level: number
}

const LevelCounter: React.FC<IPropsFromState> = (props: IPropsFromState) =>
  (<div className='column level_counter'>
    <span className='column_title'>Level</span>
    <span className='counter'>{ props.level + 1 }</span>
  </div>);

const mapStateToProps = ({ GameReducer: { level } }: IApplicationState) => ({ level });

export default connect(mapStateToProps)(LevelCounter);