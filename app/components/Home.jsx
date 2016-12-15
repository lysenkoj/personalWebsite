import React, { Component } from 'react';
import {Link} from "react-router";
import Score from './Score';
import {utils, gameOfSnake} from '../../game/game.js';

export default class Home extends Component {
  componentDidMount(){
    gameOfSnake.createAndShowBoard();
    gameOfSnake.play();
  }

  render() {
    return (
      <div className="mainContainer">
        <table id="board"></table>
        <Score />
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
    )
  }
}