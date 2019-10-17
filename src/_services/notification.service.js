import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';

export const notificationService = {
    getNotifications,
};

function getNotifications(pageNumber) {
    let requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() },
    }

    let queryString = "";

    if (pageNumber) {
        let offset = (12 * (pageNumber - 1));
        let limit = "12";
        queryString = `?limit=` + limit.toString() + `&offset=` + offset;
    }

    const url = apiBaseUrl() + `api/notifications` + queryString;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(notifications => notifications);
}