const initState = {
    symbolname: "",
    intervalname:""
};

const chart = (state={...initState}, action) => {
    console.log("userstateaction",state)
    console.log("useraction", action)
    switch(action.type){
        case 'SET_SYMBOL':
            console.log("afterstate", state, action.payload)
            return {
                ...state,
                symbolname: action.payload,
            }
        case 'SET_INTERVAL':
            return {
                ...state,
                intervalname : action.payload,
            }
        default:
            return {...state};
    }
}

export default chart;