import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { Drawer , useMediaQuery} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import "./styles.css";
import {SvgIcon } from '@material-ui/core';
import TabPanel from './../../../../../../layouts/Main/components/TabePanel';
import Input from '@material-ui/core/Input';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';

const options = ["Aggregated", "Aggregated1", "Aggregated2", "Aggregated3"];
const options1 = ["StrategyX", "StrategyX1", "StrategyX2", "StrategyX3"];

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0f1e35',
    height : '100%',
    width: '288px',
    // minWidth: '288px',
    // width: '100%',
    padding: '0px',
    display: 'flex',
    transition: "width 0.5s",  

    flexDirection: 'column',
    overflowX: 'hidden',
  },
  sidebarNormal:{
    width: 0,
    // transition: "width 0.5s",
    height: '100%',
    // display: 'none',
    display: 'flex',
    overflowX: 'hidden'

  },
  title:{
    fontFamily: "Roboto-Bold",
    fontSize: '10.83pt',
    color: 'white',
    paddingLeft: '20px',
    display: 'flex',
    alignItems: 'center',    
    height: '100%',


  },
  flexGrow: {
    flexGrow: 1
  },
  maxSpan : {
    fontFamily: 'Roboto-Regular',
    fontSize: '11pt',
    color: '#3db890'
  },

  drawerPaper: {    
    border: '0px solid',
    width: '100%',
    height: '100%',
  },


  sidebarOpen: {

  },
  menuClass: {
    color: "#8eb4df",
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
  },
  menuListClass: {
    padding: 0,
    backgroundColor: '#0f1e35',
    border: '1px solid #214d9a',
  },

  
}));
const SortBy = ({ children, options, value, onChange }) => (
  <div className="container">
    <select
      className="select-overlay"
      id="filter-select"
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option } value={option} className="custom" style={{color: "#d1ecff",
              fontFamily: 'Roboto-Regular', backgroundColor: '#0f1e35',}}>
          {option}
        </option>
      ))}
    </select>
    <label className="custom" htmlFor="filter-select">
      {children}
    </label>
  </div>
);
function LimitContainer(props) {
  const { children, open, onClose, index, ...other } = props;
  const theme = useTheme();
  const isMyDesktop = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true
  });
  const classes = useStyles();
  if (isMyDesktop == true)
  {
    return(
      <Dialog onClose={onClose} open={open} {...props} style={{width: '100%'}}       classes={{
        paper: classes.drawerPaper
      }}>
        {children}
      </Dialog>
    );
  }
  else
  {
    return(
      // <Drawer
      // {...props}
      // >
      //   {children}
      // </Drawer>
      <div
      {...props}
      >
        {children}
      </div>
    );
  }
}
const MyInput = withStyles({
  root: {
      backgroundColor: '#0f1e35',
      paddingLeft: '10px',
      fontFamily: 'Roboto-Regular',
      fontSize: '8.53pt',
      color: '#95c0e9',
      width: '100%'
  },
  input: {
      "&::placeholder": {
          color: "#95c0e9",
          fontSize: '8.53pt',
          fontFamily: 'Roboto-Regular',
      },
      color: "#95c0e9", // if you also want to change the color of the input, this is the prop you'd use
  },
  underline: {
      "&&&:before": {
      borderBottom: "none"
      },
      "&&:after": {
      borderBottom: "none"
  }
}

})(Input);
const LimitSubWidget = props => {
  const { viewMode, ...rest } = props;
  const classes = useStyles();
  const [sortValue, setSortValue] = React.useState(options[0]);
  const [strategyValue, setStrategyValue] = React.useState(options1[0])
  function onChange(e)
  {
      setSortValue(e.currentTarget.value);
  } 
  function onStrategyChange(e)
  {
      setStrategyValue(e.currentTarget.value);
  } 
  
  return(
    <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
      <div style={{padding: '0px', paddingTop: '10px',  marginLeft:'-7px', display:'flex'}}>
          <div style={{display:'flex', justifyContent: 'center'}}>
            <img
              src="/images/btc_usd.png"
              style={{margin:'7px', textAlign: 'center'}}
            />
          </div>
          <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
            <span style={{fontFamily: "Roboto-Bold",fontSize: '14.22pt',color: 'white',}}>BTC/USD</span>
          </div>
          <div className={classes.flexGrow} />
          <div style={{display: 'flex', flexDirection: 'column', marginRight: '13px'}}>
              <div style={{flex: 1, display:'flex', justifyContent:'center'}}>
                <span style={{fontFamily: "Roboto-Medium", width: '100%',fontSize: '10pt',color: '#95c0e9', textAlign: viewMode == 0 ? 'right' : 'left'}}>BALANCE</span>
              </div>
              <div style={{flex: 1, display:'flex', justifyContent:'center'}}>
                <span style={{fontFamily: "Roboto-Medium",fontSize: '9pt',color: 'white', textAlign: 'right'}}>0.00007195 BTC</span>
              </div>
          </div>
        </div>
        <div style={{padding: '0px', marginTop: '40px', width: '100%', display: 'flex', flexDirection :"column"}}>
            <span style={{fontFamily: "Roboto-Medium",fontSize: '10pt',color: '#95c0e9', textAlign: 'left'}}>
              Choose Exchange
            </span>
            <div style={{display: 'flex', alignItems: 'center' }}>
              <div style={{margin: '0px', width: '100%', paddingRight: '15px'}}>
                <SortBy
                  options={options}
                  value={sortValue}
                  onChange={onChange}
                >
                  <strong style={{color: '#d1ecff'}}>{sortValue}</strong>
                  <div style={{ flexGrow: 1 }} />
                  <ExpandMoreIcon style={{paddingRight: '0px'}}/>
                </SortBy>
              </div>
              <div className={classes.flexGrow} />
              <IconButton style={{borderRadius: '4px', marginRight: '13px', border: '2px solid #1e3359',width: '30px', 
                height: '30px', display: 'flex', alignItems: 'center', padding: '0px'}}>
                      <AddIcon fontSize={'small'} style={{margin: '0px', padding: '0px'}}></AddIcon>
              </IconButton>
            </div>
          </div>
        <div style={{padding: '0px', marginTop: '30px', display: 'flex', flexDirection :"column"}}>
          <span style={{fontFamily: "Roboto-Medium",fontSize: '10pt',color: '#95c0e9', textAlign: 'left'}}>
            Choose Strategy
          </span>
          <div style={{display: 'flex', alignItems: 'center' }}>
            <div style={{margin: '0px',width: '100%', paddingRight: '15px'}}>
              <SortBy
                options={options1}
                value={strategyValue}
                onChange={onStrategyChange}
              >
                <strong style={{color: '#d1ecff'}}>{strategyValue}</strong>
                <div style={{ flexGrow: 1 }} />
                <ExpandMoreIcon style={{paddingRight: '0px'}}/>
              </SortBy>
            </div>
            <div className={classes.flexGrow} />
            <IconButton style={{borderRadius: '4px', marginRight: '13px', border: '2px solid #1e3359',width: '30px', 
              height: '30px', display: 'flex', alignItems: 'center', padding: '0px'}}>
                    <AddIcon fontSize={'small'} style={{margin: '0px', padding: '0px'}}></AddIcon>
            </IconButton>
          </div>
        </div>
        <div style={{padding: '0px', marginTop: '30px', display: 'flex',marginRight: '13px'}}>
          <div style={{padding: '0px', display: 'flex', flexDirection :"column",  width: '100%', }}>
              <span style={{fontFamily: "Roboto-Medium",fontSize: '10pt',color: '#95c0e9', textAlign: 'left'}}>
                    {viewMode == 0 ? 'Price' : 'Market Price'}
              </span>
              <div style={{display: 'flex', alignItems: 'center', padding: '15px', paddingLeft: '0px', borderBottom: '1px solid #1b2e52'}}>
                <span style={{fontFamily: 'Roboto-Regular', fontSize: '11.38pt', color: '#7c9fc7'}}>
                  BTC
                </span>
                <span style={{fontFamily: 'Roboto-Regular', marginLeft: '10px', fontSize: '11.38pt', color: '#c4def2'}}>
                  0.04565495
                </span>
              </div>
            </div>
        </div>
        <div style={{padding: '0px', marginTop: '20px', display: 'flex',  marginRight: '13px'}}>
          <div style={{padding: '0px', display: 'flex', flexDirection :"column", marginRight: '13px', flex: '3'}}>
            <span style={{fontFamily: "Roboto-Medium",fontSize: '10pt',color: '#95c0e9', textAlign: 'left'}}>
                Amount
            </span>
            <div style={{display: 'flex', alignItems: 'center', padding: '15px', paddingLeft: '0px', borderBottom: '1px solid #4368a7'}}>
              <span style={{fontFamily: 'Roboto-Regular', fontSize: '11.38pt', color: '#7c9fc7'}}>
                $
              </span>
              <span style={{fontFamily: 'Roboto-Regular', marginLeft: '10px', fontSize: '11.38pt', color: '#c4def2'}}>
                2.304958
              </span>
            </div>
          </div>
          <div style={{padding: '0px', display: 'flex', flexDirection :"column", flex: '1'}}>
            <span style={{fontFamily: "Roboto-Medium",fontSize: '10pt',color: '#95c0e9', textAlign: 'left'}}>
                Percent
            </span>
            <div style={{display: 'flex', alignItems: 'center', padding: '15px', paddingLeft: '0px', borderBottom: '1px solid #4368a7'}}>
              <span style={{fontFamily: 'Roboto-Regular', fontSize: '11.38pt', color: '#7c9fc7'}}>
                %
              </span>
              <span style={{fontFamily: 'Roboto-Regular', marginLeft: '10px', fontSize: '11.38pt', color: '#c4def2'}}>
                27
              </span>
            </div>
          </div>    
        </div>
        <div style={{margin: '0px', paddingTop: '10px'}}>
            <span className={classes.maxSpan} style={{}}>
              Max
            </span>
            <span className={classes.maxSpan} style={{marginLeft: '5px'}}>
              0.0239488
            </span>
        </div>
        <div style={{width: '100%', minHeight: '220px',  flex: 1, display: 'flex', flexDirection: 'column', padding: '0px'}}>
            <div style={{flex: 1, position: 'relative'}}>
              <IconButton style={{ bottom: 0,padding: '0px', position: 'absolute', bottom: '5%', left: '50%', transform:' translate(-50%, -0%)'}}>
                <img
                  src="/trino/images/sell.png"
                  style={{margin:'7px', textAlign: 'center', }}
                />
                <span style={{fontFamily:'Roboto-Bold', fontSize: '11pt', color: 'white', position: 'absolute', top: '50%', left: '50%', transform:' translate(-50%, -50%)'}}>SELL</span>
              </IconButton>
              
            </div>
            <div style={{flex: 1, position: 'relative'}}>
              <IconButton style={{ bottom: 0,padding: '0px', top: '5%', left: '50%', transform:' translate(-50%, -0%)'}}>
                <img
                  src="/trino/images/buy.png"
                  style={{margin:'7px', textAlign: 'center', }}
                />
                <span style={{fontFamily:'Roboto-Bold', fontSize: '11pt', color: 'white', position: 'absolute', top: '50%', left: '50%', transform:' translate(-50%, -50%)'}}>BUY</span>
              </IconButton>
            </div>
          </div>
    </div>
  );
}

