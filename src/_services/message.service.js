import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';
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

function getDirectMessages(contact) {
    const requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() },
    };

    let url = apiBaseUrl() + `api/conversations/?username=` + contact;

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