import { squadConstants } from '../_constants';
import { squadService } from '../_services';

export const squadActions = {
    getPeople,
}

function getPeople() {
    return dispatch => {
        dispatch(request());
        squadService.getPeople()
            .then(
                people => dispatch(success(people)),
                error => dispatch(failure(error))
            )
    }
    function request() { return { type: squadConstants.SQUAD_GET_PEOPLE_REQUEST, } }
    function success(people) { return { type: squadConstants.SQUAD_GET_PEOPLE_SUCCESS, people } }
    function failure(error) { return { type: squadConstants.SQUAD_GET_PEOPLE_FAILURE, error } }
}