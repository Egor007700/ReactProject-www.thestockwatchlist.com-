import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';
import { SidebarNav } from './components';
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
    width: 164,
    height: '100%',
    backgroundColor: '#15244c',
    border: '0px solid',
    paddingTop: 64
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
    position: 'relative',
    border: '0px solid'
  },
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Order Entry',
      href: '/dashboard',
      icon: <Icon style={{marginRight: '10px'}}>
            <img src="/trino/images/menu/order_entry.png"/>
            </Icon>
    },
    {
      title: 'Ideas',
      href: '/users',
      icon: <Icon style={{marginRight: '10px'}}>
      <img src="/trino/images/menu/ideas.png"/>
      </Icon>

    },
    {
      title: 'Social',
      href: '/products',
      icon:  <Icon style={{marginRight: '10px'}}>
      <img src="/trino/images/menu/social.png"/>
      </Icon>
    },
    {
      title: 'Communication',
      href: '/communication',
      icon: <Icon style={{marginRight: '10px'}}>
      <img src="/trino/images/menu/communication.png"/>
      </Icon>
    },
    {
      title: 'News',
      href: '/typography',
      icon: <Icon style={{marginRight: '10px'}}>
      <img src="/trino/images/menu/news.png"/>
      </Icon>
    },
    {
      title: 'Commentary',
      href: '/icons',
      icon: <Icon style={{marginRight: '10px'}}>
      <img src="/trino/images/menu/commentary.png"/>
      </Icon>
    },
    {
      title: 'Calendar',
      href: '/account',
      icon: <Icon style={{marginRight: '10px'}}>
      <img src="/trino/images/menu/calendar.png"/>
      </Icon>
    }
  ];

  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
