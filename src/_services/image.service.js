export const imageService = {
    image_upload,
    thumbnail_upload,
}

function image_upload(image) {
    const formData = new FormData();
    formData.append('image', image)

    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        body: formData,
    };

    return fetch("http://127.0.0.1:8000/content/image-add", requestOptions)
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

    return fetch("http://127.0.0.1:8000/content/thumbnail-add", requestOptions)
        .then(handleResponse)
        .then(image => {
            return image;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}