const initState = {
    username: "",
    useremail : "",
    userimage : "",
    alertflag : "none",
    alertsymbol : "",
    token :"",
};

const user = (state={...initState}, action) => {
    console.log("userstateaction",state)
    console.log("useraction", action)
    switch(action.type){
        case 'USER_NAME':
            console.log("afterstate", state, action.payload)
            return {
                ...state,
                username: action.payload.username,
                useremail : action.payload.useremail,
                userimage : action.payload.userimage,
            }
        case 'SET_ALERT':
            console.log("ALERT",action.payload)
            return {
                ...state,
                alertflag: action.payload.alertflag,
                alertsymbol : action.payload.alertsymbol,
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        default:
            return {...state};
    }
}

export default user;