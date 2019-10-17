import { editorConstants, projectConstants, userConstants } from "../_constants";

const initialState = {
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    author: "",
    teammates: "",
    tags: "",
    coverImage: {},
}

export function editor(state = initialState, action) {
    switch (action.type) {
        case editorConstants.EDITOR_INIT:
            return Object.assign({}, state, {
                author: action.author
            });
        case editorConstants.EDITOR_START_DATE_CHANGE:
            return Object.assign({}, state, {
                startDate: action.date,
            });
        case editorConstants.EDITOR_END_DATE_CHANGE:
            return Object.assign({}, state, {
                endDate: action.date,
            });
        case editorConstants.EDITOR_DESCRIPTION_CHANGE:
            return Object.assign({}, state, {
                description: action.editable,
            });
        case editorConstants.EDITOR_THUMBNAIL_CHANGE:
            return Object.assign({}, state, {
                coverImage: action.image,
            });
        case editorConstants.EDITOR_META_DATA_CHANGE:
            return Object.assign({}, state, {
                teammates: action.metadata.teammates,
                title: action.metadata.title,
                tags: action.metadata.tags,
            });
        case projectConstants.PROJECT_CREATE_SUCCESS:
        case userConstants.LOGOUT:
            return state = initialState;
        default:
            return state;
    }
}
