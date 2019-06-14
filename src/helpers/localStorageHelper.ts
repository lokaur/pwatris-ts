import { IApplicationState } from '../store';

const KEY = 'PWATRIS';

export const loadState = (): IApplicationState | undefined => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: IApplicationState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch {
    // ignore
  }
};