import { filter, switchMap, map, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import axios from 'axios'


// Acions
export const LIST_LOAD = 'nro/USERS/LOAD_USERS'
export const LIST_LOAD_SUCCESS = 'nro/USERS/LOAD_USERS_SUCCESS'
export const LIST_LOAD_FAILURE = 'nro/USERS/LOAD_USERS_FAILURE'
export const USER_LOAD = 'nro/USERS/LOAD_USER'
export const USER_LOAD_SUCCESS = 'nro/USERS/LOAD_USERS_SUUSER'
export const USER_LOAD_FAILURE = 'nro/USERS/LOAD_USERS_FAUSER'

// Actions creators
export const loadUsers = () => ({ type: LIST_LOAD })
export const loadUsersSuccess = (list) => ({ type: LIST_LOAD_SUCCESS, payload: { list } })
export const loadUsersFailure = () => ({ type: LIST_LOAD_FAILURE })
export const loadUser = id => ({ type: USER_LOAD, payload: { id } })
export const loadUserSuccess = user => ({ type: USER_LOAD_SUCCESS, payload: { user } })
export const loadUserFailure = id => ({ type: USER_LOAD_FAILURE })

// Epics
export const epics = {
    list: action$ => action$
        .pipe(filter(action => action.type === LIST_LOAD))
        .pipe(switchMap(() =>
            from(axios.get('https://api.github.com/users?per_page=4'))
                .pipe(map(response => response.data))
        ))
        .pipe(map(loadUsersSuccess))
        .pipe(catchError(() => of(loadUsersFailure()))),
 
    user: action$ => action$
        .pipe(filter(action => action.type === USER_LOAD))
        .pipe(switchMap(({ payload }) =>
            from(axios.get(`https://api.github.com/user/${payload.id}`))
                .pipe(map(response => response.data))
        ))
        .pipe(map(loadUserSuccess))
        .pipe(catchError(() => of(loadUserFailure())))
}

export default (state = { list: [], user: {} }, action) => {
    switch(action.type) {
        case LIST_LOAD: {
            return { ...state }
        }
        case LIST_LOAD_SUCCESS: {
            return { ...state, ...action.payload }
        }
        case USER_LOAD_SUCCESS: {
            return { ...state, ...action.payload }
        }

    }
    return state
}


