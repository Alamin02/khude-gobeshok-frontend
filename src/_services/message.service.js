import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';
export const messageService = {
    getConversations
}

function getConversations(username) {
    const requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() },
    };

    let url = apiBaseUrl() + `api/conversations/`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(conversations => conversations)
}
