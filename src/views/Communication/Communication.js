import React , {useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import { changeDashboardType , setPageType} from "../../js/actions/index";
import { CLeftSidebar, MiddleWidget } from './components';

const mapStateToProps = state => {
  return { dashboard_type : state.common.dashboard_type, open_sidemenu_right: state.common.open_sidemenu_right };
};
function mapDispatchToProps(dispatch) {
  return {
    changeDashboardType:payload => dispatch(changeDashboardType(payload)),
    setPageType:payload => dispatch(setPageType(payload))
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative'
    //backgroundColor: '#12213f',
  },
  
}));

const Communication = (props) => {
  const { className, changeDashboardType, setPageType, ...rest } = props;
  const classes = useStyles();
  useEffect(() => {
    setPageType({current_page:2});
  });
  
  return (
    <div className={classes.root}>
        <CLeftSidebar/>
        <MiddleWidget/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Communication);
