import { squadConstants } from "../_constants";

const initialState = {
    people: [
        {
            profile: {
                avatar: {
                }
            }
        }
    ],
    peopleCount: 1,
}

export function squad(state = initialState, action) {
    switch (action.type) {
        case squadConstants.SQUAD_GET_PEOPLE_SUCCESS:
            return Object.assign({}, state, {
                people: action.people.results,
                peopleCount: action.people.count,
            });

        default:
            return state;
    }
}