import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import * as General from '../constants/General';
import axios from '../utilities/Axios';
import * as urls from "../constants/Urls";
import Alert from "./Alert";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});
  
class CleaningDuty extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

    componentDidMount() {
      
      this.loadCleaners();
    }
    
    loadCleaners = () => {
      axios.get(urls.GET_CLEANERS)
        .then(res => {
          
          this.setState(() => ({
            data: res.data
          }))
        })
        .catch(function (error) {
          Alert.error('ארעה שגיאה בטעינת תורנות ניקיון');
        });   
    }

    render() {   
        const { classes } = this.props;
        const { data } = this.state;

        let cleanersNodes = data.map((cleaner, i) => {

          return(    
            <ListItem key={cleaner._id.toString()}>
              <Avatar 
              src={require('../static/images/face.jpg')}>
              </Avatar>
              <ListItemText primary={General.WEEK_DAYS[i]} secondary={cleaner.name} />
            </ListItem>
          )
        })

        return (
          <div className={classes.root}>
            <List>
              {cleanersNodes}
            </List>
          </div>
        );
    }
}

CleaningDuty.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CleaningDuty);