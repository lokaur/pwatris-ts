import { combineReducers, AnyAction, Action, Dispatch } from 'redux';

import { GameReducer, IGameState } from './game';

export interface IApplicationState {
  GameReducer: IGameState
}

export interface IConnectedReduxProps<T extends Action = AnyAction> {
  dispatch: Dispatch<T>
}

export const createRootReducer = () => combineReducers({ GameReducer });