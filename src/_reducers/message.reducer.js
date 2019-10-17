import { messageConstants, userConstants } from "../_constants";

const initialState = {
    conversations: [],
    directMessages: [],
}

export function message(state = initialState, action) {
    switch (action.type) {
        case messageConstants.MESSAGE_GET_CONVERSAIONS_SUCCESS:
            return Object.assign({}, state, {
                conversations: action.conversations.results,
            });
        case messageConstants.MESSAGE_GET_DIRECT_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                directMessages: action.directMessages.results,
            });
        case messageConstants.MESSAGE_SEND_DIRECT_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                directMessages: [...state.directMessages, action.message],
            });
        case userConstants.LOGOUT:
            return state = initialState;
        default:
            return state;
    }
}