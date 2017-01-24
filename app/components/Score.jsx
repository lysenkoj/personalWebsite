import React, { Component } from 'react';
import {utils, gameOfSnake} from '../../game/game.js';

export default class Score extends Component {

  render() {
    return (
      <div className="score">
        <img src="score.png" width="30%" />
      </div>
    )
  }
}