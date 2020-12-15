
import React from 'react';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/styles';

const AntTab = withStyles(theme => ({
    root: {
      textTransform: 'none',
      flex: '1',
      minHeight: '30px',
      minWidth: '30px',
      width: '100%',
      maxWidth: '100%',
      fontWeight: theme.typography.fontWeightRegular,
      margin: '0px',      
      fontSize: '9.24pt',
      color: '#8eb4df',
      backgroundColor: '#15244c',
      fontFamily: [
        'Roboto-Regular',
      ].join(','),
      '&:hover': {
        color: 'white',
        opacity: 1,
      },
      '&$selected': {
        color: 'white',
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: '#12213f',
        width: '100%'
      },
      '&:focus': {
        color: 'white',
        width: '100%'
      }, 
      border: '1px solid #142347',   
    },
    selected: {},
  }))(props => <Tab disableRipple {...props} />);
  
  export default AntTab;