import { USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGIN_REQUEST,USER_REGISTER_FAIL, USER_LOGIN_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants'
//reducer lof
export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
        return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL: 
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
        }
}

//reducer reg
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
        return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL: 
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
        }
}