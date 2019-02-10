import React, { Component } from 'react';

import { Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';
import './App.css';
import {Auth, Home} from './routes'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
