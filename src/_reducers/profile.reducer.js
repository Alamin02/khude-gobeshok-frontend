import { profileConstants } from "../_constants";

const initialState = {
    projectList: []
}

export function profile(state = initialState, action) {
    switch (action.type) {
        case profileConstants.PROFILE_PROJECT_LIST_SUCCESS:
            return Object.assign({}, state, {
                projectList: action.projectList,
            });
        case profileConstants.PROFILE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: action.profileDetails,
            });
        case profileConstants.PROFILE_DETAILS_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: action.profileDetails,
            });
        default:
            return state;
    }
}