import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0f1e35',
    height : '100%',
    padding: '20px',
    overflow: 'auto'
    // display: 'flex',
    // flexDirection: 'column',
  },
  titleClass: {
    fontFamily: 'Roboto-Medium',
    fontSize: '10px',
    color: '#95c0e9',
    marginLeft: '5px'
  },
  coinLabelClass: {
    fontFamily: 'Roboto-Medium',
    fontSize: '16px',
    color: 'white',
    marginLeft: '5px'
  },
  paragraphRootClass:{
    borderBottom: '1px solid #13243e',
    width: '100%',
    // height: '100%',
    paddingBottom: '15px',
    display: 'flex',
    flexDirection: 'column'
  },
  paragraphTitleClass:{
    fontFamily: 'Roboto-Medium',
    fontSize: '10px',
    color: '#95c0e9',
  },
  paragraphContentClass:{
    marginTop: '10px',
    fontFamily: 'Roboto-Regular',
    fontSize: '13px',
    color: 'white',
  }
}));
const Paragraph = props =>
{
  const { className, title, content, ...rest } = props;
  const classes = useStyles();
  return(
    <div className={classes.paragraphRootClass}>
      <div className={classes.paragraphTitleClass}>{title}</div>
      <div className={classes.paragraphContentClass}>{content}</div>
    </div>
  )
};
const DataWidget = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
      >
        <Grid
          item
          lg={4}
          xs={12}
          style={{width: '100%', height: '100%'}}
        >
          <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px'}}>
            <Icon style={{marginRight: '10px', width: '45px', height: '45px', justifyContent: 'center'}}>
              <img src="images/btc_usd_big.png"/>
            </Icon>
            <div className={classes.titleClass} style={{marginTop: '30px'}}>NAME</div>
            <div className={classes.coinLabelClass} style={{marginTop: '15px'}}></div>
          </div>
        </Grid>
        <Grid
          item
          lg={8}
          xs={12}
        >
          <div style={{width: '100%', height: '100%', padding: '20px'}}>
          </div>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default DataWidget;
