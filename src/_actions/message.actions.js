import { messageConstants } from "../_constants";
import { messageService } from "../_services";

export const messageActions = {
    getConversations,
    getDirectMessages,
    sendDirectMessage,
}

function getConversations(pageNumber) {
    return dispatch => {
        dispatch(request());
        messageService.getConversations(pageNumber)
            .then(
                conversations => dispatch(success(conversations)),
                error => dispatch(failure(error)),
            )
    }

    function request() { return { type: messageConstants.MESSAGE_GET_CONVERSAIONS_REQUEST } }
    function success(conversations) { return { type: messageConstants.MESSAGE_GET_CONVERSAIONS_SUCCESS, conversations } }
    function failure(error) { return { type: messageConstants.MESSAGE_GET_CONVERSATIONS_FAILURE, error } }
}

function getDirectMessages(username, pageNumber) {
    return dispatch => {
        dispatch(request());
        if (pageNumber === 1)
            dispatch(reset());

        messageService.getDirectMessages(username, pageNumber)
            .then(
                directMessages => dispatch(success(directMessages)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: messageConstants.MESSAGE_GET_DIRECT_MESSAGES_REQUEST } }
    function reset() { return { type: messageConstants.MESSAGE_RESET_DIRECT_MESSAGE } }
    function success(directMessages) { return { type: messageConstants.MESSAGE_GET_DIRECT_MESSAGES_SUCCESS, directMessages } }
    function failure(error) { return { type: messageConstants.MESSAGE_GET_DIRECT_MESSAGES_FAILURE, error } }
}

function sendDirectMessage(message) {
    return dispatch => {
        dispatch(request());
        messageService.sendDirectMessage(message)
            .then(
                message => dispatch(success(message)),
                error => dispatch(failure(error))
            );
    }

    function request() { return { type: messageConstants.MESSAGE_SEND_DIRECT_MESSAGES_REQUEST } }
    function success(message) { return { type: messageConstants.MESSAGE_SEND_DIRECT_MESSAGES_SUCCESS, message } }
    function failure(error) { return { type: messageConstants.MESSAGE_SEND_DIRECT_MESSAGES_FAILURE, error } }
}