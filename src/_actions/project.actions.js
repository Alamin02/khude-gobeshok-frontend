import { projectConstants } from '../_constants'
import { projectService } from '../_services'
import moment from 'moment';

export const projectActions = {
    create_project,
    getProject,
    get_project_list,
    getComments,
}

function create_project(project) {
    const new_project = {
        author: project.author,
        title: project.title,
        tags: project.tags,
        teammates: project.teammates,
        start_date: moment(project.startDate).format('YYYY-MM-DD'),
        end_date: moment(project.endDate).format('YYYY-MM-DD'),
        thumbnail: project.thumbnail,
        description: project.description,
    }

    return dispatch => {
        projectService.create(new_project)
            .then(
                project => {
                    dispatch(success(project));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }

    function request(project) { return { type: projectConstants.PROJECT_CREATE_REQUEST, project } }
    function success(project) { return { type: projectConstants.PROJECT_CREATE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.PROJECT_CREATE_FAILURE, error } }
}

function getProject(project_id) {
    return dispatch => {
        projectService.retrieve(project_id)
            .then(
                project => {
                    dispatch(success(project));
                },
                error => {
                    dispatch(failure(error));
                });
    }
    function request(project) { return { type: projectConstants.PROJECT_RETRIEVE_REQUEST, project } }
    function success(project) { return { type: projectConstants.PROJECT_RETRIEVE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.PROJECT_RETRIEVE_FAILURE, error } }
}

function get_project_list(pageNumber) {
    return dispatch => {
        projectService.list(pageNumber)
            .then(
                project_list => {
                    dispatch(success(project_list));
                },
                error => {
                    dispatch(failure(error));
                });
    }

    function request(project_list) { return { type: projectConstants.PROJECT_LIST_REQUEST, project_list } }
    function success(project_list) { return { type: projectConstants.PROJECT_LIST_SUCCESS, project_list } }
    function failure(error) { return { type: projectConstants.PROJECT_LIST_FAILURE, error } }
}

function getComments(projectId) {
    return dispatch => {
        projectService.getComments(projectId)
            .then(
                comments => dispatch(success(comments)),
                error => dispatch(failure(error))
            );
    };

    function request(projectId) { return { type: projectConstants.PROJECT_GET_COMMENTS_REQUEST, projectId } }
    function success(comments) { return { type: projectConstants.PROJECT_GET_COMMENTS_SUCCESS, comments } }
    function failure(error) { return { type: projectConstants.PROJECT_GET_COMMENTS_FAILURE, error } }
}

function postComment(comment) {

}
