import React from 'react';

import { Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';
import { withRouter } from 'react-router'

import './Home.css';
import games from './data'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import ShowChart from '@material-ui/icons/ShowChart';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';


import {Library, Search} from '../'

const styles = {
      root: {
        position: 'fixed',
        width: '100%',
        bottom: '0'
      },
    };


class Home extends React.Component {
  constructor(props) {
    super(props);
    const {pathname} = this.props.location
    if(!localStorage.getItem('appToken')) {
      console.log(localStorage.getItem('appToken'))
      this.props.history.push('login')
    }
    if(pathname == '/search') {
      this.state = {value: 0}
    } else if(pathname == '/top') {
      this.state = {value: 2}
    } else {
      this.state = {value: 1}
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const goTo = () => {
      if(value === 0){
        return <Redirect push to='search'/>
      } else if(value === 1){
        return <Redirect push to='library'/>
      } else if(value === 2){
        return <Redirect push to='top'/>
      }
    }
    return (
      <div className='full'>
        <div className='content'>
          <Route path="/search" component={Search} />
          <Route path="/library" component={Library} />
        </div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction onClick={(props)=> {console.log(props)}} label="Search" icon={<SearchIcon />} />
          <BottomNavigationAction label="My Library" icon={<CollectionsBookmark />} />
          <BottomNavigationAction label="Favorites" icon={<ShowChart />} />
        </BottomNavigation>
        {goTo()}
      </div>      
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withRouter(withStyles(styles)(Home));
