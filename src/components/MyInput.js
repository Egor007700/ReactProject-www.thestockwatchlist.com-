import React, { useLayoutEffect, useState, useEffect }  from 'react';
import { makeStyles, withStyles  } from '@material-ui/styles';
import Input from '@material-ui/core/Input';

const MyInput = withStyles({
    root: {
        backgroundColor: '#0f1e35',
        paddingLeft: '10px',
        fontFamily: 'Roboto-Regular',
        fontSize: '8.53pt',
        color: '#95c0e9',
        width: '100%'
    },
    input: {
        "&::placeholder": {
            color: "#95c0e9",
            fontSize: '8.53pt',
            fontFamily: 'Roboto-Regular',
        },
        color: "#95c0e9", // if you also want to change the color of the input, this is the prop you'd use
    },
    underline: {
        "&&&:before": {
        borderBottom: "none"
        },
        "&&:after": {
        borderBottom: "none"
    }
}

})(Input);

export default MyInput;