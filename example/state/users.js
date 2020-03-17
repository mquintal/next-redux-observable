import { filter, switchMap, map } from 'rxjs/operators'
import { from } from 'rxjs'
import axios from 'axios'


// Acions
export const LIST_LOAD = 'nro/USERS/LOAD_USERS'
export const LIST_LOAD_SUCCESS = 'nro/USERS/LOAD_USERS_SUCCESS'
export const LIST_LOAD_FAILURE = 'nro/USERS/LOAD_USERS_FAILURE'

// Actions creators
export const loadUsers = () => ({ type: LIST_LOAD })
export const loadUserSuccess = (list) => ({ type: LIST_LOAD_SUCCESS, payload: { list } })
export const loadUserFailure = () => ({ type: LIST_LOAD_FAILURE })

// Epics
export const epics = {
    list: action$ => action$
        .pipe(filter(action => action.type === LIST_LOAD))
        .pipe(switchMap(() =>
            from(axios.get('https://api.github.com/users?per_page=4'))
                .pipe(map(response => response.data))
        ))
        .pipe(map(loadUserSuccess))
}

export default (state = { list: [] }, action) => {
    switch(action.type) {
        case LIST_LOAD: {
            return { ...state }
        }
        case LIST_LOAD_SUCCESS: {
            return { ...state, ...action.payload }
        }
    }
    return state
}


