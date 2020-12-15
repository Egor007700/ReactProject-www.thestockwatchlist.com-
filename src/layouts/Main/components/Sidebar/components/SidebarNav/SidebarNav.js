/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    height: '85px',
    fontFamily: 'Roboto-Regular',
    fontSize: '11pt',
    color: '#8eb4df'
  },
  button: {    
    padding: '0px 20px',
    display: 'flex',
    justifyContent: 'flex-start',
    textTransform: 'none',
    alignItems: 'center',
    letterSpacing: 0,
    width: '100%',
    fontFamily: 'Roboto-Regular',
    fontSize: '11pt',
    color: '#8eb4df'
  },
  icon: {
    color: '#8eb4df',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: '12px',
    backgroundColor: '#456aac',
    '& $button': {
      color: 'white',
      '& $icon': {
        color: 'white'
      },
    }
  }
}));
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
          component={CustomRouterLink}
          to={page.href}
          activeClassName={classes.active}
        >
          <div
            className={classes.button}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </div>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
