import React, { Component } from 'react';
import {Link} from "react-router";
import Score from './Score';
import Snake from './Snake';
import {utils, gameOfSnake} from '../../game/game.js';

export default class Home extends Component {
  constructor(props){
    super(props)

    this.play = this.play.bind(this);
  }

  play(){
    gameOfSnake.play()
  }



  render() {
    return (
      <div className="mainContainer">
        <Snake/>
        <Score />
        <div className="buttonContainer">
          <Link to="/snake">
            <button>SNAKE</button>
          </Link>
          <Link to="/projects">
            <button>PROJECTS</button>
          </Link>
          <Link to="/about">
            <button>ABOUT</button>
          </Link>
          <Link to="/contact">
            <button>CONTACT</button>
          </Link>
        </div>
        <button onClick={this.play} id="playButton">PLAY</button>
      </div>
    )
  }
}