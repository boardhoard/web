import React from 'react';

import firebase from 'firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

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


class TitlebarGridList extends React.Component {
  state = {
    tileModalVisable: false,
    tileModalData: {},
    tiles: []
  }

  componentDidMount() {
    let tiles = JSON.parse(localStorage.getItem('library'))
    if(tiles === null) {
      tiles = []
    }
    this.setState({tiles})
    console.log(this.state.tiles)
  }

  handleTileClose = () => {
    this.setState({ tileModalVisable: false });
  };

  handleTileOpen = (tileModalData) => {
    this.setState({tileModalVisable: true, tileModalData})
  }
  render() {
    const { classes } = this.props;
    const { tileModalData, tileModalVisable, tiles} = this.state;
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Boardhoard</ListSubheader>
          </GridListTile>
          {tiles.length === 0 && <i style={{margin: 'auto', marginTop: 100}}>No Games in Library</i>}
          {tiles && tiles.map(tile => (
            <GridListTile key={tile.thumbnail}>
              <img src={tile.thumbnail} alt={tile.name} onClick={() => this.handleTileOpen(tile)} />
              <GridListTileBar
                title={tile.name}
                subtitle={<span>released in {tile.yearPublished}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <LibraryAdd />
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