import React, {useEffect, useRef} from 'react';
import { makeStyles, withStyles} from '@material-ui/styles';
import TabPanel from './../components/TabePanel';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Hidden } from '@material-ui/core';
// import {
//   Card,
//   CardActions,
//   CardContent,
//   Avatar,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   TablePagination
// } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      // height: '35px',
      height: '200px',
        // height: '100%',
      backgroundColor: '#1b2d5e',
    },
    content: {
        flex: 1,
        width: '100%',
        padding: '5px',
        display: 'flex',
        backgroundColor: '#0f1e35'
    },
    tableCell: {
        // minHeight: '33px',
        // alignItems: 'center',
        // display: 'flex',
        // justifyContent: 'center',
        // backgroundColor: '#1b2d5e',
        // border: '1px #16264f solid',
        textAlign: 'center',
        fontSize: '10.83pt',
        color: '#8eb4df',
        backgroundColor: '#0f1e35',
        fontFamily: [
            'Roboto-Bold',
        ].join(','),
      },
      tableTdClass: {
        textAlign: 'center',
        fontSize: '10.83pt',
        color: '#8eb4df',
        backgroundColor: '#0f1e35',
        fontFamily: [
            'Roboto-Regular',
        ].join(','),
      },
  }));
  const AntTabs = withStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '31px',
      width: '100%'
    },
    indicator: {
      backgroundColor: '#337dff',
      display: 'none'
    },
  })(Tabs);
  const AntTab = withStyles(theme => ({
    root: {
      flex: '1',
      textTransform: 'none',
      height: '30px',
      maxWidth: '1000px',
      minHeight: '30px',
      minWidth: '30px',

      width: '100%',
      fontWeight: theme.typography.fontWeightRegular,
      margin: '0px',      
      fontSize: '10.83pt',
      color: '#8eb4df',
      backgroundColor: '#1b2d5e',
      paddingTop: '2px',
      paddingBottom: '2px',
      fontFamily: [
        'Roboto-Bold',
      ].join(','),
      '&:hover': {
        color: 'white',
        opacity: 1,
      },
      '&$selected': {
        color: 'white',
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: '#12213f',
        width: '100%'
      },
      '&:focus': {
        color: 'white',
        width: '100%'
      }, 
      border: '1px solid #15244c',   
    },
    selected: {},
  }))(props => <Tab disableRipple {...props} />);
  function createData(key, type, name, total_balance, available,inorder, value_usd,status) {
    return { key, type, name, total_balance, available,inorder, value_usd,status};
}

const rows_buy = [
createData(0, 0, "BTC Bitcoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(1, 1, "ETH Ethereum", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,0),
createData(2, 2, "DASH Dash", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(3, 3, "LTC Litecoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,0),
createData(4, 4, "XMR Monero", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(5, 5, "NEO Neo", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(6, 6, "MIOTA lota", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(7, 7, "XRP Ripple", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(8, 0, "BTC Bitcoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(9, 0, "BTC Bitcoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(10, 0, "BTC Bitcoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(11, 0, "BTC Bitcoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(12, 3, "BTC Bitcoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(13, 3, "BTC Bitcoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),
createData(14, 3, "BTC Bitcoin", 72961.002348400, 87092.0009823,0.0000001, 1.1234123,1),

];
const OpenOrders = props => {
  const mainRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const [size, setSize] = React.useState(0);
  useEffect(() => {
      console.log('Main Ref = ', mainRef.current.offsetWidth);
      console.log('Title Ref = ', titleRef.current.offsetWidth);
      setSize(mainRef.current.offsetWidth);
  });
  const classes = useStyles();
  return(
      <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
        <div ref={titleRef} style={{width: '100%'}}>
          {/* <Table >
              <Thead>
                  <Tr>
                      <Th className={classes.tableCell}>
                          Date
                      </Th>
                      <Th className={classes.tableCell}>
                          Pair
                      </Th>
                      <Th className={classes.tableCell}>
                          Type
                      </Th>
                      <Th className={classes.tableCell}>
                          Side
                      </Th>
                      <Th className={classes.tableCell}>
                          Average
                      </Th>
                      <Th className={classes.tableCell}>
                          Price
                      </Th>
                      <Th className={classes.tableCell}>
                          Filled
                      </Th>
                      <Th className={classes.tableCell}>
                          Amount
                      </Th>
                      <Th className={classes.tableCell}>
                          Total
                      </Th>
                      <Th className={classes.tableCell}>
                          Trigger Condition
                      </Th>
                      <Th className={classes.tableCell}>
                          Status
                      </Th>
                  </Tr>
              </Thead>
            </Table> */}
            </div>
            <div style={{flex: 1, position: 'relative', display: 'flex'}} >
              <div style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflowY: 'scroll'}}>
                <div  ref={mainRef}>
               <Table>
                <Thead>
                    <Tr>
                        <Th className={classes.tableCell}>
                            Date
                        </Th>
                        <Th className={classes.tableCell}>
                            Pair
                        </Th>
                        <Th className={classes.tableCell}>
                            Type
                        </Th>
                        <Th className={classes.tableCell}>
                            Side
                        </Th>
                        <Th className={classes.tableCell}>
                            Average
                        </Th>
                        <Th className={classes.tableCell}>
                            Price
                        </Th>
                        <Th className={classes.tableCell}>
                            Filled
                        </Th>
                        <Th className={classes.tableCell}>
                            Amount
                        </Th>
                        <Th className={classes.tableCell}>
                            Total
                        </Th>
                        <Th className={classes.tableCell}>
                            Trigger Condition
                        </Th>
                        <Th className={classes.tableCell}>
                            Status
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                {rows_buy.map((row, index) => (
                  <Tr key={index}>
                      <Td className={classes.tableTdClass}>1</Td>
                      <Td className={classes.tableTdClass}>2</Td>
                      <Td className={classes.tableTdClass}>3</Td>
                      <Td className={classes.tableTdClass}>4</Td>
                      <Td className={classes.tableTdClass}>5</Td>
                      <Td className={classes.tableTdClass}>6</Td>
                      <Td className={classes.tableTdClass}>7</Td>
                      <Td className={classes.tableTdClass}>8</Td>
                      <Td className={classes.tableTdClass} >9</Td>
                      <Td className={classes.tableTdClass}>10</Td>
                      <Td className={classes.tableTdClass}>11</Td>
                  </Tr>))}
                </Tbody> 
            </Table>
            </div>
            </div>
          </div>
      </div>
  )
}
  const History = props =>{
    const { className, ...rest } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    return(
      <div className={classes.root}>
        <AntTabs value={value} onChange={handleChange} >
            <AntTab  value={0} label="OPEN ORDERS"/>
            <AntTab  value={1} label="ORDER HISTORY"/>
            <AntTab  value={2} label="TRADE HISOTRY"/>
            <AntTab  value={3} label="BLOCK LOG"/>
            <AntTab  value={4} label="SYSTEM LOG"/>
        </AntTabs>
        <div className={classes.content}>
            {value == 0 ? <OpenOrders/> : <div/>}
        </div>
      </div>
    )
  }
  export default History;
