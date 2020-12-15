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
    fontFamily: 'Roboto-Bold',
    fontSize: '15px',
    color: '#d1ecff'
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

const StyledListItem = withStyles({
  root: {
    backgroundColor: "#15244c",
    "&$selected": {
      backgroundColor: "#456aac",
      '&:hover': {
        backgroundColor: '#456aac'
      },
    },
    '&:hover': {
      backgroundColor: 'transparent'
    },
  },
  selected: {}
})(ListItem);

const CSidebarNav = props => {
  const { pages, selected, onChange, className, ...rest } = props;

  const classes = useStyles();

  const handleSelected = (name) => {
    console.log('ButtonSelected');
    onChange(name);
  }
  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <StyledListItem
          className={classes.item}
          selected ={selected == page.name} 
          disableGutters
          key={page.name}
        >
          <Button style={{width: '100%', height: '100%', backgroundColor: 'transparent'}} onClick={() => handleSelected(page.name)}>
            <div
              className={classes.button}
            >
              {page.name}
            </div>
            <div align="right" style={{textTransform: 'none', width: '100%', fontFamily: 'Roboto-Regular', fontSize: '13px', color: '#8eb4df'}}>{page.time}</div>
          </Button>
        </StyledListItem>
      ))}
    </List>
  );
};

CSidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CSidebarNav;
