import { profileConstants } from '../_constants'
import { profileService } from '../_services'

export const profileActions = {
    getProjects,
};

function getProjects(username) {
    return dispatch => {
        profileService.listProjects(username)
            .then(
                projectList => {
                    dispatch(success(projectList));
                    console.log(projectList);
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