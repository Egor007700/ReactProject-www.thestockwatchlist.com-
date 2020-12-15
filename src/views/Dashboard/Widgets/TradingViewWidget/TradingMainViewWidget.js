import React, {useEffect, useRef, useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/styles';
import {LeftBar, SourceWidget, TradingWidget, TradeHistory, LimitWidget} from './components';
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex';
import 'react-reflex/styles.css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    display: 'flex',
    flex: 1,    
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  gridContainer:{
    padding: 0,
    margin: 0
  },
  leftSide:{
    display: 'flex', 
    width: '180px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '500px',
      padding: '10px'
    },
  },
  middleSide: {
    flex: 1, height: '100%', display: 'flex'
  },
  middleSubSide: {
    flex: 1, display: 'flex', height: '100%', flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',    
      padding: '10px'  
    },
  },
  tradeHistoryContainer:{
    height: '100%', 
    position: 'relative',
    //width: '222px',
    width: '22.7%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',      
      paddingTop: '10px',
      minHeight: '600px'
    },
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
   
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },



}));

const TradingMainViewWidget = (props) => {
  const classes = useStyles();
  const { className, handleSidebarOpen,handleSidebarClose,openSidebar,...rest } = props;

  
  useLayoutEffect(() => {
    console.log('layout effect');
    
});
  useEffect(() => {
    
  });

  
  return (
    <div className={classes.root}>
      <div className={classes.middleSide}>
        <div className={classes.middleSubSide}>
            <TradingWidget openSidebar={openSidebar}/>
        </div>
        {/* <div style={{cursor: "url(./trino/images/cursor.png)10 15 ,auto", backgroundColor: '#337dff',width: '3px', borderLeft: '1px solid #2450a5', borderRight: '1px solid #2450a5'}}/> */}

      </div>
    </div>
  );
};

export default TradingMainViewWidget;
