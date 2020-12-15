import React, {useCallback} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { TradingViewWidget } from '../../Widgets'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import sector from './sector'
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import { Typography } from '@material-ui/core';
import {saveWatchlist, deleteWatchlist,getWatchlist,getsector, updateWatchlist, changeViewStatus, getcurrentstockprice, getwatchlisttemplate} from '../../../../services/api/httpclient';
import { getData } from '../TradingViewWidget/components/TradingWidget/components/utils';
import { connect } from "react-redux";
import { setSymbolName } from '../../../../js/actions';
import { changeDashboardType } from '../../../../js/actions';
import { setAlert } from '../../../../js/actions';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { range } from 'd3';
import AddAlert from '@material-ui/icons/AddAlert';
import Alert from '@material-ui/lab/Alert';


const mapStateToProps = state => {
  return { username:state.user.username, useremail:state.user.useremail, dashboard_type:state.common.dashboard_type};
};
function mapDispatchToProps(dispatch) {
  return {
    changeDashboardType:payload => dispatch(changeDashboardType(payload)),
    setSymbolName:payload => dispatch(setSymbolName(payload)),
    setAlert:(alertflag,alertsymbol) => dispatch(setAlert(alertflag, alertsymbol)),
  };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#12213f',
        height : '100%',
        width: '100%',
        minHeight: '400px',
        padding: '0px',
        display: 'flex',
        position: 'relative',
        
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    table: {
        width : '95%',
        position : 'relative',
        margin : '3% 2% 2%',
        height : '60%'
    }
}));

const options =sector;
const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;


  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

const useStyles1 = makeStyles({
    listbox: {
      boxSizing: 'border-box',
      '& ul': {
        padding: 0,
        margin: 0,
      },
    },
  });

