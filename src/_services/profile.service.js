import { authHeader } from '../_helpers';

export const profileService = {
    profileDetails,
    listProjects,
};

function profileDetails(username) {
    const requestOptions = {
        mode: 'cors',
    };

    let url = `http://localhost:8000/users/profile/` + username

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(profileDetails => { return profileDetails });
}

function listProjects(username) {
    const requestOptions = {
        mode: 'cors',
    };
    let url = `http://localhost:8000/project/list/` + username

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(projectList => { return projectList });

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