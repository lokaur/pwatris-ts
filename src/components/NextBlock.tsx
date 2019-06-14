import React from 'react';
import { connect } from 'react-redux';
import Canvas from 'react-responsive-canvas';

import { clearCanvas, drawMatrix } from '../helpers/renderHelper';
import { getMatrixWidth, getMatrixHeight } from '../helpers/matrixHelper';
import config from '../config';

import './NextBlock.scss';
import { IApplicationState, IConnectedReduxProps } from '../store';
import { Block } from '../types';

interface IPropsFromState {
  nextBlock: Block
}

type IAllProps = IConnectedReduxProps & IPropsFromState;

class NextBlock extends React.Component<IAllProps, IPropsFromState> {
  private readonly nextBlockBoardSize: number;
  private canvasRef?: any;
  private canvasContext?: CanvasRenderingContext2D;
  private frameAnimationRequest?: number;
  private isInitialized = false;
  private blockSize?: number;

  constructor(props) {
    super(props);
    this.nextBlockBoardSize = config.nextBlockBoardSize;
    this.onResize = this.onResize.bind(this);
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

  onResize() {
    this.blockSize = this.calculateBlockSize();
    this.draw();
  }

  calculateBlockSize() {
    return this.canvasRef.width / this.nextBlockBoardSize;
  }

  draw() {
    if (!this.frameAnimationRequest) {
      this.frameAnimationRequest = window.requestAnimationFrame(() => {
        const { nextBlock } = this.props;
        this.tryInitialize();
        clearCanvas(this.canvasContext);
        const x = Math.floor((this.nextBlockBoardSize - getMatrixWidth(nextBlock.matrix)) / 2);
        const y = Math.floor((this.nextBlockBoardSize - getMatrixHeight(nextBlock.matrix)) / 2);
        drawMatrix(this.canvasContext, nextBlock.matrix, this.blockSize!, x, y);
        this.frameAnimationRequest = undefined;
      });
    }
  }

  render() {
    return (
      <div className='column'>
        <span className='column_title'>Next</span>
        <div className='container'>
          <div className='next_block_canvas_wrapper'>
            <Canvas
              canvasRef={(e: any) => this.canvasRef = e}
              onResize={this.onResize}
              className='next_block'
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ GameReducer: { nextBlock } }: IApplicationState) => ({ nextBlock });

export default connect(mapStateToProps)(NextBlock);