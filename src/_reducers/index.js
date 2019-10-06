import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { editor } from './editor.reducer';
import { project } from './project.reducer';
import { profile } from './profile.reducer';
import { message } from './message.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    editor,
    project,
    profile,
    message,
});

export default rootReducer;
