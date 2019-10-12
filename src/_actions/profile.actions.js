import { toast } from 'react-semantic-toasts';

import { profileConstants } from '../_constants';
import { profileService } from '../_services';

export const profileActions = {
    setCurrentProfileName,
    getProjects,
    getDetails,
    getUserDetails,
    updateDetails,
    updateBio,
    updateSpecializedIn,
    updateSoftwareSkill,
    updatePropic,
    getEducationList,
    addEducation,
    deleteEducation,
    getJobList,
    addJob,
    deleteJob,
};

function setCurrentProfileName(username) {
    return dispatch => dispatch({ type: profileConstants.PROFILE_SET_USERNAME, username });
}

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

function getUserDetails(username) {
    return dispatch => {
        profileService.profileUserDetails(username)
            .then(
                profileUserDetails => {
                    dispatch(success(profileUserDetails));
                }
            )
    }

    function request() { return { type: profileConstants.PROFILE_USER_DETAILS_REQUEST } }
    function success(profileUserDetails) { return { type: profileConstants.PROFILE_USER_DETAILS_SUCCESS, profileUserDetails } }
    function failure(error) { return { type: profileConstants.PROFILE_USER_DETAILS_FAILURE, error } }
}


function updateDetails(username, updatedProfileData) {
    return dispatch => {
        profileService.updateProfileDetails(username, updatedProfileData)
            .then(
                profileDetails => {
                    dispatch(success(profileDetails));
                    toast({
                        type: 'succcess',
                        icon: 'like',
                        title: 'Profile Updated!',
                        description: 'Your profile is now updated!',
                        animation: 'bounce',
                        time: 5000
                    })
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

function updateBio(bio) {
    return dispatch => {
        profileService.updateProfileBio(bio)
            .then(
                updatedBio => dispatch(success(updatedBio)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: profileConstants.PROFILE_BIO_UPDATE_REQUEST, } }
    function success(updatedBio) { return { type: profileConstants.PROFILE_BIO_UPDATE_SUCCESS, updatedBio } }
    function failure(error) { return { type: profileConstants.PROFILE_BIO_UPDATE_FAILURE, error } }
}

function updateSpecializedIn(username, specializedIn) {
    return dispatch => {
        profileService.updateSpecializedIn(username, specializedIn)
            .then(
                updatedSpecializedIn => dispatch(success(updatedSpecializedIn)),
                error => dispatch(failure(error)),
            )
    }

    function request() { return { type: profileConstants.PROFILE_SPECIALIZED_IN_UPDATE_REQUEST, } }
    function success(updatedSpecializedIn) { return { type: profileConstants.PROFILE_SPECIALIZED_IN_UPDATE_SUCCESS, updatedSpecializedIn } }
    function failure(error) { return { type: profileConstants.PROFILE_SPECIALIZED_IN_UPDATE_FAILURE, error } }
}

function updateSoftwareSkill(username, softwareSkill) {
    return dispatch => {
        profileService.updateSoftwareSkill(username, softwareSkill)
            .then(
                updatedSoftwareSkill => dispatch(success(updatedSoftwareSkill)),
                error => dispatch(failure(error)),
            )
    }

    function request() { return { type: profileConstants.PROFILE_SOFTWARE_SKILL_UPDATE_REQUEST, } }
    function success(updatedSoftwareSkill) { return { type: profileConstants.PROFILE_SOFTWARE_SKILL_UPDATE_SUCCESS, updatedSoftwareSkill } }
    function failure(error) { return { type: profileConstants.PROFILE_SOFTWARE_SKILL_UPDATE_FAILURE, error } }
}


function updatePropic(propicId) {
    return dispatch => {
        profileService.updateProfilePic(propicId)
            .then(
                updatedProfilePic => dispatch(success(updatedProfilePic)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: profileConstants.PROFILE_PIC_UPDATE_REQUEST, } }
    function success(updatedProfilePic) { return { type: profileConstants.PROFILE_PIC_UPDATE_SUCCESS, updatedProfilePic } }
    function failure(error) { return { type: profileConstants.PROFILE_PIC_UPDATE_FAILURE, error } }
}

function getEducationList(username) {
    return dispatch => {
        profileService.getEducationList(username)
            .then(
                educationList => {
                    dispatch(success(educationList));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: profileConstants.PROFILE_GET_EDUCATION_LIST_REQUEST, } }
    function success(educationList) { return { type: profileConstants.PROFILE_GET_EDUCATION_LIST_SUCCESS, educationList } }
    function failure(error) { return { type: profileConstants.PROFILE_GET_EDUCATION_LIST_FAILURE, error } }
}

function addEducation(education) {

    return dispatch => {
        profileService.addEducation(education)
            .then(
                education => {
                    dispatch(success(education));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function request() { return { type: profileConstants.PROFILE_ADD_EDUCATION_REQUEST, } }
    function success(education) { return { type: profileConstants.PROFILE_ADD_EDUCATION_SUCCESS, education } }
    function failure(error) { return { type: profileConstants.PROFILE_ADD_EDUCATION_FAILURE, error } }
}

function deleteEducation(id) {
    return dispatch => {
        profileService.deleteEducation(id)
            .then(
                deleted => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }

    function request() { return { type: profileConstants.PROFILE_DELETE_EDUCATION_REQUEST, } }
    function success(id) { return { type: profileConstants.PROFILE_DELETE_EDUCATION_SUCCESS, id } }
    function failure(error) { return { type: profileConstants.PROFILE_DELETE_EDUCATION_FAILURE, error } }
}


function getJobList(username) {
    return dispatch => {
        profileService.getJobList(username)
            .then(
                jobList => {
                    dispatch(success(jobList));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }

    function request() { return { type: profileConstants.PROFILE_GET_JOB_LIST_REQUEST, } }
    function success(jobList) { return { type: profileConstants.PROFILE_GET_JOB_LIST_SUCCESS, jobList } }
    function failure(error) { return { type: profileConstants.PROFILE_GET_JOB_LIST_FAILURE, error } }

}

function addJob(job) {

    return dispatch => {
        profileService.addJob(job)
            .then(
                job => {
                    dispatch(success(job));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function request() { return { type: profileConstants.PROFILE_ADD_JOB_REQUEST, } }
    function success(job) { return { type: profileConstants.PROFILE_ADD_JOB_SUCCESS, job } }
    function failure(error) { return { type: profileConstants.PROFILE_ADD_JOB_FAILURE, error } }
}

function deleteJob(id) {
    return dispatch => {
        profileService.deleteJob(id)
            .then(
                deleted => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }

    function request() { return { type: profileConstants.PROFILE_DELETE_JOB_REQUEST, } }
    function success(id) { return { type: profileConstants.PROFILE_DELETE_JOB_SUCCESS, id } }
    function failure(error) { return { type: profileConstants.PROFILE_DELETE_JOB_FAILURE, error } }

}

function getProjects(username, pageNumber) {
    return dispatch => {
        profileService.listProjects(username, pageNumber)
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