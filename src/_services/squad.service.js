import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';

export const squadService = {
    getPeople,
}

function getPeople() {
    let requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() }
    }
    let url = apiBaseUrl() + `api/squads/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(people => people)
}