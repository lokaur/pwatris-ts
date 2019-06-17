import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../store';

const musicFile = require('../music/music_8bit_jammer.mp3');

interface IPropsFromState {
  isMusicPlaying: boolean
}

class Music extends React.Component<IPropsFromState> {
  private audioRef: React.RefObject<HTMLAudioElement> = createRef<HTMLAudioElement>();

  componentDidMount() {
    const audio = this.audioRef!.current!;
    audio.volume = 0.5;

    if (this.props.isMusicPlaying) {
      audio.play();
    }
  }

  componentDidUpdate() {
    const audio = this.audioRef!.current!;
    if (this.props.isMusicPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  render() {
    return (<audio ref={this.audioRef} src={musicFile} loop/>);
  }
}

const mapStateToProps = ({ GameReducer: { isMusicPlaying } }: IApplicationState) => ({ isMusicPlaying });

export default connect(mapStateToProps)(Music);