import React, {useEffect, useRef, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import TitlePanel from './components/TitlePanel';
import TimeIntervalPanel from './components/TimeIntervalPanel';
import StTypePanel from './components/StTypePanel';
import TradingChartPanel from './components/TradingChartPanel';
import TabPanel from '../../../../../../layouts/Main/components/TabePanel';
import DataWidget from './components/DataWidget';
const useStyles = makeStyles(theme => ({
  root: {
    
    backgroundColor: '#12213f',
    height : '600px',
    
    minHeight: '400px',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minHeight: '600px'
    },
    // position: 'relative',
    // paddingBottom: '20px'
  },
  
}));

const TradingWidget = props => {
  const { className, openSidebar, drawer_opened, ...rest } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const mRef1 = useRef(null);
  const handleChange = (newValue) => {
      setValue(newValue);
    };
  useLayoutEffect(() => {

      
  });
  useEffect(() => {

  });
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
      >
      <TitlePanel style={{height: '50px', minHeight: '50px'}}/>
      <TimeIntervalPanel openSidebar={openSidebar} tabChanged={handleChange} style={{height: '35px'}}/>
        <TabPanel value={value} index={0} style={{ height: '100%', }}>
          <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}} ref={mRef1} >
            <div style={{flexGrow: 1,}}>
              <TradingChartPanel drawer_opened={drawer_opened}/>
            </div>
          </div>
        </TabPanel>
      <TabPanel value={value} index={1}>
          <DataWidget/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
    </div>
  );
};

TradingWidget.propTypes = {
  className: PropTypes.string
};

export default TradingWidget;
