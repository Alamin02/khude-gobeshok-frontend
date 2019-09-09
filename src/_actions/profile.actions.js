import { toast } from 'react-semantic-toasts';

import { profileConstants } from '../_constants'
import { profileService } from '../_services'

export const profileActions = {
    getProjects,
    getDetails,
    updateDetails,
    getEducationList,
    addEducation,
    deleteEducation,
    getJobList,
    addJob,
    deleteJob,
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
            )
    }

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