let pressedKeys: { [ s: string ]: boolean } = {};

const add = (code: string) => {
  pressedKeys[ code.toLowerCase() ] = true;
};

const remove = (code: string) => {
  delete pressedKeys[ code.toLowerCase() ];
};

const reset = () => {
  pressedKeys = {};
};

const isPressed = (...keys: string[]) => keys.reduce((defined, key) => defined || pressedKeys[ key ] !== undefined, false);

export default {
  add,
  remove,
  reset,
  isPressed,
};