import { editorConstants } from "../_constants";

export function editor(state = {}, action) {
    switch (action.type) {
        case editorConstants.EDITOR_INIT:
            return {
                title: "",
                startDate: new Date(),
                endDate: new Date(),
                author: action.author,
            };
        case editorConstants.EDITOR_TITLE_CHANGE:
            return Object.assign({}, state, {
                title: action.title
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
                thumbnail: action.thumbnail,
            });
        default:
            return state;
    }
}
