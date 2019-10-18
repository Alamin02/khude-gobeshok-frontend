import { messageConstants, userConstants } from "../_constants";

const initialState = {
    conversations: [],
    conversationCount: 1,
    directMessages: [],
    directMessagesCount: 1,
}

export function message(state = initialState, action) {
    switch (action.type) {
        case messageConstants.MESSAGE_GET_CONVERSAIONS_SUCCESS:
            return Object.assign({}, state, {
                conversations: action.conversations.results,
                conversationCount: action.conversations.count
            });
        case messageConstants.MESSAGE_RESET_DIRECT_MESSAGE:
            return Object.assign({}, state, {
                directMessages: [],
                directMessagesCount: 1,
            });
        case messageConstants.MESSAGE_GET_DIRECT_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                directMessages: [...state.directMessages, ...action.directMessages.results,],
                directMessagesCount: action.directMessages.count,
            });

        // TODO - simplyfy the reducer
        case messageConstants.MESSAGE_SEND_DIRECT_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                directMessages: [action.message, ...state.directMessages,],
                conversations: [action.message, ...state.conversations.filter(conversation => {
                    let filtered = (
                        (conversation.recipient === action.message.recipient && conversation.sender === action.message.sender)
                        || (conversation.sender === action.message.recipient && conversation.recipient === action.message.sender)
                    )
                    return (!filtered);
                })]
            });
        case userConstants.LOGOUT:
            return state = initialState;
        default:
            return state;
    }
}