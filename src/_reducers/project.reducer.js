import { projectConstants } from '../_constants'

export function project(state = { project_list: [], project_loaded: false, project: {} }, action) {
    switch (action.type) {
        case projectConstants.PROJECT_LIST_SUCCESS:
            return Object.assign({}, state, {
                project_list: action.project_list,
            });
        case projectConstants.PROJECT_RETRIEVE_SUCCESS:
            return Object.assign({}, state, {
                project: action.project,
                project_loaded: true,
            });
        default:
            return state;
    }

}