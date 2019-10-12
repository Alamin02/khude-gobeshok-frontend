import { profileConstants } from "../_constants";

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
        case profileConstants.PROFILE_PROJECT_LIST_SUCCESS:
            return Object.assign({}, state, {
                projectList: action.projectList.results,
                projectCount: action.projectList.count,
            });
        case profileConstants.PROFILE_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                profileUserDetails: action.profileUserDetails,
            });
        case profileConstants.PROFILE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                profileDetails: action.profileDetails,
            });
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
                profileDetails: { ...state.profileDetails, profile_picture: action.updatedProfilePic.profile_picture },
            });
        case profileConstants.PROFILE_GET_EDUCATION_LIST_SUCCESS:
            console.log(action.educationList);
            return Object.assign({}, state, {
                educationList: action.educationList.results,
            });
        case profileConstants.PROFILE_ADD_EDUCATION_SUCCESS:
            console.log(state.educationList);
            return Object.assign({}, state, {
                educationList: [...state.educationList, action.education],
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
        default:
            return state;
    }
}