import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import entriesReducer from '../reducers/entries.reducers';
import modalsReducer from '../reducers/modals.reducers';
import createSagaMiddleware from 'redux-saga';

import { initSagas } from "../sagas";

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

 const configureStore = () => {
    const store = createStore(
          combineReducers({
            entries: entriesReducer,
            modals: modalsReducer,
        }),
        composeWithDevTools(applyMiddleware(...middlewares))
       // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    initSagas(sagaMiddleware);
    return store;
}

export default configureStore