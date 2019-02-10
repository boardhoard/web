import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ResponsiveDialog extends React.Component {
  state = {
    small: true
  }

  render() {
    const { fullScreen, open, tile, handleClose } = this.props;
    const {small} = this.state;
    const cardInfo = small ? (
      <DialogContentText onClick={()=>this.setState({small: false})}>{tile.description ? tile.description.substring(0, 140) + '... ':''}<i>(Click for more)</i> </DialogContentText>
    ) : (
      <>
      <DialogContentText>{tile.description}</DialogContentText><br/>
      <DialogContentText><b>Players:</b> {tile.minPlayers} - {tile.maxPlayers}</DialogContentText>
      <DialogContentText><b>Playtime:</b> {tile.playingTime} mins</DialogContentText>
      <DialogContentText><b>Published:</b> {tile.yearPublished}</DialogContentText>
      <DialogContentText><b>Rating:</b> {Math.round(tile.averageRating*10)/10}/10</DialogContentText>

      </>
    )
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={() => {handleClose(); this.setState({small: true})}}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{tile.title}</DialogTitle>
          <DialogContent>
            <img src={tile.img} width='100%' alt={tile.title} />
            {cardInfo}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {handleClose(); this.setState({small: true})}} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);