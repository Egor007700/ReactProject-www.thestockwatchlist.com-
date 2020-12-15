import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#142347',
    width: '100%',
    padding: '0px',
    height: '30px',
    maxHeight: '30px'
  },
  toggleIcon: {
    fontFamily: "Roboto-Medium",
    fontSize: '8pt',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
}));
const MyToggleButton = withStyles(theme => ({
  root: {
    textTransform: 'none',
    flex: '1',
    minHeight: '30px',
    fontWeight: theme.typography.fontWeightRegular,
    margin: '0px',
    minWidth: '10px',
    fontSize: '7.82pt',
    color: '#8eb4df',
    height: '100%',
    fontFamily: [
      'Roboto-Regular',
    ].join(','),
    '&:hover': {
      color: 'white',
    },
    '&$selected': {
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: '#2d477a',
      '&:hover': {
        backgroundColor: '#2d477a'
      },
    },
    '&:focus': {
      color: 'white',
    }, 
    border: '0px solid #142347',   
  },
  selected: {},
}))(props => <ToggleButton disableRipple {...props} />);

const values = [
  {key: 0, value: "VOL"}, 
  {key: 1, value: "MACD"}, 
  {key: 2, value: "MA"}, 
  {key: 3, value: "AVL"}, 
  {key: 4, value: "KDJ"}, 
  {key: 5, value: "BOLL"}, 
  {key: 6, value: "EMA"}, 
  {key: 7, value: "TRIX"}, 
  {key: 8, value: "StochRSI"}, 
  {key: 9, value: "RSI"}, 
  {key: 10, value: "EMV"}, 
  {key: 11, value: "DMI"}, 
  {key: 12, value: "WR"}, 
  {key: 13, value: "OBV"}, 
  {key: 14, value: "MTM"}, 
  {key: 15, value: "CCI"}, 
  {key: 16, value: "VWAP"}, 
]

const StTypePanel = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(4);
  
  const handleChanged = (event, newAlignment) => {
    if (newAlignment !== null) {
      setValue(newAlignment);
    }
  };
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >

    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChanged}
      style={{width: '100%', height: '100%', borderRadius: '0px', backgroundColor: 'transparent'}}
    >
      {values.map((value) => (
        <MyToggleButton key={value.key} value={value.key} className={classes.toggleButton}>
          <Icon className={classes.toggleIcon}>{value.value}</Icon>
        </MyToggleButton>
      ))}
     </ToggleButtonGroup>
  </div>
  );
};

StTypePanel.propTypes = {
  className: PropTypes.string
};

export default StTypePanel;
