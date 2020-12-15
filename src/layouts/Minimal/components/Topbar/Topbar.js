import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#1b2d5e',
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
          <RouterLink to="/" style={{textAlign: 'center'}}>
              <img
                alt="Logo"
                src="/images/big_log.png"
                width="100"
                height="30"
                style={{margin:'7px', textAlign: 'center'}}
              />
          </RouterLink>
          <RouterLink to='/sign-in' style={{position:'absolute', right:'100px'}}>
            <Button style={{color:'white'}}>Sign In</Button>
          </RouterLink>
          <RouterLink to='/sign-up' style={{position:'absolute', right:'10px'}}>
            <Button style={{color:'white'}}>Sign Up</Button>
          </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
