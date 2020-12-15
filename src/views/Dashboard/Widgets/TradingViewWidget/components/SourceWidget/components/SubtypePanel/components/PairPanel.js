import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5px',
    backgroundColor: '#12213f',
    // backgroundColor: 'white',
    height : '100%',
    width: '100%',
    padding: '0px',
    display: 'flex'      ,
    flexDirection: 'column',    
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchClass:
  {
    marginLeft: '5px',
    border: '0px solid',
  },
  table: {
    backgroundColor: 'transparent',
    borderWidth: '0px',
    border: '0px solid'
  },
  tableHead:
  {
    backgroundColor: 'transparent'
  },
  tableBody: {
    backgroundColor: 'transparent'
  },
  arrowClass : {
      width: '18px',
      height: '18px'

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
        border: '0px solid'

    },
    body: {
        backgroundColor: 'transparent',
        fontFamily: 'Roboto-Bold',
        fontSize: '9.24pt',
        paddingLeft: '2px',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingRight: '2px',
        border: '0px solid',
        color: '#8eb4df',
        
    },
  
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
        minHeight: 36,
      '&:nth-of-type(odd)': {
        backgroundColor: 'transparent',
        height: '20px',
        border: '0px solid'
      },
      '&:hover': {
        backgroundColor: '#1b2d5e !important',      
      },
      '&:hover td': {
        color: 'white !important'
      }      
    },
  }))(TableRow);
const rows_tradeHistory = [
createData(0, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(1, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(2, 'BTC/USD', 0.00007137, 4023.29, -8.75),
createData(3, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(4, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(5, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(6, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(7, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(8, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(9, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(10, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(11, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(12, 'BTC/USD', 0.00007137, 4023.29, 2.09),
createData(13, 'BTC/USD', 0.00007137, 4023.29, 2.09),

];
function createData(key,type, quantity, volume, profit) {
    return { key, type, quantity, volume, profit};
}
const PairPanel = props => {
  const { className, mRef, ...rest } = props;
  const [value, setValue] = React.useState('');
  const classes = useStyles();
  const mainRef = useRef(null);
  const handleChange = (prop) => (event) => {
    setValue(event.target.value);
  };
  const onClickDown = (event) =>{
    console.log('Click Down');
    scrollToBottom();
  };
  const scrollToBottom = () => {
    mainRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div style={{flexGrow: 1, width: '100%', position: 'relative'}}>
          <div style={{marginLeft: '5px', marginRight: '5px', marginTop: '10px', margintBottom: '0px', 
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          overflowY: 'auto'}}>
              <TableContainer component={Paper} style={{backgroundColor: 'transparent', flex: 1}}>
                  <Table className={classes.table} aria-label="customized table">
                  <TableBody className={classes.tableBody}>
                      {rows_tradeHistory.map((row, index, rows) => (
                      <StyledTableRow key={row.key} style={{height: '48px', color: '#95c0e9'}}>
                          <StyledTableCell align="left">
                              <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
                                  {row.type}
                                  <div style={{fontFamily: 'Roboto-Regular', fontSize: '7.82pt', }}>Vol.{row.volume}</div>
                              </div>                            
                          </StyledTableCell>
                          <StyledTableCell align="right" >
                              <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
                                      {row.quantity}
                              <div style={{fontFamily: 'Roboto-Regular', fontSize: '7.82pt', display: 'flex',
                                  color: row.profit > 0 ? '#3bd890' : '#b12d4f' }}><div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "auto"}}>{row.profit > 0 ? '+' : '-'}{row.profit}%
                                  {row.profit > 0 ? <ArrowDropUpIcon className={classes.arrowClass}/> : <ArrowDropDownIcon className={classes.arrowClass}/>}</div>
                              </div>
                              </div>                            
                          </StyledTableCell>                        
                      </StyledTableRow>
                      ))}
                  </TableBody>
                  </Table>
              </TableContainer>
              <div ref={mainRef} />
          </div>
        </div>
        <div style={{height: '46px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: '24px', height: '24px', borderRadius: '12px', border: '1px solid #2b4574'}}>
            <IconButton style={{padding: 0}} onClick={onClickDown}><KeyboardArrowDownIcon style={{color: '#2b4574', width: '22px', height: '22px'}}/></IconButton>
          </div>
        </div>
    </div>
  );
};

PairPanel.propTypes = {
  className: PropTypes.string
};

export default PairPanel;
