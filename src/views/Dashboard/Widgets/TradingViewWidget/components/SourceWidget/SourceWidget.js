import React , {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SubtypePanel from './components/SubtypePanel/SubtypePanel';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Select, { components } from "react-select";


const useStyles = makeStyles(theme => ({
  root: {
    
    backgroundColor: '#12213f',
    height : '100%',
    width: '180px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    minWidth: '180px',
    padding: '0px',
    margin: '0px',
    display: 'flex',
    flexDirection: 'column',
    
  },
  expansionClass: {
    fontFamily: 'Roboto-Regular',
    fontSize: '10pt',
    color: '#95c0e9'
  },
  expansionSummary: {
    height: '32px',
    width: '100%'
  }
}));
const ExpansionPanel = withStyles({
  root: {
    borderBottom: '1px solid #0f1e35',
    boxShadow: 'none',
    '&:not(:last-child)': {
      // borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
    backgroundColor: 'transparent'
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'transparent',
    //borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,    
    '&$expanded': {
      minHeight: 32,
    },
    padding: '0px',
    margin: '0px',
    minHeight: '32px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  content: {
    '&$expanded': {
      margin: '0px 0',
    },
  },
  expanded: {},
  expandIcon: {
    color: '#8db7df',
    padding: 0,
    marginRight: 5
  },
  
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    height: '300px'
  },

}))(MuiExpansionPanelDetails);

const MyCustomSelect = (props) => {
  const { type, options, defaultValue, onChange ,...rest } = props;
  const customStyles = {
      control: (base, state) => {
          const { menuIsOpen } = state.selectProps;
          const { isFocused } = state
          const border_str = menuIsOpen ? '2px solid #214d9a' : '2px solid #12213f';
          const borderRadius = menuIsOpen ? { borderTopLeftRadius : 10} : {};
          return {
          ...base,
          boxShadow: 'none',
          background: "#12213f",
          color: '#354964',
          height: '32px',
          minHeight: '32px',            
          padding: 0,
          paddingBottom: 1,
          '&:hover': {borderLeft: menuIsOpen ? '2px solid #214d9a' : '2px solid #12213f', 
              borderTop: menuIsOpen ? '2px solid #214d9a' : '2px solid #12213f', 
              borderRight: menuIsOpen ? '2px solid #214d9a' : '2px solid #12213f', 
              borderBottom: '0px solid #12213f'
          },
          //border: state.selectProps.menuIsOpen ? '1px solid lightgray' : '' // default border color
          borderLeft: border_str,
          borderBottom: '0px solid #12213f',
          borderTop: border_str,
          borderRight: border_str,
          borderTopLeftRadius : menuIsOpen ? 10 : 0,
          borderTopRightRadius: menuIsOpen ? 10 : 0,
          }
        },
        singleValue: base => ({
          ...base,
          color: "#8eb4df",
          fontSize: 11,
          fontFamily: 'Roboto-Regular'
        }),
        dropdownIndicator: base => ({
          ...base,
          color: "#8eb4df",
          height: '26px',
          minHeight: '26px',     
          padding: 0,
          display: 'flex',
          paddingRight: '3px',
          alignItems: 'center'
        }),
        menu: base => ({
          ...base,
          // override border radius to match the box
          background: '#0f1e35',
          color: "#8eb4df",
          fontSize: 11,
          fontFamily: 'Roboto-Regular',
          marginBottom: 0,
          marginTop: 0,
          borderLeft: '2px solid #12213f',
          borderLeft: '2px solid #214d9a',
          borderBottom: '2px solid #214d9a',
          borderRight: '2px solid #214d9a',
          borderBottomLeftRadius : 10, borderBottomRightRadius: 10
        }),
        menuList: base => ({
            ...base,
            padding: 0,
            
        }),
        input: base => ({
          ...base,
          color: "#8eb4df",
          fontSize: 11,
          fontFamily: 'Roboto-Regular',
        })
      // option: (provided, state) => ({
      //   ...provided,
      //   borderBottom: '1px dotted pink',
      //   color: state.isSelected ? 'red' : 'blue',
      //   padding: 10,
      // }),
      // control: () => ({
      //   // none of react-select's styles are passed to <Control />
      //   //width: 100,
      // }),
      // singleValue: (provided, state) => {
      //   const opacity = state.isDisabled ? 0.5 : 1;
      //   const transition = 'opacity 300ms';
      //   return { ...provided, opacity, transition };
      // }
  };
  return (<Select options={options} 
      onChange={onChange}
      components={{
      IndicatorSeparator: () => null
      }} styles={customStyles}
      defaultValue={options[0]}
      isSearchable ={false}
      theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
          ...theme.colors,
            text: 'red',
            primary25: 'transparent',
            primary: '#15244c',
          },
        })}
    />);
};

