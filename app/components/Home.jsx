import React, { Component } from 'react';
import {Link} from "react-router";
import Score from './Score';

export default class Home extends Component {

  render() {
    return (
      <div>
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