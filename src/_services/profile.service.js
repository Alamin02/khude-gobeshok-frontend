import { authHeader, apiBaseUrl, handleResponse } from '../_helpers';

export const profileService = {
    profileDetails,
    profileUserDetails,
    listProjects,
    updateProfileDetails,
    updateProfileBio,
    updateSpecializedIn,
    updateSoftwareSkill,
    updateProfilePic,
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

    let url = apiBaseUrl() + `users/profile/` + username;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(profileDetails => { return profileDetails });
}

function profileUserDetails(username) {
    const requestOptions = {
        mode: 'cors',
    };

    let url = apiBaseUrl() + `users/get-user/` + username;
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

    let url = apiBaseUrl() + `users/profile-bio-update/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(updatedBio => updatedBio)
}

function updateProfilePic(propicId) {
    const requestOptions = {
        mode: 'cors',
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: propicId }),
    }

    let url = apiBaseUrl() + `users/profile-pic-update/`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(updatedProPic => updatedProPic)
}

function updateSpecializedIn(username, specilizedIn) {
    const requestOptions = {
        mode: 'cors',
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ specialized_in: specilizedIn }),
    }

    let url = apiBaseUrl() + `users/` + username + `/specialized-in`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(updatedSpecializedIn => updatedSpecializedIn)
}

function updateSoftwareSkill(username, softwareSkill) {
    const requestOptions = {
        mode: 'cors',
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ software_skills: softwareSkill }),
    }

    let url = apiBaseUrl() + `users/` + username + `/software-skill`;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(updatedSoftwareSkill => updatedSoftwareSkill)
}

function updateProfileDetails(username, updatedProfileData) {
    const requestOptions = {
        mode: 'cors',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfileData),
    }

    let url = apiBaseUrl() + `users/profile/` + username;

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
    let url = apiBaseUrl() + `users/education/` + username;

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

    return fetch(apiBaseUrl() + `users/add-education/`, requestOptions)
        .then(handleResponse)
        .then(education => {
            return education;
        });
}

function deleteEducation(id) {
    const requestOptions = {
        mode: 'cors',
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    }

    let url = apiBaseUrl() + `users/delete-education/` + id;

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

    let url = apiBaseUrl() + `users/job/` + username;

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

    return fetch(apiBaseUrl() + `users/add-job/`, requestOptions)
        .then(handleResponse)
        .then(job => {
            return job;
        });
}

function deleteJob(id) {
    const requestOptions = {
        mode: 'cors',
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    }

    let url = apiBaseUrl() + `users/delete-job/` + id;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(
            deleted => {
                return deleted;
            }
        )
}

function listProjects(username, pageNumber) {
    const requestOptions = {
        mode: 'cors',
    };

    let queryString = "";
    if (pageNumber) {
        let offset = (12 * (pageNumber - 1));
        let limit = "12";
        queryString = `?limit=` + limit.toString() + `&offset=` + offset;
    }

    let url = apiBaseUrl() + `api/projects/?username=` + username + queryString;

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(projectList => { return projectList });

}