const SourceWidget = props => {
  const { className, ...rest } = props;
  const mainRef = useRef(null);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel_subtype');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const scrollToBottom = () => {
    mainRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //useEffect(scrollToBottom, mainRef);
  const onClickDown = (event) =>{
    console.log('Click Down');
    scrollToBottom();
  };

  const [value, setValue] = React.useState('crypto');
  const [value1, setValue1] = React.useState('source'); 
  const handleValueChanged = (event, newAlignment) => {
    if (newAlignment !== null) {
        setValue(newAlignment);
    }
  };
  const handleValue1Changed = (event, newAlignment) => {
      if (newAlignment !== null) {
          setValue1(newAlignment);
      }
  };
  const options = [
    { value: "source", label: "Source" },
    { value: "aggregated", label: "Aggregated" },
    { value: "exchange1", label: "Exchnage 1" },
    { value: "exchange2", label: "Exchnage 2" },
  ];
  const typeOptions = [
      { value: "crypto", label: "Type" },
      { value: "aggregated", label: "Aggregated" },
      { value: "exchange1", label: "Exchnage 1" },
      { value: "exchange2", label: "Exchnage 2" },
  ];
  const subTypeOptions = [
      { value: "crypto", label: "SubType" },
      { value: "aggregated", label: "Aggregated" },
      { value: "exchange1", label: "Exchnage 1" },
      { value: "exchange2", label: "Exchnage 2" },
  ];
  return (
    <div
      className={classes.root}
    >
      <div style={{border: '1px solid #0f1e35'}}>
        <MyCustomSelect options={options} defaultValue={value} onChange={handleValue1Changed}/>
      </div>
      <div style={{border: '1px solid #0f1e35', borderTop: '0px solid'}}>
      <MyCustomSelect options={typeOptions} defaultValue={value} onChange={handleValueChanged}/>
      </div>
      <div style={{border: '1px solid #0f1e35', borderTop: '0px solid'}}>
      <MyCustomSelect options={subTypeOptions} defaultValue={value} onChange={handleValue1Changed}/>
      </div>
      <SubtypePanel/>
      {/* <div style={{flex: 1, position: 'relative', width: '100%'}}>
      <div style={{overflowY: 'auto',
              overflowX: 'hidden',
              position: 'absolute',
              left: 0,
              bottom: 0,
              top: 0,
              right: 0}}>
      <ExpansionPanel square expanded={expanded === 'panel_source'} onChange={handleChange('panel_source')}>
        <ExpansionPanelSummary className={classes.expansionSummary} expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
          <Typography className={classes.expansionClass}>Source</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
       <ExpansionPanel square expanded={expanded === 'panel_type'} onChange={handleChange('panel_type')}>
        <ExpansionPanelSummary className={classes.expansionSummary} expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
          <Typography className={classes.expansionClass}>Type</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel_subtype'} onChange={handleChange('panel_subtype')}>
        <ExpansionPanelSummary className={classes.expansionSummary} expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
          <Typography className={classes.expansionClass}>Subtype</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SubtypePanel/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <div ref={mainRef} />
      </div>
      </div>
      <div style={{height: '46px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '24px', height: '24px', borderRadius: '12px', border: '1px solid #2b4574'}}>
          <IconButton style={{padding: 0}} onClick={onClickDown}><KeyboardArrowDownIcon style={{color: '#2b4574', width: '23px', height: '23px'}}/></IconButton>
        </div>
      </div> */}
    </div>
  );
};

SourceWidget.propTypes = {
  className: PropTypes.string
};

export default SourceWidget;
