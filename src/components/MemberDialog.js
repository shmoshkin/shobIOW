import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import CalanderIcon from 'material-ui-icons/DateRange';
import LeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import RightIcon from 'material-ui-icons/KeyboardArrowRight';
import axios from '../utilities/Axios';
import * as urls from "../constants/Urls";
import Alert from "./Alert";
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { DatePicker } from 'material-ui-pickers';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';
import { connect } from 'react-redux'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: "40px"
    },
    formField: {
      width: 200,
    },
    title: {
      background: "#3890de",
      left: 0,
      right: 0,
      top:0,
      position: "absolute",
      padding: "10px"
    },
    formControl: {
      marginTop: theme.spacing.unit * 2
    },
  });

  
class MemberDialog extends React.Component {    

  constructor(props) {
    super(props);

    this.state = {
      member: {
        crew:null,
        birthday: new Date(),
        studyDays:[]
      }
    };

    this.handleChange = this.handleChange.bind(this);    
    this.saveMember = this.saveMember.bind(this);
    this.onClose = this.onClose.bind(this);
    this.afterSave = this.afterSave.bind(this);
  }

  saveMember(member) {
    axios.post(urls.SAVE_MODEL, {
      collection: "ShoblaMembers",
      model: member
    }).then(this.afterSave)
  } 

  afterSave = (member) => {
    Alert.success(`חבר צוות ${member.name} נשמר בהצלחה`);      
    if (this.props.config.afterSave) this.props.config.afterSave();
  }

  onClose = () => {
    this.props.dispatch({
      type: 'CLOSE_CARD',
      id: this.props.id,
      config: this.props.config
    })
  }

  onSave = (member) => {
    this.saveMember(member);
    this.onClose();
  }

  handleChange = (field, value) => {
    this.setState({
      member: {
        ...this.state.member, 
        [field]: value
      },
    });
  };

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.open && nextProps.open) {

      this.setState({member: 
        (nextProps.config.member) ? nextProps.config.member : {
          crew:null,
          birthday: new Date(),
          studyDays:[]
        }
      })
    }
  }

  render() {    
    const { classes } = this.props;

    const names = [
      'א',
      'ב',
      'ג',
      'ד',
      'ה'
    ];

    return (
      <div>        
        <Dialog        
          open={this.props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.title}>הוספת חבר</DialogTitle>
          <DialogContent>
           <form className={classes.container} noValidate autoComplete="off">
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="_id"
                        label="מספר אישי"
                        className={classes.formField}
                        value={this.state.member._id}
                        onChange={(e) => this.handleChange("_id", e.target.value)}
                        margin="normal"                        
                        />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="name"
                        label="שם"
                        className={classes.formField}
                        value={this.state.member.name}
                        onChange={(e) => this.handleChange("name", e.target.value)}
                        margin="normal"
                        />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="phone"
                        label="טלפון"
                        className={classes.formField}
                        value={this.state.member.phone}
                        onChange={(e) => this.handleChange("phone", e.target.value)}
                        margin="normal"
                        />
                </Grid>
                <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="crew">צוות</InputLabel>
                    <Select
                      id="crew"
                      className={classes.formField}
                      value={this.state.member.crew}
                      onChange={(e) => this.handleChange("crew", e.target.value)}
                      inputProps={{
                        name: 'צוות',
                        id: 'crew',
                      }}
                    >
                      {/* <MenuItem value=''>
                        {/* <em></em> 
                        </MenuItem> */}
                      <MenuItem value="פיתוח">פיתוח</MenuItem>
                      <MenuItem value="הנדסה">הנדסה</MenuItem>
                  </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    id="birthday"
                    className={classes.formField}
                    label="יום הולדת"
                    clearable
                    keyboard
                    disableFuture
                    maxDateMessage="Date must be less than today"
                    value={this.state.member.birthday}
                    onChange={(e) => this.handleChange("birthday", e)}
                    animateYearScrolling={false}
                    margin="normal"
                    leftArrowIcon={<LeftIcon/>}
                    rightArrowIcon={<RightIcon/>}
                    keyboardIcon={<CalanderIcon/>}
                    okLabel="אישור"
                    cancelLabel="ביטול"
                    clearLabel="נקה"
                  />
                </Grid>
                <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="studyDays">ימי לימודים</InputLabel>
                  <Select
                    multiple
                    id="studyDays"
                    value={this.state.member.studyDays}
                    className={classes.formField}
                    onChange={(e) => this.handleChange("studyDays", e.target.value)}
                    renderValue={selected => selected.join(', ')}
                  >
                    {names.map(name => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={this.state.member.studyDays.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>
            </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose}  variant="raised" color="primary">
               ביטול
            </Button>
            <Button onClick={() => this.onSave(this.state.member)}  variant="raised" color="primary" autoFocus>
              אישור
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MemberDialog.propTypes = {
    member: PropTypes.object
};

MemberDialog = withStyles(styles)(connect()(MemberDialog));
export default MemberDialog;

