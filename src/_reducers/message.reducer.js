import { messageConstants } from "../_constants";

const initialState = {
    conversations: []
}

export function message(state = initialState, action) {
    switch (action.type) {
        case messageConstants.MESSAGE_GET_CONVERSAIONS_SUCCESS:
            return Object.assign({}, state, {
                conversations: action.conversations.results,
            });

        default:
            return state;
    }
}