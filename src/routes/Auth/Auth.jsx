import React from 'react';

import './Auth.css';
import {Login} from '../../components';
import { Redirect } from 'react-router';


class App extends React.Component {
  state = {
  };

  render() {
    const {isAuth} = this.state;

    const handleSuccessfulLoginRedirect = () => {
      this.setState({isAuth: true})
      console.log('Successful Login')
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className='title'>Boardhoard</h1>
          <Login onSuccess={handleSuccessfulLoginRedirect}/>
          <svg className='wave' id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="-300 0 950 270" >
            <path d="M-314,267 C105,364 400,100 812,279" fill="none" stroke="white" strokeWidth="120" strokeLinecap="round"/>
          </svg>
        </header>
      </div>
    );
  }
}

export default App;
