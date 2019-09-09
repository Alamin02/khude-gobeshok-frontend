import { profileConstants } from "../_constants";

const initialState = {
    projectList: [],
    profileDetails: {},
    educationList: [],
    jobList: [],
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
            console.log(action.educationList);
            return Object.assign({}, state, {
                educationList: action.educationList,
            });
        case profileConstants.PROFILE_ADD_EDUCATION_SUCCESS:
            console.log(state.educationList);
            return Object.assign({}, state, {
                educationList: [...state.educationList, action.education],
            });
        case profileConstants.PROFILE_GET_JOB_LIST_SUCCESS:
            return Object.assign({}, state, {
                jobList: action.jobList,
            });
        case profileConstants.PROFILE_ADD_JOB_SUCCESS:
            return Object.assign({}, state, {
                jobList: [...state.jobList, action.job],
            });
        case profileConstants.PROFILE_DELETE_EDUCATION_SUCCESS:
            return Object.assign({}, state, {
                educationList: state.educationList.filter((education) => {
                    return education.id !== action.id;
                }),
            });
        case profileConstants.PROFILE_DELETE_JOB_SUCCESS:
            return Object.assign({}, state, {
                jobList: state.jobList.filter((job) => {
                    return job.id !== action.id;
                }),
            });
        default:
            return state;
    }
}