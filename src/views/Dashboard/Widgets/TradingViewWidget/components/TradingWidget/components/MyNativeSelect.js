import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, withStyles } from '@material-ui/styles';
const MyNativeSelect = withStyles({
    root:{
      backgroundColor: '#15244c',
      paddingLeft: '3px',
      fontFamily: 'Roboto-Regular',
      fontSize: '8.53pt',
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
        backgroundColor: '#15244c',
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

  export default MyNativeSelect;