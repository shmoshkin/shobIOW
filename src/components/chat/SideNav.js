import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Alert from "../Alert";
import axios from '../../utilities/Axios';
import * as urls from "../../constants/Urls";
import Avatar from 'material-ui/Avatar';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class SideNav extends Component {

    constructor(props) {

        super(props);
        this.state = {
            online: [],
            offline: []
        }
    }

    componentDidMount() {
      
        this.loadChatUsers();
    }
    
    loadChatUsers = () => {
        axios.get(urls.GET_ALL, {
            params: {
              collection: "ShoblaMembers"
            }
        })
        .then(res => {
          
          this.setState({online: res.data});
        })
        .catch(function (error) {
          Alert.error("ארעה שגיאה בטעינת משתמשי הצ'אט");
        });   
    }

    render() {
        const { classes, theme, open, handleDrawerClose } = this.props;
        const {online, offline} = this.state;

        let onlineChatUsers = online.map((user, i) => {
                   
            return(    
              <ListItem key={user._id.toString()} button>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary={user.name}/>
              </ListItem>
            )
        })

        let offlineChatUsers = offline.map((user, i) => {
                   
            return(    
              <ListItem key={user._id.toString()} button>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary={user.name}/>
              </ListItem>
            )
        })

        return (
            <Drawer
                variant="permanent"
                classes={{
                paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
                >
                <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </div>
                <Divider />
                <List component="nav">
                    {onlineChatUsers}
                </List>
                <Divider />
                <List component="nav">
                   {offlineChatUsers}
                </List>
            </Drawer>
        )
    }
}

SideNav.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles, { withTheme: true })(SideNav);