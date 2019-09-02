export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('authToken'));

    if (user && user.key) {
        return { 'Authorization': 'Token ' + user.key };
    } else {
        return {};
    }
}
