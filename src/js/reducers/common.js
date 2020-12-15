import { SIDEMENU_RIGHT_OPEN, SIDEMENU_LEFT_OPEN, DASHBOARD_TYPE, CURRENT_PAGE_TYPE } from "../constants/action-types";
const initialState = {
    open_sidemenu_right: 0,
    open_sidemenu_left: 0,
    dashboard_type: 0, // 0: markets, 1: strategies, 2: funds
    current_page: 0, // 0: dashboard
};
function common(state = initialState, action) {
  let mOpen_right = state.open_sidemenu_right;
  let mOpen_left = state.open_sidemenu_left;
  let dashboard_type = state.dashboard_type;
  let current_page = state.current_page;
  if (action.type == SIDEMENU_RIGHT_OPEN)
  {
    mOpen_right = action.payload.open_sidemenu_right;
  } 
  else if (action.type == SIDEMENU_LEFT_OPEN)
  {
    mOpen_left = action.payload.open_sidemenu_left;
  }
  else if (action.type == DASHBOARD_TYPE)
  {
    dashboard_type = action.payload.dashboard_type;    
  }
  else if (action.type == CURRENT_PAGE_TYPE)
  {
    current_page = action.payload.current_page;
  }
  return Object.assign({}, state, {
    open_sidemenu_right: mOpen_right,
    open_sidemenu_left: mOpen_left,
    dashboard_type: dashboard_type,
    current_page: current_page
    });
}
export default common;