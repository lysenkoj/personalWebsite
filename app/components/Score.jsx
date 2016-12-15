import React, { Component } from 'react';
import {utils, gameOfSnake} from '../../game/game.js';

export default class Score extends Component {

  render() {
    return (
      <div className="score">
      {`SCORE: ${gameOfSnake.snake.length}`}
      </div>
    )
  }
}