import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Box, Hidden } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { symbolname:state.chart.symbolname};
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#15244c',
    height : '100%',
    width: '100%',
    padding: '0px',
    display: 'flex',
    alignItems: 'center'
  },
  textTitleClass : {
    fontFamily: 'Robot-Regular',
    fontSize: '9.96pt',
    color: '#95c0e9'
  },
  textValueClass: {
    margin:'5px', 
    fontFamily: 'Robot-Bold', 
    fontSize: '10.67pt', 
    color: 'white'
  }
}));

const TitlePanel = props => {
  const { className,symbolname, ...rest } = props;

  const classes = useStyles();
  const [row, setRow] = React.useState({profit: 2.06});
  const [ohlcv, setOhlcv] = React.useState({high: 0.00007195, low: 0.000006968, volume: 4023.29});
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
        <div style={{padding: '0px', paddingLeft: '5px', display:'flex'}}>
          <div style={{display:'flex', justifyContent: 'center'}}>
            <img
              src={"https://financialmodelingprep.com/image-stock/" + symbolname + ".jpg"}
              width = '24px'
              height = '25px'
              style={{margin:'7px', textAlign: 'center'}}
            />
          </div>
          <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5px'}}>
            <span style={{fontFamily: "Roboto-Bold",fontSize: '14.22pt',color: 'white',}}>{symbolname}</span>
          </div>
        </div>
    </div>
  );
};

TitlePanel.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps)(TitlePanel);
