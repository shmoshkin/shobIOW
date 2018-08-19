import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PeopleIcon from 'material-ui-icons/People';
import ManIcon from 'material-ui-icons/DirectionsWalk';
import ShoblaMembers from './ShoblaMembers';
import axios from '../utilities/Axios';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    
  }
});

class ItemContent extends React.Component {
    
    render() {
        let item;
        switch(this.props.value) {
            case 'ShoblaMembers':
              item = <ShoblaMembers/>;
              break;
            case 'ShoblaDuty':
              item = <ShoblaMembers />;
              break;
            default:
              item = <ShoblaMembers />;
        }
      
        return item;
    }
}

class Administrator extends React.Component {
  
  state = {
        activeTab: "ShoblaMembers"
    };

    isActive = tab => (tab === this.state.activeTab) ? this.props.classes.active : '';
     
    render() {  
        const { classes } = this.props;
        
        return (
        <div className={classes.root}>
            <div className={classes.appFrame}>            
                <main id="tabContent" className={classes.content}>
                    {<ItemContent value={this.state.activeTab}/>}
                </main>                  
            </div>
        </div>
        );
    }
}

Administrator.propTypes = {
    classes: PropTypes.object.isRequired,
};

// Administrator = connect(state => ({ ...state.administrator }), actions)(Administrator)
export default withStyles(styles)(Administrator)