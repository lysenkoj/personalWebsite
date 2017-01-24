import React, { Component } from 'react';
import {Link} from "react-router";
import Score from './Score';
import Snake from './Snake';
import PlayButton from './PlayButton';
import {utils, gameOfSnake} from '../../game/game.js';

export default class Home extends Component {

  render() {
    return (
      <div className="mainContainer">
        <Snake/>
        <Score />
        <PlayButton />
        <div className="buttonContainer">
          <Link to="/">
            <button>
              <img src="homeButton.png" width="50%"/>
            </button>
          </Link>
          <Link to="/portfolio">
            <button>
              <img src="portfolioButton.png" width="50%"/>
            </button>
          </Link>
          <Link to="/resume">
            <button>
              <img src="resumeButton.png" width="50%"/>
            </button>
          </Link>
          <Link to="/contact">
            <button>
             <img src="contactButton.png" width="50%"/>
            </button>
          </Link>
        </div>
      </div>
    )
  }
}