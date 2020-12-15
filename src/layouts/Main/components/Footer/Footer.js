import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Box} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import {Container , Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
// import { useMediaQuery } from 'react-responsive'
import { useMediaQuery } from '@material-ui/core';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#142347',
    // position: 'fixed',    
    bottom: 0,
    // left: 0,
    // height : '78px',
    height : '40px',
    width: '100%',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column'
  },
  tableCell: {
    width: '20%'
  },
  itemBottomClass: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f1e35',
    borderRadius: '0px',
    border: '1px #16264f solid',
    color: '#8eb4df',
    height: '100%',
    minHeight: '32px',
    width: '100%'
  },

  itemBottomFirstClass: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f1e35',
    borderRadius: '0px',
    border: '1px #16264f solid',
    color: '#8eb4df',
    height: '100%',
    minHeight: '32px',
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  itemBottomContainerClass: {
    display: 'flex',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f1e35',
    borderRadius: '0px',
    border: '0px #16264f solid',
    color: '#8eb4df',
    height: '100%',
    minHeight: '32px',
    padding: 0,
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  itemBottomButton: {
    fontFamily: "Roboto-Bold",
    fontSize: '10.83pt',
    color: '#8eb4df',
    padding: '0px',
    margin: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  itemContainerClass: {
    padding: '0px', margin: '0px',display: "flex", alignItems: 'center', justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    /*[theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },*/
    height: '50%'
  }
}));
const useOrderStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  tableCellClass: {
    minHeight: '33px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1b2d5e',
    border: '1px #16264f solid',
  },
  itemButton: {
    fontFamily: "Roboto-Bold",
    fontSize: '10.83pt',
    color: '#8eb4df',
    padding: '0px',
    margin: '0px',
    width: '100%'
  },
}));

const Footer = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      
        <div  className={classes.itemContainerClass} style={{height: '100%'}}>
          <div className={classes.itemBottomFirstClass} >
            <span> </span>
          </div>
          <div  className={classes.itemBottomFirstClass} >
            <span> </span>
          </div>
          <Grid container className={classes.itemBottomContainerClass}>
            <Grid item lg={4} md={4} sm={12} style={{height: '100%', width: '100%'}}>
              <div  className={classes.itemBottomClass}>
              <IconButton className={classes.itemBottomButton}>
                <div style={{padding: '0px', alignItems: 'center', display: 'flex'}}>
                  <HeadsetIcon padding={0}/>  
                </div>
                <div style={{marginLeft: '10px',padding: '0px', alignItems: 'center', display: 'flex'}}>
                  SUPPORT
                </div>
              </IconButton>
            </div>
            </Grid>
            <Grid item lg={4} md={4} sm={12} style={{height: '100%', width: '100%'}}>
              <div  className={classes.itemBottomClass}>
                <IconButton className={classes.itemBottomButton}>
                  <div style={{padding: '0px', alignItems: 'center', display: 'flex'}}>
                    <SettingsIcon padding={0}/>  
                  </div>
                  <div style={{marginLeft: '10px',padding: '0px', alignItems: 'center', display: 'flex'}}>
                    SETTINGS
                  </div>
                </IconButton>
              </div>
            </Grid>
            <Grid item lg={4} md={4} sm={12} style={{height: '100%', width: '100%'}}>
              <div  className={classes.itemBottomClass} >
                <span>09 Monday 08:45:02 PM(UTC+3)</span>
              </div>
            </Grid>
          </Grid>
        </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
