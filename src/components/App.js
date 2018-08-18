import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import NotificationManager from '../utilities/NotificationManager';
import Alert from "./Alert";
import {AppBar, Tabs, Tab} from 'material-ui'
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Administrator from './Administrator';
import Layout from './chat/Layout';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%', 
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
  },
  appTab: {
    color: 'white'
  },
  appBar: {
    flexWrap: 'wrap',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  }, 
});

class App extends React.Component {

    constructor(){
        super();
        this.state = {
            open: false,
            activeTab: 0
        };

        this.notificationManager = new NotificationManager();
    }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
      <Alert/>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
                variant="title" 
                color="inherit" noWrap
            >
                <Tabs
                    value={this.state.activeTab}
                    onChange={(e, tab) => this.setState({activeTab: tab})}
                    indicatorColor="secondary"
                    buttonClassName="appTab"
                    fullWidth
                >
                    <Tab className={classes.appTab} label="ראשי" component={Link} to={'/'}/>
                    <Tab label="שרתים"/>
                    <Tab label="מנהלן" component={Link} to={'/administrator'}/>
                </Tabs>
            </Typography>
          </Toolbar>
        </AppBar>
        <Layout/>
        <Switch>
            <Route exact path='/' component={Home}/>
            {/* <Route path='/servers' component={Servers}/> */}
            <Route path='/administrator' component={Administrator}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);