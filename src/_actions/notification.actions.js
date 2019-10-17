import { notificationConstants } from "../_constants";
import { notificationService } from "../_services";

export const notificationActions = {
    getNotifications,
}

function getNotifications(pageNumber) {
    return dispatch => {
        dispatch(request());
        if (pageNumber === 1) {
            dispatch(reset());
        }
        notificationService.getNotifications(pageNumber)
            .then(
                notifications => {
                    dispatch(success(notifications));
                },
                error => dispatch(failure(error))
            );
    }

    function request() { return { type: notificationConstants.NOTIFICATION_GET_NOTIFICATIONS_REQUEST } }
    function reset() { return { type: notificationConstants.NOTIFICATION_RESET } }
    function success(notifications) { return { type: notificationConstants.NOTIFICATION_GET_NOTIFICATIONS_SUCCESS, notifications } }
    function failure(error) { return { type: notificationConstants.NOTIFICATION_GET_NOTIFICATIONS_FAILURE, error } }
}
