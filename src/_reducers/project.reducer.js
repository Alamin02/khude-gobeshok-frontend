import { projectConstants } from '../_constants'

const initalState = {
    project_list: [],
    project_loaded: false,
    project: {},
    projectCount: 1,
    comments: [],
}

export function project(state = initalState, action) {
    switch (action.type) {
        case projectConstants.PROJECT_LIST_SUCCESS:
            return Object.assign({}, state, {
                project_list: action.project_list.results,
                projectCount: action.project_list.count,
                next: action.project_list.next,
                prev: action.project_list.previous,
            });
        case projectConstants.PROJECT_RETRIEVE_SUCCESS:
            return Object.assign({}, state, {
                project: action.project,
                project_loaded: true,
            });
        case projectConstants.PROJECT_GET_COMMENTS_SUCCESS:
            return Object.assign({}, state, {
                comments: action.comments.results,
            });
        case projectConstants.PROJECT_ADD_COMMENTS_SUCCESS:
            return Object.assign({}, state, {
                comments: [...state.comments, action.comment],
            });
        default:
            return state;
    }
}