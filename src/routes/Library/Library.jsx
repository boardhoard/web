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

import games from '../Home/data'
import {TileModal} from './components'

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
    tileModalData: {}
  }

  componentDidMount() {
    if(firebase.auth().currentUser || localStorage.getItem('appToken')){
      var userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : localStorage.getItem('appToken');
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        console.log(snapshot)
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      })
    }
    
  }

  handleTileClose = () => {
    this.setState({ tileModalVisable: false });
  };

  handleTileOpen = (tileModalData) => {
    this.setState({tileModalVisable: true, tileModalData})
  }
  render() {
    const { classes } = this.props;
    const { tileModalData, tileModalVisable} = this.state;
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Boardhoard</ListSubheader>
          </GridListTile>
          {tileData.map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.thumbnail} alt={tile.title} onClick={() => this.handleTileOpen(tile)} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <LibraryAdd />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <TileModal open={tileModalVisable} tile={tileModalData} handleClose={this.handleTileClose} />
      </div>
    );
  }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);