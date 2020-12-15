import { SIDEMENU_RIGHT_OPEN, SIDEMENU_LEFT_OPEN, DASHBOARD_TYPE, CURRENT_PAGE_TYPE, USER_NAME, SET_SYMBOL, SET_ALERT,SET_TOKEN, SET_INTERVAL } from "../constants/action-types";

export function openRightSideMenu(payload){    
    return { type: SIDEMENU_RIGHT_OPEN, payload }
}
export function openLeftSideMenu(payload){    
    return { type: SIDEMENU_LEFT_OPEN, payload }
}

export function changeDashboardType(payload){    
    return { type: DASHBOARD_TYPE, payload }
}

export function setPageType(payload){    
    return { type: CURRENT_PAGE_TYPE, payload }
}

export const setUserName = (username, useremail, userimage) =>({
    type: USER_NAME, 
    payload: {
        username, 
        useremail,
        userimage,
    }
})

export const setUserToken = payload =>({
    type: SET_TOKEN,
    payload,
})

export const setSymbolName = payload =>({
    type: SET_SYMBOL,
    payload,
})

export const setAlert = (alertflag, alertsymbol) =>({
    type: SET_ALERT,
    payload:{
        alertflag,
        alertsymbol,
    }
})

export const setIntervaltime = payload =>({
    type: SET_INTERVAL,
    payload
})

