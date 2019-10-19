import { apiBaseUrl } from '../_helpers';

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    };

    let url = apiBaseUrl() + `rest-auth/login/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(authToken => {
            // store authToken details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('authToken', JSON.stringify(authToken));

            return authToken;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
}

function register(user) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    let url = apiBaseUrl() + `rest-auth/registration/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(authToken => {
            // store authToken details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('authToken', JSON.stringify(authToken));

            return authToken;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && JSON.stringify(data)) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