const sectorOptions=[];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const UserPageWidget = (props) => {
    const { className,username, useremail,dispatch, changeDashboardType, setSymbolName, setAlert, ...rest } = props;
    const [widgetType, setWidgetType] = React.useState(0);
    const handleChangeWidgetType = (type) => {
        if (type != null)
        {
            setWidgetType(type);
        }
    }
    const classes = useStyles1();
    const [userName, setUserName] = React.useState("");
    const [userEmail, setEmail] = React.useState("");

    React.useEffect(()=>{
      if (username == "")
      {
        setUserName(localStorage.getItem('username'));
      }
      else{
        setUserName(username);
      }  
      if (useremail == "")
      {
        setEmail(localStorage.getItem('useremail'));
      }
      else{
        setEmail(useremail);
      }  
    },[username, useremail]);
  
    const initialList = [];
    const data = [];
    const [value, setValue] = React.useState("");
    const [sectorvalue, setSectorValue] = React.useState("");
    const [symbol, setSymbol] = React.useState(initialList);
    const [state, setState] = React.useState(data);  
    const [status, setStatus] = React.useState(false);
    const [timer, setTimer] = React.useState(true);
    const [alertList, setAlertList] = React.useState([])
    const [earningList, setEarningList] = React.useState([])
    const [columndata, setColumnData] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [first, setFirst] = React.useState(true);
    
    let timerID;
    
    React.useEffect(()=>{
      symbol.map(item =>{
          let payload = {
            "symbol": item,
          }

          if (timer == true)
          {
            getcurrentstockprice(payload).then( ret=>{
              console.log(ret);
              if (ret['data']['result'] == "failed" || state == undefined)
              {
                return;
              }
              setState(state.map(item => {
                if (item.symbol == ret.data.symbol) {
                  item.currentchange =Math.round((ret.data.price-item.currentstockprice) / ret.data.price * 100 * 1000) /1000;
                  item.currentstockprice = ret.data.price;
                  item.addedpricechange = Math.round((parseFloat(item.addedprice)-item.currentstockprice) / parseFloat(item.addedprice) * 100 * 1000) /1000;
                  if (item.alertprice != null && item.alertprice != "0")
                  {
                    if (parseFloat(item.currentstockprice) >= parseFloat(item.alertprice)){
                      setAlert("block", item.symbol);
                      earningList.push(item.symbol);
                    }
                  }
                  return item;
                } else {
                  return item;
                }
              }))  
          }, err => {
            alert(err.error);
            });                  
          } 

            timerID = setInterval(() => {
              if (timer == true)
              {
                getcurrentstockprice(payload).then( ret=>{
                  console.log(ret);
                  if (ret['data']['result'] == "failed" || state == undefined)
                  {
                    return;
                  }
                  setState(Object.values(state).map(item => {
                    if (item.symbol == ret.data.symbol) {
                      item.currentchange =Math.round((ret.data.price-item.currentstockprice) / ret.data.price * 100 * 1000) /1000;
                      item.currentstockprice = ret.data.price;
                      item.addedpricechange = Math.round((parseFloat(item.addedprice)-item.currentstockprice) / parseFloat(item.addedprice) * 100 * 1000) /1000;
                      if (item.alertprice != null && item.alertprice != "0")
                      {
                        if (parseFloat(item.currentstockprice) >= parseFloat(item.alertprice)){
                          setAlert("block", item.symbol);
                        }
                      }
                      return item;
                    } else {
                      return item;
                    }
                  }))  
              }, err => {
                alert(err.error);
                });                  
              }              
            }, 1000 * 60 * 5);  
      })
    },[symbol, timer])

      const getColumns = useCallback(() => {
          return [
            { title: 'Symbol', field: 'symbol', editable: 'onAdd', hidden:!columndata['symbol'],
            editComponent: props => (
              <Autocomplete
              id="virtualize-demo"
              disableListWrap
              classes={classes}
              ListboxComponent={ListboxComponent}
              renderGroup={renderGroup}
              options={options}
              style={{ width: 150 }}
              type="text"
              value={props.value}
              groupBy={(option) => option[0].toUpperCase()}

             
              onChange={(e, newvalue) => {
                setLoading(true);
                  //setTimer(false);
                  props.onChange(newvalue);
                  
  
                  let payload = {
                    "symbol": newvalue,
                  };
              
                getsector(payload).then( ret=>{
                  setLoading(false);
                if (ret['data'].result == 'ok'){
                    if (sectorOptions.length > 0)
                    {
                        sectorOptions.pop();
                    }
                    if (ret['data']['sector'] == "")
                    {
                      props.onChange("");
                    }
                    sectorOptions.push(ret['data']['sector']);
                    setSectorValue(ret['data']['sector']);
                }
                else if(ret['data'].result == 'fail'){
                    alert(ret['data'].message);
                }
                else {
                    alert(ret['data'].error);
                }
                }, err => {
                alert(err.error);
                });                    
            }}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Symbol" />}
              renderOption={(option) => <Typography noWrap>{option}</Typography>}/>            
            ) },
            { title: 'Sector', field: 'sector',  editable: 'Never',hidden:!columndata['sector'],
                  editComponent:props => (
                    <TextField 
                      id="outlined-basic" 
                      label="Outlined" 
                      variant="outlined" 
                      value={sectorvalue}
                      onChange={e=>{
                        console.log(e);
                      }}
                    />
                  )
              },
            {
              title: 'TradeTiming',
              field: 'tradetiming',
              lookup: { 0: 'Today', 1: 'Next Day' },
              hidden:!columndata['tradetiming'],
            },
            {
              title: 'Short/Long',
              field: 'shortorlong',
              lookup: { 0: 'Short', 1: 'Long' },
              hidden:!columndata['shortorlong'],
            },
            {
              title: 'TradeTimeframe',
              field: 'tradetimeframe',
              lookup: { 0: 'Intra day', 1: 'Swing', 2:'Position' },
              hidden:!columndata['tradetimeframe'],
            },
            { title: '52WeeksHigh', field: 'yearhigh',editable: 'never', type: 'numeric', searchable:false ,hidden:!columndata['yearhigh']},
            { title: 'CurrentStockPrice', field: 'currentstockprice',editable: 'never', type: 'numeric', searchable:false ,hidden:!columndata['currentprice']},
            { title: 'Change(%)', field: 'currentchange', type: 'numeric',editable: 'never', searchable:false,hidden:!columndata['currentchange']},
            { title: 'EntryPrice', field: 'entryprice', type: 'numeric' , searchable:false,hidden:!columndata['entryprice']},
            { title: 'Change', field: 'entrychange', type: 'numeric',editable: 'never', searchable:false,hidden:!columndata['entrychange']},
            { title: 'StopLoss', field: 'stoploss', type: 'numeric' , searchable:false,hidden:!columndata['stoploss']},
            { title: 'Change(%)', field: 'stopchange', type: 'numeric' , editable: 'never',searchable:false,hidden:!columndata['stoplosschange']},
            { title: 'ExitPrice', field: 'exitprice', type: 'numeric' , searchable:false,hidden:!columndata['exitprice']},
            { title: 'EarningReportDate', field:'earningdate', type:'date', editable:'never', searchable:false,hidden:!columndata['earningdate'],
              cellStyle: (index, rowdata) =>{
                let bufIndex = [];
                for (var i = 0; i < alertList.length; i++)
                {
                  if (rowdata.symbol == alertList[i]){
                    return ({backgroundColor: "#ffcdd2"});
                  }
                }
              }
              // cellStyle:{
              //   backgroundColor: '#039be5',
              // }
            },
            { title: 'AlertPrice', field: 'alertprice', type: 'numeric' , searchable:false,hidden:!columndata['alertprice'],
              cellStyle: (index, rowdata) =>{
                let bufIndex = [];
                for (var i = 0; i < earningList.length; i++)
                {
                  if (rowdata.symbol == earningList[i]){
                    return ({backgroundColor: "#ffcdd2"});
                  }
                }
              }          
            },
            { title: 'RewardInR', field: 'rewardprice', type: 'numeric',  editable: 'never', searchable:false ,hidden:!columndata['rewardinR']},
            { title: 'InitialPrice', field: 'addedprice', type: 'numeric',  editable: 'never', searchable:false ,hidden:!columndata['addedprice']},
            { title: 'Change(%)', field: 'addedpricechange', type: 'numeric',  editable: 'never', searchable:false ,hidden:!columndata['addedpricechange']},
            { title: 'Date Added', field: 'dateadded', type: 'numeric',  editable: 'never', searchable:false ,hidden:!columndata['dateadded']},
            { title: 'Comment', field: 'comment', searchable:false, type:'string', hidden:!columndata['comment'],
              editComponent: props => (
                <TextField
                id="standard-multiline-static"
                multiline
                value={props.value}
                rows={6}
                onChange={(e)=>{
                  if (e.target.value.length < 100)
                  {
                    props.onChange(e.target.value);
                  }
                }}
              />              
              )
            },
          ];
      }, [columndata])

      React.useEffect(() => {
        if (!userName.length || !userEmail.length) return;
        let payload = {
          "username": userName,
          "useremail" : userEmail,
        }
        getwatchlisttemplate(payload).then(ret=>{
          if (ret['data'].result == 'ok')
          {
            setColumnData(ret['data']['data']);
              getWatchlist(payload).then( ret=>{
                console.log('getwachlist return', ret);
                setState(ret.data.data.map(item=>{
                  if (item.earningdate != ""){
                    item.earningdate = new Date(item.earningdate);
                    if (item.earningflag == true)
                    {
                      alertList.push(item.symbol);
                    }
                  }
                  return item;  
                }))
                if (first == true)
                {
                  setSymbol(()=>{
                    let symboldata = [...symbol];
                    ret.data.data.map(item=>{
                      symboldata.push(item.symbol);
                    })
                    return symboldata;
                  })
                }
                else{
                  setSymbol(()=>{
                    let symboldata = [...symbol];
                    return symboldata;
                  })
                }
              }, err => {
              });  
          }
          if (ret['data'].result == 'failed db')
          {
            changeDashboardType({dashboard_type:2})
          }
        }, err=>{

        });


      }, [userName, userEmail,status])
      
    return (

            <MaterialTable style={{width:'95%', height:'80%', position:'relative', margin:'1% 2% 2%', backgroundColor:'#F4F6F8'}}
            title="Watchlist for stock market"
            columns={getColumns()}
            //data={getListData()}  
            data={state}
            isLoading={loading}
            options={{
              paging:false,
              // rowStyle: (data, index) =>{
              //   let bufIndex = [];
              //   alertList.map(item=>{
              //     if (item == data.symbol)
              //     {
              //       bufIndex.push(index);
              //     }
              //   })
              //   for (let i in range(0, bufIndex.length))
              //   {
              //     if (index == bufIndex[i])
              //     {
              //       return { backgroundColor: "#ffcdd2" }
              //     }  
              //   }
              // }

            }}
            detailPanel={rowData => {
                return (
                    <div height="80%" width="100%" style={{marginLeft:"20px", marginRight:"20px", marginBottom:"10px", display:"flex"}}>
                        <TradingViewWidget/>
                    </div>
                    )
              }}
              actions={[
                {
                  icon: CheckBoxIcon,
                  tooltip: 'Set private/public',
                  onClick: (event, rowData) => {
                    let payload = {
                      "username": userName,
                      "useremail": userEmail,
                      "symbol": rowData['symbol'],
                    }
              
                    changeViewStatus(payload).then( ret=>{
                      if (ret['data'].result == 'ok'){
                        console.log("aa");
                      }
                      else if (ret['data'].result == 'fail')
                      {
                        alert(ret['data'].message);
                      }
                      else{
                        alert(ret['data'].error);
                      }
                    }, err => {
                      alert(err.error);
                    });    
                    return   (
                      <div>
                        <br />
                        <Alert>aaa</Alert>
                        {/* <SnackbarContent  message={'SUCCESS - This is a regular notification made with color="success"'} close color="success" icon={AddAlert}/> */}
                      </div>  
                    )                          
                  }
                }
              ]}
              onRowClick={(event, rowData, togglePanel) =>{
              console.log("selected symbol", rowData['symbol']);
              setSymbolName(rowData['symbol']);
              togglePanel();
            }}
            onInputChange={(event, rowData) => console.log(rowData)}
            editable={{
                    onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      var bufsymbol;
                        resolve();
                        setFirst(false);
                        setState((prevState) => {
                          setLoading(true);
                            console.log("prevdata", prevState);
                            const datas = [...prevState];
                            if (newData['entryprice']==undefined)
                            {
                              newData['entryprice'] = 0;
                            }
                            if (newData['entrychange']==undefined)
                            {
                              newData['entrychange'] = 0;
                            }
                            if (newData['stoploss']==undefined)
                            {
                              newData['stoploss'] = 0;
                            }
                            if (newData['exitprice']==undefined)
                            {
                              newData['exitprice'] = 0;
                            }
                            if (newData['currentstockprice']==undefined)
                            {
                              newData['currentstockprice'] = 0;
                            }
                            if (newData['currentchange']==undefined)
                            {
                              newData['currentchange'] = 0;
                            }
                            if (newData['addedprice']==undefined)
                            {
                              newData['addedprice'] = 0;
                            }
                            if (newData['comment']==undefined)
                            {
                              newData['comment'] = "";
                            }
                            if (newData['earningdate'] == undefined)
                            {
                              newData['earningdate'] = "";
                            }
                            let today = new Date();
                            let dd = String(today.getDate()).padStart(2, '0');
                            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            let yyyy = today.getFullYear();

                            today = mm + '/' + dd + '/' + yyyy;
                            newData['dateadded'] = today;
                            if (newData['exitprice'] != 0 && newData['stoploss'] !=0 && newData['entryprice']!=0){
                              newData['rewardprice'] =(parseFloat(newData['exitprice']) - parseFloat(newData['entryprice'])) / (parseFloat(newData['entryprice']) - parseFloat(newData['stoploss'])) ;
                              newData['rewardprice'] = newData['rewardprice'].toString().substring(0,4);
                            }
                            else{
                              newData['rewardprice'] = 0;
                            }
                            while(sectorvalue == "")
                            {
                              return;
                            }
                            newData['sector'] = sectorvalue;
                            console.log("new data", newData);
                            if (newData['symbol'] == undefined)
                            {
                              alert("No symbol. Please select the symbol...");
                            }
                            else{
                              datas.push(newData);

                                let payload = {
                                  "username": userName,
                                  "useremail": userEmail,
                                  "symbol": newData['symbol'],
                                  "sector": newData['sector'],
                                  "tradetiming": newData['tradetiming'],
                                  "shortorlong": newData['shortorlong'],
                                  "tradetimeframe": newData['tradetimeframe'],
                                  "entryprice": newData['entryprice'],
                                  "stoploss": newData['stoploss'],
                                  "exitprice": newData['exitprice'],
                                  "alertprice": newData['alertprice'],
                                  "rewardprice": newData['rewardprice'],
                                  "dateadded" : newData['dateadded'],
                                  "comment" : newData['comment']
                                }
                            
                                saveWatchlist(payload).then( ret=>{
                                  if (ret['data'].result == 'ok'){
                                    bufsymbol = newData['symbol'];
                                    setSymbol(()=>{
                                      let symboldata = [...symbol];
                                      symboldata.push(bufsymbol);
                                      return symboldata;
                                    });                        
                                    setStatus(()=>{
                                      return !status;
                                    });
                                    setLoading(false);
                                    return  datas;
                                  }
                                  else if(ret['data'].result == 'fail'){
                                    alert(ret['data'].message);
                                  }
                                  else {
                                    alert(ret['data'].error);
                                  }
                                }, err => {
                                  alert(err.error);
                                });                                
                            }
                        });
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        resolve();
                        if (oldData) {
                            setState((prevState) => {
                            const data = [...prevState];
                            data[data.indexOf(oldData)] = newData;
                            console.log(oldData);
                            console.log(newData);
                            if (newData['exitprice'] != 0 && newData['stoploss'] !=0 && newData['entryprice']!=0){
                              newData['rewardprice'] =(parseFloat(newData['exitprice']) - parseFloat(newData['entryprice'])) / (parseFloat(newData['entryprice']) - parseFloat(newData['stoploss'])) ;
                              newData['rewardprice'] = newData['rewardprice'].toString().substring(0,4);
                            }
                            else{
                              newData['rewardprice'] = 0;
                            }
                            let payload = {
                              "username": userName,
                              "useremail": userEmail,
                              "symbol": newData['symbol'],
                              "sector": newData['sector'],
                              "tradetiming": newData['tradetiming'],
                              "shortorlong": newData['shortorlong'],
                              "tradetimeframe": newData['tradetimeframe'],
                              "entryprice": newData['entryprice'],
                              "stoploss": newData['stoploss'],
                              "exitprice": newData['exitprice'],
                              "alertprice": newData['alertprice'],
                              "rewardprice": newData['rewardprice'],
                              "comment" : newData['comment'],
                              "earningdate" : newData['earningdate']
                            }
                        
                            updateWatchlist(payload).then( ret=>{
                              if (ret['data'].result == 'ok'){
                                console.log(ret['data']);
                                setAlert("none", newData['symbol']);
                                setStatus(!status);
                              }
                              else if(ret['data'].result == 'fail'){
                                alert(ret['data'].message);
                              }
                              else {
                                alert(ret['data'].error);
                              }
                            }, err => {
                              alert(err.error);
                            });                                
                            return data;
                            });
                        }
                        else{
                            return "error";
                        }
//                        setTimer(true);
                    }),
                    onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        resolve();
                        setFirst(false);
                        setState((prevState) => {
                            const datas = [...prevState];                            
                            datas.splice(data.indexOf(oldData), 1);
                            let payload = {
                              "username": userName,
                              "useremail": userEmail,
                              "symbol": oldData['symbol']
                            }
                        
                            deleteWatchlist(payload).then( ret=>{
                              if (ret['data'].result == 'ok'){
                                setStatus(()=>{
                                  return !status;
                                });
                                setSymbol(()=>{
                                  let symboldata = [...symbol]
                                  symboldata.pop();
                                  return symboldata;
                                });
                                return datas ;
                              }
                              else if(ret['data'].result == 'fail'){
                                alert(ret['data'].message);
                              }
                              else {
                                alert(ret['data'].error);
                              }
                            }, err => {
                              alert(err.error);
                            });                                
//                            return data;
                        });
                      }),
                }}
            />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPageWidget);