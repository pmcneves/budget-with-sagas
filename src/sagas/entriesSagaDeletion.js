import { call, put, take } from "@redux-saga/core/effects";
import axios from "axios";
import entriesTypes from '../actions/entries.actions';

export function* deleteEntrySaga() {
    while(true) {
        const {payload} = yield take(entriesTypes.REMOVE_ENTRY); //getting id
        yield call(deleteEntry, payload.id);
        yield put({ type: 'REMOVE_ENTRY_RESULT', payload: { id: payload.id } });
    }
}

async function deleteEntry(id){
    await axios.delete(`http://localhost:3002/entries/${id}`)
    await axios.delete(`http://localhost:3002/values/${id}`)
}