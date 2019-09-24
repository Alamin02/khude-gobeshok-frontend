import { editorConstants } from "../_constants";

import { imageService } from "../_services";

export const editorActions = {
    init,
    startDateChange,
    endDateChange,
    thumbnailChange,
    editorDescriptionChange,
    editorMetaDataChange,
}

function init(author) {
    return { type: editorConstants.EDITOR_INIT, author }
}

function startDateChange(date) {
    return { type: editorConstants.EDITOR_START_DATE_CHANGE, date }
}

function endDateChange(date) {
    return { type: editorConstants.EDITOR_END_DATE_CHANGE, date }
}

function thumbnailChange(image) {
    return dispatch => imageService.thumbnail_upload(image)
        .then(({ image, thumbnail }) => {
            dispatch({ type: editorConstants.EDITOR_THUMBNAIL_CHANGE, thumbnail });
        });
}

function editorDescriptionChange(editable) {
    return { type: editorConstants.EDITOR_DESCRIPTION_CHANGE, editable }
}

function editorMetaDataChange(metadata) {
    return { type: editorConstants.EDITOR_META_DATA_CHANGE, metadata }
}