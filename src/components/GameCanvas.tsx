import React from 'react';
import { connect } from 'react-redux';
import Canvas from 'react-responsive-canvas';

import GameState from './GameState';
import { drawGame } from '../helpers/renderHelper';
import config from '../config';
import './GameCanvas.scss';
import { IApplicationState } from '../store';
import { Block, Matrix } from '../types';

interface IPropsFromState {
  board: Matrix,
  currentBlock: Block
}

class GameCanvas extends React.Component<IPropsFromState> {
  private readonly canvasPaddingBottom: number;
  private canvasRef?: any;
  private isInitialized = false;
  private canvasContext?: CanvasRenderingContext2D;
  private blockSize?: number;
  private frameAnimationRequest?: number;

  constructor(props: IPropsFromState) {
    super(props);
    this.onResize = this.onResize.bind(this);

    const [ boardWidth, boardHeight ] = config.boardSize;
    this.canvasPaddingBottom = 100 / boardWidth * boardHeight;
  }

  componentDidMount() {
    this.canvasContext = this.canvasRef.getContext('2d');
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  tryInitialize() {
    if (!this.isInitialized) {
      this.blockSize = this.calculateBlockSize();
      this.isInitialized = true;
    }
  }

  calculateBlockSize() {
    const [ boardWidth ] = config.boardSize;
    return this.canvasRef.width / boardWidth;
  }

  onResize() {
    this.blockSize = this.calculateBlockSize();
    this.draw();
  }

  draw() {
    if (!this.frameAnimationRequest) {
      this.frameAnimationRequest = window.requestAnimationFrame(() => {
        const { board, currentBlock } = this.props;
        this.tryInitialize();
        drawGame(this.canvasContext, board, currentBlock, this.blockSize!);
        this.frameAnimationRequest = undefined;
      });
    }
  }

  render() {
    return (
      <div style={{ paddingBottom: `${this.canvasPaddingBottom}%` }}>
        <Canvas canvasRef={(e: any) => this.canvasRef = e} onResize={this.onResize} id='game'/>
        <GameState/>
      </div>);
  }
}

const mapStateToProps = ({ GameReducer: { board, currentBlock } }: IApplicationState) => ({ board, currentBlock });

export default connect(mapStateToProps)(GameCanvas);