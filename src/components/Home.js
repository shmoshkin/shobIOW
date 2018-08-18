import React, {Component} from 'react';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import QuickLinks from "./QuickLinks"
import { connect } from 'react-redux'
import * as actions from '../actions/Home'
import CleaningDuty from './CleaningDuty'
import red from 'material-ui/colors/red';
import Avatar from 'material-ui/Avatar';
import date from '../utilities/Date';
import StarBorder from 'material-ui-icons/';

const styles = theme => ({
    quickLinksContent: {
        display: 'flex',
        justifyContent: 'center',
    },
    quickLinksContainer: {
        width: '100%',
    },
    cleaningDutyContainer:{
        width: '30%',
        margin: '4px 0 0 0',
    },
    avatar: {
        backgroundColor: red[500],
    },
    title: {
        margin: '0 0 16px 20px',
        fontSize: 16
    }
  });

class Home extends Component {

    componentDidMount() { 
        this.props.loadLinks();
    }

    render() {
        const { classes } = this.props;
        var week = date.getSundayOfCurrentWeek().toDateString() + ' - ' + date.getThursdayOfCurrentWeek().toDateString();

        return (
            <div>
                <Card  className={classes.quickLinksContainer}>
                    <CardContent className={classes.quickLinksContent}>
                       <QuickLinks data={ this.props.links }/>                        
                    </CardContent>
                </Card>
                <Card className={classes.cleaningDutyContainer}>
                    <CardHeader
                        
                        avatar={
                        <Avatar aria-label="נקיון" className={classes.avatar}>
                            נ
                        </Avatar>
                        }

                        title="תורנות ניקיון"
                        subheader={week}
                    />
                    <CardContent>
                        <CleaningDuty/>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

Home = connect(state => ({ ...state.home }), actions)(Home)
export default withStyles(styles)(Home);