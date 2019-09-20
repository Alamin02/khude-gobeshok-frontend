import { apiBaseUrl, handleResponse } from "../_helpers";

export const imageService = {
    image_upload,
    thumbnail_upload,
    profilePicUpload,
}

function image_upload(image) {
    const formData = new FormData();
    formData.append('image', image);

    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        body: formData,
    };

    let url = apiBaseUrl() + "content/image-add"

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(image => {
            return image;
        });
}

function profilePicUpload(image) {
    const formData = new FormData();
    formData.append('image', image)

    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        body: formData,
    };

    let url = apiBaseUrl() + "content/propic-add";

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(image => {
            return image;
        });
}

function thumbnail_upload(image) {
    const formData = new FormData();
    formData.append('image', image)

    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        body: formData,
    };

    let url = apiBaseUrl() + "content/thumbnail-add";

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(image => {
            return image;
        });
}
