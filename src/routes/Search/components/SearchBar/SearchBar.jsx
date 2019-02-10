import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '97%',
    margin: '0.3rem',
  },
  input: {
    marginLeft: '0.5rem',
    flex: 1,
  },
  iconButton: {
    padding: '0.5rem',
  }
};

function SearchBar(props) {
  const { classes, searchTerm, handleSearch } = props;
  
  return (
    <Paper className={classes.root} elevation={3}>
      <InputBase className={classes.input} value={searchTerm} onChange={(event)=> {handleSearch(event.target.value)}} placeholder="Search Boardgames" />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);