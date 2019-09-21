import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';

export const projectService = {
    create,
    list,
    retrieve,
};

function create(project) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    };

    let url = apiBaseUrl() + `projects/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(project => {
            return project;
        });
}

function list(pageNumber) {
    const requestOptions = {
        mode: 'cors',
    };

    let queryString = "";
    if (pageNumber) {
        let offset = (12 * (pageNumber - 1));
        let limit = "12";
        queryString = `?limit=` + limit.toString() + `&offset=` + offset;
    }

    let url = apiBaseUrl() + `projects/` + queryString;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(project_list => { return project_list });

}

function retrieve(project_id) {
    const requestOptions = {
        mode: 'cors',
    };

    let url = apiBaseUrl() + `projects/retrieve/` + project_id;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(project => { return project });
}