const MarketSubWidget = props => {
  const { ...rest } = props;
  const classes = useStyles();
  const [searchValue, setTimeDataValue] = React.useState('');
  const handleSearchChange = (event, newAlignment) => {
    if (newAlignment !== null) {
        setTimeDataValue(newAlignment)
    }
  };
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0f1e35'}}>
        <div style={{height: '36px', 
        paddingLeft: '15px', 
        paddingRight: '12px', 
        paddingTop: '5px', 
        paddingBottom: '5px', display: 'flex'}}>
          <div style={{color: 'white', fontFamily: 'Roboto-Bold', fontSize: '9px', justifyContent: 'center'}} align="left">SOCIAL</div>
          <MyInput
                placeholder="Search"
                value={searchValue}                
                onChange={handleSearchChange}                
                className={classes.searchClass}

                endAdornment={<InputAdornment position="end">
                    <SearchIcon style={{width: '20px', height: '20px', color: '#95c0e9'}} />
                </InputAdornment>}
            />
        </div>
    </div>
  );

}

const LimitWidget = props => {
  const { open_drawer, onClose, className, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [viewMode, setViewMode] = React.useState(0);

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleChangedWidgetType = (index) => {
    setViewMode(index);
    setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <LimitContainer
      open={open_drawer}
      className={open_drawer == false ? classes.sidebarNormal : classes.root}
      onClose={onClose}
    >
      <div style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column',}}>
        <div style={{height: '30px', width: '100%', backgroundColor: '#0f1e35', display: 'flex'}}>
          <div className={classes.title}>{ viewMode == 0 ? "LIMIT" : viewMode == 1 ? "MARKET" : "MARKET_1"}</div>
          <div className={classes.flexGrow} />
          <div style={{padding:'0px', marginRight: '10px', height: '100%', width: '30px', display: 'flex' }}>        
              <IconButton
                ref={anchorRef}
                aria-haspopup="true"
                onClick={handleToggle}
                style={{color: '#7da3c9', padding: 0,display: 'flex', alignItems: 'center', padding: '0px', width: '100%'}}
              >
              <ExpandMoreIcon style={{margin: '0px', padding: '0px', width: '100%'}}/>  
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} 
            role={undefined} 
            transition 
            disablePortal 
            placement={'bottom-end'}
            style={{padding: 0, display: 'flex'}}
            >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: 'right top'}}
              >
                  <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList 
                    autoFocusItem={open} 
                    id="menu-list-grow" 
                    onKeyDown={handleListKeyDown} 
                    style={{padding: 0}}
                    className={classes.menuListClass}
                    >
                      <MenuItem className={classes.menuClass} onClick={() => handleChangedWidgetType(0)}>LIMIT</MenuItem>
                      <MenuItem className={classes.menuClass} onClick={() => handleChangedWidgetType(1)}>MARKET</MenuItem>
                      <MenuItem className={classes.menuClass} onClick={() => handleChangedWidgetType(2)}>MARKET_1</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          </div>
        </div>
        <div style={{flexGrow: 1, margin: '0px', padding: '0px', position: 'relative', display: 'flex', width: '100%'}}>
          <div style={{
          width: '100%',  backgroundColor: '#12213f',
          overflowY:'auto', 
          overflowX: 'hidden', 
          position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
            <TabPanel value={viewMode} index={0} style={{flexGrow: 1, paddingLeft: '15px', display: 'flex', width: '100%'}}>
                <LimitSubWidget viewMode={viewMode}/>
            </TabPanel>
            <TabPanel value={viewMode} index={1} style={{flexGrow: 1, paddingLeft: '15px', display: 'flex'}}>
                <LimitSubWidget viewMode={viewMode}/>
            </TabPanel>
            <TabPanel value={viewMode} index={2} style={{flexGrow: 1, paddingLeft: '15px', display: 'flex'}}>
                <MarketSubWidget/>
            </TabPanel>
          </div>
       </div>
      </div>
    </LimitContainer>
  );
};

LimitWidget.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open_drawer: PropTypes.bool.isRequired,  
};

export default LimitWidget;
