import { projectConstants } from '../_constants'
import { projectService } from '../_services'
import moment from 'moment';

export const projectActions = {
    create_project,
    get_project,
    get_project_list,
}

function create_project(project) {
    const new_project = {
        title: project.title,
        start_date: moment(project.startDate).format('YYYY-MM-DD'),
        end_date: moment(project.endDate).format('YYYY-MM-DD'),
        thumbnail: project.thumbnail,
        description: project.description,
    }

    return dispatch => {
        projectService.create(new_project)
            .then(
                project => {
                    console.log("SUCESS...!!!!");
                    console.log(project);
                },
                error => {
                    console.log("ERROR...!!!!");
                }
            )
    }

    function request(project) { return { type: projectConstants.PROJECT_CREATE_REQUEST, project } }
    function success(project) { return { type: projectConstants.PROJECT_CREATE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.PROJECT_CREATE_FAILURE, error } }
}

function get_project(project_id) {
    return dispatch => {
        projectService.retrieve(project_id)
            .then(
                project => {
                    dispatch(success(project));
                },
                error => {
                    console.log("ERROR...")
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
                    dispatch(failure());
                });
    }

    function request(project_list) { return { type: projectConstants.PROJECT_LIST_REQUEST, project_list } }
    function success(project_list) { return { type: projectConstants.PROJECT_LIST_SUCCESS, project_list } }
    function failure(error) { return { type: projectConstants.PROJECT_LIST_FAILURE, error } }
}
