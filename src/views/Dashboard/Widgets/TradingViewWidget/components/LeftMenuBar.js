import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import LeftBar from './Leftbar';
import SourceWidget from './SourceWidget'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  
}));

const LeftMenuBar = props => {
  const { history } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <LeftBar/>
        <div style={{flex: 1,height: '100%', position: 'relative'}}>
            <SourceWidget/>
        </div>
    </div>
  );
};

LeftMenuBar.propTypes = {
  history: PropTypes.object
};

export default withRouter(LeftMenuBar);
