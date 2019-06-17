export type Matrix = number[][];

export type Colors = {
  top: string,
  bottom: string,
  left: string,
  right: string,
  center: string
}

export type Block = {
  name: string,
  id: number,
  colors: Colors,
  matrix: Matrix,
  x: number,
  y: number
}