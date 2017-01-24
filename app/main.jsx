'use strict'
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';

import store from './store';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';



render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <Route path="/portolio" component={Portfolio}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)