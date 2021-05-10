import { call, fork, put, take } from "redux-saga/effects";
import entriesTypes, { populateEntryDetails } from '../actions/entries.actions';
import axios from 'axios'
import {populateEntries} from "../actions/entries.actions";

export function* getAllEntries() {
    yield take(entriesTypes.GET_ENTRIES);
    const {data} = yield call(axios, 'http://localhost:3002/entries');
    yield put(populateEntries(data));
}

export function* getEntryDetails(id) {
    const {data} = yield call(axios, `http://localhost:3002/values/${id}`)
    yield put(populateEntryDetails(id, data))
}

export function* getAllEntriesDetails() {
    const {payload} = yield take(entriesTypes.POPULATE_ENTRIES);
    for (let index = 0; index < payload.length; index++) {
        const entry = payload[index];
        yield fork(getEntryDetails, entry.id)
    }
}