import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

function getStore() {
    if (process.env.NODE_ENV === 'development') {
        return createStore(
            rootReducer,
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware
            )
        );
    }
    else {
        return createStore(
            rootReducer,
            applyMiddleware(
                thunkMiddleware,
            )
        );
    }
}

export const store = getStore();