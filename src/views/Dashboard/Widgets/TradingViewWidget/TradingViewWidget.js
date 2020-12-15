import React, {useEffect, useRef, useLayoutEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import TradingMainViewWidget from './TradingMainViewWidget';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    display: 'flex',
    width: '100%', 
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  gridContainer:{
    padding: 0,
    margin: 0
  },
  leftSide:{
    display: 'flex', 
    width: '40px',
    
    [theme.breakpoints.down('sm')]: {      
      width: '100%',
      padding: '10px'
    },
  },
  middleSide: {
    flex: 1, height: '100%', display: 'flex'
  },
  middleSubSide: {
    flex: 1, display: 'flex', height: '100%', flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',    
      padding: '10px'  
    },
  },
  tradeHistoryContainer:{
    height: '100%', 
    position: 'relative',
    //width: '222px',
    width: '22.7%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',      
      paddingTop: '10px',
      minHeight: '600px'
    },
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
   
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },



}));

const TradingViewWidget = () => {
  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const handleSidebarOpen = () => {    
    
    if (openSidebar == true)
    {
       
    }
    else
    {
        setOpenSidebar(true);
    }
    
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  useLayoutEffect(() => {
    console.log('layout effect');
    // if (size != mRef1.current.offsetWidth)
    // {
    //   setSize(mRef1.current.offsetWidth);
    // }
    
});
  useEffect(() => {
    
  });

  
  return (
    <div className={classes.root}>
      <div className={classes.middleSide}>
        <TradingMainViewWidget handleSidebarOpen={handleSidebarOpen} handleSidebarClose={handleSidebarClose} openSidebar={openSidebar}/>
      </div>
    </div>
  );
};

export default TradingViewWidget;

// const styles = theme => ({
//   root: {
//     padding: theme.spacing(0),
//     display: 'flex',
//     width: '100%', 
//     // flex: 1,
//     height: '100%',
//   },
//   gridContainer:{
//     padding: 0,
//     margin: 0
//   },
//   content: {
//     flexGrow: 1,
//     display: 'flex',
//     padding: 0,
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
   
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginRight: 0,
//   },
// });


// class ControlledElement
//   extends React.Component {

//   constructor () {

//     super()

//     this.onMinimizeClicked =
//       this.onMinimizeClicked.bind(this)

//     this.onMaximizeClicked =
//       this.onMaximizeClicked.bind(this)
//     this.handleSidebarOpen = this.handleSidebarOpen.bind(this);
//     this.state = {
//       size: -1,

//     }
//   }



//   onMinimizeClicked () {

//     const currentSize = this.getSize()

//     const update = (size) => {

//       return new Promise((resolve) => {

//         this.setState(Object.assign({},
//           this.state, {
//             size: size
//           }), () => resolve())
//       })
//     }

//     const done = (from, to) => {
//       return from < to
//     }
//     var maxSize = this.props.getContainerSize();
//     console.log('MaxSize = ', maxSize);

//     this.animate (
//       currentSize, maxSize - 288, -100,
//       done, update)
//   }

//   onMaximizeClicked () {

//     const currentSize = this.getSize()

//     const update = (size) => {

//       console.log('Size = ', size);
//       return new Promise((resolve) => {

//         this.setState(Object.assign({},
//           this.state, {
//             size
//           }), () => resolve())
//       })
//     }

//     const done = (from, to) => {
//       return from > to
//     }

//     var maxSize = this.props.getContainerSize();
//     this.animate (
//       currentSize, maxSize, 30,
//       done, update)
//   }
//   handleSidebarOpen(){
//     this.onMinimizeClicked();
//   };
//   getSize () {

//     const domElement = ReactDOM.findDOMNode(this)

//     switch (this.props.orientation) {

//       case 'horizontal':
//         return domElement.offsetHeight

//       case 'vertical':
//         return domElement.offsetWidth

//       default:
//         return 0
//     }
//   }

//   animate (from, to, step, done, fn) {

//     const stepFn = () => {

//       if (!done(from, to)) {

//         fn(from += step).then(() => {

//           setTimeout(stepFn, 8)
//         })
//       } else
//       {
//         this.setState({animationDone : true})
//       }
//     }

//     stepFn ()
//   }
//   render () {

//     const lockStyle = this.props.sizeLocked ?
//       { color: '#FF0000' } : {}

//     return (
//       <ReflexElement size={this.state.size} {...this.props}>
//         <div className="pane-content"  style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
//           <div className="ctrl-pane-content" style={{flex: 1}}>
//             <div style={{flex: 1, display: 'flex', height: '100%', flexWrap: 'nowrap',}}>
//             <TradingWidget style={{flex: 1}} openSidebar={this.state.openSidebar}/>
//             <div style={{height: '100%', position: 'relative'}}  style={{width: '222px'}}>
//                 <TradeHistory  onSidebarOpen={this.handleSidebarOpen} style={{width: '100%'}}/>
//             </div>
//           </div>
//           </div>
//         </div>
//       </ReflexElement>
//     )
//   }
// }

// class TradingViewWidget extends React.Component{
//   constructor(props)
//   {
//     super(props);
//     this.getContainerSize = this.getContainerSize.bind(this);
//     this.state = {
//       openSidebar: false,
//       pane1: {
//         getContainerSize: this.getContainerSize,
//         name: 'Pane 1',
//         direction: 1,
//         id: 'pane1',
//         minSize: 1050,

//       },
//     }
//     this.container = null;
//   };

//   componentDidUpdate(){
//       if (this.container)
//       {
//         console.log('Component Size = ', this.container.offsetWidth);
//       }
//   }

//   getContainerSize(){
//     return this.container.offsetWidth;
//   }

//   handleSidebarOpen(){
    
//   };
//   render(){
//     const { classes } = this.props;
//     return(
//     <div className={classes.root}>
//       <div style={{display: 'flex', width: '196px'}}>
//         <LeftBar/>
//         <div style={{flex: 1, height: '100%', position: 'relative'}}>
//           <SourceWidget/>
//         </div>
//       </div>
//       <div style={{flex: 1, height: '100%', display: 'flex'}} ref={el => (this.container = el)}>
//         <ReflexContainer orientation="vertical" style={{flex: 1}}>
//         <ControlledElement {...this.state.pane1}/>
//         <ReflexSplitter propagate={true} style={{cursor: "url(./trino/images/cursor.png)10 15 ,auto", backgroundColor: '#337dff',width: '3px', borderLeft: '1px solid #2450a5', borderRight: '1px solid #2450a5'}}/>
//         <ReflexElement flex={0}>
//         <LimitWidget               
//               open_drawer={true}
//               />              
//         </ReflexElement>
//         </ReflexContainer>
//       </div>
//     </div>
//     );
//   };
// }

// export default withStyles(styles)(TradingViewWidget);