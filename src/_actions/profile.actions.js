import { profileConstants } from '../_constants'
import { profileService } from '../_services'

export const profileActions = {
    getProjects,
    getDetails,
    updateDetails,
};

function getDetails(username) {
    return dispatch => {
        profileService.profileDetails(username)
            .then(
                profileDetails => {
                    dispatch(success(profileDetails));
                }
            )
    }

    function request() { return { type: profileConstants.PROFILE_DETAILS_REQUEST } }
    function success(profileDetails) { return { type: profileConstants.PROFILE_DETAILS_SUCCESS, profileDetails } }
    function failure(error) { return { type: profileConstants.PROFILE_DETAILS_FAILURE, error } }
}

function updateDetails(username, updatedProfileData) {
    return dispatch => {
        profileService.updateProfileDetails(username, updatedProfileData)
            .then(
                profileDetails => {
                    dispatch(success(profileDetails));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }
    function request(updatedProfileData) { return { type: profileConstants.PROFILE_DETAILS_UPDATE_REQUEST, updatedProfileData } }
    function success(profileDetails) { return { type: profileConstants.PROFILE_DETAILS_UPDATE_SUCCESS, profileDetails } }
    function failure(error) { return { type: profileConstants.PROFILE_DETAILS_UPDATE_FAILURE, error } }
}

function getProjects(username) {
    return dispatch => {
        profileService.listProjects(username)
            .then(
                projectList => {
                    dispatch(success(projectList));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }

    function request() { return { type: profileConstants.PROFILE_PROJECT_LIST_REQUEST } }
    function success(projectList) { return { type: profileConstants.PROFILE_PROJECT_LIST_SUCCESS, projectList } }
    function failure(error) { return { type: profileConstants.PROFILE_PROJECT_LIST_FAILURE, error } }
}