import { authHeader } from '../_helpers';

export const profileService = {
    profileDetails,
    profileUserDetails,
    listProjects,
    updateProfileDetails,
    updateProfileBio,
    getEducationList,
    addEducation,
    deleteEducation,
    getJobList,
    addJob,
    deleteJob,
};

function profileDetails(username) {
    const requestOptions = {
        mode: 'cors',
    };

    let url = `http://localhost:8000/users/profile/` + username;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(profileDetails => { return profileDetails });
}

function profileUserDetails(username) {
    const requestOptions = {
        mode: 'cors',
    };

    let url = `http://localhost:8000/users/get-user/` + username;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(profileUserDetails => { return profileUserDetails });
}

function updateProfileBio(bio) {
    const requestOptions = {
        mode: 'cors',
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio }),
    }

    let url = `http://localhost:8000/users/profile-bio-update/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(updatedBio => updatedBio)
}

function updateProfileDetails(username, updatedProfileData) {
    const requestOptions = {
        mode: 'cors',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfileData),
    }

    let url = `http://localhost:8000/users/profile/` + username;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(profileDetails => {
            return profileDetails
        })
}

function getEducationList(username) {
    const requestOptions = {
        mode: 'cors',
    };
    let url = `http://localhost:8000/users/education/` + username;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(educationList => {
            return educationList;
        });
}

function addEducation(education) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(education),
    };

    return fetch(`http://localhost:8000/users/add-education/`, requestOptions)
        .then(handleResponse)
        .then(education => {
            return education;
        });
}

function deleteEducation(id) {
    const requestOptions = {
        mode: 'cors',
        method: 'DELETE',
    }

    let url = `http://localhost:8000/users/delete-education/` + id;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(
            deleted => {
                return deleted;
            }
        )
}

function getJobList(username) {
    const requestOptions = {
        mode: 'cors',
    };

    let url = `http://localhost:8000/users/job/` + username;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(jobList => {
            return jobList;
        });
}

function addJob(job) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
    };

    return fetch(`http://localhost:8000/users/add-job/`, requestOptions)
        .then(handleResponse)
        .then(job => {
            return job;
        });
}

function deleteJob(id) {
    const requestOptions = {
        mode: 'cors',
        method: 'DELETE',
    }

    let url = `http://localhost:8000/users/delete-job/` + id;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(
            deleted => {
                return deleted;
            }
        )
}

function listProjects(username) {
    const requestOptions = {
        mode: 'cors',
    };
    let url = `http://localhost:8000/project/list/` + username;

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