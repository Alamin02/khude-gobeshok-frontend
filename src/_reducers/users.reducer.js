import { userConstants } from '../_constants';

let username = JSON.parse(localStorage.getItem('username'));
const initialState = username ? { username } : {};

export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                username: action.user.username,
            }
        case userConstants.REGISTER_SUCCESS:
            return {
                username: action.user.username,
            }
        default:
            return state
    }
}