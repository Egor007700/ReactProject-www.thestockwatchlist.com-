import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, Hidden } from '@material-ui/core';
import {Container , Row, Col } from 'react-bootstrap';
import History from './components/History.js';

import { Topbar, Footer} from './components';
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    // paddingTop: 64,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'auto'
    
  },
  shiftContent: {
    paddingTop: 0,
    // paddingBottom: 78,
    // marginBottom: '39px',
    
    flexGrow: 1,
    width: '100%',    
    // height: 'calc(100% - 142px)',
    height: '100%',
    position: 'relative',
    display: 'flex',
    // flexDirection: 'row'
    flexDirection: 'column'
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();


  const isDesktop = false;

  const [openSidebar, setOpenSidebar] = useState(false);

  const onClickSideOpen =() => {
    setOpenSidebar(!openSidebar);
  };
  const handleSidebarOpen = () => {    
    
  };
  
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const size = useWindowSize();
  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Topbar onSidebarOpen={onClickSideOpen}/>
      <main className={classes.shiftContent} style={{display: 'flex', flexGrow: 1}}>
        <div style={{display: 'flex', flex: 1}}>
          <div style={{width: '100%', height: '100%', display: 'flex'}}>
            {children}
          </div>
        </div>
        <Footer /> 
      </main>
       
       
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
