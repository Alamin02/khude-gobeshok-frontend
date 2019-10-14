import { apiBaseUrl } from "../_helpers";

export const contactServices = {
    sendMessage,
}

function sendMessage(message) {
    let requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
    }

    let url = apiBaseUrl() + `api/contact-us/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(success => success)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && JSON.stringify(data)) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}