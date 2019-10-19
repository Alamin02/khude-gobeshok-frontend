import { authHeader, apiBaseUrl, } from '../_helpers';
import { paginationConstants } from "../_constants";

export const messageService = {
    getConversations,
    getDirectMessages,
    sendDirectMessage,
}

function getConversations(pageNumber) {
    const requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() },
    };

    let queryString = "";

    if (pageNumber) {
        let offset = (12 * (pageNumber - 1));
        let limit = "12";
        queryString = `?limit=` + limit.toString() + `&offset=` + offset;
    }

    let url = apiBaseUrl() + `api/conversations/` + queryString;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(conversations => conversations)
}

function getDirectMessages(contact, pageNumber) {
    const requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() },
    };

    let paginationQuery = ``;

    if (pageNumber) {
        let offset = (paginationConstants.MESSAGES_PER_PAGE * (pageNumber - 1));
        let limit = paginationConstants.MESSAGES_PER_PAGE;
        paginationQuery = `&limit=` + limit.toString() + `&offset=` + offset.toString();
    }
    console.log(paginationQuery, pageNumber);

    let url = apiBaseUrl() + `api/conversations/?username=` + contact + paginationQuery;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(directMessages => directMessages)
}

function sendDirectMessage(message) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
    }

    let url = apiBaseUrl() + `api/conversations/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(message => message)
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
