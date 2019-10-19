import { profileConstants, userConstants } from "../_constants";

const initialProfileDetails = {
    full_name: '',
    bio: '',
    avatar: {},
    specialized_in: '',
    software_skills: '',
    phone_number: '',
    country: '',
    address: '',
}

const initialState = {
    projectList: [],
    projectCount: 1,
    profileDetails: initialProfileDetails,
    profileUserDetails: {},
    educationList: [],
    jobList: [],
}

export function profile(state = initialState, action) {
    switch (action.type) {
        // Make project list for a profile empty and then load new
        case profileConstants.PROFILE_PROJECT_LIST_REQUEST:
            return Object.assign({}, state, {
                projectList: [],
                projectCount: 1,
            });
        case profileConstants.PROFILE_PROJECT_LIST_SUCCESS:
            return Object.assign({}, state, {
                projectList: action.projectList.results,
                projectCount: action.projectList.count,
            });

        // Make user for a profile empty and then load new
        case profileConstants.PROFILE_USER_DETAILS_REQUEST:
            return Object.assign({}, state, {
                profileUserDetails: {},
            });
        case profileConstants.PROFILE_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                profileUserDetails: action.profileUserDetails,
            });
        case profileConstants.PROFILE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                profileDetails: initialProfileDetails,
            });
        case profileConstants.PROFILE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: action.profileDetails,
            });

        // Handle update in profile details
        case profileConstants.PROFILE_DETAILS_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: action.profileDetails,
            });
        case profileConstants.PROFILE_BIO_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: { ...state.profileDetails, bio: action.updatedBio.bio },
            });
        case profileConstants.PROFILE_SPECIALIZED_IN_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: { ...state.profileDetails, specialized_in: action.updatedSpecializedIn.specialized_in },
            });
        case profileConstants.PROFILE_SOFTWARE_SKILL_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: { ...state.profileDetails, software_skills: action.updatedSoftwareSkill.software_skills },
            });
        case profileConstants.PROFILE_PIC_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: { ...state.profileDetails, avatar: action.updatedProfilePic },
            });

        // Load and update education list
        case profileConstants.PROFILE_GET_EDUCATION_LIST_REQUEST:
            return Object.assign({}, state, {
                educationList: [],
            });
        case profileConstants.PROFILE_GET_EDUCATION_LIST_SUCCESS:
            return Object.assign({}, state, {
                educationList: action.educationList.results,
            });
        case profileConstants.PROFILE_ADD_EDUCATION_SUCCESS:
            return Object.assign({}, state, {
                educationList: [...state.educationList, action.education],
            });

        // Load and update job list
        case profileConstants.PROFILE_GET_JOB_LIST_REQUEST:
            return Object.assign({}, state, {
                jobList: [],
            });
        case profileConstants.PROFILE_GET_JOB_LIST_SUCCESS:
            return Object.assign({}, state, {
                jobList: action.jobList.results,
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
        case userConstants.LOGOUT:
            return state = initialState;
        default:
            return state;
    }
}