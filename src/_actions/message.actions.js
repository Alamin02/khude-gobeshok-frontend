import { messageConstants } from "../_constants";
import { messageService } from "../_services";

export const messageActions = {
    getConversations,
    getDirectMessages,
}

function getConversations() {
    return dispatch => {
        dispatch(request);
        messageService.getConversations()
            .then(
                conversations => dispatch(success(conversations)),
                error => dispatch(failure(error)),
            )
    }

    function request() { return { type: messageConstants.MESSAGE_GET_CONVERSAIONS_REQUEST } }
    function success(conversations) { return { type: messageConstants.MESSAGE_GET_CONVERSAIONS_SUCCESS, conversations } }
    function failure(error) { return { type: messageConstants.MESSAGE_GET_CONVERSATIONS_FAILURE, error } }
}

function getDirectMessages(username) {
    return dispatch => {
        dispatch(request);
        messageService.getDirectMessages(username)
            .then(
                directMessages => dispatch(success(directMessages)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: messageConstants.MESSAGE_GET_DIRECT_MESSAGES_REQUEST } }
    function success(directMessages) { return { type: messageConstants.MESSAGE_GET_DIRECT_MESSAGES_SUCCESS, directMessages } }
    function failure(error) { return { type: messageConstants.MESSAGE_GET_DIRECT_MESSAGES_FAILURE, error } }
}