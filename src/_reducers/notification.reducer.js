import { notificationConstants, userConstants } from "../_constants";

const initialState = {
    notifications: [],
    notificationCount: 1
}

export function notification(state = initialState, action) {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_GET_NOTIFICATIONS_SUCCESS:
            return Object.assign({}, state, {
                notifications: [...state.notifications, ...action.notifications.results],
                notificationCount: action.notifications.count,
            });
        case notificationConstants.NOTIFICATION_RESET:
            return state = initialState;
        case userConstants.LOGOUT:
            return state = initialState;
        default:
            return state;
    }
}
