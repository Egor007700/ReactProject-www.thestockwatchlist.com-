import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import AntTabs from '../../../../../../../../layouts/Main/components/AntTabs'
import AntTab from '../../../../../../../../layouts/Main/components/AntTab';
import TabPanel from '../../../../../../../../layouts/Main/components/TabePanel';
import PairPanel from './components/PairPanel';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#12213f',
    height : '100%',
    // width: '100%',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #0f1e35',
    // overflow: 'hidden'
    // overflow: '-moz-scrollbars-none',
    // overflowX: 'hidden'
  },

  demo1: {
    backgroundColor: 'transparent',
    height: '31px',
    width: '100%'
  },
}));
const MyInput = withStyles({
  root: {
    backgroundColor: 'transparent',
    width: '100%'
  },

  input: {
      "&::placeholder": {
        color: "#95c0e9",
        fontFamily: 'Roboto-Regular',
        fontSize: 10
      },
      color: "#95c0e9", // if you also want to change the color of the input, this is the prop you'd use
    }
})(Input);
const SubtypePanel = props => {
  const { className, mRef,  ...rest } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const handleSearchChange = (prop) => (event) => {
    setSearchValue(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} style={{width: '100%'}}>
          <AntTab label="Pair" value={0}/>
          <AntTab label="Volume" value={1}/>
          <AntTab label="Change" value={2}/>
        </AntTabs>
      </div>
      <div style={{height: '30px', padding: '5px'}}>
          <MyInput
              placeholder="Search"
              value={searchValue}                
              onChange={handleSearchChange}
              endAdornment={<InputAdornment position="end"><IconButton>
              <SearchIcon />
              </IconButton></InputAdornment>}
              className={classes.searchClass}
          />
      </div>
      <TabPanel value={value} index={0}>
        <PairPanel mRef={mRef}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        
      </TabPanel>
    </div> 
  );
};

SubtypePanel.propTypes = {
  className: PropTypes.string
};

export default SubtypePanel;
