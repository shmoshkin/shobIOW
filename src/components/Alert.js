import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

let alertCon;

export default class Alert extends React.Component { 
  
  static success(message) { 
    alertCon.success(message);
  } 

  static error(message) { 
    alertCon.error(message);
  } 

  static log(message) { 
    alertCon.log(message);
  } 

  render () {
    return (
      <div>
        <AlertContainer onRef={ref => { alertCon = ref }} {...this.props} />
      </div>
    )
  }
}

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  success: {
    backgroundColor: "#2af31de8"
  },
  error: {
    backgroundColor: "#f31d1dd9"
  },
  log: {
    backgroundColor: "#272727d9"
  },
});

class AlertContainer extends React.Component {

  state = {
    isOpen: false,
  };

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  show = (message, type) => {
    this.setState({ isOpen: true, message, type});
  }

  success = message => {
    this.show(message, "success");
  }

  error = message => {
    this.show(message, "error");
  }

  log = message => {
    this.show(message, "log");
  }

  handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    this.setState({ isOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar         
          anchorOrigin={{
            vertical: this.props.vertical || 'bottom',
            horizontal: this.props.horizontal || 'center',
          }}
          open={this.state.isOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
            className: classes[this.state.type]
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.props.onUndo}>
            //   בטל
            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

AlertContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

AlertContainer = withStyles(styles)(AlertContainer);

