import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';

export const squadService = {
    getPeople,
}

function getPeople(pageNumber) {
    let requestOptions = {
        mode: 'cors',
        headers: { ...authHeader() }
    }

    let queryString = "";

    if (pageNumber) {
        let offset = (12 * (pageNumber - 1));
        let limit = "12";
        queryString = `?limit=` + limit.toString() + `&offset=` + offset;
    }

    let url = apiBaseUrl() + `api/squads/` + queryString;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(people => people)
}