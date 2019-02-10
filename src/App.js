import React, { Component } from 'react';

import { Route, BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './App.css';
import {Auth, Home} from './routes'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" component={Auth} />
          <Route path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
