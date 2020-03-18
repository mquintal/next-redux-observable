import { createStore, applyMiddleware, combineReducers } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import  { default as usersReducer, epics as usersEpics } from './state/users' 


export const rootEpic = combineEpics(
    ...Object.values(usersEpics),
)

const reducer = combineReducers({
    users: usersReducer,
})

export const createAppStore = (initialState) => {
    const epicMiddleware = createEpicMiddleware()
    const store = createStore(reducer, initialState, applyMiddleware(epicMiddleware));
    
    epicMiddleware.run(rootEpic)

    return store 
}