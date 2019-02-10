import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import LibraryAdd from '@material-ui/icons/LibraryAdd';


import {SearchBar} from './components'
import games from '../Home/data'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    maxWidth: 1000,
    height: '100%',
    paddingBottom: 100,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

class Search extends React.Component {
  state = {
    searchTerm: '',
    tiles: []
  }

  componentDidMount() {
    console.time('ervin')
    fetch('https://bgg-json.azurewebsites.net/collection/ervinding')
      .then(response => response.json())
      .then(tiles => {this.setState({ tiles }); console.timeEnd('ervin')});
  }

  handleSearch = (searchTerm) => {
    this.setState({searchTerm})
  } 

  filteredTiles = (tiles, filter) => {
    console.time('filter')
    if(filter === ''){
      return []
    }
    const filtered = tiles.filter( el => {
      return el.name.toLowerCase().startsWith(filter.toLowerCase())
    })
    console.timeEnd('filter')
    return filtered
  }
  render() {
    const { classes } = this.props;
    const { searchTerm, tiles } = this.state;
    console.log(searchTerm)
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Boardhoard</ListSubheader>
            <SearchBar searchTerm={searchTerm} handleSearch={this.handleSearch}/>
          </GridListTile>
          {!searchTerm && <i style={{margin: 'auto', marginTop: 100}}>Please enter searchterm...</i>}
          {this.filteredTiles(tiles, searchTerm).map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.thumbnail} alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                subtitle={<span>Rank: {tile.rank}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <LibraryAdd />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);