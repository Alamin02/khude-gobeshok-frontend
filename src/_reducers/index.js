import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { editor } from './editor.reducer';
import { project } from './project.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    editor,
    project
});

export default rootReducer;
