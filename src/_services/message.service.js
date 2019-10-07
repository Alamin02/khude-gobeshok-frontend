import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';
export const messageService = {
    getConversations,
    getDirectMessages,
}

function getConversations() {
    const requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() },
    };

    let url = apiBaseUrl() + `api/conversations/`;
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
