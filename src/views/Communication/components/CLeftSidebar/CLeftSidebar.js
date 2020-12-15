import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';
import { CSidebarNav } from './components';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TextsmsIcon from '@material-ui/icons/Textsms';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ForumIcon from '@material-ui/icons/Forum';
import GradeIcon from '@material-ui/icons/Grade';
import HighlightIcon from '@material-ui/icons/Highlight';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import Icon from '@material-ui/core/Icon';
const useStyles = makeStyles(theme => ({
  drawer: {
    width: 279,
    height: '100%',
    backgroundColor: '#15244c',
    border: '0px solid',
    // position: 'absolute',
    // left: 0,
    // top: 0,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#15244c',
    padding: 0
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    padding:0,
    backgroundColor: '#15244c',
    height: '100$'
  },
  drawerPaper: {
    width: 279,
    height: '100%',
    position: 'relative',
    border: '0px solid'
  },
}));

const CLeftSidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      name: 'All',      
      time: '1hour ago'
      
    },
    {
      name: 'Investor1',      
      time: '1hour ago'
      
    },
    {
      name: 'Investor2',      
      time: '1hour ago'
      
    },
    {
      name: 'Investor3',      
      time: '1hour ago'
      
    },
    
  ];
  const [selected, setSelected] = React.useState('');
  const handleChangeMenu = (text) => {
    if (text != null)
    {
      console.log('selected');
      setSelected(text);
    }
  }
  return (
    <Drawer
      anchor="left"
      className={ classes.drawer }
      classes={{ paper: classes.drawerPaper }}
      onClose={onClose}
      open={true}
      variant="permanent"
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div style={{height: '107px', 
        width: '100%', 
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: '22px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}}>
            <div>
              <img
                  style={{marginRight: '5px'}}
                  src="images/communication_white.png"
              />
              Communication
            </div>
        </div>
        <CSidebarNav
          className={classes.nav}
          pages={pages}
          selected={selected}
          onChange={handleChangeMenu}
        />
      </div>
    </Drawer>
  );
};

CLeftSidebar.propTypes = {
  className: PropTypes.string,
  // onClose: PropTypes.func,
  // open: PropTypes.bool.isRequired,
 
};

export default CLeftSidebar;
