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

import { Spin } from 'antd';

import bgg from '../../utilities'
import games from '../Home/data'
import {TileModal} from '../../components'

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

const tileData = games.games.map((el) => {
  return {
    ...el,
    img: el.image,
    title: el.name,
    author: el.publishers,
  }
})

class TitlebarGridList extends React.Component {
  state = {
    tileModalVisable: false,
    tileModalData: {},
    top: null,
    library: []
  }

  componentDidMount() {
    let library = localStorage.getItem('library')
    if(library && library.length > 0) {
      library = [...JSON.parse(library)].map(el => el.gameId)
    } else {
      library = []
    }
    this.setState({library})
    bgg.top()
    // fetch('https://bgg-json.azurewebsites.net/hot')
    //   .then(response => response.json())
    //   .then(top => this.setState({ top }));
      this.setState({ top:[] })
  }

  handleTileClose = () => {
    this.setState({ tileModalVisable: false });
  };

  handleTileOpen = (tileModalData) => {
    this.setState({tileModalVisable: true, tileModalData})
  }

  addToLibrary = (tile) => {
    let library = localStorage.getItem('library')
    if(library && library.length > 0) {
      library = [...JSON.parse(library),tile]
    } else {
      library = [tile]
    }
    localStorage.setItem('library', JSON.stringify(library))
    this.setState({library: library.map( el => el.gameId)})

  }

  render() {
    const { classes } = this.props;
    const { tileModalData, tileModalVisable, top, library} = this.state;
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Boardhoard</ListSubheader>
          </GridListTile>
          {!top && <Spin style={{width: '100%', marginTop: 100}} size="large" />}
          {top && top.map(tile => (
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

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);