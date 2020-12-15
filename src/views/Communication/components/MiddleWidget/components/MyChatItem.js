import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    backgroundColor: '#0f1e35',
    fontSize: '13px',
    fontFamily: 'Roboto-Regular',
    color: '#fcfdff',
    backgroundColor: '#337dff' ,
    padding: '15px',
    borderRadius: 15,
    borderTopRightRadius: 0
  },
  searchClass:
  {
    marginLeft: '5px',
    border: '0px solid',
  },
  
}));

const MyChatItem = (props) => {
  const { className,   ...rest } = props;
  const classes = useStyles();
  
  const string = " asdfasdf \n asdfasdf  \nasdfasdfasdfasdf";
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
    <div className={classes.root}>
      <span style={{whiteSpace: 'pre-line'}} >
        {string}
      </span>
    </div>
    </div>
  );
};

export default MyChatItem;
