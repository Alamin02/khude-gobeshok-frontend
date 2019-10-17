import { notificationConstants, userConstants } from "../_constants";

const initialState = {
    notifications: [],
}

export function notification(state = initialState, action) {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_GET_NOTIFICATIONS_SUCCESS:
            return Object.assign({}, state, {
                notifications: action.notifications.results,
            });
        case userConstants.LOGOUT:
            return state = initialState;
        default:
            return state;
    }
}
