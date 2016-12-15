import React, { Component } from 'react';
import {utils, gameOfSnake} from '../../game/game.js';

export default class Snake extends Component {
  componentDidMount(){
    gameOfSnake.createAndShowBoard();
  }

  render() {
    return (
      <div>
        <table id="board"></table>
      </div>
    )
  }
}