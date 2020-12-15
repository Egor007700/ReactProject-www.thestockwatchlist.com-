import React , {useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UserPageWidget,TradingViewWidget } from './Widgets';
import { connect } from "react-redux";
import Communication from '../Communication/'
import TabPanel from './../../layouts/Main/components/TabePanel';
import { changeDashboardType , setPageType, setAlert} from "./../../js/actions/index";
import MyToggleButton from '../../components/MyToggleButton';
import { Grid} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Paper from '@material-ui/core/Paper';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import ImportWatchlistTemplate from './Widgets/ImportWatchlistTemplate';
import {getwatchlisttemplate} from '../../services/api/httpclient';
import reactDimensions from 'react-dimensions';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { AlertTitle } from '@material-ui/lab';

const mapStateToProps = state => {
  return { dashboard_type : state.common.dashboard_type, alertflag: state.user.alertflag, alertsymbol:state.user.alertsymbol };
};
function mapDispatchToProps(dispatch) {
  return {
    changeDashboardType:payload => dispatch(changeDashboardType(payload)),
    setPageType:payload => dispatch(setPageType(payload)),
    setAlert:(alertflag, alertsymbol)=>dispatch(setAlert(alertflag, alertsymbol))
  };
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    display: 'flex',
    width: '100%', 
    backgroundColor:'#F4F6F8',
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divstyle: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Dashboard = (props) => {
  const { className, changeDashboardType, setPageType, alertflag, alertsymbol, ...rest } = props;
  console.log("props", props)
  const classes = useStyles();
  useEffect(() => {
    setPageType({current_page:0});
  });

  const handleChanged = (event, value) => {
    if (value !== null && props.current_page == 0) {
      console.log(value);
      changeDashboardType({dashboard_type: value});
    }
  };
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setAlert("none", alertsymbol);
  };
  useEffect(()=>{
    if (alertflag == "block"){
      setOpen(true);
    }
    else{
      setOpen(false);
    }
  },[alertflag]);

  return (
    <div className={classes.root}>
      <TabPanel value={props.dashboard_type} index={0}>
        <div style={{display:alertflag}}>
          <Snackbar
          open={open} 
          onClose={handleClose} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <Alert onClose={handleClose} severity="success">
            <AlertTitle>{alertsymbol}</AlertTitle>
            The current stock price is high more than your alert price!!!
          </Alert>
          </Snackbar>
        </div>
        {/* <div style={{display:"flex"}} key={2}>
          <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
            <Alert onClose={handleClose} severity="success">
              <AlertTitle>BUF</AlertTitle>
              The current stock price is high more than your alert price!!!
            </Alert>
          </Snackbar>
        </div> */}
        <Grid container spacing={3} justify='flex-end' >
          <Grid item xs={12}>
              <AvatarGroup max={4} style={{position:"relative", float:"right", paddingTop:"3%", paddingRight:"5%"}}>
                  <Avatar alt="Remy Sharp" src="images/Avatar/avatar1.jpg" />
                  <Avatar alt="Travis Howard" src="images/Avatar/avatar2.jpg" />
                  <Avatar alt="Cindy Baker" src="images/Avatar/avatar3.jpg" />
                  <Avatar alt="Agnes Walker" src="images/Avatar/avatar4.jpg" />
                  <Avatar alt="Trevor Henderson" src="images/Avatar/avatar5.jpg" />
                </AvatarGroup>              
          </Grid>
          <UserPageWidget/>
        </Grid>
      </TabPanel>
      <TabPanel value={props.dashboard_type} index={1}>
      </TabPanel>
      <TabPanel value={props.dashboard_type} index={2}>
        <ImportWatchlistTemplate/>
      </TabPanel>
      <TabPanel value={props.dashboard_type} index={3}>
        <Communication/>
      </TabPanel>
    </div>
  );
};

const Form = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Form;