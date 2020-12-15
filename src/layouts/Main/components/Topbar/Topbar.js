import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles  } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Container, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SvgIcon, Grid, Box } from '@material-ui/core';
import {Wifi } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MyToggleButton from '../../../../components/MyToggleButton'
import Icon from '@material-ui/core/Icon';
import NativeSelect from '@material-ui/core/NativeSelect';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import { withRouter, useLocation } from "react-router-dom";
import { openRightSideMenu, changeDashboardType} from "./../../../../js/actions/index";
import CloseIcon from '@material-ui/icons/Close';
import CustomSelect from './../../../../components/CustomSelect';
import Select, { components } from "react-select";
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const mapStateToProps = state => {
  return { open_sidemenu_right : state.common.open_sidemenu_right, dashboard_type : state.common.dashboard_type , current_page: state.common.current_page, username:state.user.username, userimage:state.user.userimage};
};
function mapDispatchToProps(dispatch) {
  return {
    openRightSideMenu:payload => dispatch(openRightSideMenu(payload)),
    changeDashboardType:payload => dispatch(changeDashboardType(payload)),
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#1b2d5e',    
    padding: 0,
    position: 'relative'
  },
  flexGrow: {
    flexGrow: 1
  },
  padding: {
    padding: '8px',
    backgroundColor:'#0f1e35',
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  logo: {
    width: '220px',
    margin: 0,
    padding: 0,
    borderLeft: '2px solid #182952', 
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    padding: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar1: {
    minHeight:'40px',
  },
  icon_button:{
    padding: '0px',
  },
  username:{
    fontFamily: "Roboto-Bold",
    fontSize: '12pt',
    color: '#ffffff'
  },
  userrole:{
    fontFamily: "Roboto-Medium",
    fontSize: '9pt',
    color: '#95c0e9',
    textAlign: 'left'
  },
  toggleContainer: {    
    height: '64px',
    width: '326px',

  },
  toggleContainer1: {    
    height: '40px',
    width: '326px',

  },
  toggleButton: {
    width: '150px',
    margin: '0px',
    padding: '0px',
    color: '#506c9a',
    height: '40px',        
    fontSize: '12pt',
    alignItems: 'center',
    border: '2px solid #182952'
  },
  toggleIcon: {
    fontFamily: "Roboto-Bold",
    fontWeight: 'sharp',
    fontSize: '12pt',
    height: '40px',
    width: '150px',
    alignItems: 'center',
    color:'#95c0e9',
    padding :'12px',
  },
  detailContainer:{
    height: '64px',
    width: '450px',
  },
  detailItem: {
    height: '100%'
  },
  languageSelectClass:
  {
    marginLeft: '5px',
    border: '0px solid',
    width: '50px',
    height: '20px',
    
  },
  profilePopper:
  {
    borderRadius: 0,
    backgroundColor: '#15244c',
    border: '1px solid #2656b0'
  },
  profileMenuItem:
  {
    backgroundColor: 'transparent',
    color: '#95c0e9',
    fontFamily: 'Roboto-Regular',
    fontSize: '12pt'
  }
}));
const MyNativeSelect = withStyles({
  root:{
    backgroundColor: 'transparent',
    paddingLeft: '3px',
    fontFamily: 'Roboto-Regular',
    fontSize: '10.83pt',
    color: '#95c0e9',
  },
  icon: {
    color: '#95c0e9'
  },
  select: {
    '-moz-appearance': 'none',
    // Reset
    '-webkit-appearance': 'none',
    // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    borderRadius: 0,
    // Reset
    minWidth: 16,
    height: '20px',
    paddingTop: 0,
    paddingBottom: 0,
    // So it doesn't collapse.
    cursor: 'pointer',
    '&:focus': {
      // Show that it's not an text input
      backgroundColor: 'transparent',
      borderRadius: 0 // Reset Chrome style

    },
    // Remove IE 11 arrow
    '&::-ms-expand': {
      display: 'none'
    },
    '&$disabled': {
      cursor: 'default'
    },
    '&:not([multiple]) option, &:not([multiple]) optgroup': {
      backgroundColor: '#15244c'
    },
    '&[multiple]': {
      height: 'auto'
    },

  },
})(NativeSelect)
const MyCustomSelect = (props) => {
  const { type, options, defaultValue, onChange ,...rest } = props;
  const customStyles = {
      container: (base, state) =>{
        return {
          ...base,
          width: '50px'
        }
      },

      control: (base, state) => {
          const { menuIsOpen } = state.selectProps;
          const { isFocused } = state
          const border_str = menuIsOpen ? '2px solid #214d9a' : '2px solid #1b2d5e';
          const borderRadius = menuIsOpen ? { borderTopLeftRadius : 10} : {};
          return {
          ...base,
          boxShadow: 'none',
          background: menuIsOpen ? "#15244c" :"#1b2d5e",
          color: '#354964',
          height: '30px',
          // height: '100%',
          minHeight: '26px',            
          padding: 0,
          paddingBottom: 1,
          '&:hover': {borderLeft: menuIsOpen ? '2px solid #214d9a' : '2px solid #1b2d5e', 
              borderTop: menuIsOpen ? '2px solid #214d9a' : '2px solid #1b2d5e', 
              borderRight: menuIsOpen ? '2px solid #214d9a' : '2px solid #1b2d5e', 
              borderBottom: '0px solid #1b2d5e'
          },
          //border: state.selectProps.menuIsOpen ? '1px solid lightgray' : '' // default border color
          borderLeft: border_str,
          borderBottom: '0px solid #1b2d5e',
          borderTop: border_str,
          borderRight: border_str,
          borderTopLeftRadius : menuIsOpen ? 5 : 0,
          borderTopRightRadius: menuIsOpen ? 5 : 0,
          }
        },
        singleValue: base => ({
          ...base,
          color: "#8eb4df",
          fontSize: 11,
          fontFamily: 'Roboto-Regular'
        }),
        dropdownIndicator: base => ({
          ...base,
          color: "#8eb4df",
          height: '26px',
          minHeight: '26px',     
          padding: 0,
          display: 'flex',
          paddingRight: '3px',
          alignItems: 'center'
        }),
        menu: base => ({
          ...base,
          // override border radius to match the box
          background: '#15244c',
          color: "#8eb4df",
          fontSize: 11,
          fontFamily: 'Roboto-Regular',
          marginBottom: 0,
          marginTop: 0,
          borderLeft: '2px solid #15244c',
          borderLeft: '2px solid #214d9a',
          borderBottom: '2px solid #214d9a',
          borderRight: '2px solid #214d9a',
          borderBottomLeftRadius : 5, borderBottomRightRadius: 5
        }),
        menuList: base => ({
            ...base,
            padding: 0,
            
        }),
        input: base => ({
          ...base,
          color: "#8eb4df",
          fontSize: 11,
          fontFamily: 'Roboto-Regular',
        })
      // option: (provided, state) => ({
      //   ...provided,
      //   borderBottom: '1px dotted pink',
      //   color: state.isSelected ? 'red' : 'blue',
      //   padding: 10,
      // }),
      // control: () => ({
      //   // none of react-select's styles are passed to <Control />
      //   //width: 100,
      // }),
      // singleValue: (provided, state) => {
      //   const opacity = state.isDisabled ? 0.5 : 1;
      //   const transition = 'opacity 300ms';
      //   return { ...provided, opacity, transition };
      // }
  };
  return (<Select options={options} 
      onChange={onChange}
      components={{
      IndicatorSeparator: () => null
      }} styles={customStyles}
      defaultValue={options[0]}
      isSearchable ={false}
      theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
          ...theme.colors,
            text: 'red',
            primary25: 'transparent',
            primary: '#15244c',
          },
        })}
    />);
};
const Topbar = props => {
  const {history, className, staticContext,openRightSideMenu, changeDashboardType, onSidebarOpen, username, userimage, ...rest } = props;

  const pathName = props.location.pathname;
  // const pathName = "";
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userImage, setUserImage] = React.useState("");
  useEffect(()=>{
    if (username == "")
    {
      setUserName(localStorage.getItem('username'));
      setUserImage(localStorage.getItem('userimage'));
    }
    else{
      setUserName(username);
      setUserImage(userimage);
    }  
  },[]);
  
  const [selection, setSelection] = React.useState(props.dashboard_type);
  const [language, setLanguage] = React.useState('en');
  const handleChanged = (event, value) => {
    if (value !== null && props.current_page == 0) {
      console.log(value);
      changeDashboardType({dashboard_type: value});
    }
  };
  const handleLanguage = (event, newAlignment) => {
    if (newAlignment !== null) {
      setLanguage(newAlignment);
    }
  };
  const [open, setOpen] = React.useState(false);
  const [s_open, setSOpen] = React.useState(props.open_sidemenu_right);
  const anchorRef = React.useRef(null);
  const handleClose = event => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }
    localStorage.removeItem("access_token");
    setOpen(false);
    history.push({
      pathname :'/sign-in',
    });
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleOpenSidebar = () => {    
      if (s_open > 0)
      {
        openRightSideMenu({open_sidemenu_right: 0});
        setSOpen(0);
      }
      else
      {
        openRightSideMenu({open_sidemenu_right: 1});
        setSOpen(1);
      }
  };
  const langOptions = [
    { value: "en", label: "EN" },
    { value: "ru", label: "RU" },
    { value: "sp", label: "SP" },
    
  ];
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.toolbar}>
        <div style={{display: 'flex', width: '100%', flex: 1}}>
        <Container className={classes.logo}>
          <RouterLink to="/" style={{textAlign: 'center'}}>
              <img
                alt="Logo"
                src="images/big_log.png"
                width="100"
                height="30"
                style={{marginLeft:'65px', textAlign: 'center'}}
              />
          </RouterLink>
        </Container>
        <Hidden mdDown>
        <Grid className={classes.toggleContainer}>
            <ToggleButtonGroup
              value={props.current_page == 0 ? props.dashboard_type : 5}
              exclusive
              onChange={handleChanged}
              style={{width: '100%', height: '100%', borderRadius: '0px', backgroundColor: '#1b2d5e'}}
            >
            </ToggleButtonGroup>
          </Grid>
        </Hidden>
        <div className={classes.flexGrow} />
        <Hidden xsDown>
        <Grid ref={anchorRef} style={{ borderLeft: '2px solid #182952', height: '100%', paddingTop: '12px', paddingBottom: '12px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}} 
            >
            <div style={{padding:'0px', paddingLeft: '10px',minWidth: '217px', paddingRight: '10px', height: '100%'}}>        
              <IconButton 
                className={classes.icon_button}
                onClick={handleToggle}
              >
                <div style={{display: 'flex',}}>
                    <div style={{borderRadius: '50%', 
                      backgroundColor:'#243b70', 
                      width:'35px', height:'35px',
                      marginLeft: 0, textAlign: 'center', 
                      alignItems: 'center',  
                      display: 'flex', 
                      justifyContent: 'center',
                      marginRight: 5
                     }}>
                      <Avatar
                        alt = {userName}
                        src={"images/Avatar/"+userImage}
                      />
                    </div>
                    <div style={{marginLeft:"5px"}}>
                      <div className={classes.username}>
                        {userName}
                      </div>
                      <div className={classes.userrole}>
                        TRADER
                      </div>
                    </div>
                </div>
                <div style={{marginLeft: '100px',padding: '0px', alignItems: 'center', display: 'flex'}}>
                  <ExpandMoreIcon padding={0}/>  
                </div>
              </IconButton>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} 
              transition disablePortal placement={'bottom-end'} style={{width: '215px'}} className={classes.profilePopper}>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: 'center top', backgroundColor: 'transparent'}}
                >
                    <Paper>
                    <ClickAwayListener>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem className={classes.profileMenuItem}>
                          <PersonIcon style={{marginRight: '10px'}} />Profile</MenuItem>
                        <MenuItem className={classes.profileMenuItem}  onClick={handleClose}>
                          <ExitToAppIcon style={{marginRight: '10px'}}/>Log out</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          </div>
        </Grid>
        </Hidden>
        <Grid style={{borderLeft: '2px solid #182952', height: '100%', width: '164px', minWidth: '164px', display: 'flex', alignItems: 'center'}}>
          <MyCustomSelect 
          options={langOptions} 
          className={classes.languageSelectClass} 
          defaultValue={language} 
          onChange={handleLanguage}
          style={{width: '80px'}}/>
          <IconButton 
            style={{marginLeft: '50px'}}
            color="inherit"
            onClick={handleOpenSidebar}>
              {props.open_sidemenu_right > 0 ? <CloseIcon/> : <MenuIcon />}
            
          </IconButton>
        </Grid>
        </div>        
      </Toolbar>
      <Typography className={classes.padding} />
      <Toolbar className={classes.toolbar1}>
        <div style={{display: 'flex', width: '100%', flex: 1}}>
          <Grid className={classes.toggleContainer1}>
            <ToggleButtonGroup
              value={props.current_page == 0 ? props.dashboard_type : 5}
              exclusive
              onChange={handleChanged}
            >
              <MyToggleButton value={0} className={classes.toggleButton}>
                <Icon className={classes.toggleIcon}>User Page</Icon>
              </MyToggleButton>
              <MyToggleButton  value={1} className={classes.toggleButton}>
                <Icon className={classes.toggleIcon}>Global Page</Icon>
              </MyToggleButton>
              <MyToggleButton value={2} className={classes.toggleButton}>
                <Icon className={classes.toggleIcon}>Import Template</Icon>
              </MyToggleButton>            
              <MyToggleButton value={3} className={classes.toggleButton}>
                <Icon className={classes.toggleIcon}>Communication</Icon>
              </MyToggleButton>            
              <MyToggleButton value={4} className={classes.toggleButton}>
                <Icon className={classes.toggleIcon}>Trading Chart</Icon>
              </MyToggleButton>            
            </ToggleButtonGroup>    
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func  
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Topbar));

// export default compose(
//   withRouter,
//   connect(mapStateToProps , mapDispatchToProps )(Topbar)
// );

// export default connect(mapStateToProps, mapDispatchToProps)(compose(
//   withRouter,
//   Topbar
// ));