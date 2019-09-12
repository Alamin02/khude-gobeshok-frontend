import { authHeader } from '../_helpers';

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

    return fetch(`http://localhost:8000/project/create/`, requestOptions)
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
        console.log(offset, limit);

        queryString = `?limit=` + limit.toString() + `&offset=` + offset;
    }

    return fetch(`http://localhost:8000/project/list/` + queryString, requestOptions)
        .then(handleResponse)
        .then(project_list => { return project_list });

}

function retrieve(project_id) {
    const requestOptions = {
        mode: 'cors',
    };
    return fetch(`http://localhost:8000/project/retrieve/` + project_id, requestOptions)
        .then(handleResponse)
        .then(project => { return project });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}