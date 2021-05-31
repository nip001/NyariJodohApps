import { combineReducers } from "redux"

const stateUser = {
    dataUser:{},
    isLogin:false,
}

function LoginReducer(state=stateUser,action){
    if(action.type === 'SET_LOGIN'){
        return({
            ...state,
            [action.inputType]:action.inputValue
        })
    }
    return state
}

const Reducer = combineReducers({
    LoginReducer,
})

export default Reducer