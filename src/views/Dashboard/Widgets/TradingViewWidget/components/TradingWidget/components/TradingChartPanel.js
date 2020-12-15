import React, { useRef , useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import { createChart } from 'lightweight-charts';
import { IconButton } from '@material-ui/core';

import TradingViewChart from './TradingViewChart';
import TradingFinancialChart from './TradingFinancialChart';
import { getData } from "./utils"
import { TypeChooser } from "react-stockcharts/lib/helper";

import Dimensions from 'react-dimensions'
import useDimensions from 'react-use-dimensions';
import { withSize } from 'react-sizeme'
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { symbolname:state.chart.symbolname, intervalname:state.chart.intervalname};
};
// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: '#12213f',
//     height : '100%',
//     width: '100%',
//     padding: '0px' ,
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     right: 0,
//     bottom: 0
//   },
//   container : {
//     backgroundColor: '#12213f',
//     height : '100%',
//     width: '100%',
//     padding: '0px',
//     position: 'relative'
//   },
//   centerButtonClass:{
//     padding: '0px',

//   }
// }));

// const TradingChartPanel = (props) =>
// {
//   const classes = useStyles();
//   const { className, open, openDetail, ...rest } = props;
//   const [data, setData] = React.useState(null);
//   const [ref, { width, height }] = useDimensions()
//   useEffect(() => {
//     getData().then(data => {
//         setData(data);
//     })
// }, [props])
//   return(<div ref={ref} className = {classes.container}>
//     {data == null ? <div> Loading... </div> : <TradingViewChart type="svg" data={data} containerHeight={height}
//         containerWidth={width} style={{width: '100%'}}/>}
//   </div>);
// };
// export default TradingChartPanel;
const styles = theme => ({
  root: {
    backgroundColor: '#12213f',
    height : '100%',
    width: '100%',
    padding: '0px' ,
    display: 'flex', 
    
  },
  container : {
    backgroundColor: '#12213f',
    height : '100%',
    width: '100%',
    padding: '0px',
  },
  centerButtonClass:{
    padding: '0px',

  }
});
class TradingChartPanel extends Component{

  constructor(props)
  {
    super(props)
    this.state = {
        data: null,
        chartWidth: 0,
    }; 
    this.container = null;
  }
  _isMounted = false;
  componentDidMount()
  {
    this._isMounted = true;
    getData(this.props.symbolname,"1d").then(data => {
      this.setState({ data: data });
    })

    console.log('Component Did update chart panel', this.container.offsetWidth);
    if (this.container) {
      setTimeout(() => {
        this.setState({chartWidth: this.container.offsetWidth});
      }, 0);
    }    
    else {
      console.log('null')
    }
  }
  componentWillReceiveProps(nextProps)
  {
    console.log('componentWillReceiveProps', nextProps);
    if (nextProps.intervalname !== this.props.intervalname) {
      console.log('nextProps', nextProps.intervalname);
      getData(nextProps.symbolname, nextProps.intervalname).then(data => {
        this.setState({ data: data });
      });
    }
  }

  componentDidUpdate()
  {
    if (this.container)
    {
      console.log('Component Did update chart panel', this.container.offsetWidth);
      if (this.state.chartWidth != this.container.offsetWidth)
      {
        this.setState({chartWidth: this.container.offsetWidth})
      }
    }
    
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  render(){
    const { classes } = this.props;
    return(
      <div className = {classes.container}  >
        <div 
            style={{flex: 1,  height: '100%', backgroundColor: '#0f1e35',}}
            ref={el => (this.container = el)} >
            {
              this.state.data == null? 
              <div>Loading...</div> : 
              <TradingViewChart type="svg" 
                data={this.state.data} 
                containerWidth={this.state.chartWidth}
                containerHeight={this.props.containerHeight} 
                // containerWidth={500} 
                // containerHeight={400} 
              />
            }
        
        {/* <TradingFinancialChart data={this.state.data} seriesType="line" /> */}
        
        </div>
        {/* <div style={{position: 'absolute', top: '90%', left: '50%',transform:' translate(-50%, -50%)', zIndex: 100, display: 'flex'}}> 
          <IconButton className={classes.centerButtonClass}>
            <RemoveCircleIcon style={{color: '#4a72b6'}}/>
          </IconButton>
          <FiberManualRecordOutlinedIcon className={classes.centerButtonClass} style={{marginLeft: '7px', color: '#4a72b6'}}/>
          <IconButton className={classes.centerButtonClass} style={{marginLeft: '7px'}}>
            <AddCircleRoundedIcon style={{color: '#4a72b6'}}/>
          </IconButton>
        </div> */}
      </div>
    );
  }
}

export default withSize()(Dimensions()(withStyles(styles)(connect(mapStateToProps)(TradingChartPanel))));
