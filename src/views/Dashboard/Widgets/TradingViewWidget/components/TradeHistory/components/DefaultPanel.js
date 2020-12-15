import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '5px',
    height : '100%',
    width: '100%',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column'
  },
  flexGrow: {
    flexGrow: 1
  },
  title:{
    fontFamily: "Roboto-Regular",
    fontSize: '9.24pt',
    color: '#8eb4df', 
    display: 'flex',
    alignItems: 'center',    
    height: '100%',
    width: '60px'
  },
  orderBook: {
    width: '100%',
    height: '50%',
    margin: '0px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    display: 'flex',
    flexDirection: 'column',
    flex: 6
  },
  tradeHistory: {
    width: '100%',
    height: '50%',
    margin: '0px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    display: 'flex',
    flexDirection: 'column',
    flex: 4
  },
  table: {
    backgroundColor: 'transparent',
    borderWidth: '0px',
    border: '0px solid'
  },
  tableHead:
  {
    backgroundColor: 'transparent',
    width: '100%'
  },
  tableBody: {
    backgroundColor: 'transparent'
  },
  centerText:{
    color: 'white',
    fontFamily: 'Roboto-Bold',
    fontSize: '12.8pt',
  },
  centerTextPrice:{
    color: '#7ba0ca',
    fontFamily: 'Roboto-Bold',
    fontSize: '12.8pt',
  },
  tradeHistoryLabel:{
    color: '#7ba0ca',
    fontFamily: 'Roboto-Regular',
    fontSize: '9.24pt',
    border: '1px sold #132244'
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'transparent',
    color: '#8eb4df',
    fontFamily: 'Roboto-Regular',
    fontSize: '7.82pt',
    maxHeight: '20px',
    paddingLeft: '2px',
    paddingTop: '2px',
    paddingBottom: '2px',
    paddingRight: '2px',
    border: '0px solid',
    width: '33.333%'
  },
  body: {
    backgroundColor: 'transparent',
    fontSize: '9.24pt',
    paddingLeft: '2px',
    paddingTop: '2px',
    paddingBottom: '2px',
    paddingRight: '2px',
    border: '0px solid',
    color: '#8eb4df',
    
  },

}))(TableCell);


const StyledTableBuyRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'transparent',
      height: '20px',
      border: '0px solid'
    },
    '&:hover': {
      backgroundColor: '#ec3256 !important',      
    },
    '&:hover td': {
      color: 'white !important'
    }
  },
}))(TableRow);
const StyledTableSellRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'transparent',
      height: '20px',
      border: '0px solid'
    },
    '&:hover': {
      backgroundColor: '#359a82 !important',      
    },
    '&:hover td': {
      color: 'white !important'
    }
  },
}))(TableRow);
function createData(key,price, quantity, total) {
  return { key, price, quantity, total};
}

const rows_buy = [
  createData(0, 0.00007137, 9.2934, 0.00007137),
  createData(1, 0.00007137, 9.2934, 0.00007137),
  createData(2, 0.00007137, 9.2934, 0.00007137),
  createData(3, 0.00007137, 9.2934, 0.00007137),
  createData(4, 0.00007137, 9.2934, 0.00007137),
];
const rows_sell = [
  createData(0, 0.00007137, 9.2934, 0.00007137),
  createData(1, 0.00007137, 9.2934, 0.00007137),
  createData(2, 0.00007137, 9.2934, 0.00007137),
  createData(3, 0.00007137, 9.2934, 0.00007137),
  createData(4, 0.00007137, 9.2934, 0.00007137),
  
];
const rows_tradeHistory = [
  createData(0, 0.00007137, 9.2934, 0.00007137),
  createData(1, 0.00007137, 9.2934, 0.00007137),
  createData(2, 0.00007137, 9.2934, 0.00007137),
  createData(3, 0.00007137, 9.2934, 0.00007137),
  createData(4, 0.00007137, 9.2934, 0.00007137),
  createData(5, 0.00007137, 9.2934, 0.00007137),
  createData(6, 0.00007137, 9.2934, 0.00007137),
  createData(7, 0.00007137, 9.2934, 0.00007137),
  createData(8, 0.00007137, 9.2934, 0.00007137),
  createData(9, 0.00007137, 9.2934, 0.00007137),
  createData(10, 0.00007137, 9.2934, 0.00007137),
  createData(11, 0.00007137, 9.2934, 0.00007137),
  
];

