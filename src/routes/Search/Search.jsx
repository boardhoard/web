import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import localForage from 'localforage';

import {TileModal} from '../../components'
import {SearchBar} from './components'

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
    tiles: [],
    tileModalVisable: false,
    tileModalData: null
  }

  componentDidMount() {
    let library = localForage.getItem('library')
    if(library && library.length > 0) {
      library = [...JSON.parse(library)].map(el => el.gameId)
    } else {
      library = []
    }
    this.setState({library})
    fetch('https://bgg-json.azurewebsites.net/collection/ervinding')
      .then(response => response.json())
      .then(tiles => {this.setState({ tiles })});
  }

  handleSearch = (searchTerm) => {
    this.setState({searchTerm})
  } 

  handleTileClose = () => {
    this.setState({ tileModalVisable: false });
  };

  handleTileOpen = (tileModalData) => {
    this.setState({tileModalVisable: true, tileModalData})
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

  addToLibrary = (tile) => {
    let library = localForage.getItem('library')
    if(library && library.length > 0) {
      library = [...JSON.parse(library),tile]
    } else {
      library = [tile]
    }
    localForage.setItem('library', JSON.stringify(library)).then()
    this.setState({library: library.map( el => el.gameId)})
  }
  render() {
    const { classes } = this.props;
    const { searchTerm, tiles, tileModalData, tileModalVisable, library} = this.state;

    console.log(searchTerm)
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Boardhoard</ListSubheader>
            <SearchBar searchTerm={searchTerm} handleSearch={this.handleSearch}/>
          </GridListTile>
          {!searchTerm && <i style={{margin: 'auto', marginTop: 100}}>Please enter search term...</i>}
          {this.filteredTiles(tiles, searchTerm).map(tile => (
            <GridListTile key={tile.thumbnail}>
              <img src={tile.thumbnail} alt={tile.name} onClick={() => this.handleTileOpen(tile)} />
              <GridListTileBar
                title={tile.name}
                subtitle={<span>Rank: {tile.rank}</span>}
                actionIcon={
                  <IconButton className={classes.icon} >
                    {library.includes(tile.gameId) ? <PlaylistAddCheck/> : <LibraryAdd onClick={() => this.addToLibrary(tile)} />}
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        {(tileModalVisable && tileModalData.gameId) && <TileModal id={tileModalData.gameId} open={tileModalVisable} meta={tileModalData} handleClose={this.handleTileClose} />}
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);