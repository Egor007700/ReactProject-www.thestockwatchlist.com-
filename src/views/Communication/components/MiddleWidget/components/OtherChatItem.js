import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    backgroundColor: 'transparent',
    fontSize: '11px',
    fontFamily: 'Roboto-Regular',
    color: '#8eb4df',
    display: 'flex', 
    flexDirection: 'column'  
  },
  content:
  {
    backgroundColor: '#132245',
    padding: '15px',
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginTop: '10px'
  },
  
}));

const OtherChatItem = (props) => {
  const { className,   ...rest } = props;
  const classes = useStyles();
  
  const string = " asdfasdf \n asdfasdf  \nasdfasdfasdfasdf";
  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
      <div className={classes.root}>
        <div style={{display: 'flex'}}>
          <div style={{fontFamily: 'Roboto-Bold', fontSize: '10.89px', color: '#42c596', display:'flex', alignItems: 'center'}}>
              <img 
                  src="images/man.png"
              />
          </div>
          <div style={{display:'flex', flexDirection: 'column', marginLeft: '10px', paddingTop: '8px'}}>
              <div style={{flex: 1, fontFamily: 'Roboto-Bold', fontSize: '17px', color: 'white',alignItems: 'center'}}>Meir Hasin</div>
              <div style={{flex: 1, fontFamily: 'Roboto-Bold', fontSize: '13px', color: '#8eb4df',alignItems: 'center'}}>1hour ago</div>
          </div>
        </div>
        <div className={classes.content}>
          <span style={{whiteSpace: 'pre-line'}} >
            {string}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtherChatItem;
