import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DefaultPanel from './components/DefaultPanel';
import AsksPanel from './components/AsksPanel';
import BidsPanel from './components/BidsPanel';

import AntTabs from '../../../../../../layouts/Main/components/AntTabs';
import AntTab from '../../../../../../layouts/Main/components/AntTab';
import TabPanel from '../../../../../../layouts/Main/components/TabePanel';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#15244c',
    height : '100%',
    // width: '222px',
    width: '100%',
    minWidth: '212px',
    minHeight: '400px',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    
  },

  demo1: {
    backgroundColor: 'transparent',
    height: '31px'
  },
  tabClass:{
    flex: 1
  }
}));


const TradeHistory = props => {
  const { className, onSidebarOpen,  ...rest } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange}>
          <AntTab label="Default" value={0}/>
          <AntTab label="Bids" value={1}/>
          <AntTab label="Asks" value={2}/>
        </AntTabs>
      </div>
      <TabPanel value={value} index={0}>
        <DefaultPanel onSidebarOpen={onSidebarOpen}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BidsPanel/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AsksPanel/>
      </TabPanel>
    </div> 
  );
};

TradeHistory.propTypes = {
  className: PropTypes.string
};

export default TradeHistory;
