import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import keysWatcher from '../keysWatcher';

import './Button.scss';

const onTouchStart = (actionName: string) => keysWatcher.add(actionName);
const onTouchEnd = (actionName: string) => keysWatcher.remove(actionName);

interface IProps {
  icon: string,
  actionName: string
}

const ControlButton: React.FC<IProps> = (props: IProps) => (
  <button className='btn-circle' onTouchStart={() => onTouchStart(props.actionName)}
          onTouchEnd={() => onTouchEnd(props.actionName)}>
    <FontAwesomeIcon className='btn-icon' icon={props.icon as IconProp}/>
  </button>);

export default ControlButton;