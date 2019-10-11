import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';

export const notificationService = {
    getNotifications,
};

function getNotifications() {
    let requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() },
    }

    const url = apiBaseUrl() + `api/notifications`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(notifications => notifications);
}