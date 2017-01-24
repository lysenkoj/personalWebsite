import React, { Component } from 'react';
import {utils, gameOfSnake} from '../../game/game.js';

export default class PlayButton extends Component {
  constructor(props){
    super(props)

    this.play = this.play.bind(this);
  }

  play(){
    gameOfSnake.play()
    // change state to play
    // when state is play hide play button
  }

  render() {
    return (
      <div id="playButtonContainer">
        <button onClick={this.play} id="playButton">
          <img src="playButton.png" width="50%"/>
        </button>
      </div>
    )
  }
}