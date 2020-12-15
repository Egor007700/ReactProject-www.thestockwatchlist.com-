import React, {createRef} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import {TextField, List, ListItem } from '@material-ui/core';
import {MyChatItem, OtherChatItem} from './components';
import ScrollView, { ScrollElement } from "./components/scroller.js";
const useStyles = makeStyles(theme => ({  
  root: {
    display: 'flex',
    flexDirection: 'column',    
    padding: 0,
    backgroundColor: '#0f1e35',
    width: '100%',
    height: '100%'
  },
  searchClass:
  {
    marginTop: '10px',
    border: '0px solid',
    backgroundColor: '#132245',      
    width: '100%',
  },
  searchClassInput:{
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    input:{
      '&::placeholder': {
        color: 'blue'
      }
    }
  },
}));

const MyInput = withStyles({
  root: {
      backgroundColor: '#132245',
      width: '100%',
      padding: '10px',
      marginTop: '10px'
  },

})(TextField);

function createData(key, type, name, image, time, string) {
  return { key, type, name, image, time, string};
}
const styles = {
  'input-label': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'
  },

  'input': {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#8eb4df'
    }
  }
};

const datas = [
createData(0, 0, "John Smith", "", "1hour ago", "asdfasdfasdf \n asdfasdfasdf \n asdfasdf"),
createData(1, 1, "John Smith", "", "1hour ago", "asdfasdfasdf \n asdfasdfasdf \n asdfasdf"),
createData(2, 0, "John Smith", "", "1hour ago", "asdfasdfasdf \n asdfasdfasdf \n asdfasdf"),
createData(3, 1, "John Smith", "", "1hour ago", "asdfasdfasdf \n asdfasdfasdf \n asdfasdf"),
];
const MiddleWidget = (props) => {
  const [text, setText] = React.useState('');
  const classes = useStyles();
  const handleContentChanged = (event, newAlignment) => {
    if (newAlignment !== null) {
      setText(newAlignment);
    }
  }
  return(
    <div
      className={classes.root}
    >
        <div style={{width: '100%', height: '100px', fontFamily: 'Roboto-Bold', 
          fontSize: '18px', color: '#d1ecff', backgroundColor: '#12213f',
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: '70px'}}>
          <span>Investor 3</span>
        </div>
        <div style={{width: '100%', height: '100%', padding: '30px', display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '100%', height: '30px', fontSize: '13px', fontFamily: 'Roboto-Regular', color: '#8eb4df',
            display: 'flex', justifyContent:'center'}}>23 Dec’18</div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', position: 'relative'}}>
            <div style={{position: 'absolute', paddingRight: '10px', left: 0, top: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden'}}>
              {datas.map((data) => {
                return(
                  <div key={data.key}>
                  { data.type == 0 ? <MyChatItem/> : <OtherChatItem/>}
                  </div>
                );
                })}
            </div>
          </div>
          <MyInput
              id="outlined-multiline-static"                
              multiline
              rows="5"
              placeholder="Write a comment"
              value={text}
              onChange={handleContentChanged}                
              // className={classes.searchClass}
              InputProps={{
                disableUnderline: true,
                className : classes.searchClassInput,  
                classes: {input: props.classes['input']}
              }}
          />
        </div>
    </div>
  )
}



export default withStyles(styles)(MiddleWidget);