const DefaultPanel = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClickRow = (event) => {    
    onSidebarOpen(true);
  };
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
        <div style={{height: '30px', paddingLeft: '10px', paddingRight: '10px', display: 'flex', border: '1px solid #142347', borderLeftWidth: '0px', borderRightWidth: '0px'}}>
          <Icon className={classes.title}>8 decimals</Icon>
          <div className={classes.flexGrow} />
            <div style={{padding:'0px'}}>        
              <IconButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                style={{color: '#7da3c9', padding: '0px'}}
              >
              <ExpandMoreIcon padding={0}/>  
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement={'bottom-end'}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
              >
                  <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          </div>
        </div>
        <div className={classes.orderBook}>
          <TableContainer component={Paper} style={{backgroundColor: 'transparent', flex: 9, border: '1px solid #15244c'}}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Quantity</StyledTableCell>
                  <StyledTableCell align="left">Total(BTC)</StyledTableCell>                  
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {rows_buy.map((row) => (
                  <StyledTableBuyRow key={row.key} onClick={handleClickRow}>
                    <StyledTableCell align="left" style={{color: '#f32f50'}} >{row.price}</StyledTableCell>
                    <StyledTableCell align="left" style={{color: 'white'}}>{row.quantity}</StyledTableCell>
                    <StyledTableCell align="left">{row.total}</StyledTableCell>
                  </StyledTableBuyRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{height: '46px', position:'relative', justifyContent: 'center', border:'1px solid #1b2d58', borderLeftWidth: 0, borderRightWidth: 0}}>
            <div style={{position: 'absolute', left: '50%', top: '50%', transform:' translate(-50%, -50%)'}}>
              <span className={classes.centerText} >0.00007195</span>&nbsp;&nbsp;<span className={classes.centerTextPrice} style={{color: '#7ba0ca'}}>$0.47</span>
            </div>
          </div>
          <TableContainer component={Paper} style={{backgroundColor: 'transparent', flex: 8, marginTop: '5px', border: '1px solid #15244c'}}>
            <Table className={classes.table} aria-label="customized table">
              <TableBody className={classes.tableBody}>
                {rows_sell.map((row) => (
                  <StyledTableSellRow key={row.key} onClick={handleClickRow}>
                    <StyledTableCell align="left" style={{color: '#359a82'}}>{row.price}</StyledTableCell>
                    <StyledTableCell align="left" style={{color: 'white'}}>{row.quantity}</StyledTableCell>
                    <StyledTableCell align="left">{row.total}</StyledTableCell>
                  </StyledTableSellRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={classes.tradeHistory} style={{height: 'relative'}}>
          <div style={{height: '27px', position:'relative', justifyContent: 'center', border:'1px solid #132244', borderLeftWidth: 0, borderRightWidth: 0}}>
              <div style={{position: 'absolute', top: '50%', transform:' translate(0%, -50%)'}}>
                <span className={classes.tradeHistoryLabel} >TradeHistory</span>
              </div>
          </div>

          <TableContainer component={Paper} style={{backgroundColor: 'transparent', width: '100%', height: '100%', flex: 1, position: 'relative',padding: 0, margin: 0,  overflowX: 'hidden', overflowY: 'auto'}}>
            <Table className={classes.table} aria-label="customized table" style={{backgroundColor: 'transparent', flex: 1, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0}}>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Quantity</StyledTableCell>
                  <StyledTableCell align="left">Total(BTC)</StyledTableCell>                  
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {rows_tradeHistory.map((row) => (
                  <StyledTableBuyRow key={row.key}>
                    <StyledTableCell align="left" style={{color: '#f32f50'}}>{row.price}</StyledTableCell>
                    <StyledTableCell align="left" style={{color: 'white'}}>{row.quantity}</StyledTableCell>
                    <StyledTableCell align="left">{row.total}</StyledTableCell>
                  </StyledTableBuyRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          
        </div>
    </div>
  );
};

DefaultPanel.propTypes = {
  className: PropTypes.string
};

export default DefaultPanel;
