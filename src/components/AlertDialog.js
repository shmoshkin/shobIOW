import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText
} from 'material-ui/Dialog';

class AlertDialog extends React.Component {

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.cancelFunc} color="primary">
              בטל
            </Button>
            <Button onClick={this.props.acceptFunc} color="primary" autoFocus>
              אישור
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    acceptFunc: PropTypes.func.isRequired,
    cancelFunc: PropTypes.func.isRequired
  };

export default AlertDialog;
