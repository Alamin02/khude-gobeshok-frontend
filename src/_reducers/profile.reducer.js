import { profileConstants } from "../_constants";

const initialState = {
    projectList: [],
    profileDetails: {},
    educationList: []
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
        case profileConstants.PROFILE_GET_EDUCATION_LIST_SUCCESS:
            return Object.assign({}, state, {
                educationList: action.educationList,
            });
        case profileConstants.PROFILE_ADD_EDUCATION_SUCCESS:
            return Object.assign({}, state, {
                educationList: [...state.educationList, action.education],
            });
        default:
            return state;
    }
}