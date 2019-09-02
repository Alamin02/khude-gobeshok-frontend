import { userConstants } from '../_constants';

let authToken = JSON.parse(localStorage.getItem('authToken'));
const initialState = authToken ? { loggedIn: true, } : { loggedIn: false };

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                loggedIn: true
            }
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                error: action.error
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
