import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import RefreshIcon from 'material-ui-icons/Refresh';
import { lighten } from 'material-ui/styles/colorManipulator';
import axios from '../utilities/Axios';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import AlertDialog from "./AlertDialog";
import MemberCard from "./MemberDialog";
import {Card} from "./Card";
import * as urls from "../constants/Urls";
import { connect } from 'react-redux';

const columnData = [
  { id: 'date', numeric: true, disablePadding: true, label: 'תאריך' },
  { id: 'shooterId', numeric: true, disablePadding: false, label: 'מסטב יורה' },
  { id: 'targetId', numeric: true, disablePadding: false, label: 'מסטב מטרה' },
  { id: 'shooterCoordinate', numeric:false, disablePadding: false, label: 'נ.צ' },
  { id: 'shooterBattalion', numeric: false, disablePadding: false, label: 'גדוד' },
  { id: 'shooterTeam', numeric: false, disablePadding: false, label: 'צוות' },
];

const styles = theme => ({
  root: {
    width: '100%',
    // height: 200,
    // overflowY: 'auto',
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    flip: false
  },
  body: {
    height: "250px",
    overflowY: 'auto',
    display: "block"
  },
  head: {
    display: "block"
  }
});

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.dark,
          backgroundColor: lighten(theme.palette.secondary.light, 0.4),
        }
      : {
          color: lighten(theme.palette.secondary.light, 0.4),
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: "flex"
  },
  title: {
    flex: '0 0 auto',
  },
});

class MembersTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead className={classes.head}>
        <TableRow>
          <TableCell width="3%" padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                width="15%"
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

MembersTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

MembersTableHead = withStyles(styles)(MembersTableHead);

let MembersTableToolbar = props => {
  const { numSelected, classes, actions } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography variant="subheading">נבחרו {numSelected} רשומות</Typography>
        ) : (
          <Typography variant="title"></Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={actions.handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <div className={classes.actions}>
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
            <IconButton aria-label="refresh">
              <RefreshIcon onClick={actions.handleRefresh}/>
            </IconButton>
          </div>
        )}
      </div>
    </Toolbar>
  );
};

MembersTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

MembersTableToolbar = withStyles(toolbarStyles)(MembersTableToolbar);

class MembersTable extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.loadMembers = this.loadMembers.bind(this);
        this.deleteMembers = this.deleteMembers.bind(this);
        this.openMemberCard = this.openMemberCard.bind(this);

        this.state = {
          order: 'asc',
          orderBy: 'id',
          selected: [],
          data: [],
          page: 0,
          rowsPerPage: 5,
          deleteAlertOpen: false
        };
    }

    loadMembers() {
        axios.get(urls.GET_ALL, {
          params: {
            collection: "events"
          }
        }).then(res => {
            this.setState({ data: res.data });
        })
    }

    deleteMembers(memberIds) {
        axios.post(urls.DELETE_MEMBERS, {
          ids: memberIds
        }).then(res => {
            this.setState({ 
              data: this.state.data.filter(item => memberIds.indexOf(item._id) === -1),
              deleteAlertOpen: false,
              selected: []
            });
        })
    }

    componentDidMount() {
        this.loadMembers();
    }
    
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
            ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });        
    };

    handleSelectAllClick = (event, checked) => {
        let selected = [];
        if (checked) selected = this.state.data.map(n => n._id);     
        this.setState({ selected });
    };

    handleClick = id => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        // Select row
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } 
        // Unselect the first row
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } 
        // Unselect the last row
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } 
        // Unselect middle row
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => this.setState({ page });

    handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value });

    labelDisplayedRows = info => info.from + "-"  + info.to + " מתוך " + info.count;

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    toggleDeleteDialog = () => this.setState({ deleteAlertOpen: !this.state.deleteAlertOpen})    

    openMemberCard = (member) =>  {
      this.props.dispatch({
        type: 'OPEN_CARD',
        id: 'crdMember',
        config: {
          afterSave: this.loadMembers,
          member
        }
      })
    }    

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    
    const toolbarActions = {
      handleDelete: this.toggleDeleteDialog,
      handleRefresh: this.loadMembers
    }
    return (
      <div>
        <Paper className={classes.root}>
            <AlertDialog open={this.state.deleteAlertOpen}
                   message="האם אתה בטוח שברצונך לבצע את המחיקה?"
                   acceptFunc={() => this.deleteMembers(this.state.selected)}
                   cancelFunc={this.toggleDeleteDialog}/>                  
            <MembersTableToolbar 
               numSelected={selected.length} 
               actions={toolbarActions}/>
            <div className={classes.tableWrapper}>
            <Table className={classes.table}>
                <MembersTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
                />
                <TableBody className={classes.body}>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                    const isSelected = this.isSelected(n._id);
                    let d = new Date(n.date);
                    let date = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " - " + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
                    return (
                    <TableRow
                        hover
                        onClick={() => this.handleClick(n._id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n._id}
                        selected={isSelected}
                    >
                        <TableCell width="3%" padding="checkbox">
                           <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell width="15%" padding="none">{date}</TableCell>
                        <TableCell width="15%">{n.shooter._id}</TableCell>
                        <TableCell width="15%">{n.target._id}</TableCell>
                        <TableCell width="15%">{n.shooter.coordinate.y + ' / ' + n.shooter.coordinate.x}</TableCell>
                        <TableCell width="15%">{n.shooter.battaltion}</TableCell>
                        <TableCell width="15%">{n.shooter.team}</TableCell>    
                    </TableRow>
                    );
                })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                      <TablePagination
                      colSpan={6}
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{
                          'aria-label': 'Previous Page',
                      }}
                      nextIconButtonProps={{
                          'aria-label': 'Next Page',
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      labelRowsPerPage="מס' שורות בעמוד"
                      labelDisplayedRows={this.labelDisplayedRows}
                      />
                  </TableRow>
                </TableFooter>
            </Table>
            </div>
        </Paper>
        <Card id="crdMember" elem={MemberCard}/> 
      </div>
    );
  }
}

MembersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

MembersTable = connect()(MembersTable)
export default withStyles(styles)(MembersTable);