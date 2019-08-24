import { editorConstants } from "../_constants";

import { imageService } from "../_services";

export const editorActions = {
    init,
    title_change,
    start_date_change,
    end_date_change,
    thumbnail_change,
    editor_description_change,
}

function init() {
    return { type: editorConstants.EDITOR_INIT }
}

function title_change(title) {
    return { type: editorConstants.EDITOR_TITLE_CHANGE, title }
}

function start_date_change(date) {
    return { type: editorConstants.EDITOR_START_DATE_CHANGE, date }
}

function end_date_change(date) {
    return { type: editorConstants.EDITOR_END_DATE_CHANGE, date }
}

function thumbnail_change(image) {
    return dispatch => imageService.thumbnail_upload(image)
        .then(({ image, thumbnail }) => {
            dispatch({ type: editorConstants.EDITOR_THUMBNAIL_CHANGE, thumbnail });
        });
}

function editor_description_change(editable) {
    return { type: editorConstants.EDITOR_DESCRIPTION_CHANGE, editable }
}
