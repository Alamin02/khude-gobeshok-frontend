import { editorConstants } from "../_constants";

export function editor(state = {}, action) {
    switch (action.type) {
        case editorConstants.EDITOR_INIT:
            return {
                title: "",
                startDate: new Date(),
                endDate: new Date(),
                author: action.author,
                teammates: "",
                tags: "",
            };
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
        case editorConstants.EDITOR_META_DATA_CHANGE:
            return Object.assign({}, state, {
                teammates: action.metadata.teammates,
                title: action.metadata.title,
                tags: action.metadata.tags,
            });

        default:
            return state;
    }
}
