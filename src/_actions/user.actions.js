import { toast } from "react-semantic-toasts";
import { userConstants } from '../_constants';
import { userService } from '../_services';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                authToken => {
                    toast({
                        type: 'success',
                        icon: 'user',
                        title: 'Login Successful',
                        size: 'small',
                        description: 'Welcome back mate!',
                        animation: 'bounce',
                        time: 5000,
                        onDismiss: () => { }
                    });
                    dispatch(success({ username, authToken }));
                    localStorage.setItem('username', JSON.stringify(username));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                authToken => {
                    const username = user.username;
                    dispatch(success({ authToken, username }));
                    localStorage.setItem('username', JSON.stringify(username));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
